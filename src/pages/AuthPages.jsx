import { motion } from "framer-motion";
import { ArrowRight, Check, KeyRound, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Brand, GradientText, Notice, PageTransition, PlatformMark } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="grid min-h-screen bg-canvas lg:grid-cols-[.95fr_1.05fr]">
      <aside className="relative hidden overflow-hidden border-r border-line bg-gradient-to-br from-[#ECF8FB] via-[#F4F8FF] to-white p-12 text-midnight lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -left-20 bottom-8 h-80 w-80 rounded-full bg-cyanBrand/[0.1] blur-3xl" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-electric/[0.1] blur-3xl" />
        <Brand />
        <div className="relative my-10 max-w-md">
          <div className="relative mb-10 h-[230px]">
            <motion.div
              className="absolute left-1/2 top-2 w-[290px] -translate-x-1/2 rounded-3xl border border-white bg-white/85 p-4 shadow-floating backdrop-blur"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            >
              <p className="card-kicker">One campaign idea</p>
              <p className="mt-2 text-sm font-semibold text-midnight">Turn our launch insight into a content week</p>
              <div className="mt-4 flex items-center gap-2">
                {["Instagram", "YouTube", "LinkedIn", "X / Twitter"].map((platform) => <PlatformMark key={platform} name={platform} />)}
                <span className="ml-auto rounded-full bg-cyanBrand/[0.08] px-2 py-1 text-[10px] font-semibold text-cyan-700">Generating</span>
              </div>
            </motion.div>
            <motion.div
              className="absolute bottom-6 left-2 rounded-2xl border border-line bg-white p-3 shadow-panel"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
            >
              <p className="text-[10px] font-semibold text-slate-400">SCHEDULED</p>
              <p className="mt-1 text-xs font-semibold text-midnight">Tue, 8:30 AM</p>
            </motion.div>
            <motion.div
              className="absolute bottom-0 right-0 rounded-2xl border border-cyanBrand/15 bg-white p-3 shadow-panel"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 5.4, ease: "easeInOut", repeat: Infinity }}
            >
              <p className="text-[10px] font-semibold text-cyan-700">AI INSIGHT</p>
              <p className="mt-1 text-sm font-bold text-teal-700">+24% reach</p>
            </motion.div>
          </div>
          <span className="badge">AI creator workspace</span>
          <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight">Build a stronger content system, not just another post.</h2>
          <div className="mt-8 space-y-4">
            {["Generate channel-ready content", "Schedule with smarter timing", "Measure what truly resonates"].map((text) => (
              <p className="flex items-center gap-3 text-sm text-slate-600" key={text}><Check className="text-cyan-700" size={16} /> {text}</p>
            ))}
          </div>
        </div>
        <p className="relative text-sm text-slate-500">Trusted by 12,000+ modern creators and teams</p>
      </aside>
      <main className="flex items-center justify-center px-5 py-12">
        <PageTransition className="w-full max-w-md">
          <div className="mb-10 lg:hidden"><Brand /></div>
          <p className="mb-3 text-sm font-semibold text-cyan-700">Welcome to AmplifAI</p>
          <h1 className="text-3xl font-bold tracking-tight text-midnight">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
          <div className="mt-9">{children}</div>
        </PageTransition>
      </main>
    </div>
  );
}

function SocialAuth({ onUnavailable }) {
  return (
    <>
      <button className="btn-secondary w-full" onClick={onUnavailable} type="button">Continue with Google</button>
      <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
        <span className="h-px flex-1 bg-slate-200" /> OR CONTINUE WITH EMAIL <span className="h-px flex-1 bg-slate-200" />
      </div>
    </>
  );
}

export function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [busy, setBusy] = useState(false);
  if (auth.user) return <Navigate replace to="/app" />;

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setFeedback(null);
    try {
      await auth.login(Object.fromEntries(new FormData(event.currentTarget).entries()));
      navigate("/app");
    } catch (error) {
      setFeedback({ tone: "error", message: error.message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout title="Log in to your workspace" subtitle="Continue creating content that moves your audience.">
      <Notice message={feedback?.message} tone={feedback?.tone} />
      <SocialAuth onUnavailable={() => setFeedback({ tone: "error", message: "Google sign-in requires OAuth credentials. Please use email login for now." })} />
      <form className="space-y-5" onSubmit={submit}>
        <div>
          <label className="label" htmlFor="email">Email address</label>
          <div className="relative"><Mail className="absolute left-3.5 top-3.5 text-slate-400" size={18} /><input id="email" name="email" required type="email" className="input pl-11" placeholder="you@company.com" /></div>
        </div>
        <div>
          <div className="mb-2 flex justify-between">
            <label className="text-sm font-medium text-slate-700" htmlFor="password">Password</label>
            <Link className="text-sm font-semibold text-cyan-700" to="/forgot-password">Forgot password?</Link>
          </div>
          <div className="relative"><KeyRound className="absolute left-3.5 top-3.5 text-slate-400" size={18} /><input id="password" name="password" required type="password" className="input pl-11" placeholder="Enter your password" /></div>
        </div>
        <button disabled={busy} type="submit" className="btn-primary w-full disabled:cursor-wait disabled:opacity-60">{busy ? "Signing in..." : "Log in"} <ArrowRight size={17} /></button>
      </form>
      <p className="mt-8 text-center text-sm text-slate-500">New to AmplifAI? <Link to="/signup" className="font-semibold text-cyan-700">Create an account</Link></p>
    </AuthLayout>
  );
}

export function SignupPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [busy, setBusy] = useState(false);
  if (auth.user) return <Navigate replace to="/app" />;

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setFeedback(null);
    try {
      await auth.signup(Object.fromEntries(new FormData(event.currentTarget).entries()));
      navigate("/onboarding");
    } catch (error) {
      setFeedback({ tone: "error", message: error.message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout title={<>Start creating with <GradientText>intelligence</GradientText></>} subtitle="Set up your workspace and generate your first campaign today.">
      <Notice message={feedback?.message} tone={feedback?.tone} />
      <SocialAuth onUnavailable={() => setFeedback({ tone: "error", message: "Google sign-up requires OAuth credentials. Create an account with email for now." })} />
      <form className="space-y-4" onSubmit={submit}>
        <div>
          <label className="label" htmlFor="name">Full name</label>
          <div className="relative"><UserRound className="absolute left-3.5 top-3.5 text-slate-400" size={18} /><input id="name" name="name" required className="input pl-11" placeholder="Anika Kapoor" /></div>
        </div>
        <div>
          <label className="label" htmlFor="signup-email">Work email</label>
          <input id="signup-email" name="email" required type="email" className="input" placeholder="you@company.com" />
        </div>
        <div>
          <label className="label" htmlFor="new-password">Password</label>
          <input id="new-password" name="password" required minLength={8} type="password" className="input" placeholder="Minimum 8 characters" />
        </div>
        <button disabled={busy} className="btn-primary mt-2 w-full disabled:opacity-60" type="submit">{busy ? "Creating account..." : "Create workspace"} <ArrowRight size={17} /></button>
      </form>
      <p className="mt-7 text-center text-sm text-slate-500">Already registered? <Link to="/login" className="font-semibold text-cyan-700">Log in</Link></p>
    </AuthLayout>
  );
}

export function ForgotPasswordPage() {
  const [feedback, setFeedback] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    try {
      const message = await authService.requestPasswordReset(new FormData(event.currentTarget).get("email"));
      setFeedback({ tone: "success", message });
    } catch (error) {
      setFeedback({ tone: "error", message: error.message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout title="Reset your password" subtitle="We will email a secure reset link to your registered address.">
      <Notice message={feedback?.message} tone={feedback?.tone} />
      <form className="space-y-5" onSubmit={submit}>
        <div>
          <label className="label" htmlFor="reset-email">Email address</label>
          <div className="relative"><Mail className="absolute left-3.5 top-3.5 text-slate-400" size={18} /><input id="reset-email" name="email" required type="email" className="input pl-11" placeholder="you@company.com" /></div>
        </div>
        <button disabled={busy} className="btn-primary w-full disabled:opacity-60" type="submit">{busy ? "Requesting..." : "Send reset link"} <ArrowRight size={17} /></button>
      </form>
      <p className="mt-8 text-center text-sm text-slate-500"><Link to="/login" className="font-semibold text-cyan-700">Back to login</Link></p>
    </AuthLayout>
  );
}
