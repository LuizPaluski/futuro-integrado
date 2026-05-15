import { MessageCircle } from "lucide-react";
import { modalStore } from "@/lib/modal-store";
import { track } from "@/lib/tracking";

export function StickyMobileCTA() {
  const open = () => {
    track("click_cta_hero", { source: "sticky_mobile" });
    track("open_popup_curso", { source: "sticky_mobile" });
    modalStore.openModal();
  };
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-gradient-to-t from-background via-background/95 to-background/0 pt-6">
      <button
        onClick={open}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp hover:bg-whatsapp-hover transition-colors text-whatsapp-foreground font-semibold text-base px-6 py-4 shadow-lg shadow-black/20"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        Quero minha pós agora
      </button>
    </div>
  );
}
