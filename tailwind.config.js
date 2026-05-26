/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#071322",
        slateDeep: "#101B2D",
        charcoal: "#1E293B",
        electric: "#2563EB",
        cyanBrand: "#0891B2",
        aqua: "#67E8F9",
        tealBrand: "#14B8A6",
        coral: "#F97387",
        canvas: "#F4F7FB",
        line: "#E5EDF6",
      },
      boxShadow: {
        panel: "0 1px 2px rgba(15,23,42,.03), 0 18px 44px -28px rgba(7,19,34,.24)",
        elevated: "0 2px 4px rgba(15,23,42,.035), 0 30px 74px -32px rgba(7,19,34,.3)",
        floating: "0 22px 60px -24px rgba(7,19,34,.22)",
        glow: "0 0 32px rgba(8,145,178,.22)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(120deg, #0891B2 0%, #2563EB 100%)",
        "surface-gradient": "linear-gradient(145deg, rgba(255,255,255,.98), rgba(248,251,255,.96))",
        "hero-wash": "radial-gradient(circle at 20% 15%, rgba(8,145,178,.11), transparent 31%), radial-gradient(circle at 83% 16%, rgba(37,99,235,.13), transparent 34%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseSoft: "pulseSoft 5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: ".55", transform: "scale(1)" },
          "50%": { opacity: ".9", transform: "scale(1.08)" },
        },
      },
    },
  },
  plugins: [],
};
