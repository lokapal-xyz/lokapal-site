import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { CompassIcon, HeartIcon, TriangleIcon } from "lucide-react";
import { Dictionary } from "@/lib/dictionaries";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t w-full h-16">
      <div className="container flex items-center sm:justify-between justify-center sm:gap-0 gap-4 h-full text-muted-foreground text-sm flex-wrap sm:py-0 py-3 max-sm:px-4">
        <div className="flex items-center gap-3">
          <CompassIcon className="sm:block hidden w-5 h-5 text-muted-foreground" />
          <p className="text-center">
            {dict.footer.built_by}{" "}
            <Link
              className="px-1 underline underline-offset-2"
              href="https://x.com/lokapalxyz"
            >
              lokapal.eth
            </Link>
            . {dict.footer.source_code_available}{" "}
            <Link
              className="px-1 underline underline-offset-2"
              href="https://github.com/lokapal-xyz"
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
        href="https://lokapal.eth.limo"
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        <TriangleIcon className="h-[0.8rem] w-4 mr-2 text-primary fill-current" />
        {dict.footer.deploy}
      </Link>
      <Link
        href="https://etherscan.io/address/0xF1F2363dE9588E5e9701209B5410195122551414"
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        <HeartIcon className="h-4 w-4 mr-2 text-red-600 fill-current" />
        {dict.footer.sponsor}
      </Link>
    </>
  );
}
