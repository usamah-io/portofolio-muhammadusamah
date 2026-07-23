"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Hide footer (contact form) on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return <Footer />;
}
