import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CalendarPlus, Clock3, Sparkles, Wand2, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { ComparisonBars, TrendChart } from "../components/charts";
import { AppPageHeader, EmptyState, ErrorState, LoadingState, MetricCard, Panel, PanelHeader, PageTransition, PlatformBadge, StatusPill } from "../components/ui";
import { useMockQuery } from "../hooks/useMockQuery";
import { contentService } from "../services/contentService";

const recommendationReasons = {
  Repurpose: "Your product walkthrough retained viewers longer than other recent reels.",
  Timing: "Your LinkedIn audience is most active on Tuesday morning.",
  Hook: "Outcome-led openings increased 3-second watch retention last week.",
};

const enterContainer = {
  show: { transition: { staggerChildren: 0.06 } },
};

const enterCard = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: "easeOut" } },
};

export default function DashboardPage() {
  const { data, loading, error } = useMockQuery(() => contentService.getDashboard(), []);

  return (
    <PageTransition>
      <AppPageHeader
        badge="Today - 3 posts ready"
        title="What should we publish next?"
        description="Keep momentum moving with a focused plan and one useful AI recommendation at a time."
      >
        <Link className="btn-primary" to="/app/ideas"><Wand2 size={16} /> Create content</Link>
      </AppPageHeader>
      {loading ? (
        <LoadingState rows={4} />
      ) : error ? (
        <ErrorState error={error} />
      ) : (
        <>
          <motion.section
            className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 xl:grid-cols-4"
            variants={enterContainer}
            initial="hidden"
            animate="show"
          >
            {data.dashboardStats.map((stat) => (
              <motion.div className="min-w-[78vw] snap-start sm:min-w-0" key={stat.label} variants={enterCard}>
                <MetricCard {...stat} />
              </motion.div>
            ))}
          </motion.section>

          <motion.section className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_.85fr]" variants={enterContainer} initial="hidden" animate="show">
            <motion.div variants={enterCard}>
              <Panel className="h-full border-cyanBrand/20 bg-[linear-gradient(145deg,rgba(255,255,255,.99),rgba(239,249,253,.94))] shadow-[0_24px_58px_-30px_rgba(8,145,178,.3)]" lift={false}>
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-brand-gradient" />
                <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-cyanBrand/[0.075] blur-3xl" />
                <div className="flex justify-between gap-4"><PanelHeader title="This week's content plan" subtitle="The next useful action is already prioritized" /><Link className="text-xs font-semibold text-electric" to="/app/calendar">Open calendar</Link></div>
                {data.upcomingPosts.length ? <><div className="relative mb-6 rounded-2xl border border-cyanBrand/10 bg-gradient-to-r from-cyanBrand/[0.1] via-white/75 to-electric/[0.055] p-4 sm:p-5">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-electric" />
                      <div>
                        <p className="card-kicker">Publish next</p>
                        <p className="mt-1 text-base font-semibold text-midnight">{data.upcomingPosts[0].title}</p>
                        <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                          <PlatformBadge name={data.upcomingPosts[0].platform} />
                          <Clock3 size={12} /> {data.upcomingPosts[0].time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                      <span className="rounded-full border border-tealBrand/15 bg-white/80 px-2.5 py-1 text-[11px] font-bold text-teal-700">{data.upcomingPosts[0].status}</span>
                      <Link to="/app/previews" className="text-xs font-semibold text-electric">Review post</Link>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-line/80">
                  {data.upcomingPosts.slice(1).map((post) => (
                    <div className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0" key={post.title}>
                      <div className="min-w-[180px] flex-1">
                        <p className="truncate text-sm font-medium text-midnight">{post.title}</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-400"><Clock3 size={12} />{post.time}</p>
                      </div>
                      <PlatformBadge name={post.platform} />
                      <StatusPill>{post.status}</StatusPill>
                    </div>
                  ))}
                </div></> : <EmptyState title="Create your first content plan." description="Generate an idea and save it as a draft to start scheduling." actionLabel="Create content" actionTo="/app/ideas" />}
                <div className="mt-5 flex flex-wrap gap-3 border-t border-line/80 pt-5">
                  <Link className="btn-secondary py-2.5" to="/app/calendar"><CalendarPlus size={15} /> View schedule</Link>
                  <Link className="flex items-center gap-1 px-2 text-sm font-semibold text-electric" to="/app/ideas">Create another post <ArrowRight size={14} /></Link>
                </div>
              </Panel>
            </motion.div>
            <motion.div variants={enterCard}>
              <Panel className="h-full" lift={false}>
                <div className="flex justify-between gap-3"><PanelHeader title="AI recommendations" subtitle="Two decisions with the highest predicted impact" /><Link to="/app/insights" className="text-xs font-semibold text-electric">View all</Link></div>
                <div className="space-y-6">
                  {data.aiRecommendations.slice(0, 2).map((tip, index) => (
                    <div className={index ? "border-t border-line pt-5" : ""} key={tip.title}>
                      <div className="flex items-center gap-2">
                        <Sparkles size={15} className="text-cyan-700" />
                        <span className="rounded-full bg-cyanBrand/[0.08] px-2 py-1 text-[10px] font-bold text-cyan-700">{tip.tag}</span>
                      </div>
                      <p className="mt-3 text-sm font-semibold leading-6 text-midnight">{tip.title}</p>
                      <p className="mt-2 text-xs leading-5 text-slate-500">{recommendationReasons[tip.tag]}</p>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <p className="rounded-full bg-tealBrand/10 px-2.5 py-1 text-[11px] font-semibold text-teal-700">{tip.impact}</p>
                        <Link to={tip.tag === "Timing" ? "/app/best-time" : "/app/repurpose"} className="rounded-lg border border-cyanBrand/15 px-3 py-2 text-[11px] font-bold text-electric transition hover:bg-cyanBrand/[0.06]">
                          Apply recommendation
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </motion.div>
          </motion.section>

          <motion.section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_.75fr]" variants={enterContainer} initial="hidden" animate="show">
            <motion.div variants={enterCard}>
              <Panel className="h-full" lift={false}>
                <div className="flex justify-between gap-3"><PanelHeader title="Performance" subtitle="Engagement trajectory over the last 12 weeks" /><Link to="/app/analytics" className="text-xs font-semibold text-electric">Full report</Link></div>
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full bg-tealBrand/10 px-3 py-1.5 text-xs font-semibold text-teal-700">
                    <Zap size={13} /> +18.4% growth
                  </div>
                  <p className="flex items-center gap-2 text-xs text-slate-500"><span className="h-2.5 w-2.5 rounded-full bg-cyanBrand" /> Engagement</p>
                  <p className="flex items-center gap-2 text-xs text-slate-500"><span className="h-2.5 w-2.5 rounded-full bg-electric/25" /> Prior period</p>
                </div>
                <div className="rounded-2xl bg-canvas/60 px-3 pb-2 pt-4">
                  <TrendChart values={data.engagementSeries} />
                </div>
              </Panel>
            </motion.div>
            <motion.div variants={enterCard}>
              <Panel className="h-full" lift={false}>
                <PanelHeader title="Platform health" subtitle="Engagement by network" />
                <ComparisonBars items={data.platforms} />
                <Link to="/app/analytics" className="btn-secondary mt-5 w-full">Open analytics <ArrowUpRight size={15} /></Link>
              </Panel>
            </motion.div>
          </motion.section>

        </>
      )}
    </PageTransition>
  );
}
