import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Free Fire Safety Health Check | Certified Fire Protection Inspections" },
      {
        name: "description",
        content:
          "Claim your complimentary fire safety health check. Our certified technicians visit your facility to inspect fire protection systems and provide a full report.",
      },
      {
        property: "og:title",
        content: "Free Fire Safety Health Check | Certified Fire Protection Inspections",
      },
      {
        property: "og:description",
        content:
          "Claim your complimentary fire safety health check. Our certified technicians visit your facility to inspect fire protection systems and provide a full report.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  return (
    <main id="main-content">
      <Hero />
    </main>
  );
}
