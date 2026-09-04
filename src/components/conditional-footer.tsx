"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Hide footer on admin & contact routes
  if (pathname?.startsWith("/admin") || pathname === "/contact") {
    return null;
  }

  return <Footer />;
}
