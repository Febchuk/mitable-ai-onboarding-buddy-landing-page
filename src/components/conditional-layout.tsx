"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/sections/navbar";
import React from "react";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Routes that should NOT have the navbar and main layout
  const isStandalonePage = pathname?.startsWith("/waitlist");

  if (isStandalonePage) {
    // Standalone pages (like waitlist) get no navbar, no container
    return <>{children}</>;
  }

  // Main site pages get full layout with navbar
  return (
    <div className="max-w-7xl mx-auto border-x relative">
      <div className="block w-px h-full border-l border-border absolute top-0 left-6 z-10"></div>
      <div className="block w-px h-full border-r border-border absolute top-0 right-6 z-10"></div>
      <Navbar />
      {children}
    </div>
  );
}

export default ConditionalLayout;
