"use client";

import { Logo } from "@/components/logo";
import { mainNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({
  logos,
}: {
  logos: { onDark: string | null; onLight: string | null };
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const mobileId = useId();
  const reduce = useReducedMotion();
  const isHome = pathname === "/";
  const solid = !isHome || scrolled || mobileOpen;
  const [renderedPath, setRenderedPath] = useState(pathname);

  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
        servicesButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid ? "border-b border-white/10 bg-navy" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6 md:h-[4.5rem]">
        <Link href="/" aria-label="ORYVOM home" className="shrink-0">
          <Logo src={logos.onDark} variant="on-dark" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {mainNavigation.map((item) =>
            item.children ? (
              <div
                key={item.href}
                ref={servicesRef}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false);
                }}
              >
                <button
                  ref={servicesButtonRef}
                  type="button"
                  className={cn(
                    "inline-flex items-center gap-1 px-3 py-2 text-sm text-ice/80 hover:text-white",
                    isCurrent(pathname, item.href) && "text-white",
                  )}
                  aria-expanded={servicesOpen}
                  aria-controls={menuId}
                  onClick={() => setServicesOpen((open) => !open)}
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden
                    className={cn("size-3.5 transition-transform", servicesOpen && "rotate-180")}
                    strokeWidth={1.5}
                  />
                </button>
                {servicesOpen ? (
                  <motion.div
                    id={menuId}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduce ? 0 : 0.18 }}
                    className="absolute top-full left-0 w-[26rem] border border-white/10 bg-navy-mid p-2 shadow-2xl"
                  >
                    <ul className="grid">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-3 py-2.5 hover:bg-white/5"
                            aria-current={pathname === child.href ? "page" : undefined}
                          >
                            <span className="block text-sm text-white">{child.label}</span>
                            <span className="mt-0.5 block text-xs leading-5 text-mist">
                              {child.summary}
                            </span>
                          </Link>
                        </li>
                      ))}
                      <li className="border-t border-white/10">
                        <Link href="/services" className="block px-3 py-3 text-sm text-ice">
                          View all services
                        </Link>
                      </li>
                    </ul>
                  </motion.div>
                ) : null}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                className={cn(
                  "px-3 py-2 text-sm text-ice/80 hover:text-white",
                  item.href === "/contact" && "ml-2 border border-ice/30 px-4 text-white hover:bg-white/10",
                  isCurrent(pathname, item.href) && "text-white",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center text-white lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls={mobileId}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          {mobileOpen ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
        </button>
      </div>

      {mobileOpen ? (
        <motion.nav
          id={mobileId}
          aria-label="Mobile"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-navy px-6 py-4 lg:hidden"
        >
          <ul className="grid">
            {mainNavigation.map((item) =>
              item.children ? (
                <li key={item.href} className="border-b border-white/10">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-4 text-left text-lg text-white"
                    aria-expanded={mobileServicesOpen}
                    onClick={() => setMobileServicesOpen((open) => !open)}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn("size-4", mobileServicesOpen && "rotate-180")}
                      strokeWidth={1.5}
                    />
                  </button>
                  {mobileServicesOpen ? (
                    <ul className="pb-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block py-2 text-sm text-ice"
                            aria-current={pathname === child.href ? "page" : undefined}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ) : (
                <li key={item.href} className="border-b border-white/10">
                  <Link
                    href={item.href}
                    aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                    className="block py-4 text-lg text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </motion.nav>
      ) : null}
    </header>
  );
}
