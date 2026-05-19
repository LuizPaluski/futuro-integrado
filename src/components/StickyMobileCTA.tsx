import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { modalStore } from "@/lib/modal-store";
import { track } from "@/lib/tracking";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const heroCta = document.querySelector<HTMLElement>("[data-hero-cta]");
    const finalCta = document.querySelector<HTMLElement>("[data-final-cta]");

    let heroInView = true;
    let finalInView = false;
    const updateVisibility = () => {
      const scrolledEnough = window.scrollY > 600;
      setVisible((!heroInView || scrolledEnough) && !finalInView);
    };

    const observers: IntersectionObserver[] = [];
    if ("IntersectionObserver" in window) {
      if (heroCta) {
        const o = new IntersectionObserver(
          ([entry]) => {
            heroInView = entry.isIntersecting;
            updateVisibility();
          },
          { threshold: 0 },
        );
        o.observe(heroCta);
        observers.push(o);
      } else {
        heroInView = false;
      }
      if (finalCta) {
        const o = new IntersectionObserver(
          ([entry]) => {
            finalInView = entry.isIntersecting;
            updateVisibility();
          },
          { threshold: 0 },
        );
        o.observe(finalCta);
        observers.push(o);
      }
    } else {
      heroInView = false;
    }

    const onScroll = () => updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });
    updateVisibility();

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onClick = () => {
    track("click_cta_hero", { source: "sticky_mobile" });
  };

  return (
    <div
      aria-hidden={!visible}
      className={`sticky-float md:hidden fixed bottom-0 inset-x-0 z-40 px-4 pt-6 bg-gradient-to-t from-background via-background/95 to-background/0 ${
        visible ? "is-visible" : ""
      }`}
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
    >
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        tabIndex={visible ? 0 : -1}
        className="cta-button cta-pulse w-full max-w-[480px] mx-auto flex items-center justify-center gap-2 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground font-bold text-base px-6 min-h-[52px] py-4 shadow-lg shadow-black/20"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        Fale com a gente
      </a>
    </div>
  );
}
