"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import MobileDrawer from "./MobileDrawer";

const navLinks = [
  { href: "/", label: "Map" },
  { href: "/food", label: "Food" },
  { href: "/contacts", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between bg-navy border-b border-navy-light px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <svg className="h-8 w-8 text-orange" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
          <span className="text-xl font-bold text-white">CSUF Campus Navigator</span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-orange text-white"
                    : "text-gray-light hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
