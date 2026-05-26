import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Check,
  Layers3,
  Menu,
  Play,
  Sparkles,
  TrendingUp,
  Wand2,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { TrendChart } from "../components/charts";
import { Brand, GradientText, PlatformMark, SectionTitle } from "../components/ui";
import { dashboardStats, engagementSeries, platforms } from "../data/mockData";

const features = [
  { icon: Wand2, title: "AI Studio", copy: "Turn a simple brief into hooks, scripts, captions, and publish-ready ideas." },
  { icon: Layers3, title: "Repurpose everywhere", copy: "Adapt one concept into platform-native formats without losing your voice." },
  { icon: CalendarDays, title: "Smart scheduling", copy: "Plan content with AI timing recommendations tuned to your audience." },
  { icon: BarChart3, title: "Actionable analytics", copy: "Understand why content performs and what to create next." },
];

const workflow = [
  { number: "01", title: "Describe your idea", text: "Set niche, goal, audience, and campaign context." },
  { number: "02", title: "Generate variants", text: "AmplifAI writes and reshapes assets for every channel." },
  { number: "03", title: "Schedule everywhere", text: "Publish platform-ready content at the right moment." },
  { number: "04", title: "Learn what performs", text: "Improve the next campaign with clear AI insights." },
];

const plans = [
  { name: "Starter", price: "$0", note: "For exploring creators", features: ["20 AI generations", "2 connected platforms", "Weekly calendar"] },
  { name: "Creator Pro", price: "$29", note: "per month", featured: true, features: ["Unlimited AI studio", "All platforms", "Predictive analytics", "Brand memory"] },
  { name: "Team", price: "$79", note: "per workspace", features: ["Approval workflows", "Team roles", "Priority support", "Campaign folders"] },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.52, ease: "easeOut" } },
};

function MarketingNav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-30">
      <div className="glass mx-auto mt-4 flex h-16 max-w-7xl items-center justify-between rounded-2xl px-4 ring-1 ring-white/40 sm:px-6">
        <Brand />
        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#features" className="hover:text-midnight">Features</a>
          <a href="#workflow" className="hover:text-midnight">Workflow</a>
          <a href="#pricing" className="hover:text-midnight">Pricing</a>
          <a href="#analytics" className="hover:text-midnight">Analytics</a>
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <Link to="/login" className="px-3 py-2 text-sm font-semibold text-charcoal">Log in</Link>
          <Link to="/signup" className="btn-primary py-2.5">Start free</Link>
        </div>
        <button aria-label="Open navigation menu" className="rounded-xl border border-line bg-white/70 p-2 text-slate-600 shadow-sm sm:hidden">
          <Menu size={20} />
        </button>
      </div>
    </nav>
  );
}

function HeroDashboard() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 130, damping: 22, mass: 0.5 });
  const smoothY = useSpring(cursorY, { stiffness: 130, damping: 22, mass: 0.5 });
  const rotateX = useTransform(smoothY, [-1, 1], [2.2, -2.2]);
  const rotateY = useTransform(smoothX, [-1, 1], [-2.8, 2.8]);
  const glowX = useTransform(smoothX, [-1, 1], [-38, 38]);
  const glowY = useTransform(smoothY, [-1, 1], [-24, 24]);
  const leftChipX = useTransform(smoothX, [-1, 1], [-5, 7]);
  const rightChipX = useTransform(smoothX, [-1, 1], [-7, 6]);

  function handlePointerMove(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    cursorX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1);
    cursorY.set(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  }

  function handlePointerLeave() {
    cursorX.set(0);
    cursorY.set(0);
  }

  return (
    <motion.div
      className="relative mt-14 lg:mt-0"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.22, duration: 0.62 }}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={{ perspective: 1200 }}
    >
      <div className="absolute -inset-10 -z-10 rounded-full bg-gradient-to-br from-cyanBrand/[0.13] to-electric/[0.09] blur-3xl" />
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}>
      <motion.div
        className="panel relative z-10 overflow-hidden !p-3 shadow-elevated sm:!p-4"
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.008 }}
        transition={{ type: "spring", stiffness: 180, damping: 24 }}
      >
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyanBrand/[0.11] blur-3xl"
          style={{ x: glowX, y: glowY }}
        />
        <div className="mb-3 flex items-center justify-between rounded-2xl border border-cyanBrand/15 bg-gradient-to-r from-cyanBrand/[0.07] to-electric/[0.06] p-4 text-midnight">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-cyanBrand/10 text-cyan-700"><Sparkles size={17} /></div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-700">Creator Studio</p>
              <p className="text-sm font-semibold">Content Overview</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-cyanBrand/15 bg-white/70 px-3 py-1.5 text-[11px] font-semibold text-cyan-700">
            <span className="h-1.5 w-1.5 rounded-full bg-tealBrand" /> Live insights
          </span>
        </div>
        <div className="flex gap-3">
          <div className="hidden w-[68px] shrink-0 space-y-2 rounded-2xl border border-line bg-canvas/75 p-2 sm:block">
            {[BarChart3, Wand2, CalendarDays].map((Icon, index) => (
              <div key={index} className={`grid h-10 place-items-center rounded-xl ${index === 0 ? "bg-cyanBrand/10 text-cyan-700" : "text-slate-400"}`}>
                <Icon size={16} />
              </div>
            ))}
          </div>
          <div className="min-w-0 flex-1">
            <div className="grid grid-cols-2 gap-3">
              {dashboardStats.slice(0, 2).map((stat) => (
                <motion.div className="rounded-2xl border border-line bg-white/70 p-3" key={stat.label} whileHover={{ y: -2, borderColor: "rgba(8,145,178,.2)" }}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{stat.label}</p>
                  <p className="mt-2 text-xl font-bold tracking-tight text-midnight">{stat.value}</p>
                  <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-teal-600"><TrendingUp size={11} /> {stat.change}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-3 rounded-2xl border border-line bg-white/70 p-4">
              <div className="mb-2 flex justify-between text-xs">
                <span className="font-semibold text-midnight">Engagement forecast</span>
                <span className="font-semibold text-cyan-700">+18.4%</span>
              </div>
              <TrendChart values={engagementSeries} height={118} />
            </div>
            <motion.div className="mt-3 flex items-center gap-3 rounded-2xl border border-line bg-white/75 p-3" whileHover={{ y: -2 }}>
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyanBrand/[0.09] text-cyan-700"><CalendarDays size={17} /></div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Next scheduled</p>
                <p className="truncate text-xs font-semibold text-midnight">AI hooks for founders</p>
              </div>
              <PlatformMark name="LinkedIn" />
              <span className="rounded-full bg-tealBrand/10 px-2 py-1 text-[10px] font-bold text-teal-700">Ready</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
      </motion.div>
      <motion.div className="absolute -left-8 top-28 z-20 hidden rounded-2xl border border-line bg-white/95 p-3.5 shadow-floating sm:block" style={{ x: leftChipX }} animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut" }}>
        <p className="flex items-center gap-1.5 text-xs font-semibold text-teal-700"><TrendingUp size={13} /> +24% engagement</p>
        <p className="mt-1 text-[11px] text-slate-400">This campaign</p>
      </motion.div>
      <motion.div className="absolute -right-4 -top-8 z-20 rounded-2xl border border-line bg-white/95 p-3 shadow-floating" style={{ x: rightChipX }} animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 5.8, ease: "easeInOut" }}>
        <div className="flex gap-2">{platforms.slice(0, 3).map((platform) => <PlatformMark key={platform.name} name={platform.name} size="md" />)}</div>
        <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-400">4 platforms ready</p>
      </motion.div>
      <motion.div className="absolute -bottom-8 right-6 z-20 hidden min-w-48 rounded-2xl border border-line bg-white/95 p-3.5 shadow-floating sm:block" style={{ x: rightChipX }} animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 6.2, ease: "easeInOut" }}>
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-700"><Sparkles size={12} /> AI hook improved</p>
        <p className="mt-2 text-xs font-semibold text-midnight">Stronger opening line</p>
        <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-teal-700">+14% reach <ArrowUpRight size={11} /></p>
      </motion.div>
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-canvas text-charcoal">
      <MarketingNav />
      <section className="dot-grid relative overflow-hidden bg-hero-wash px-4 pb-24 pt-36 sm:px-6 lg:pb-32 lg:pt-44">
        <div className="absolute left-1/4 top-24 h-80 w-80 animate-pulseSoft rounded-full bg-cyanBrand/[0.1] blur-3xl" />
        <div className="absolute right-0 top-28 h-96 w-96 animate-pulseSoft rounded-full bg-electric/[0.1] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_.98fr]">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <span className="badge mb-6">
              <Sparkles size={13} /> AI-powered social command center
            </span>
            <h1 className="max-w-xl text-5xl font-bold leading-[1.06] tracking-[-0.055em] text-midnight sm:text-6xl">
              Create Once. <GradientText>Amplify Everywhere.</GradientText>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
              Generate, repurpose, schedule, and analyze social content from one intelligent workspace built for modern creators and growing teams.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/signup" className="btn-primary">
                Start creating free <ArrowRight size={17} />
              </Link>
              <Link to="/app" className="btn-secondary">
                <Play size={16} className="text-cyan-700" /> View live demo
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-2"><Check size={15} className="text-teal-600" /> No credit card</span>
              <span className="flex items-center gap-2"><Check size={15} className="text-teal-600" /> 4 platforms connected</span>
              <span className="flex items-center gap-2"><Check size={15} className="text-teal-600" /> Setup in minutes</span>
            </div>
            <div className="mt-9 flex items-center gap-4 border-t border-line/70 pt-6">
              <div className="flex -space-x-2">
                {["NK", "SR", "EC"].map((user, index) => (
                  <span key={user} className={`grid h-8 w-8 place-items-center rounded-full border-2 border-canvas text-[10px] font-bold text-white ${index === 2 ? "bg-coral" : "bg-brand-gradient"}`}>{user}</span>
                ))}
              </div>
              <p className="text-xs text-slate-500"><strong className="text-midnight">12,000+</strong> teams creating with AmplifAI</p>
            </div>
          </motion.div>
          <HeroDashboard />
        </div>
      </section>

      <section id="workflow" className="border-y border-line/70 bg-white/65 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="How it works" title="One idea. A complete publishing loop." description="AmplifAI guides each campaign from concept to learning without forcing you to jump between disconnected tools." />
          <div className="mt-11 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {workflow.map((step, index) => (
              <motion.article key={step.number} className="relative rounded-3xl border border-line bg-white/75 p-6 shadow-panel transition hover:-translate-y-1 hover:shadow-elevated" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }}>
                <span className="mb-7 grid h-10 w-10 place-items-center rounded-full bg-cyanBrand/[0.08] text-sm font-bold text-cyan-700">{step.number}</span>
                <h3 className="text-base font-semibold text-midnight">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{step.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Platform" title="Focused tools for every creative stage" description="Use intelligent assistance only where it advances the campaign." />
          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="panel group transition hover:-translate-y-1 hover:border-cyanBrand/25">
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-cyanBrand/10 text-cyan-700 group-hover:bg-brand-gradient group-hover:text-white">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-midnight">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="analytics" className="px-4 py-20 sm:px-6">
        <motion.div
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-cyanBrand/10 bg-gradient-to-br from-white via-white to-cyanBrand/[0.055] p-6 shadow-elevated sm:p-10 lg:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyanBrand/[0.09] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/4 h-60 w-60 rounded-full bg-electric/[0.07] blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <span className="badge">Predictive analytics</span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-midnight sm:text-4xl">Know why your content wins.</h2>
              <p className="mt-4 max-w-md leading-7 text-slate-500">See engagement momentum, compare platforms, and get recommendations that help each post work harder.</p>
              <div className="mt-8 space-y-3">
                {["AI-generated improvement insights", "Platform comparison in real time", "Hook and retention signals"].map((item) => (
                  <p className="flex items-center gap-3 rounded-xl border border-line/80 bg-white/70 px-3.5 py-3 text-sm text-slate-700 shadow-sm" key={item}>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-cyanBrand/[0.08] text-cyan-700"><Zap size={15} /></span> {item}
                  </p>
                ))}
              </div>
            </div>
            <motion.div className="rounded-3xl border border-line/90 bg-white/80 p-5 shadow-panel sm:p-7" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total engagement</p>
                  <p className="mt-1 text-3xl font-bold text-midnight">84,620</p>
                </div>
                <span className="rounded-full bg-tealBrand/10 px-3 py-1 text-sm font-bold text-teal-700">+12.9%</span>
              </div>
              <div className="rounded-2xl border border-cyanBrand/10 bg-gradient-to-b from-cyanBrand/[0.045] to-transparent px-3 pb-2 pt-5">
                <TrendChart values={engagementSeries} accent="#0891B2" height={180} />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-canvas px-3 py-1.5 text-xs font-semibold text-slate-500">Highest signal: LinkedIn</span>
                <span className="rounded-full bg-cyanBrand/[0.07] px-3 py-1.5 text-xs font-semibold text-cyan-700">AI confidence 94%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="pricing" className="border-y border-line/70 bg-white/55 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Pricing" title="A plan for every creator stage" description="Start at no cost. Upgrade when your workflow and audience grow." />
          <div className="mt-11 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.name} className={`rounded-2xl border bg-white/90 p-7 shadow-panel ${plan.featured ? "relative border-cyanBrand shadow-xl shadow-cyanBrand/10" : "border-line"}`}>
                {plan.featured && <span className="absolute -top-3 left-7 rounded-full bg-brand-gradient px-3 py-1 text-xs font-bold text-white">Most popular</span>}
                <h3 className="text-lg font-semibold text-midnight">{plan.name}</h3>
                <div className="mt-4 flex items-end gap-2">
                  <p className="text-4xl font-bold tracking-tight text-midnight">{plan.price}</p>
                  <p className="pb-1 text-sm text-slate-500">{plan.note}</p>
                </div>
                <Link to="/signup" className={`mt-7 w-full ${plan.featured ? "btn-primary" : "btn-secondary"}`}>Get started</Link>
                <div className="mt-7 space-y-3">
                  {plan.features.map((feature) => (
                    <p className="flex items-center gap-2 text-sm text-slate-600" key={feature}><Check size={15} className="text-teal-600" /> {feature}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Loved by teams" title="Creators move faster with clarity" />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["AmplifAI turned our one-person content team into a real publishing engine.", "Nina Park", "Founder, Grove"],
              ["The repurpose workflow keeps our brand voice consistent across every launch.", "Sam Roy", "Growth Lead, Orbit"],
              ["We stopped guessing what to post next. The analytics actually guide creative.", "Elena Cruz", "Creator, Field Notes"],
            ].map(([quote, name, title]) => (
              <blockquote className="panel" key={name}>
                <p className="text-sm leading-7 text-slate-700">"{quote}"</p>
                <footer className="mt-6">
                  <p className="text-sm font-semibold text-midnight">{name}</p>
                  <p className="text-xs text-slate-500">{title}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-line bg-white/75 px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 md:flex-row md:items-center">
          <Brand />
          <div className="flex flex-wrap gap-6 text-sm text-slate-500">
            <a href="#features">Product</a><a href="#pricing">Pricing</a><a href="#">Security</a><a href="#">Resources</a><a href="#">Privacy</a>
          </div>
          <p className="text-xs text-slate-400">(c) 2026 AmplifAI Inc.</p>
        </div>
      </footer>
    </div>
  );
}
