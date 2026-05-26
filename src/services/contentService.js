import { api, unwrap } from "./api";
import { aiService } from "./aiService";
import { postService } from "./postService";

function getCurrentWeekDays() {
  const today = new Date();
  const mondayOffset = (today.getDay() + 6) % 7;
  const monday = new Date(today);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(today.getDate() - mondayOffset);
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return {
      day: date.toLocaleDateString("en", { weekday: "short" }),
      date: String(date.getDate()).padStart(2, "0"),
      iso: date.toISOString().slice(0, 10),
    };
  });
}

export const contentService = {
  getDashboard: () => unwrap(api.get("/analytics/dashboard")),
  getAnalytics: () => unwrap(api.get("/analytics")),
  async getCalendar() {
    const posts = await postService.calendar();
    return {
      calendarPosts: getCurrentWeekDays().map((day) => ({
        ...day,
        items: posts.filter((post) => post.scheduledAt && new Date(post.scheduledAt).toISOString().slice(0, 10) === day.iso),
      })),
    };
  },
  getIdeas: (brief) => aiService.ideas(brief),
  getScripts: (brief) => aiService.scripts(brief),
  repurpose: (brief) => aiService.repurpose(brief),
  getTrends: () => aiService.trends(),
  getBestTimes: () => aiService.bestTime(),
  getInsights: async () => (await unwrap(api.get("/analytics"))).insightCards,
  getDrafts: () => postService.list({ status: "Draft" }),
  getActivities: () => unwrap(api.get("/analytics/activity")),
};
