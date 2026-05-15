import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Objections } from "@/components/Objections";
import { Areas } from "@/components/Areas";
import { CourseSelectionModal } from "@/components/CourseSelectionModal";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pós-Graduação EAD | Centro Universitário Integrado" },
      {
        name: "description",
        content:
          "Pós-graduação 100% EAD do Centro Universitário Integrado. Escolha sua área, fale com um consultor pelo WhatsApp e comece este mês. Nota máxima no MEC, 40 anos de tradição.",
      },
      { property: "og:title", content: "Pós-Graduação EAD | Centro Universitário Integrado" },
      {
        property: "og:description",
        content:
          "Sua próxima promoção começa com uma decisão. Pós EAD com atendimento direto pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background">
      <Hero />
      <Objections />
      <Areas />
      <StickyMobileCTA />
      <CourseSelectionModal />
      <ExitIntentModal />
    </main>
  );
}
