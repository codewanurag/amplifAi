import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Compass,
  FileText,
  FlaskConical,
  FolderOpen,
  Hash,
  Home,
  Layers3,
  Lightbulb,
  Menu,
  Plus,
  Search,
  Settings,
  Sparkles,
  UserRound,
  Wand2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Brand, Notice, Panel } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { useWorkspace } from "../context/WorkspaceContext";
import { contentService } from "../services/contentService";
import { paymentService } from "../services/paymentService";

const homeItem = { label: "Home", to: "/app", icon: Home, end: true };
const repurposeItem = { label: "Repurpose", to: "/app/repurpose", icon: Layers3 };

const workflowGroups = [
  {
    title: "Create",
    icon: Sparkles,
    items: [
      { label: "Ideas", to: "/app/ideas", icon: Lightbulb },
      { label: "Scripts", to: "/app/scripts", icon: FileText },
      { label: "Captions", to: "/app/captions", icon: Wand2 },
      { label: "Hashtags", to: "/app/hashtags", icon: Hash },
    ],
  },
  {
    title: "Plan",
    icon: CalendarDays,
    items: [
      { label: "Calendar", to: "/app/calendar", icon: CalendarDays },
      { label: "Best Time", to: "/app/best-time", icon: Clock3 },
    ],
  },
  {
    title: "Measure",
    icon: BarChart3,
    items: [
      { label: "Analytics", to: "/app/analytics", icon: BarChart3 },
      { label: "Insights", to: "/app/insights", icon: Compass },
      { label: "Virality", to: "/app/virality", icon: FlaskConical },
    ],
  },
  {
    title: "Library",
    icon: FolderOpen,
    items: [
      { label: "Drafts", to: "/app/drafts", icon: FolderOpen },
      { label: "Brand Memory", to: "/app/brand", icon: Sparkles },
    ],
  },
];

function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen, onUpgrade, onLogout, user, workspace }) {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState(["Create"]);

  useEffect(() => {
    const currentGroup = workflowGroups.find((group) => group.items.some((item) => item.to === location.pathname));
    if (currentGroup) {
      setOpenGroups((current) => (current.includes(currentGroup.title) ? current : [...current, currentGroup.title]));
    }
  }, [location.pathname]);

  const toggleGroup = (title) => {
    if (collapsed) {
      setCollapsed(false);
      setOpenGroups([title]);
      return;
    }
    setOpenGroups((current) => (current.includes(title) ? current.filter((item) => item !== title) : [...current, title]));
  };

  const navItem = ({ label, to, icon: Icon, end }, nested = false) => (
    <NavLink
      key={to}
      to={to}
      end={end}
      title={collapsed ? label : undefined}
      onClick={() => setMobileOpen(false)}
      className={({ isActive }) =>
        `group relative flex items-center rounded-xl py-2.5 text-sm transition duration-200 ${
          collapsed ? "justify-center px-3" : nested ? "gap-3 pl-10 pr-3" : "gap-3 px-3"
        } ${isActive ? "border border-cyanBrand/15 bg-cyanBrand/[0.07] font-semibold text-midnight shadow-sm" : "border border-transparent text-slate-600 hover:border-line hover:bg-canvas/80 hover:text-midnight"}`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && <span className="absolute left-0 h-6 w-1 rounded-r-full bg-cyanBrand" />}
          <Icon size={18} className={`shrink-0 ${isActive ? "text-cyan-700" : ""}`} />
          {!collapsed && <span>{label}</span>}
        </>
      )}
    </NavLink>
  );

  const inner = (
    <div className="flex h-full flex-col border-r border-line/80 bg-white/80 text-charcoal backdrop-blur-xl">
      <div className={`flex h-20 items-center border-b border-line/80 px-4 ${collapsed ? "justify-center" : "justify-between"}`}>
        <Brand compact={collapsed} />
        {!collapsed && (
          <button aria-label="Collapse sidebar" className="hidden rounded-lg p-2 text-slate-400 hover:bg-canvas hover:text-midnight lg:block" onClick={() => setCollapsed(true)}>
            <ChevronLeft size={17} />
          </button>
        )}
      </div>
      {collapsed && (
        <button aria-label="Expand sidebar" className="mx-auto mt-3 hidden rounded-lg p-2 text-slate-400 hover:bg-canvas hover:text-midnight lg:block" onClick={() => setCollapsed(false)}>
          <ChevronRight size={17} />
        </button>
      )}
      <div className="sidebar-scroll flex-1 overflow-y-auto px-3 py-5">
        {!collapsed && (
          <NavLink to="/app/ideas" className="mb-7 flex items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-3 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyanBrand/20 transition hover:-translate-y-0.5 hover:shadow-glow">
            <Sparkles size={16} /> Create with AI
          </NavLink>
        )}
        <p className={`mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 ${collapsed ? "sr-only" : ""}`}>Workspace</p>
        <div className="space-y-1">{navItem(homeItem)}</div>
        <div className="my-3 h-px bg-line/70" />
        {workflowGroups.map((group, index) => {
          const open = openGroups.includes(group.title);
          const active = group.items.some((item) => item.to === location.pathname);
          const GroupIcon = group.icon;
          return (
            <div className="mb-1" key={group.title}>
              <button
                className={`flex w-full items-center rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                  active ? "border-cyanBrand/10 bg-cyanBrand/[0.045] text-midnight" : "border-transparent text-slate-600 hover:border-line hover:bg-canvas"
                } ${collapsed ? "justify-center" : "gap-3"}`}
                onClick={() => toggleGroup(group.title)}
                title={collapsed ? group.title : undefined}
                type="button"
              >
                <GroupIcon size={18} className={active ? "text-cyan-700" : "text-slate-500"} />
                {!collapsed && <span className="flex-1 text-left">{group.title}</span>}
                {!collapsed && <ChevronDown size={15} className={`text-slate-400 transition ${open ? "rotate-180" : ""}`} />}
              </button>
              <AnimatePresence initial={false}>
                {open && !collapsed && (
                  <motion.div
                    className="mt-1 space-y-1 overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {group.items.map((item) => navItem(item, true))}
                  </motion.div>
                )}
              </AnimatePresence>
              {index === 0 && <div className="my-1">{navItem(repurposeItem)}</div>}
            </div>
          );
        })}
      </div>
      <div className="border-t border-line/80 p-3">
        {!collapsed && (
          <div className="mb-3 rounded-2xl border border-cyanBrand/15 bg-gradient-to-br from-cyanBrand/[0.07] to-electric/[0.05] p-3.5">
            <span className="mb-2 inline-flex rounded-full bg-white/75 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-700">Pro plan</span>
            <p className="text-sm font-semibold text-midnight">AmplifAI Pro</p>
            <p className="mt-1 text-xs text-slate-500">Unlock predictive analytics</p>
            <button onClick={onUpgrade} type="button" className="mt-3 w-full rounded-lg border border-line bg-white/90 py-2 text-xs font-semibold text-midnight shadow-sm hover:border-cyanBrand/20 hover:text-cyan-700">Upgrade workspace</button>
          </div>
        )}
        <NavLink
          to="/app/settings"
          className={`flex items-center rounded-xl p-2.5 text-sm text-slate-600 hover:bg-canvas hover:text-midnight ${collapsed ? "justify-center" : "gap-3"}`}
        >
          <Settings size={18} /> {!collapsed && "Settings"}
        </NavLink>
        {!collapsed && (
          <div className="mt-2 flex items-center gap-3 rounded-xl p-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white shadow-glow">AK</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-midnight">{user?.name || "Creator"}</p>
              <p className="truncate text-xs text-slate-500">{workspace?.name || "Workspace"}</p>
            </div>
            <ChevronDown size={15} className="text-slate-400" />
          </div>
        )}
        {!collapsed && <button type="button" onClick={onLogout} className="mt-2 w-full rounded-xl p-2 text-left text-xs font-semibold text-slate-500 hover:bg-canvas hover:text-midnight">Log out</button>}
      </div>
    </div>
  );

  return (
    <>
      <aside className={`hidden shrink-0 transition-all duration-300 lg:block ${collapsed ? "w-[76px]" : "w-[272px]"}`}>{inner}</aside>
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-midnight/30 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />
            <motion.aside className="fixed inset-y-0 left-0 z-50 w-[278px] lg:hidden" initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}>
              <button aria-label="Close navigation menu" className="absolute right-3 top-5 z-10 rounded-lg p-2 text-slate-400 hover:bg-canvas hover:text-midnight" onClick={() => setMobileOpen(false)}>
                <X size={18} />
              </button>
              {inner}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Topbar({ onMenu, onActivity, onSwitchWorkspace, workspaces, workspace }) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-line/80 bg-white/[0.82] px-4 shadow-[0_10px_34px_-28px_rgba(7,19,34,.32)] backdrop-blur-xl sm:px-7">
      <button aria-label="Open navigation menu" className="rounded-xl border border-line bg-white p-2.5 text-slate-600 shadow-sm lg:hidden" onClick={onMenu}>
        <Menu size={19} />
      </button>
      <label className="hidden items-center gap-2 rounded-xl border border-line bg-white/90 px-3.5 py-2.5 text-sm font-medium text-slate-700 shadow-sm sm:flex">
        <select className="bg-transparent outline-none" onChange={(event) => onSwitchWorkspace(event.target.value)} value={workspace?._id || ""}>
          {workspaces.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
        </select>
        <ChevronDown size={15} className="text-slate-400" />
      </label>
      <div className="mx-auto hidden max-w-md flex-1 md:block">
        <label className="relative block">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="input bg-white/75 py-2.5 pl-10 pr-16 shadow-sm" placeholder="Search drafts, campaigns..." />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-line bg-canvas px-2 py-1 text-[10px] font-semibold text-slate-400">Ctrl K</span>
        </label>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <NavLink to="/app/ideas" className="hidden items-center gap-2 rounded-xl border border-cyanBrand/15 bg-cyanBrand/[0.06] px-3.5 py-2.5 text-sm font-semibold text-cyan-700 transition hover:border-cyanBrand/30 hover:bg-cyanBrand/10 sm:flex">
          <Sparkles size={16} /> Ask AI
        </NavLink>
        <NavLink to="/app/ideas" className="btn-primary px-3 py-2.5 sm:px-4">
          <Plus size={17} /> <span className="hidden sm:inline">Create</span>
        </NavLink>
        <button onClick={onActivity} type="button" aria-label="View notifications" className="relative rounded-xl border border-line bg-white p-2.5 text-slate-600 shadow-sm hover:border-cyanBrand/30">
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-coral ring-2 ring-white" />
        </button>
        <NavLink to="/app/settings" title="Profile settings" aria-label="Open user profile" className="hidden h-10 w-10 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white shadow-glow sm:grid">
          <UserRound size={18} />
        </NavLink>
      </div>
    </header>
  );
}

export default function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const auth = useAuth();
  const workspace = useWorkspace();
  const navigate = useNavigate();

  async function logout() {
    await auth.logout();
    navigate("/login");
  }

  async function openActivity() {
    setActivityOpen(true);
    try {
      setActivities(await contentService.getActivities());
    } catch (error) {
      setFeedback({ tone: "error", message: error.message });
    }
  }

  async function upgrade() {
    try {
      await paymentService.checkout("Pro", auth.user);
      setFeedback({ tone: "success", message: "Your Pro plan is active." });
    } catch (error) {
      setFeedback({ tone: "error", message: error.message });
    }
  }

  async function switchWorkspace(id) {
    try {
      await workspace.switchTo(id);
      setFeedback({ tone: "success", message: "Workspace switched." });
    } catch (error) {
      setFeedback({ tone: "error", message: error.message });
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-canvas text-charcoal">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} onUpgrade={upgrade} onLogout={logout} user={auth.user} workspace={workspace.current} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setMobileOpen(true)} onActivity={openActivity} onSwitchWorkspace={switchWorkspace} workspaces={workspace.workspaces} workspace={workspace.current} />
        <main className="scrollbar-hidden flex-1 overflow-y-auto bg-[radial-gradient(circle_at_88%_0%,rgba(37,99,235,.055),transparent_26rem)] px-4 pb-24 pt-6 sm:px-7 sm:pt-7 lg:pb-7">
          <Notice message={feedback?.message} tone={feedback?.tone} />
          <Outlet />
        </main>
        <NavLink
          className="btn-primary fixed bottom-5 left-1/2 z-20 w-[calc(100%_-_2rem)] max-w-sm -translate-x-1/2 shadow-xl shadow-electric/20 lg:hidden"
          to="/app/ideas"
        >
          <Sparkles size={16} /> Create with AI
        </NavLink>
      </div>
      <AnimatePresence>
        {activityOpen && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-midnight/20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActivityOpen(false)} />
            <motion.aside className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-sm bg-canvas p-5 shadow-floating" initial={{ x: 420 }} animate={{ x: 0 }} exit={{ x: 420 }}>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-midnight">Recent activity</h2>
                <button type="button" onClick={() => setActivityOpen(false)} aria-label="Close activity"><X size={18} /></button>
              </div>
              <Panel lift={false} className="space-y-4">
                {activities.length ? activities.map((entry) => (
                  <div className="border-b border-line pb-4 last:border-0 last:pb-0" key={entry._id}>
                    <p className="text-sm font-semibold text-midnight">{entry.description}</p>
                    <p className="mt-1 text-xs text-slate-500">{new Date(entry.createdAt).toLocaleString()}</p>
                  </div>
                )) : <p className="text-sm text-slate-500">Create or schedule a post to see activity here.</p>}
              </Panel>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
