import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/constants";
import { track } from "@/lib/tracking";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const heroCta = document.querySelector<HTMLElement>("[data-hero-cta]");

    let heroInView = true;
    const updateVisibility = () => {
      const scrolledEnough = window.scrollY > 600;
      setVisible(!heroInView || scrolledEnough);
    };

    let observer: IntersectionObserver | null = null;
    if (heroCta && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          heroInView = entry.isIntersecting;
          updateVisibility();
        },
        { threshold: 0 },
      );
      observer.observe(heroCta);
    } else {
      heroInView = false;
    }

    const onScroll = () => updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });
    updateVisibility();

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const open = () => {
    track("click_cta_hero", { source: "sticky_mobile" });
    track("open_popup_curso", { source: "sticky_mobile" });
    modalStore.openModal();
  };

  return (
    <div
      aria-hidden={!visible}
      className={`sticky-float md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-gradient-to-t from-background via-background/95 to-background/0 pt-6 ${
        visible ? "is-visible" : ""
      }`}
    >
      <button
        onClick={open}
        tabIndex={visible ? 0 : -1}
        className="cta-button cta-pulse w-full inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground font-semibold text-base px-6 py-4 shadow-lg shadow-black/20"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        Fale com a gente
      </button>
    </div>
  );
}
