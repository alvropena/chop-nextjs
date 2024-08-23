"use client";

import { useState } from "react";
import AsideMenu from "@/components/aside-menu";
import OverlayAside from "@/components/aside-overlay";
import BottomTabNavigation from "@/components/bottom-tab-navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleOpenOverlay = (tab: string) => {
    setActiveTab(tab);
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setActiveTab(null);
    setIsOverlayOpen(false);
  };

  return (
    <section>
      <div className="flex min-h-screen w-full">
        <AsideMenu onOpenOverlay={handleOpenOverlay} isOverlayOpen={isOverlayOpen} />
        <div className="flex flex-1 flex-col relative">
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
          <BottomTabNavigation onOpenOverlay={handleOpenOverlay} />
        </div>
      </div>
      <OverlayAside activeTab={activeTab} onClose={handleCloseOverlay} onOpen={() => setIsOverlayOpen(true)} />
    </section>
  );
}
