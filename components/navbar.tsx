"use client";

import { ModeToggle } from "@/components/theme-toggle";
import { CompassIcon } from "lucide-react";
import { GithubIcon, XIcon, LinkedInIcon, SubstackIcon, TelegramIcon, MediumIcon } from "./icons";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Search from "./search";
import { SheetLeftbar } from "./leftbar";
import { getPageRoutesForSection } from "@/lib/routes-config";
import { SheetClose } from "@/components/ui/sheet";
import LangSelect from "./lang-select";
import { Dictionary } from "@/lib/dictionaries";
import LocalizedLink from "./localized-link";

// Update your navbar config
export const NAVLINKS = [
  {
    title: "devotion",
    href: `/devotion${getPageRoutesForSection("devotion")[0].href}`,
    absolute: true,
  },
  {
    title: "howtodao", 
    href: `/howtodao${getPageRoutesForSection("howtodao")[0].href}`,
    absolute: true,
  },
  {
    title: "daohorizons",
    href: "/daohorizons",
  },
  {
    title: "conciliatorics",
    href: `/conciliatorics${getPageRoutesForSection("conciliatorics")[0].href}`,
    absolute: true,
  },
  {
    title: "about",
    href: "/about",
  },
];

export function Navbar({ 
  dict, 
}: { 
  dict: Dictionary; 
  lang: string;
}) {
  return (
    <nav className="w-full border-b h-16 sticky top-0 z-50 bg-background">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Mobile hamburger menu - should show on mobile */}
          <div className="md:hidden shrink-0">
            <SheetLeftbar dict={dict} />
          </div>
          
          {/* Logo - always visible */}
          <div className="shrink-0">
            <Logo />
          </div>
          
          {/* Desktop navigation menu - only on large screens to prevent overlap */}
          <div className="hidden lg:flex items-center gap-6 ml-8">
            <NavMenu dict={dict} />
          </div>
        </div>

        {/* Right side controls - more conservative spacing */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Search - only on extra large screens */}
          <div className="hidden xl:block">
            <Search dict={dict} />
          </div>
          
          <div className="flex items-center gap-1">
            <LangSelect />
            <ModeToggle dict={dict} />
            
            {/* All social links restored */}
            <div className="hidden sm:flex">
              <Link
                href="https://x.com/lokapalxyz"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })}
              >
                <XIcon className="h-[1.1rem] w-[1.1rem]" />
              </Link>
              <Link
                href="https://t.me/lokapalxyz"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })}
              >
                <TelegramIcon className="h-[1.1rem] w-[1.1rem]" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/ricardo-mauro-pintos/"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })}
              >
                <LinkedInIcon className="h-[1.1rem] w-[1.1rem]" />
              </Link>
              <Link
                href="https://lokapal.substack.com/"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })}
              >
                <SubstackIcon className="h-[1.1rem] w-[1.1rem]" />
              </Link>
              <Link
                href="https://medium.com/@lokapal_53133/"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })}
              >
                <MediumIcon className="h-[1.1rem] w-[1.1rem]" />
              </Link>
              <Link
                href="https://github.com/lokapal-xyz"
                className={buttonVariants({ variant: "ghost", size: "icon" })}
              >
                <GithubIcon className="h-[1.1rem] w-[1.1rem]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Logo() {
  return (
    <LocalizedLink href="/" className="flex items-center gap-2.5 pl-5">
      <CompassIcon className="w-6 h-6 text-muted-foreground" strokeWidth={2} />
      <h2 className="text-md font-bold font-code">Lokapal</h2>
    </LocalizedLink>
  );
}

export function NavMenu({
  isSheet = false,
  dict,
}: {
  isSheet?: boolean;
  dict: Dictionary;
}) {
  return (
    <>
      {NAVLINKS.map((item) => {
        const Comp = (
          <LocalizedLink
            key={item.title + item.href}
            className="flex items-center gap-1 dark:text-stone-300/85 text-stone-800 whitespace-nowrap text-sm"
            activeClassName="!text-red-600 dark:font-medium font-semibold"
            href={item.href}
            absolute={item.absolute}
          >
            {dict.navbar.links[item.title as keyof typeof dict.navbar.links]}
          </LocalizedLink>
        );
        return isSheet ? (
          <SheetClose key={item.title + item.href} asChild>
            {Comp}
          </SheetClose>
        ) : (
          Comp
        );
      })}
    </>
  );
}