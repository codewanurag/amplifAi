import { ArrowRight, Check, ChevronLeft, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Brand, Notice, PageTransition, PlatformMark } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { useWorkspace } from "../context/WorkspaceContext";

const tones = ["Confident", "Educational", "Warm", "Bold", "Conversational"];
const goals = ["Grow engagement", "Generate leads", "Build authority", "Launch products", "Grow community"];
const platformChoices = ["Instagram", "YouTube", "LinkedIn", "X / Twitter"];

export default function OnboardingPage() {
  const auth = useAuth();
  const workspace = useWorkspace();
  const navigate = useNavigate();
  const [selectedPlatforms, setSelectedPlatforms] = useState(["Instagram", "YouTube", "LinkedIn"]);
  const [selectedTones, setSelectedTones] = useState(["Confident", "Warm"]);
  const [feedback, setFeedback] = useState(null);
  const [busy, setBusy] = useState(false);
  if (!auth.loading && !auth.user) return <Navigate replace to="/signup" />;

  function toggle(values, setter, value) {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  }

  async function saveSetup(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setBusy(true);
    setFeedback(null);
    try {
      await workspace.update({
        settings: {
          niche: formData.get("niche"),
          audience: formData.get("audience"),
          platforms: selectedPlatforms,
          tone: selectedTones,
          goals: formData.getAll("goals"),
        },
      });
      navigate("/app");
    } catch (error) {
      setFeedback({ tone: "error", message: error.message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-canvas px-4 py-6 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between">
          <Brand />
          <span className="hidden text-sm font-medium text-slate-500 sm:block">Step 2 of 3: Personalize your AI</span>
        </header>
        <PageTransition className="mt-10 grid gap-7 lg:grid-cols-[1fr_320px]">
          <section className="panel p-6 sm:p-9">
            <span className="badge mb-5"><Sparkles size={13} /> Workspace setup</span>
            <h1 className="text-3xl font-bold tracking-tight text-midnight">Teach AmplifAI about your brand</h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">Your selections shape every idea, script, caption, and recommendation.</p>
            <Notice message={feedback?.message} tone={feedback?.tone} />
            <form className="mt-9 space-y-8" onSubmit={saveSetup}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label">Your niche</label>
                  <select className="input" name="niche"><option>Startup & SaaS</option><option>Education</option><option>Lifestyle</option><option>Ecommerce</option></select>
                </div>
                <div>
                  <label className="label">Target audience</label>
                  <select className="input" name="audience"><option>Founders and marketers</option><option>Creators</option><option>Small businesses</option></select>
                </div>
              </div>
              <div>
                <label className="label">Primary platforms</label>
                <div className="mt-3 flex flex-wrap gap-3">
                  {platformChoices.map((platform) => (
                    <button key={platform} onClick={() => toggle(selectedPlatforms, setSelectedPlatforms, platform)} type="button" className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${selectedPlatforms.includes(platform) ? "border-cyanBrand bg-cyanBrand/5 text-cyan-700" : "border-line bg-white/70 text-slate-600"}`}>
                      <PlatformMark name={platform} /> {platform} {selectedPlatforms.includes(platform) && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label">Brand tone</label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tones.map((tone) => (
                    <button key={tone} onClick={() => toggle(selectedTones, setSelectedTones, tone)} type="button" className={`rounded-full px-4 py-2 text-sm ${selectedTones.includes(tone) ? "bg-brand-gradient text-white shadow-md shadow-cyanBrand/15" : "bg-slate-100 text-slate-600"}`}>{tone}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label">Content goals</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {goals.map((goal, index) => (
                    <label key={goal} className="flex items-center gap-3 rounded-xl border border-line bg-white/60 p-3 text-sm text-slate-700">
                      <input name="goals" value={goal} type="checkbox" defaultChecked={index < 3} className="accent-cyan-600" /> {goal}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-6">
                <Link to="/signup" className="btn-secondary"><ChevronLeft size={16} /> Back</Link>
                <button disabled={busy} type="submit" className="btn-primary disabled:opacity-60">{busy ? "Saving..." : "Finish setup"} <ArrowRight size={16} /></button>
              </div>
            </form>
          </section>
          <aside className="space-y-4">
            <div className="relative overflow-hidden rounded-3xl border border-cyanBrand/15 bg-gradient-to-br from-cyanBrand/[0.08] via-white to-electric/[0.08] p-6 shadow-panel">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-electric/10 blur-2xl" />
              <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-cyanBrand/10 text-cyan-700">
                <Sparkles size={20} />
              </div>
              <span className="relative mt-5 inline-flex rounded-full border border-tealBrand/15 bg-tealBrand/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-700">Profile trained</span>
              <p className="relative mt-4 text-lg font-semibold text-midnight">AI profile preview</p>
              <p className="relative mt-2 text-sm leading-6 text-slate-600">AmplifAI will generate confident, warm content for startup founders on Instagram, LinkedIn, and YouTube.</p>
              <div className="relative mt-5 flex gap-2">
                {["Instagram", "LinkedIn", "YouTube"].map((platform) => <PlatformMark key={platform} name={platform} />)}
              </div>
            </div>
            <div className="panel">
              <p className="text-sm font-semibold text-midnight">Your setup unlocks</p>
              {["Tailored ideas", "Brand-consistent captions", "Relevant posting times"].map((feature) => (
                <p key={feature} className="mt-4 flex gap-2 text-sm text-slate-600"><Check size={16} className="text-teal-600" /> {feature}</p>
              ))}
            </div>
          </aside>
        </PageTransition>
      </div>
    </div>
  );
}
