import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import landingPage from "../../index.html?raw";

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
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const url = URL.createObjectURL(new Blob([landingPage], { type: "text/html" }));
    if (!frame) {
      URL.revokeObjectURL(url);
      return;
    }
    frame.src = url;
    return () => {
      frame.removeAttribute("src");
      URL.revokeObjectURL(url);
    };
  }, []);

  return (
    <iframe
      ref={frameRef}
      title="The Chiang Mai Chapters"
      className="fixed inset-0 h-full w-full border-0"
    />
  );
}
