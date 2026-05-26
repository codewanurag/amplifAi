import { BookOpen, Check, Edit3, FolderOpen, Plus, Save, Sparkles, ThumbsUp } from "lucide-react";
import { Bookmark, CalendarPlus, CreditCard, Heart, LogOut, MessageCircle, MoreHorizontal, Play, Send, Share2, Trash2, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppPageHeader, EmptyState, ErrorState, LoadingState, Notice, Panel, PanelHeader, PageTransition, PlatformBadge, PlatformMark, Progress, StatusPill } from "../components/ui";
import { useMockQuery } from "../hooks/useMockQuery";
import { contentService } from "../services/contentService";
import { aiService } from "../services/aiService";
import { postService } from "../services/postService";
import { uploadService } from "../services/uploadService";
import { paymentService } from "../services/paymentService";
import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useWorkspace } from "../context/WorkspaceContext";

function InstagramPreview() {
  return (
    <motion.div className="overflow-hidden rounded-2xl border border-line/80 bg-white/80 shadow-sm" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <div className="flex items-center justify-between p-3 text-xs font-semibold">
        <div className="flex items-center gap-2">
          <PlatformMark name="Instagram" size="md" />
          <div><p className="text-midnight">amplifai.creator</p><p className="font-normal text-slate-400">Sponsored concept</p></div>
        </div>
        <MoreHorizontal size={15} className="text-slate-400" />
      </div>
      <div className="relative grid aspect-[1.04/1] place-items-center overflow-hidden bg-gradient-to-br from-midnight via-electric to-cyanBrand p-6 text-center text-white">
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-aqua/25 blur-2xl" />
        <span className="absolute left-3 top-3 rounded-full bg-white/15 px-2 py-1 text-[10px] font-semibold backdrop-blur">Carousel 1/5</span>
        <p className="relative text-xl font-bold tracking-tight">Create once.<br />Amplify everywhere.</p>
        <span className="absolute bottom-3 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold backdrop-blur">AI score 94</span>
      </div>
      <div className="p-3">
        <div className="mb-2 flex items-center justify-between text-slate-600">
          <div className="flex gap-3"><Heart size={15} /><MessageCircle size={15} /><Send size={15} /></div>
          <Bookmark size={15} />
        </div>
        <p className="text-xs leading-5 text-slate-600"><strong className="text-midnight">amplifai.creator</strong> Your best idea deserves more than one post. <span className="text-cyan-700">#CreatorWorkflow</span></p>
      </div>
    </motion.div>
  );
}

function LinkedInPreview() {
  return (
    <motion.div className="rounded-2xl border border-line/80 bg-white/80 p-4 shadow-sm" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PlatformMark name="LinkedIn" size="md" />
          <div><p className="text-sm font-semibold text-midnight">AmplifAI</p><p className="text-xs text-slate-400">Creator intelligence platform | 2h</p></div>
        </div>
        <MoreHorizontal size={15} className="text-slate-400" />
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-700">Your strongest idea should not disappear after a single post. We turn one customer insight into an entire, measurable campaign.</p>
      <div className="mt-4 rounded-xl border border-cyanBrand/10 bg-cyanBrand/[0.045] p-3 text-center text-sm font-semibold text-midnight">One brief. Four networks. Clear results.</div>
      <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400"><span className="text-cyan-700">1,204 impressions</span><span>|</span><span>42 comments</span></div>
      <div className="mt-3 flex justify-between border-t border-line pt-3 text-xs text-slate-500"><span>Like</span><span>Comment</span><span>Repost</span><span>Send</span></div>
    </motion.div>
  );
}

function ShortPreview() {
  return (
    <motion.div className="relative mx-auto flex h-[520px] w-full max-w-[292px] flex-col overflow-hidden rounded-[30px] bg-midnight text-white shadow-floating" whileHover={{ y: -4 }} transition={{ duration: 0.22 }}>
      <motion.div className="absolute inset-0 bg-gradient-to-b from-electric/40 via-midnight to-cyan-950" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute left-[-20%] top-[18%] h-48 w-48 rounded-full bg-cyanBrand/35 blur-3xl" animate={{ x: [0, 54, 0], y: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-24 right-[-20%] h-48 w-48 rounded-full bg-electric/30 blur-3xl" animate={{ x: [0, -34, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }} />
      <div className="dot-grid absolute inset-0 opacity-30" />
      <div className="relative flex items-center justify-between p-4">
        <PlatformMark name="YouTube Shorts" size="md" />
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold backdrop-blur"><Volume2 size={12} /> 0:18</div>
      </div>
      <div className="relative flex flex-1 items-center justify-center">
        <motion.button
          aria-label="Play generated short preview"
          className="grid h-16 w-16 place-items-center rounded-full border border-white/25 bg-white/15 text-white shadow-lg backdrop-blur-md"
          animate={{ boxShadow: ["0 0 0 0 rgba(103,232,249,.24)", "0 0 0 15px rgba(103,232,249,0)", "0 0 0 0 rgba(103,232,249,0)"] }}
          transition={{ duration: 2.8, repeat: Infinity }}
          type="button"
        >
          <Play size={25} fill="currentColor" className="ml-1" />
        </motion.button>
      </div>
      <div className="relative p-4">
        <span className="mb-3 inline-flex rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-aqua backdrop-blur">AI captions on</span>
        <p className="text-xl font-bold leading-7">Turn one idea into four posts</p>
        <p className="mt-2 text-xs text-slate-300">@amplifai | Creator Workflow</p>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/20">
          <motion.div className="h-full rounded-full bg-aqua" animate={{ width: ["18%", "74%", "18%"] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} />
        </div>
      </div>
      <div className="absolute bottom-24 right-4 flex flex-col items-center gap-4 text-white/90"><Heart size={19} /><MessageCircle size={19} /><Share2 size={19} /></div>
    </motion.div>
  );
}

function ThreadPreview() {
  return (
    <motion.div className="space-y-4 rounded-2xl border border-line/80 bg-white/80 p-4 shadow-sm" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      {["1/ Your best content idea deserves a system, not a single post.", "2/ Start with the insight. Adapt the format. Preserve the voice.", "3/ Measure what resonates, then compound it next week."].map((text) => (
        <div className="flex gap-3" key={text}>
          <PlatformMark name="X / Twitter" size="md" />
          <div><p className="text-xs font-semibold text-midnight">AmplifAI <span className="font-normal text-slate-400">@amplifai | 2h</span></p><p className="mt-1 text-sm leading-6 text-slate-700">{text}</p></div>
        </div>
      ))}
    </motion.div>
  );
}

export function PlatformPreviewPage() {
  const [selected, setSelected] = useState("YouTube Shorts");
  const [feedback, setFeedback] = useState(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function scheduleCampaign() {
    setBusy(true);
    try {
      await postService.create({
        title: "Turn one idea into four posts",
        caption: "Your strongest idea deserves a system, not a single post.",
        platform: selected,
        contentType: selected === "YouTube Shorts" ? "Video" : "Post",
        status: "Scheduled",
        scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        aiScore: 92,
        engagementPrediction: 18,
      });
      setFeedback({ tone: "success", message: `${selected} post scheduled for tomorrow.` });
    } catch (error) {
      setFeedback({ tone: "error", message: error.message });
    } finally {
      setBusy(false);
    }
  }

  async function upload(event) {
    if (!event.target.files[0]) return;
    setBusy(true);
    try {
      await uploadService.upload(event.target.files[0]);
      setFeedback({ tone: "success", message: "Media uploaded and ready for your post." });
    } catch (error) {
      setFeedback({ tone: "error", message: error.message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageTransition>
      <AppPageHeader title="Platform Preview" description="Review how a campaign appears on each destination before scheduling.">
        <button type="button" onClick={() => navigate("/app/captions")} className="btn-secondary"><Edit3 size={16} /> Edit content</button>
        <label className="btn-secondary cursor-pointer"><Plus size={16} /> Upload media<input accept="image/*,video/*" className="sr-only" onChange={upload} type="file" /></label>
        <button disabled={busy} type="button" onClick={scheduleCampaign} className="btn-primary disabled:opacity-60"><Check size={16} /> {busy ? "Saving..." : "Add to calendar"}</button>
      </AppPageHeader>
      <Notice message={feedback?.message} tone={feedback?.tone} />
      <Panel className="mb-6 flex flex-col justify-between gap-4 border-cyanBrand/10 bg-gradient-to-r from-cyanBrand/[0.045] via-white to-electric/[0.04] sm:flex-row sm:items-center">
        <div>
          <p className="card-kicker">Campaign preview studio</p>
          <p className="mt-2 text-sm font-semibold text-midnight">One idea adapted natively for every feed</p>
          <p className="mt-1 text-xs text-slate-500">AI predicts strongest retention on the short-form video variant.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-white/75 px-3 py-2 text-xs font-semibold text-cyan-700">AI score 92</span>
          <span className="rounded-full bg-tealBrand/10 px-3 py-2 text-xs font-semibold text-teal-700">+18% reach predicted</span>
        </div>
      </Panel>
      <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-line bg-white/60 p-1.5 shadow-sm">
        {["Instagram", "LinkedIn", "YouTube Shorts", "X / Twitter"].map((platform) => (
          <button type="button" onClick={() => setSelected(platform)} className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${platform === selected ? "bg-cyanBrand/[0.09] text-cyan-700 shadow-sm" : "text-slate-600 hover:bg-canvas"}`} key={platform}>
            <PlatformMark name={platform} /> {platform}
          </button>
        ))}
      </div>
      <div className="grid items-start gap-5 md:grid-cols-2 2xl:grid-cols-4">
        <Panel className="h-full !rounded-[26px] !p-4 sm:!p-5">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div><PlatformBadge name="Instagram" /><p className="mt-2 text-sm font-semibold text-midnight">Carousel preview</p></div>
            <span className="rounded-full bg-cyanBrand/[0.07] px-2 py-1 text-[10px] font-bold text-cyan-700">94 score</span>
          </div>
          <InstagramPreview />
        </Panel>
        <Panel className="h-full !rounded-[26px] !p-4 sm:!p-5">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div><PlatformBadge name="LinkedIn" /><p className="mt-2 text-sm font-semibold text-midnight">Thought leadership</p></div>
            <span className="rounded-full bg-tealBrand/10 px-2 py-1 text-[10px] font-bold text-teal-700">Ready</span>
          </div>
          <LinkedInPreview />
        </Panel>
        <Panel className="relative h-full border-cyanBrand/20 bg-[linear-gradient(145deg,rgba(255,255,255,.99),rgba(239,249,253,.92))] !rounded-[26px] !p-4 shadow-[0_22px_58px_-30px_rgba(8,145,178,.32)] sm:!p-5">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-brand-gradient" />
          <div className="mb-4 flex items-start justify-between gap-2">
            <div><PlatformBadge name="YouTube Shorts" /><p className="mt-2 text-sm font-semibold text-midnight">Video preview</p></div>
            <span className="rounded-full bg-cyanBrand/[0.08] px-2 py-1 text-[10px] font-bold text-cyan-700">Best fit</span>
          </div>
          <ShortPreview />
        </Panel>
        <Panel className="h-full !rounded-[26px] !p-4 sm:!p-5">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div><PlatformBadge name="X / Twitter" /><p className="mt-2 text-sm font-semibold text-midnight">Thread preview</p></div>
            <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">3 posts</span>
          </div>
          <ThreadPreview />
        </Panel>
      </div>
    </PageTransition>
  );
}

export function DraftWorkspacePage() {
  const [revision, setRevision] = useState(0);
  const [creating, setCreating] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const { data, loading, error } = useMockQuery(() => contentService.getDrafts(), [revision]);

  async function createDraft(event) {
    event.preventDefault();
    try {
      const values = Object.fromEntries(new FormData(event.currentTarget).entries());
      await postService.create({ ...values, status: "Draft", contentType: "Post" });
      setFeedback({ tone: "success", message: "Draft saved." });
      setCreating(false);
      setRevision((value) => value + 1);
    } catch (saveError) {
      setFeedback({ tone: "error", message: saveError.message });
    }
  }

  async function editDraft(draft) {
    const caption = window.prompt("Edit caption", draft.caption);
    if (caption === null) return;
    try {
      await postService.update(draft._id, { caption });
      setFeedback({ tone: "success", message: "Draft updated." });
      setRevision((value) => value + 1);
    } catch (updateError) {
      setFeedback({ tone: "error", message: updateError.message });
    }
  }

  async function scheduleDraft(draft) {
    const scheduledAt = window.prompt("Schedule time (YYYY-MM-DDTHH:mm)", "2026-05-27T09:00");
    if (!scheduledAt) return;
    try {
      await postService.schedule(draft._id, new Date(scheduledAt).toISOString());
      setFeedback({ tone: "success", message: "Post scheduled." });
      setRevision((value) => value + 1);
    } catch (scheduleError) {
      setFeedback({ tone: "error", message: scheduleError.message });
    }
  }

  async function deleteDraft(draft) {
    if (!window.confirm(`Delete "${draft.title}"? This cannot be undone.`)) return;
    try {
      await postService.remove(draft._id);
      setFeedback({ tone: "success", message: "Draft deleted." });
      setRevision((value) => value + 1);
    } catch (deleteError) {
      setFeedback({ tone: "error", message: deleteError.message });
    }
  }

  return (
    <PageTransition>
      <AppPageHeader title="Draft Workspace" description="Organize campaign folders, edit drafts, and keep every idea ready for publishing.">
        <button type="button" onClick={() => setCreating((current) => !current)} className="btn-primary"><Plus size={16} /> New draft</button>
      </AppPageHeader>
      <Notice message={feedback?.message} tone={feedback?.tone} />
      {creating && (
        <Panel className="mb-5">
          <PanelHeader title="Create draft" subtitle="Save an idea now and schedule it when ready" />
          <form className="grid gap-4 md:grid-cols-2" onSubmit={createDraft}>
            <input className="input" required name="title" placeholder="Post title" />
            <select className="input" name="platform"><option>Instagram</option><option>LinkedIn</option><option>YouTube Shorts</option><option>X / Twitter</option></select>
            <textarea className="input min-h-24 resize-none md:col-span-2" required name="caption" placeholder="Write your caption..." />
            <button className="btn-primary md:col-span-2" type="submit">Save draft</button>
          </form>
        </Panel>
      )}
      <div className="grid gap-5 lg:grid-cols-[250px_1fr]">
        <Panel>
          <PanelHeader title="Folders" />
          {["All drafts", "Q2 Campaign", "Thought Leadership", "Education", "Archived"].map((folder, index) => (
            <div key={folder} className={`mb-1 flex w-full items-center gap-2 rounded-xl px-3 py-3 text-sm ${index === 0 ? "bg-cyanBrand/10 font-semibold text-cyan-700" : "text-slate-600"}`}>
              <FolderOpen size={16} /> {folder}
            </div>
          ))}
        </Panel>
        {loading ? <LoadingState /> : error ? <ErrorState error={error} /> : (
          <Panel>
            <PanelHeader title="Recent drafts" subtitle={`${data.length} active campaigns`} />
            {data.length ? <div className="space-y-3">
              {data.map((draft) => (
                <div key={draft._id} className="flex flex-col gap-4 rounded-xl border border-line bg-white/60 p-4 sm:flex-row sm:items-center">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyanBrand/[0.07] text-cyan-700"><BookOpen size={19} /></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-midnight">{draft.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{draft.platform} | Edited {new Date(draft.updatedAt).toLocaleDateString()}</p>
                  </div>
                  <StatusPill>{draft.status}</StatusPill>
                  <button onClick={() => editDraft(draft)} type="button" className="btn-secondary py-2"><Edit3 size={15} /> Edit</button>
                  <button onClick={() => scheduleDraft(draft)} type="button" className="btn-secondary py-2"><CalendarPlus size={15} /> Schedule</button>
                  <button onClick={() => deleteDraft(draft)} type="button" aria-label="Delete draft" className="rounded-xl border border-coral/15 p-2 text-rose-600 hover:bg-coral/[0.06]"><Trash2 size={16} /></button>
                </div>
              ))}
            </div> : <EmptyState title="Create your first campaign from one idea." description="Drafts you save from the studio appear here." actionLabel="New content idea" actionTo="/app/ideas" />}
          </Panel>
        )}
      </div>
    </PageTransition>
  );
}

export function BrandMemoryPage() {
  const workspace = useWorkspace();
  const [feedback, setFeedback] = useState(null);
  const memories = [
    { label: "Brand voice", value: "Clear, confident, encouraging", strength: 94 },
    { label: "Audience profile", value: "Early-stage founders and lean marketing teams", strength: 88 },
    { label: "Preferred tone", value: "Educational with warm CTAs", strength: 91 },
    { label: "Content style", value: "Outcome-led hooks and useful frameworks", strength: 82 },
  ];
  async function saveMemory() {
    try {
      await workspace.update({ settings: { tone: ["Clear", "Confident", "Encouraging"], audience: "Early-stage founders and lean marketing teams" } });
      setFeedback({ tone: "success", message: "Brand memory saved to this workspace." });
    } catch (error) {
      setFeedback({ tone: "error", message: error.message });
    }
  }
  return (
    <PageTransition>
      <AppPageHeader title="Brand Memory" description="Manage what your AI knows about your voice, audience, niche, and proven creative patterns.">
        <button type="button" onClick={saveMemory} className="btn-primary"><Save size={16} /> Save memory</button>
      </AppPageHeader>
      <Notice message={feedback?.message} tone={feedback?.tone} />
      <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <Panel>
          <PanelHeader title="Active brand profile" subtitle="Used across every AI generation" />
          <div className="space-y-4">
            {memories.map((memory) => (
              <div key={memory.label} className="rounded-xl border border-line bg-white/60 p-4">
                <div className="mb-3 flex justify-between gap-4">
                  <div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">{memory.label}</p><p className="mt-2 text-sm font-medium text-midnight">{memory.value}</p></div>
                  <span className="text-xs font-semibold text-cyan-700">{memory.strength}% learned</span>
                </div>
                <Progress value={memory.strength} />
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="border-cyanBrand/15 bg-gradient-to-br from-cyanBrand/[0.065] via-white to-electric/[0.05]">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-cyanBrand/10 text-cyan-700"><Sparkles size={19} /></div>
          <p className="mt-5 text-lg font-semibold text-midnight">Memory intelligence</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">Your top-performing content uses concise, practical openings. We will prioritize that voice in future captions and scripts.</p>
          <Link to="/app/insights" className="mt-7 inline-flex rounded-xl border border-cyanBrand/15 bg-white/80 px-4 py-3 text-sm font-semibold text-cyan-700 transition hover:bg-cyanBrand/[0.06]">Review past learnings</Link>
        </Panel>
      </div>
    </PageTransition>
  );
}

export function RoastContentPage() {
  const [content, setContent] = useState("We are excited to announce our amazing tool that helps with your social media. Check it out and let us know!");
  const [rewrite, setRewrite] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [busy, setBusy] = useState(false);
  async function roast() {
    setBusy(true);
    try {
      const result = await aiService.improve(content);
      setRewrite(result.content);
      setFeedback({ tone: "success", message: result.reason });
    } catch (error) {
      setFeedback({ tone: "error", message: error.message });
    } finally {
      setBusy(false);
    }
  }
  return (
    <PageTransition>
      <AppPageHeader badge="Constructive AI critique" title="Roast My Content" description="Get honest, useful feedback with specific rewrites that make weak content stronger." />
      <Notice message={feedback?.message} tone={feedback?.tone} />
      <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
        <Panel>
          <label className="label">Paste your content</label>
          <textarea className="input min-h-48 resize-none" value={content} onChange={(event) => setContent(event.target.value)} />
          <button disabled={busy} onClick={roast} type="button" className="btn-primary mt-4 w-full disabled:opacity-60"><Sparkles size={16} /> {busy ? "Analyzing..." : "Roast this draft"}</button>
        </Panel>
        <Panel>
          <PanelHeader title="AI critique" subtitle="Direct, kind, and actionable" />
          <div className="rounded-xl border border-electric/15 bg-electric/[0.045] p-4">
            <p className="text-sm font-semibold text-electric">The honest take</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">"Excited to announce" is doing no work here. The post describes you, not the problem your audience wants solved.</p>
          </div>
          <div className="mt-4 rounded-xl border border-tealBrand/15 bg-tealBrand/[0.05] p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-teal-700"><ThumbsUp size={16} /> Stronger rewrite</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{rewrite || "Run a critique to receive a stronger rewrite for your post."}</p>
          </div>
          <div className="mt-4 flex gap-3">
            <button disabled={!rewrite} onClick={() => setContent(rewrite)} type="button" className="btn-primary flex-1 disabled:opacity-50">Use rewrite</button>
            <button onClick={roast} type="button" className="btn-secondary flex-1">Try another tone</button>
          </div>
        </Panel>
      </div>
    </PageTransition>
  );
}

export function SettingsPage() {
  const auth = useAuth();
  const workspace = useWorkspace();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [busy, setBusy] = useState(false);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    paymentService.subscription().then(({ subscription: result }) => setSubscription(result)).catch((error) => setFeedback({ tone: "error", message: error.message }));
  }, []);

  async function saveSettings(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    setBusy(true);
    try {
      await workspace.update({ name: values.workspaceName, settings: { timezone: values.timezone } });
      const user = await authService.updateProfile({ name: values.profileName });
      auth.setUser(user);
      setFeedback({ tone: "success", message: "Profile and workspace settings saved." });
    } catch (error) {
      setFeedback({ tone: "error", message: error.message });
    } finally {
      setBusy(false);
    }
  }

  async function changePassword(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      await authService.changePassword(values);
      setFeedback({ tone: "success", message: "Password changed successfully." });
      event.currentTarget.reset();
    } catch (error) {
      setFeedback({ tone: "error", message: error.message });
    }
  }

  async function upgrade() {
    try {
      const result = await paymentService.checkout("Pro", auth.user);
      setSubscription(result);
      setFeedback({ tone: "success", message: "Your Pro plan is now active." });
    } catch (error) {
      setFeedback({ tone: "error", message: error.message });
    }
  }

  async function logout() {
    await auth.logout();
    navigate("/login");
  }

  async function createWorkspace(event) {
    event.preventDefault();
    try {
      const created = await workspace.create({ name: new FormData(event.currentTarget).get("name") });
      await workspace.switchTo(created._id);
      setFeedback({ tone: "success", message: "New workspace created and selected." });
      event.currentTarget.reset();
    } catch (error) {
      setFeedback({ tone: "error", message: error.message });
    }
  }

  return (
    <PageTransition>
      <AppPageHeader title="Workspace Settings" description="Manage workspace preferences, notifications, and connected social accounts." />
      <Notice message={feedback?.message} tone={feedback?.tone} />
      <div className="grid gap-5 xl:grid-cols-2">
        <Panel>
          <PanelHeader title="Workspace profile" />
          <form onSubmit={saveSettings}>
            <label className="label">Your name</label>
            <input className="input mb-4" name="profileName" defaultValue={auth.user?.name} required />
            <label className="label">Workspace name</label>
            <input className="input mb-4" name="workspaceName" defaultValue={workspace.current?.name} required />
            <label className="label">Primary timezone</label>
            <select className="input" name="timezone" defaultValue={workspace.current?.settings?.timezone || "Asia/Kolkata (IST)"}><option>Asia/Kolkata (IST)</option><option>America/New_York (EST)</option></select>
            <button disabled={busy} type="submit" className="btn-primary mt-6 disabled:opacity-60">{busy ? "Saving..." : "Save settings"}</button>
          </form>
        </Panel>
        <Panel>
          <PanelHeader title="Connected platforms" subtitle="Sync publishing and analytics access" />
          {["Instagram", "LinkedIn", "YouTube", "X / Twitter"].map((platform) => (
            <div key={platform} className="mb-3 flex items-center justify-between rounded-xl border border-line bg-canvas/70 p-3">
              <PlatformBadge name={platform} />
              <span className="flex items-center gap-2 text-xs font-semibold text-teal-700"><span className="h-2 w-2 rounded-full bg-tealBrand" /> Connected</span>
            </div>
          ))}
          <p className="mt-4 text-xs text-slate-500">Publishing connections require each platform's OAuth credentials. Scheduling is stored safely in AmplifAI meanwhile.</p>
        </Panel>
        <Panel>
          <PanelHeader title="Security" subtitle="Change your account password" />
          <form className="space-y-4" onSubmit={changePassword}>
            <input className="input" type="password" name="currentPassword" placeholder="Current password" required />
            <input className="input" type="password" name="newPassword" minLength={8} placeholder="New password (8+ characters)" required />
            <button type="submit" className="btn-secondary">Change password</button>
          </form>
        </Panel>
        <Panel className="border-cyanBrand/15 bg-gradient-to-br from-cyanBrand/[0.06] via-white to-electric/[0.05]">
          <PanelHeader title="Billing" subtitle="Subscription management through Razorpay" />
          <p className="text-sm text-slate-600">Current plan: <strong className="text-midnight">{subscription?.plan || "Free"}</strong></p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={upgrade} className="btn-primary"><CreditCard size={16} /> Upgrade to Pro</button>
            <button type="button" onClick={logout} className="btn-secondary"><LogOut size={16} /> Log out</button>
          </div>
        </Panel>
        <Panel>
          <PanelHeader title="Workspaces" subtitle="Separate campaigns and analytics by team" />
          <form className="flex gap-3" onSubmit={createWorkspace}>
            <input className="input" name="name" placeholder="New workspace name" required />
            <button className="btn-secondary shrink-0" type="submit"><Plus size={16} /> Create</button>
          </form>
        </Panel>
      </div>
    </PageTransition>
  );
}
