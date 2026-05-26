import { CalendarPlus, Clock3, Filter, Lightbulb, Music2, Sparkles, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ComparisonBars, TrendChart } from "../components/charts";
import { AppPageHeader, EmptyState, ErrorState, LoadingState, MetricCard, Notice, Panel, PanelHeader, PageTransition, PlatformBadge, Progress, StatusPill, WorkflowBar } from "../components/ui";
import { useMockQuery } from "../hooks/useMockQuery";
import { contentService } from "../services/contentService";

export function CalendarPage() {
  const [platformOnly, setPlatformOnly] = useState(false);
  const [view, setView] = useState("Week");
  const [feedback, setFeedback] = useState(null);
  const { data, loading, error } = useMockQuery(() => contentService.getCalendar(), []);
  return (
    <PageTransition>
      <AppPageHeader title="AI Content Calendar" description="Schedule, refine, and review your publishing plan with AI recommendations in context.">
        <button type="button" onClick={() => setPlatformOnly((current) => !current)} className="btn-secondary"><Filter size={15} /> {platformOnly ? "All platforms" : "Instagram only"}</button>
        <Link className="btn-primary" to="/app/drafts"><CalendarPlus size={16} /> Schedule post</Link>
      </AppPageHeader>
      <WorkflowBar active="Schedule" />
      <Notice message={feedback?.message} tone={feedback?.tone} />
      <Panel className="mb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-midnight">May 26 - June 1, 2026</p>
            <p className="mt-1 text-xs text-slate-500">7 posts planned across 4 platforms</p>
          </div>
          <div className="flex rounded-xl bg-canvas p-1 text-sm">
            {["Week", "Month"].map((choice) => <button key={choice} type="button" onClick={() => setView(choice)} className={view === choice ? "rounded-lg bg-white px-4 py-2 font-semibold text-midnight shadow-sm" : "px-4 py-2 text-slate-500"}>{choice}</button>)}
          </div>
        </div>
      </Panel>
      {loading ? <LoadingState rows={5} /> : error ? <ErrorState error={error} /> : (
        <>
          <div className="grid gap-3 md:grid-cols-4 xl:grid-cols-7">
            {data.calendarPosts.map((day) => (
              <div className="min-h-56 rounded-2xl border border-line bg-surface-gradient p-3 shadow-panel" key={day.day}>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">{day.day}</span>
                  <span className="grid h-7 w-7 place-items-center rounded-full text-sm font-semibold text-midnight">{day.date}</span>
                </div>
                {(platformOnly ? day.items.filter((item) => item.platform === "Instagram") : day.items).length ? (platformOnly ? day.items.filter((item) => item.platform === "Instagram") : day.items).map((item) => (
                  <div key={item.title} className="mb-2 rounded-xl border border-cyanBrand/10 bg-cyanBrand/[0.04] p-2.5">
                    <PlatformBadge name={item.platform} />
                    <p className="my-2 text-xs font-semibold leading-4 text-midnight">{item.title}</p>
                    <StatusPill>{item.status}</StatusPill>
                  </div>
                )) : <EmptyState compact title="Open" description="No post scheduled" />}
              </div>
            ))}
          </div>
          <Panel className="mt-5 flex flex-col gap-4 bg-gradient-to-r from-cyanBrand/[0.06] to-electric/[0.05] sm:flex-row sm:items-center">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white"><Sparkles size={19} /></div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-midnight">AI calendar recommendation</p>
              <p className="mt-1 text-sm text-slate-600">Your Thursday Instagram reel overlaps with peak LinkedIn reach. Move the reel to 6:30 PM for an expected 19% engagement lift.</p>
            </div>
            <button type="button" onClick={() => setFeedback({ tone: "success", message: "Open a scheduled draft to apply its optimized publishing time." })} className="btn-primary shrink-0 py-2.5">Apply suggestion</button>
          </Panel>
        </>
      )}
    </PageTransition>
  );
}

export function AnalyticsPage() {
  const [feedback, setFeedback] = useState(null);
  const { data, loading, error } = useMockQuery(() => contentService.getAnalytics(), []);
  if (loading) return <PageTransition><AppPageHeader title="Analytics Dashboard" description="Measuring multi-platform content performance." /><LoadingState rows={5} /></PageTransition>;
  if (error) return <PageTransition><AppPageHeader title="Analytics Dashboard" description="Measuring multi-platform content performance." /><ErrorState error={error} /></PageTransition>;
  const analyticsStats = [
    { label: "Impressions", value: String(data.summary.totalPosts), change: "posts", tone: "cyan" },
    { label: "Follower growth", value: String(data.summary.drafts), change: "drafts", tone: "teal" },
    { label: "Average watch time", value: String(data.summary.scheduled), change: "scheduled", tone: "blue" },
    { label: "Conversions", value: String(data.summary.averageScore), change: "AI score", tone: "blue" },
  ];
  function exportReport() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "amplifai-analytics.json";
    link.click();
    URL.revokeObjectURL(url);
    setFeedback({ tone: "success", message: "Analytics report exported." });
  }
  return (
    <PageTransition>
      <AppPageHeader title="Analytics Dashboard" description="A complete view of engagement, growth, content wins, and AI-explained performance.">
        <span className="btn-secondary">Last 30 days</span>
        <button type="button" onClick={exportReport} className="btn-primary">Export report</button>
      </AppPageHeader>
      <Notice message={feedback?.message} tone={feedback?.tone} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {analyticsStats.map((stat) => <MetricCard key={stat.label} {...stat} />)}
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_.75fr]">
        <Panel>
          <PanelHeader title="Engagement trend" subtitle="Combined interactions across connected channels" />
          <TrendChart values={data.engagementSeries} />
        </Panel>
        <Panel>
          <PanelHeader title="Platform comparison" subtitle="Average engagement rate" />
          <ComparisonBars items={data.platforms} />
        </Panel>
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_.8fr]">
        <Panel>
          <PanelHeader title="Top-performing content" subtitle="Posts driving audience growth" />
          <div className="space-y-3">
            {data.topContent.map((content, index) => (
              <div key={content.title} className="flex items-center gap-4 rounded-xl border border-line bg-white/60 p-3">
                <span className="text-lg font-bold text-slate-300">0{index + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-midnight">{content.title}</p>
                  <PlatformBadge name={content.platform} />
                </div>
                <div className="text-right text-xs"><p className="font-bold text-midnight">{content.views}</p><p className="text-teal-600">{content.engagement}</p></div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="border-cyanBrand/15 bg-gradient-to-br from-cyanBrand/[0.065] via-white to-electric/[0.05]">
          <p className="flex items-center gap-2 text-sm font-semibold text-cyan-700"><Sparkles size={16} /> AI-generated insight</p>
          <p className="mt-5 text-lg font-semibold leading-7 text-midnight">Educational carousel hooks are driving your highest-quality saves.</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">Publish two follow-up posts this week using question-based openings to sustain momentum.</p>
          <Link to="/app/ideas" className="mt-6 inline-flex rounded-xl border border-cyanBrand/15 bg-white/80 px-4 py-2.5 text-sm font-semibold text-cyan-700 transition hover:bg-cyanBrand/[0.06]">Generate follow-ups</Link>
        </Panel>
      </div>
    </PageTransition>
  );
}

export function InsightsPage() {
  const { data, loading, error } = useMockQuery(() => contentService.getInsights(), []);
  return (
    <PageTransition>
      <AppPageHeader title="AI Insights" description="Explanations and next-best actions distilled from your audience and content performance." />
      {loading ? <LoadingState /> : error ? <ErrorState error={error} /> : (
        <div className="grid gap-4 lg:grid-cols-2">
          {data.map((insight) => (
            <Panel key={insight.title}>
              <p className="flex items-center gap-2 text-sm font-semibold text-cyan-700"><Lightbulb size={16} /> {insight.title}</p>
              <p className="mt-5 text-lg font-semibold leading-7 text-midnight">{insight.result}</p>
              <div className="mt-5 rounded-xl border border-line bg-canvas/70 p-3 text-sm text-slate-600">
                <strong className="mr-2 text-midnight">Next step:</strong>{insight.action}
              </div>
            </Panel>
          ))}
        </div>
      )}
    </PageTransition>
  );
}

export function TrendsPage() {
  const [revision, setRevision] = useState(0);
  const { data, loading, error } = useMockQuery(() => contentService.getTrends(), [revision]);
  return (
    <PageTransition>
      <AppPageHeader title="Trending Audio Recommendations" description="Discover audio styles matched to your content mood, niche, and target platform.">
        <button type="button" onClick={() => setRevision((value) => value + 1)} className="btn-primary"><Music2 size={16} /> Scan trends</button>
      </AppPageHeader>
      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <Panel className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-brand-gradient" />
          <PanelHeader title="Filters" subtitle="Fine-tune recommendations" />
          <label className="label">Content mood</label>
          <select className="input mb-4"><option>Educational</option><option>Energetic</option><option>Storytelling</option></select>
          <label className="label">Platform</label>
          <select className="input mb-4"><option>Instagram</option><option>YouTube Shorts</option></select>
          <label className="label">Niche</label>
          <select className="input"><option>Creator economy</option><option>Startup & SaaS</option></select>
        </Panel>
        {loading ? <LoadingState /> : error ? <ErrorState error={error} /> : (
          <Panel className="relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-brand-gradient" />
            <PanelHeader title="Suggested audio styles" subtitle="Updated from trend velocity signals" />
            <div className="space-y-3">
              {data.map((audio, index) => (
                <div key={audio.style} className="flex flex-col gap-4 rounded-xl border border-line bg-white/70 p-4 transition hover:border-cyanBrand/20 hover:shadow-panel sm:flex-row sm:items-center">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cyanBrand/[0.08] text-cyan-700"><Music2 size={20} /></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-midnight">{audio.style}</p>
                    <div className="mt-2 flex gap-2"><PlatformBadge name={audio.mood} /><PlatformBadge name={audio.platform} /></div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-teal-600"><TrendingUp size={14} /> {audio.velocity}</span>
                  <Link to="/app/repurpose" className="btn-secondary py-2">Use style</Link>
                </div>
              ))}
            </div>
          </Panel>
        )}
      </div>
    </PageTransition>
  );
}

export function BestTimePage() {
  const { data, loading, error } = useMockQuery(() => contentService.getBestTimes(), []);
  return (
    <PageTransition>
      <AppPageHeader title="Best Time to Post" description="AI-recommended publishing windows informed by audience activity and past engagement." />
      {loading ? <LoadingState /> : error ? <ErrorState error={error} /> : (
        <div className="grid gap-4 md:grid-cols-2">
          {data.map((item) => (
            <Panel key={item.platform}>
              <div className="flex items-center justify-between">
                <PlatformBadge name={item.platform} />
                <span className="rounded-full bg-tealBrand/10 px-3 py-1 text-xs font-bold text-teal-700">{item.lift} potential lift</span>
              </div>
              <div className="mt-6 space-y-3">
                {item.times.map((time, index) => (
                  <div className={`flex items-center justify-between rounded-xl p-3 ${index === 0 ? "border border-cyanBrand/20 bg-cyanBrand/[0.05]" : "border border-line bg-canvas/70"}`} key={time}>
                    <p className="flex items-center gap-2 text-sm font-semibold text-midnight"><Clock3 size={15} className="text-cyan-700" /> {time}</p>
                    {index === 0 && <span className="text-[11px] font-bold text-cyan-700">BEST</span>}
                  </div>
                ))}
              </div>
            </Panel>
          ))}
        </div>
      )}
    </PageTransition>
  );
}
