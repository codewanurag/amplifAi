import { motion } from "framer-motion";
import { AlertCircle, ArrowUpRight, BarChart3, CalendarDays, CheckCircle2, ChevronRight, Heart, Inbox, LoaderCircle, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export function Brand({ dark = false, compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white shadow-lg shadow-cyanBrand/20">
        <Sparkles size={20} />
      </div>
      {!compact && (
        <div>
          <p className={`text-lg font-bold tracking-tight ${dark ? "text-white" : "text-midnight"}`}>AmplifAI</p>
          <p className={`text-[10px] font-medium uppercase tracking-[0.18em] ${dark ? "text-slate-400" : "text-slate-500"}`}>
            Creator intelligence
          </p>
        </div>
      )}
    </div>
  );
}

export function GradientText({ children }) {
  return <span className="bg-brand-gradient bg-clip-text text-transparent">{children}</span>;
}

export function PageTransition({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">{eyebrow}</p>}
        <h2 className="text-2xl font-bold tracking-tight text-midnight sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function AppPageHeader({ badge = "AmplifAI intelligence", title, description, children }) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
      <div>
        <span className="badge mb-3">{badge}</span>
        <h1 className="text-2xl font-bold tracking-[-0.035em] text-midnight md:text-[2rem]">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>
      </div>
      {children && <div className="flex flex-wrap gap-3">{children}</div>}
    </div>
  );
}

export function Panel({ children, className = "", lift = false }) {
  return (
    <motion.div
      className={`panel relative overflow-hidden ${className}`}
      whileHover={lift ? { y: -3 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      {children}
    </motion.div>
  );
}

export function PanelHeader({ title, subtitle, link }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-[15px] font-semibold tracking-tight text-midnight">{title}</h3>
        {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
      </div>
      {link && (
        <button className="flex items-center gap-1 text-xs font-semibold text-electric hover:text-cyan-700">
          {link} <ArrowUpRight size={14} />
        </button>
      )}
    </div>
  );
}

const metricTones = {
  cyan: { rule: "from-cyanBrand to-aqua", text: "text-cyan-700", icon: "bg-cyanBrand/[0.08] text-cyan-700", bar: "bg-cyanBrand" },
  blue: { rule: "from-electric to-cyanBrand", text: "text-electric", icon: "bg-electric/[0.08] text-electric", bar: "bg-electric" },
  teal: { rule: "from-tealBrand to-cyanBrand", text: "text-teal-700", icon: "bg-tealBrand/[0.09] text-teal-700", bar: "bg-tealBrand" },
};

const metricIcons = {
  "Total reach": BarChart3,
  Engagement: Heart,
  "Content score": Sparkles,
  "Posts scheduled": CalendarDays,
  Impressions: BarChart3,
  "Follower growth": TrendingUp,
  "Average watch time": Sparkles,
  Conversions: TrendingUp,
};

const metricTrends = {
  cyan: [34, 42, 48, 44, 58, 72],
  blue: [27, 39, 37, 55, 61, 68],
  teal: [30, 36, 49, 58, 57, 76],
};

export function MetricCard({ label, value, change, tone = "cyan" }) {
  const visual = metricTones[tone] || metricTones.cyan;
  const Icon = metricIcons[label] || TrendingUp;

  return (
    <Panel className="group min-h-[180px]" lift>
      <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${visual.rule}`} />
      <div className="flex items-start justify-between gap-3">
        <div className={`grid h-11 w-11 place-items-center rounded-2xl ${visual.icon}`}>
          <Icon size={20} />
        </div>
        <span className={`inline-flex items-center gap-1 rounded-full border border-line bg-white/70 px-2.5 py-1 text-[11px] font-bold ${visual.text}`}>
          <TrendingUp size={12} /> {change}
        </span>
      </div>
      <p className="mt-5 text-sm font-medium text-slate-500">{label}</p>
      <div className="mt-1 flex items-end justify-between gap-3">
        <p className="text-[2rem] font-bold tracking-[-0.045em] text-midnight">{value}</p>
        <div className="mb-2 flex h-8 items-end gap-1">
          {(metricTrends[tone] || metricTrends.cyan).map((height, index) => (
            <span key={index} className={`w-1 rounded-full ${visual.bar}`} style={{ height: `${height}%`, opacity: index < 4 ? 0.32 : 0.75 }} />
          ))}
        </div>
      </div>
      <p className="mt-1 text-[11px] font-medium text-slate-400">vs previous 30 days</p>
    </Panel>
  );
}

export function StatusPill({ children }) {
  const tone =
    children === "Ready" || children === "Scheduled"
      ? "bg-tealBrand/10 text-teal-700"
      : children === "Review"
        ? "bg-electric/10 text-electric"
        : "bg-slate-100 text-slate-600";
  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${tone}`}>{children}</span>;
}

export function PlatformMark({ name, size = "xs" }) {
  const dimensions = size === "md" ? "h-11 w-11 rounded-xl" : "h-5 w-5 rounded-md";
  const iconSize = size === "md" ? 22 : 12;

  if (name === "Instagram") {
    return (
      <span
        className={`grid shrink-0 place-items-center text-white ${dimensions}`}
        style={{ background: "radial-gradient(circle at 28% 108%, #FEDA75 0%, #FA7E1E 23%, #D62976 52%, #962FBF 72%, #4F5BD5 100%)" }}
      >
        <svg aria-hidden="true" fill="none" height={iconSize} viewBox="0 0 24 24" width={iconSize}>
          <rect height="15.5" rx="4.4" stroke="currentColor" strokeWidth="1.9" width="15.5" x="4.25" y="4.25" />
          <circle cx="12" cy="12" r="3.35" stroke="currentColor" strokeWidth="1.9" />
          <circle cx="16.85" cy="7.3" fill="currentColor" r="1.05" />
        </svg>
      </span>
    );
  }

  if (name === "YouTube" || name === "YouTube Shorts") {
    return (
      <span className={`grid shrink-0 place-items-center ${dimensions}`}>
        <svg aria-hidden="true" height={size === "md" ? 30 : 18} viewBox="0 0 24 24" width={size === "md" ? 34 : 20}>
          <rect fill="#FF0033" height="15" rx="4.4" width="22" x="1" y="4.5" />
          <path d="m10 15.2 5-3.2-5-3.2v6.4Z" fill="#FFFFFF" />
        </svg>
      </span>
    );
  }

  if (name === "LinkedIn") {
    return (
      <span className={`grid shrink-0 place-items-center bg-[#0A66C2] text-white ${dimensions}`}>
        <svg aria-hidden="true" fill="currentColor" height={iconSize} viewBox="0 0 24 24" width={iconSize}>
          <path d="M7.12 9.33H3.86V20h3.26V9.33ZM5.47 4A1.92 1.92 0 1 0 5.5 7.84 1.92 1.92 0 0 0 5.47 4ZM20 13.88c0-3.22-1.72-4.72-4.02-4.72-1.86 0-2.69 1.02-3.16 1.74V9.33H9.57V20h3.25v-5.28c0-1.39.26-2.73 1.99-2.73 1.7 0 1.72 1.59 1.72 2.82V20h3.26L20 13.88Z" />
        </svg>
      </span>
    );
  }

  if (name === "X / Twitter" || name === "X") {
    return (
      <span className={`grid shrink-0 place-items-center bg-[#111827] text-white ${dimensions}`}>
        <span className={`${size === "md" ? "text-lg" : "text-[11px]"} font-semibold leading-none`}>X</span>
      </span>
    );
  }

  return null;
}

export function PlatformBadge({ name }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-line bg-canvas/75 px-1.5 py-1 text-[11px] font-semibold text-slate-600">
      <PlatformMark name={name} />
      {name}
    </span>
  );
}

const workflowSteps = [
  { name: "Idea", to: "/app/ideas" },
  { name: "Script", to: "/app/scripts" },
  { name: "Repurpose", to: "/app/repurpose" },
  { name: "Schedule", to: "/app/calendar" },
];

export function WorkflowBar({ active }) {
  return (
    <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-line bg-white/60 p-3 sm:flex-row sm:items-center sm:px-4">
      <p className="card-kicker shrink-0">Creative workflow</p>
      <div className="scrollbar-hidden flex min-w-0 items-center gap-1 overflow-x-auto">
        {workflowSteps.map((step, index) => (
          <div className="flex items-center" key={step.name}>
            <Link
              className={`whitespace-nowrap rounded-xl px-3 py-2 text-xs font-semibold transition ${
                active === step.name ? "bg-cyanBrand/[0.09] text-cyan-700" : "text-slate-500 hover:bg-canvas hover:text-midnight"
              }`}
              to={step.to}
            >
              {step.name}
            </Link>
            {index < workflowSteps.length - 1 && <ChevronRight size={13} className="text-slate-300" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Progress({ value, color = "bg-brand-gradient" }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}

export function LoadingState({ rows = 3 }) {
  return (
    <Panel className="flex min-h-48 flex-col justify-center gap-4">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
        <LoaderCircle className="animate-spin text-cyanBrand" size={17} /> AmplifAI is preparing insights
      </div>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="h-10 animate-pulse rounded-xl bg-slate-100/70" />
      ))}
    </Panel>
  );
}

export function Notice({ message, tone = "success" }) {
  if (!message) return null;
  const success = tone === "success";
  const Icon = success ? CheckCircle2 : AlertCircle;
  return (
    <div className={`mb-5 flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${success ? "border-tealBrand/20 bg-tealBrand/[0.07] text-teal-700" : "border-coral/20 bg-coral/[0.06] text-rose-700"}`}>
      <Icon className="mt-0.5 shrink-0" size={16} /> {message}
    </div>
  );
}

export function ErrorState({ error, title = "Unable to load this workspace" }) {
  return (
    <Panel className="border-coral/20">
      <p className="font-semibold text-midnight">{title}</p>
      <p className="mt-2 text-sm text-slate-500">{error?.message || "Check your connection and try again."}</p>
    </Panel>
  );
}

export function EmptyState({ title = "Create your first campaign from one idea.", description = "AmplifAI will guide it from generation through scheduling.", compact = false, actionLabel, actionTo }) {
  return (
    <div className={`grid place-items-center rounded-2xl border border-dashed border-line bg-canvas/70 text-center ${compact ? "min-h-28 p-3" : "min-h-48 p-8"}`}>
      <div>
        <Inbox className="mx-auto mb-3 text-slate-300" />
        <p className="font-semibold text-midnight">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
        {actionLabel && actionTo && <Link className="btn-primary mt-5 py-2.5" to={actionTo}>{actionLabel}</Link>}
      </div>
    </div>
  );
}
