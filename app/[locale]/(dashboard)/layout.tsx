"use client";

import { useState, useEffect } from "react";
import AsideMenu from "../../../components/aside-menu";
import BottomTabNavigation from "../../../components/bottom-tab-navigation";
import NavLink from "../../../components/nav-link"; // Import NavLink if it's used directly here

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isAsideMenuVisible, setIsAsideMenuVisible] = useState<boolean>(true);

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setIsAsideMenuVisible(false);
      } else {
        setIsMobile(false);
        setIsAsideMenuVisible(true);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section>
      <div className="flex min-h-screen w-full">
        {!isMobile && <AsideMenu />}
        <div className="flex flex-1 flex-col relative">
          <main className="flex-1 p-4 md:p-6">{children}
          </main>
          {isMobile && <BottomTabNavigation isBottomTab={true} />}
        </div>
      </div>
    </section>
  );
}