import React from 'react';
import { Headphones, Sparkles, Bot } from 'lucide-react';

interface SupportFloatingButtonProps {
  onOpenSupport: () => void;
  isMobileFrame?: boolean;
}

export const SupportFloatingButton: React.FC<SupportFloatingButtonProps> = ({
  onOpenSupport,
  isMobileFrame = false,
}) => {
  if (isMobileFrame) {
    // In simulated mobile screen, position nicely above bottom nav
    return (
      <button
        id="mobile-floating-support-btn"
        onClick={onOpenSupport}
        className="absolute bottom-16 right-4 z-40 bg-[#202022] hover:bg-black text-white px-3 py-2 rounded-full shadow-xl flex items-center space-x-1.5 border border-[#fed8c9]/40 active:scale-95 transition-all text-xs group"
        title="Tư vấn AI da liễu & Chăm sóc khách hàng 24/7"
      >
        <div className="relative">
          <Sparkles className="w-3.5 h-3.5 text-[#d9b775]" />
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#8a9a86] rounded-full animate-ping" />
        </div>
        <span className="text-[11px] font-medium tracking-wide flex items-center gap-1">
          <span>AI CSKH</span>
          <span className="text-[9px] text-[#fed8c9] font-normal">24/7</span>
        </span>
      </button>
    );
  }

  // On standard desktop or responsive layout
  return (
    <button
      id="desktop-floating-support-btn"
      onClick={onOpenSupport}
      className="fixed bottom-6 right-6 z-40 bg-[#202022] hover:bg-black text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center space-x-2.5 border border-[#fed8c9]/40 hover:scale-105 active:scale-95 transition-all group"
      title="Trò chuyện với Chuyên viên AI Da Liễu & CSKH 24/7"
    >
      <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-[#d9b775]">
        <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#8a9a86] rounded-full ring-2 ring-[#202022] animate-pulse" />
      </div>
      <div className="text-left pr-1">
        <span className="flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase text-white leading-tight">
          <span>Chat AI CSKH</span>
          <span className="text-[9px] bg-[#d9b775]/20 text-[#fed8c9] px-1.5 py-0.2 rounded-full font-bold">24/7</span>
        </span>
        <span className="block text-[9px] text-[#c7c6ca] font-light leading-tight mt-0.5">
          alps.id.vn • Hotline 1900 8899
        </span>
      </div>
    </button>
  );
};
