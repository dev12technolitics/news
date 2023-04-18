import { useState, useEffect } from "react";

const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileSize = window.matchMedia("(max-width: 767px)").matches;
      const isTabletSize = window.matchMedia(
        "(min-width: 768px) and (max-width: 1023px)"
      ).matches;
      const isDesktopSize = window.matchMedia("(min-width: 1024px)").matches;

      setIsMobile(isMobileSize);
      setIsTablet(isTabletSize);
      setIsDesktop(isDesktopSize);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, isTablet, isDesktop };
};

export default useDeviceType;

// How to use
// const { isDesktop, isTablet, isMobile } = useDeviceType();
