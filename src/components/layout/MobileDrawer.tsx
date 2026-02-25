"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Map" },
  { href: "/food", label: "Food" },
  { href: "/contacts", label: "Contact" },
];

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-navy transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-navy-light">
          <span className="text-lg font-bold text-white">Menu</span>
          <button onClick={onClose} className="text-white p-1" aria-label="Close menu">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col p-4 gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-orange text-white"
                    : "text-gray-light hover:text-white hover:bg-navy-light"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
