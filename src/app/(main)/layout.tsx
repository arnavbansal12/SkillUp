"use client";

import { GameProvider } from "@/lib/GameContext";
import Sidebar from "@/components/Sidebar";
import RightPanel from "@/components/RightPanel";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GameProvider>
      <div className="min-h-screen bg-[#F1F5F9] overflow-hidden selection:bg-primary-100">
        <div className="flex h-[100dvh] max-w-[2000px] mx-auto relative">
          {/* Sidebar */}
          <aside className="hidden lg:block w-[280px] flex-shrink-0 h-full border-r border-neutral-200/50 bg-white/50 backdrop-blur-xl">
            <Sidebar />
          </aside>
          
          {/* Main Content Area */}
          <main className="flex-1 h-full overflow-y-auto custom-scrollbar relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-100/30 rounded-full blur-[120px]" />
              <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-100/20 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-[1200px] mx-auto px-8 py-8 min-h-full">
              {children}
            </div>
          </main>
          
          {/* Right Panel */}
          <aside className="w-[380px] flex-shrink-0 h-full border-l border-neutral-200/50 bg-white/50 backdrop-blur-xl hidden xl:block overflow-y-auto custom-scrollbar">
            <div className="p-6">
              <RightPanel />
            </div>
          </aside>
        </div>
      </div>
    </GameProvider>
  );
}
