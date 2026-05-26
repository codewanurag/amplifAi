import { api, unwrap } from "./api";

export const paymentService = {
  subscription: () => unwrap(api.get("/payments/subscription")),
  createOrder: (plan) => unwrap(api.post("/payments/orders", { plan })),
  verify: (payload) => unwrap(api.post("/payments/verify", payload)),
  async checkout(plan, user) {
    const { order, keyId } = await this.createOrder(plan);
    if (!window.Razorpay) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = resolve;
        script.onerror = () => reject(new Error("Unable to load Razorpay checkout."));
        document.body.appendChild(script);
      });
    }
    return new Promise((resolve, reject) => {
      const checkout = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "AmplifAI",
        description: `${plan} subscription`,
        prefill: { name: user?.name, email: user?.email },
        handler: async (response) => {
          try {
            resolve(await this.verify(response));
          } catch (error) {
            reject(error);
          }
        },
        modal: { ondismiss: () => reject(new Error("Checkout cancelled.")) },
      });
      checkout.open();
    });
  },
};
