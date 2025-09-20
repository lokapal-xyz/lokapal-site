import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { WrenchIcon, BrushIcon, TreePineIcon } from "lucide-react";
import { Dictionary } from "@/lib/dictionaries";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t w-full h-16">
      <div className="container flex items-center sm:justify-between justify-center sm:gap-0 gap-4 h-full text-muted-foreground text-sm flex-wrap sm:py-0 py-3 max-sm:px-4">
        <div className="flex items-center gap-3">
          <WrenchIcon className="sm:block hidden w-5 h-5 fill-current" />
          <p className="text-center">
            {dict.footer.built_by}{" "}
            <Link
              className="px-1 underline underline-offset-2"
              href="https://app.ens.domains/lokapal.eth"
              target="_blank"
              rel="noopener noreferrer"
            >
              lokapal.eth
            </Link>
            . {dict.footer.source_code_available}{" "}
            <Link
              className="px-1 underline underline-offset-2"
              href="https://github.com/lokapal-xyz/lokapal-site/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
            .
          </p>
        </div>

        <div className="gap-4 items-center hidden md:flex">
          <FooterButtons dict={dict} />
        </div>
      </div>
    </footer>
  );
}

export function FooterButtons({ dict }: { dict: Dictionary }) {
  return (
    <>
      <Link
        href="https://lokapal.eth.link/"
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        <TreePineIcon className="h-[0.8rem] w-4 mr-2 text-emerald-600 fill-current" />
        {dict.footer.deploy}
      </Link>
      <Link
        href={dict.footer.styleGuideUrl}
        target="_blank" 
        rel="noopener noreferrer"
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        <BrushIcon className="h-4 w-4 mr-2 text-rose-600 fill-current" />
        {dict.footer.styleGuide}
      </Link>
    </>
  );
}
