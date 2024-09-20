import { useState, useEffect } from "react";

const SMALL_SCREEN_WIDTH = 768; //in pixels

export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < SMALL_SCREEN_WIDTH) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile };
};
