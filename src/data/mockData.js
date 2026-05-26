export const platforms = [
  { name: "Instagram", short: "IG", color: "from-cyanBrand to-electric", followers: "46.2K", engagement: "6.8%" },
  { name: "YouTube", short: "YT", color: "from-electric to-blue-700", followers: "28.9K", engagement: "5.1%" },
  { name: "LinkedIn", short: "IN", color: "from-cyan-500 to-cyanBrand", followers: "18.4K", engagement: "4.6%" },
  { name: "X / Twitter", short: "X", color: "from-slate-500 to-slate-700", followers: "31.5K", engagement: "3.9%" },
];

export const dashboardStats = [
  { label: "Total reach", value: "1.28M", change: "+18.4%", tone: "cyan" },
  { label: "Engagement", value: "84.6K", change: "+12.9%", tone: "blue" },
  { label: "Content score", value: "91", change: "+4 pts", tone: "blue" },
  { label: "Posts scheduled", value: "24", change: "7 this week", tone: "teal" },
];

export const engagementSeries = [36, 42, 40, 57, 52, 64, 59, 72, 76, 69, 88, 94];
export const growthSeries = [18, 23, 30, 34, 39, 48, 56];

export const upcomingPosts = [
  { title: "5 AI hooks founders can use today", platform: "LinkedIn", time: "Today, 5:30 PM", status: "Ready", score: 93 },
  { title: "From brief to reel in 30 seconds", platform: "Instagram", time: "Tomorrow, 11:00 AM", status: "Review", score: 88 },
  { title: "Creator workflow breakdown", platform: "YouTube", time: "Wed, 7:00 PM", status: "Draft", score: 84 },
  { title: "Launch thread: amplify one idea", platform: "X / Twitter", time: "Thu, 9:15 AM", status: "Ready", score: 90 },
];

export const aiRecommendations = [
  { title: "Turn your product demo into a 3-part reel series", impact: "Estimated +22% saves", tag: "Repurpose" },
  { title: "Move LinkedIn posts to Tuesday mornings", impact: "Likely +14% impressions", tag: "Timing" },
  { title: "Lead with outcome-led hooks on Shorts", impact: "Improve 3-sec hold", tag: "Hook" },
];

export const ideaResults = [
  { title: "The one prompt that rescues a content calendar", format: "Carousel", hook: "Your blank calendar is a strategy signal.", score: 94 },
  { title: "Build a week of content from one customer question", format: "Reel", hook: "Stop brainstorming. Start listening.", score: 91 },
  { title: "Founder diary: automating our launch week", format: "Thread", hook: "We shipped 14 posts with one brief.", score: 88 },
];

export const scripts = [
  { format: "Reel", duration: "30 sec", title: "One idea, four platforms", scenes: ["Hook: still rewriting posts?", "Show AmplifAI transformation", "Reveal results and CTA"] },
  { format: "Short", duration: "45 sec", title: "Content planning reset", scenes: ["Cold open with calendar", "Three-step workflow", "Invite viewers to try"] },
];

export const repurposed = [
  { platform: "Instagram", type: "Caption", content: "One idea can carry your whole week. Swipe through the system we use to publish with confidence. #CreatorWorkflow" },
  { platform: "LinkedIn", type: "Post", content: "Your best content idea should not expire after one post. Here is how we turn an insight into a multi-channel campaign." },
  { platform: "YouTube Shorts", type: "Script", content: "Hook: You are wasting your best idea. Beat 2: Transform it. Beat 3: Schedule it everywhere." },
  { platform: "X / Twitter", type: "Thread", content: "1/ A strong idea deserves more than one format. Here is our simple repurposing loop..." },
];

export const calendarPosts = [
  { day: "Mon", date: "26", items: [{ platform: "Instagram", title: "AI hook carousel", status: "Scheduled" }] },
  { day: "Tue", date: "27", items: [{ platform: "LinkedIn", title: "Founder workflow", status: "Ready" }, { platform: "X / Twitter", title: "Prompt thread", status: "Draft" }] },
  { day: "Wed", date: "28", items: [{ platform: "YouTube", title: "Tutorial short", status: "Review" }] },
  { day: "Thu", date: "29", items: [{ platform: "Instagram", title: "Before / after reel", status: "Scheduled" }] },
  { day: "Fri", date: "30", items: [{ platform: "LinkedIn", title: "Weekly learnings", status: "Draft" }] },
  { day: "Sat", date: "31", items: [] },
  { day: "Sun", date: "01", items: [{ platform: "Instagram", title: "Community recap", status: "Idea" }] },
];

export const topContent = [
  { title: "Three hook formulas for B2B creators", platform: "Instagram", views: "184K", engagement: "9.8%" },
  { title: "How our team creates once", platform: "LinkedIn", views: "92K", engagement: "7.2%" },
  { title: "Repurpose a launch in 60 seconds", platform: "YouTube", views: "76K", engagement: "6.4%" },
];

export const insightCards = [
  { title: "Hook analysis", result: "Question-based hooks retain viewers 1.6x longer.", action: "Open with a relatable friction point." },
  { title: "Audience behavior", result: "Startup founders engage most before 9 AM.", action: "Schedule educational posts earlier." },
  { title: "Creative pattern", result: "Face-to-camera reels outperform b-roll by 21%.", action: "Test two creator-led intros." },
  { title: "CTA quality", result: "Save prompts outperform comment prompts.", action: "Optimize for saves this week." },
];

export const drafts = [
  { name: "Launch week storytelling series", folder: "Q2 Campaign", edited: "2h ago", posts: 6, status: "In progress" },
  { name: "Founder advice carousel", folder: "Thought Leadership", edited: "Yesterday", posts: 3, status: "Review" },
  { name: "Tutorial short scripts", folder: "Education", edited: "May 22", posts: 8, status: "Ready" },
];

export const bestTimes = [
  { platform: "Instagram", times: ["Tue 11:00 AM", "Thu 6:30 PM", "Sun 9:00 AM"], lift: "+19%" },
  { platform: "LinkedIn", times: ["Tue 8:30 AM", "Wed 9:00 AM", "Thu 12:15 PM"], lift: "+24%" },
  { platform: "YouTube", times: ["Wed 7:00 PM", "Fri 6:00 PM", "Sun 5:30 PM"], lift: "+16%" },
  { platform: "X / Twitter", times: ["Mon 9:15 AM", "Wed 1:00 PM", "Fri 10:00 AM"], lift: "+12%" },
];

export const audioSuggestions = [
  { style: "Bright lo-fi build", mood: "Educational", platform: "Instagram", velocity: "Rising fast" },
  { style: "Minimal tech percussion", mood: "Launch", platform: "YouTube", velocity: "Trending" },
  { style: "Warm acoustic cut", mood: "Storytelling", platform: "Instagram", velocity: "Emerging" },
];
