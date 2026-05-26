import { useState } from "react";
import { ArrowRight, Copy, Hash, RefreshCcw, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { AppPageHeader, ErrorState, LoadingState, Notice, Panel, PanelHeader, PageTransition, PlatformBadge, Progress, WorkflowBar } from "../components/ui";
import { useMockQuery } from "../hooks/useMockQuery";
import { contentService } from "../services/contentService";
import { aiService } from "../services/aiService";
import { postService } from "../services/postService";

function GenerateForm({ fields, button = "Generate ideas", onAction }) {
  function submit(event) {
    event.preventDefault();
    onAction?.(Object.fromEntries(new FormData(event.currentTarget).entries()));
  }

  return (
    <Panel>
      <PanelHeader title="Creative brief" subtitle="Guide the AI with focused context" />
      <form className="space-y-4" onSubmit={submit}>
        {fields.map((field) => (
          <div key={field.label}>
            <label className="label">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea className="input min-h-28 resize-none" defaultValue={field.value} name={field.name || field.label} />
            ) : (
              <select className="input" defaultValue={field.value} name={field.name || field.label}>
                {field.options.map((choice) => <option key={choice}>{choice}</option>)}
              </select>
            )}
          </div>
        ))}
        <button type="submit" className="btn-primary w-full"><Sparkles size={16} /> {button}</button>
      </form>
    </Panel>
  );
}

export function IdeaGeneratorPage() {
  const [brief, setBrief] = useState({ niche: "Startup & SaaS", audience: "Founders and marketers", goal: "Build authority", platform: "Instagram" });
  const [revision, setRevision] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const { data, loading, error } = useMockQuery(() => contentService.getIdeas(brief), [revision]);

  async function saveIdeas() {
    try {
      await Promise.all(data.map((idea) => postService.create({ title: idea.title, caption: idea.hook, platform: brief.platform, contentType: idea.format, aiScore: idea.score, status: "Draft" })));
      setFeedback({ tone: "success", message: "Generated concepts saved as drafts." });
    } catch (saveError) {
      setFeedback({ tone: "error", message: saveError.message });
    }
  }

  return (
    <PageTransition>
      <AppPageHeader title="AI Content Idea Generator" description="Generate scroll-stopping concepts based on your niche, audience, goal, and target platform." />
      <WorkflowBar active="Idea" />
      <Notice message={feedback?.message} tone={feedback?.tone} />
      <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <GenerateForm
          onAction={(values) => { setBrief(values); setRevision((value) => value + 1); }}
          fields={[
            { name: "niche", label: "Niche", value: "Startup & SaaS", options: ["Startup & SaaS", "Creator economy", "Education"] },
            { name: "audience", label: "Audience", value: "Founders and marketers", options: ["Founders and marketers", "Content creators", "Small business owners"] },
            { name: "goal", label: "Goal", value: "Build authority", options: ["Build authority", "Drive leads", "Boost engagement"] },
            { name: "platform", label: "Platform", value: "Instagram", options: ["Instagram", "LinkedIn", "YouTube Shorts", "X / Twitter"] },
          ]}
        />
        {loading ? <LoadingState /> : error ? <ErrorState error={error} /> : (
          <Panel>
            <div className="mb-5 flex items-start justify-between gap-4">
              <PanelHeader title="Generated concepts" subtitle="Ranked by predicted engagement" />
              <button className="text-xs font-semibold text-electric hover:text-cyan-700" onClick={saveIdeas} type="button">Save all</button>
            </div>
            <div className="space-y-4">
              {data.map((idea, index) => (
                <article className="rounded-xl border border-line bg-white/60 p-4 transition hover:border-cyanBrand/30 hover:shadow-panel" key={idea.title}>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="grid h-7 w-7 place-items-center rounded-lg bg-cyanBrand/10 text-xs font-bold text-cyan-700">0{index + 1}</span>
                      <PlatformBadge name={idea.format} />
                    </div>
                    <span className="text-sm font-bold text-cyan-700">{idea.score}/100</span>
                  </div>
                  <h3 className="font-semibold text-midnight">{idea.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">Hook: "{idea.hook}"</p>
                  <div className="mt-4 flex justify-between gap-3">
                    <div className="max-w-40 flex-1"><Progress value={idea.score} /></div>
                    <Link className="flex items-center gap-1 text-xs font-semibold text-electric" to="/app/scripts">Turn into script <ArrowRight size={12} /></Link>
                  </div>
                </article>
              ))}
            </div>
          </Panel>
        )}
      </div>
    </PageTransition>
  );
}

export function ScriptGeneratorPage() {
  const [brief, setBrief] = useState({});
  const [revision, setRevision] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const { data, loading, error } = useMockQuery(() => contentService.getScripts(brief), [revision]);
  return (
    <PageTransition>
      <AppPageHeader title="AI Script Generator" description="Build paced scripts for reels, shorts, tutorials, or storytelling videos." />
      <WorkflowBar active="Script" />
      <div className="grid gap-5 xl:grid-cols-[360px_1fr]">
        <GenerateForm
          button="Generate scripts"
          onAction={(values) => { setBrief(values); setRevision((value) => value + 1); }}
          fields={[
            { name: "format", label: "Video format", value: "Reel", options: ["Reel", "YouTube Short", "Educational video", "Storytelling"] },
            { name: "duration", label: "Duration", value: "30 seconds", options: ["15 seconds", "30 seconds", "60 seconds"] },
            { name: "content", label: "Core idea", type: "textarea", value: "Show creators how one campaign brief becomes four native posts." },
          ]}
        />
        {loading ? <LoadingState /> : error ? <ErrorState error={error} /> : (
          <div className="space-y-4">
            <Notice message={feedback?.message} tone={feedback?.tone} />
            {data.map((script) => (
              <Panel key={script.title}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex gap-2"><PlatformBadge name={script.format} /><PlatformBadge name={script.duration} /></div>
                    <h3 className="mt-3 font-semibold text-midnight">{script.title}</h3>
                  </div>
                  <button onClick={() => navigator.clipboard.writeText(script.scenes.join("\n")).then(() => setFeedback({ tone: "success", message: "Script copied." }))} type="button" className="btn-secondary py-2"><Copy size={15} /> Copy script</button>
                </div>
                <div className="mt-5 space-y-3">
                  {script.scenes.map((scene, index) => (
                    <div key={scene} className="flex gap-3 rounded-xl border border-line bg-canvas/70 p-3 text-sm">
                      <span className="font-bold text-cyan-700">0{index + 1}</span>
                      <p className="text-slate-700">{scene}</p>
                    </div>
                  ))}
                </div>
                <Link className="btn-primary mt-5 py-2.5" to="/app/repurpose">Repurpose script <ArrowRight size={15} /></Link>
              </Panel>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export function RepurposePage() {
  const [revision, setRevision] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const { data, loading, error } = useMockQuery(() => contentService.repurpose({ content: "How creators can take one customer question and build a week of useful content around it." }), [revision]);
  return (
    <PageTransition>
      <AppPageHeader title="Cross-Platform Repurposing" description="Transform one idea into posts tailored to the rhythm and expectations of each network.">
        <button onClick={() => setRevision((value) => value + 1)} type="button" className="btn-primary"><RefreshCcw size={16} /> Repurpose again</button>
      </AppPageHeader>
      <WorkflowBar active="Repurpose" />
      <Panel className="mb-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Source idea</p>
        <p className="mt-3 text-sm leading-7 text-slate-700">How creators can take one customer question and build a week of useful content around it.</p>
      </Panel>
      <Notice message={feedback?.message} tone={feedback?.tone} />
      {loading ? <LoadingState /> : error ? <ErrorState error={error} /> : (
        <div className="grid gap-4 lg:grid-cols-2">
          {data.map((post) => (
            <Panel key={post.platform}>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-2"><PlatformBadge name={post.platform} /><PlatformBadge name={post.type} /></div>
                <button onClick={() => navigator.clipboard.writeText(post.content).then(() => setFeedback({ tone: "success", message: `${post.platform} content copied.` }))} type="button" aria-label={`Copy ${post.platform} content`} className="text-slate-400 hover:text-cyan-700"><Copy size={16} /></button>
              </div>
              <p className="min-h-20 text-sm leading-7 text-slate-700">{post.content}</p>
              <Link className="mt-4 flex items-center gap-2 text-xs font-bold text-electric" to="/app/previews">Preview post <ArrowRight size={14} /></Link>
            </Panel>
          ))}
        </div>
      )}
    </PageTransition>
  );
}

export function CaptionGeneratorPage() {
  const [request, setRequest] = useState({ platform: "Instagram", description: "A reel showing how a creator turns one insight into a full week of content." });
  const [revision, setRevision] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const { data: captions, loading, error } = useMockQuery(() => aiService.captions(request), [revision]);
  return (
    <PageTransition>
      <AppPageHeader title="AI Caption Generator" description="Write captions designed for clarity, emotion, calls to action, or viral momentum." />
      <Notice message={feedback?.message} tone={feedback?.tone} />
      <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <GenerateForm
          button="Generate captions"
          onAction={(values) => { setRequest(values); setRevision((value) => value + 1); }}
          fields={[
            { name: "platform", label: "Platform", value: "Instagram", options: ["Instagram", "LinkedIn", "X / Twitter", "TikTok", "Facebook"] },
            { name: "description", label: "Content description", type: "textarea", value: request.description },
          ]}
        />
        {loading ? <LoadingState /> : error ? <ErrorState error={error} /> : <Panel>
          <PanelHeader title="Caption variations" subtitle="Four tones ready to personalize" />
          <div className="space-y-3">
            {captions.map((caption) => (
              <div className="rounded-xl border border-line bg-white/60 p-4" key={caption.type}>
                <div className="mb-2 flex justify-between">
                  <PlatformBadge name={caption.type} />
                  <button type="button" onClick={() => navigator.clipboard.writeText(caption.content).then(() => setFeedback({ tone: "success", message: "Caption copied." }))}><Copy size={15} className="text-slate-400" /></button>
                </div>
                <p className="text-sm leading-6 text-slate-700">{caption.content}</p>
              </div>
            ))}
          </div>
        </Panel>}
      </div>
    </PageTransition>
  );
}

export function HashtagGeneratorPage() {
  const [request, setRequest] = useState({ niche: "Creator economy", platform: "Instagram" });
  const [revision, setRevision] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const { data: sets, loading, error } = useMockQuery(() => aiService.hashtags(request), [revision]);
  return (
    <PageTransition>
      <AppPageHeader title="AI Hashtag Generator" description="Mix specialized relevance with discoverability using grouped hashtag recommendations." />
      <Notice message={feedback?.message} tone={feedback?.tone} />
      <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <GenerateForm
          button="Suggest hashtags"
          onAction={(values) => { setRequest(values); setRevision((value) => value + 1); }}
          fields={[
            { name: "niche", label: "Niche", value: "Creator economy", options: ["Creator economy", "Startup & SaaS", "Marketing"] },
            { name: "platform", label: "Platform", value: "Instagram", options: ["Instagram", "LinkedIn", "YouTube", "TikTok", "Facebook"] },
          ]}
        />
        {loading ? <LoadingState /> : error ? <ErrorState error={error} /> : <Panel>
          <div className="flex justify-between gap-4">
            <PanelHeader title="Recommended groups" subtitle="Balanced for relevance and reach" />
            <button type="button" onClick={() => navigator.clipboard.writeText(sets.flatMap((set) => set.tags).join(" ")).then(() => setFeedback({ tone: "success", message: "Hashtags copied." }))} className="text-xs font-semibold text-electric">Copy all</button>
          </div>
          <div className="space-y-4">
            {sets.map((set) => (
              <div className="rounded-xl border border-line bg-canvas/60 p-4" key={set.name}>
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-midnight"><Hash size={15} className="text-cyan-700" /> {set.name} hashtags</p>
                <div className="flex flex-wrap gap-2">
                  {set.tags.map((tag) => <span key={tag} className="rounded-lg border border-cyanBrand/10 bg-white/80 px-3 py-2 text-sm text-cyan-700 shadow-sm">{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Panel>}
      </div>
    </PageTransition>
  );
}

export function ViralityAnalyzerPage() {
  const [content, setContent] = useState("Creators: stop producing every post from scratch. Here is the simple workflow that made our content calendar finally sustainable.");
  const [analysis, setAnalysis] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [busy, setBusy] = useState(false);
  const scores = analysis ? Object.entries(analysis.metrics).map(([label, score]) => ({ label: label.replace(/([A-Z])/g, " $1"), score })) : [];

  async function analyze() {
    setBusy(true);
    try {
      setAnalysis(await aiService.score(content));
    } catch (error) {
      setFeedback({ tone: "error", message: error.message });
    } finally {
      setBusy(false);
    }
  }

  async function improve() {
    setBusy(true);
    try {
      const result = await aiService.improve(content);
      setContent(result.content);
      setFeedback({ tone: "success", message: result.reason });
    } catch (error) {
      setFeedback({ tone: "error", message: error.message });
    } finally {
      setBusy(false);
    }
  }
  return (
    <PageTransition>
      <AppPageHeader title="Virality Analyzer" description="Score a draft against the signals that encourage viewers to stop, watch, and respond." />
      <Notice message={feedback?.message} tone={feedback?.tone} />
      <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
        <Panel>
          <label className="label">Content to analyze</label>
          <textarea className="input min-h-48 resize-none" value={content} onChange={(event) => setContent(event.target.value)} />
          <div className="mt-4 flex flex-wrap gap-3">
            <button disabled={busy} type="button" onClick={analyze} className="btn-primary disabled:opacity-60"><Sparkles size={16} /> {busy ? "Analyzing..." : "Analyze potential"}</button>
            <button disabled={busy} type="button" onClick={improve} className="btn-secondary disabled:opacity-60">Improve with AI</button>
          </div>
          <div className="mt-6 rounded-xl border border-cyanBrand/15 bg-cyanBrand/5 p-4">
            <p className="text-sm font-semibold text-midnight">AI recommendation</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{analysis?.recommendation || "Analyze your draft to receive a concrete improvement recommendation."}</p>
          </div>
        </Panel>
        <Panel>
          <div className="mx-auto mb-7 grid h-32 w-32 place-items-center rounded-full border-[10px] border-cyanBrand/15 border-t-cyanBrand text-center">
            <div><p className="text-3xl font-bold text-midnight">{analysis?.score || "--"}</p><p className="text-[11px] text-slate-500">Viral score</p></div>
          </div>
          <div className="space-y-4">
            {scores.length ? scores.map(({ label, score }) => (
              <div key={label}>
                <div className="mb-2 flex justify-between text-xs"><span className="font-semibold text-slate-600">{label}</span><span className="font-bold text-cyan-700">{score}</span></div>
                <Progress value={score} />
              </div>
            )) : <p className="text-sm text-slate-500">Run the analysis to view score details.</p>}
          </div>
        </Panel>
      </div>
    </PageTransition>
  );
}
