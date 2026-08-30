import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { QuoteBanner } from "@/components/QuoteBanner";
import { RegistrationSection } from "@/components/RegistrationSection";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Free AMC Registration | MAHA BINU Fire Fighters" },
      {
        name: "description",
        content:
          "Register during Expo 2026 to receive a complimentary Annual Maintenance Contract assessment for your fire safety systems from industry leading experts.",
      },
      {
        property: "og:title",
        content: "Free AMC Registration | MAHA BINU Fire Fighters",
      },
      {
        property: "og:description",
        content:
          "Register during Expo 2026 to receive a complimentary Annual Maintenance Contract assessment for your fire safety systems from industry leading experts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-surface">
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <WhyChooseSection />
        <QuoteBanner />
        <RegistrationSection />
      </main>
      <SiteFooter />
    </div>
  );
}
