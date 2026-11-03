import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Chiang Mai Chapters | Chiang Mai Travel Planner" },
      { name: "description", content: "Curated Chiang Mai stays, tours, transport and a daily budget estimator." },
      { property: "og:title", content: "The Chiang Mai Chapters" },
      { property: "og:description", content: "Curated Chiang Mai stays, tours, transport and a daily budget estimator." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/chiang-mai-chapters.html"
      title="The Chiang Mai Chapters"
      className="fixed inset-0 h-full w-full border-0"
    />
  );
}
