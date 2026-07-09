"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset scroll position to top instantly when page changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
export default ScrollToTop;
