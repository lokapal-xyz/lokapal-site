import LocalizedLink from "@/components/localized-link";
import { buttonVariants } from "@/components/ui/button";
import { getDictionary, LangProps } from "@/lib/dictionaries";
import { getPageRoutesForSection } from "@/lib/routes-config";
import { MoveUpRightIcon, CompassIcon } from "lucide-react";
import Link from "next/link";

export default async function Home({ params }: LangProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center px-2 py-8">
      <Link
        href="https://lokapal.eth.limo"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-5 sm:text-lg flex items-center gap-2 underline underline-offset-4"
      >
        {dict.home.linktree}
        <MoveUpRightIcon className="w-4 h-4 font-extrabold" />
      </Link>
      <h1 className="text-3xl font-bold mb-4 sm:text-6xl">
        {dict.home.main_header}
      </h1>
      <p className="mb-8 sm:text-lg max-w-[1200px] text-muted-foreground">
        {dict.home.sub_header}
      </p>
      
      {/* Responsive button grid - added justify-center for desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row lg:justify-center items-center gap-4 w-full max-w-4xl px-4">
        <LocalizedLink
          href={`/devotion${getPageRoutesForSection("devotion")[0].href}`}
          className={buttonVariants({ 
            variant: "secondary", 
            className: "px-6 w-full lg:w-auto", 
            size: "lg" 
          })}
        >
          {dict.home.devotion}
        </LocalizedLink>
        <LocalizedLink
          href={`/howtodao${getPageRoutesForSection("howtodao")[0].href}`}
          className={buttonVariants({
            variant: "secondary",
            className: "px-6 w-full lg:w-auto",
            size: "lg",
          })}
        >
          {dict.home.howtodao}
        </LocalizedLink>
        <LocalizedLink
          href={`/daohorizons`}
          className={buttonVariants({
            variant: "secondary",
            className: "px-6 w-full lg:w-auto",
            size: "lg",
          })}
        >
          {dict.home.daohorizons}
        </LocalizedLink>
        <LocalizedLink
          href={`/conciliatorics${getPageRoutesForSection("conciliatorics")[0].href}`}
          className={buttonVariants({
            variant: "secondary",
            className: "px-6 w-full lg:w-auto",
            size: "lg",
          })}
        >
          {dict.home.conciliatorics}
        </LocalizedLink>
      </div>
      
      <span className="flex flex-row items-start sm:gap-2 gap-0.5 text-muted-foreground text-md mt-7 font-code sm:text-base text-sm font-medium">
        <CompassIcon className="w-5 h-5 sm:mr-1 mt-0.5" />
        {"Choose your path"}
        <CompassIcon className="w-5 h-5 sm:mr-1 mt-0.5" />
      </span>
    </div>
  );
}