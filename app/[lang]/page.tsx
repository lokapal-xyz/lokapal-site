import LocalizedLink from "@/components/localized-link";
import { buttonVariants } from "@/components/ui/button";
import { getDictionary, LangProps } from "@/lib/dictionaries";
import { getPageRoutesForSection } from "@/lib/routes-config";
import { MoveUpRightIcon } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';

export default async function Home({ params }: LangProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <div className="flex flex-col items-center justify-center text-center px-2 py-8 min-h-[50vh] sm:min-h-[60vh] lg:min-h-[80vh] relative">
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute h-full w-full opacity-25"
          style={{
            background: 'radial-gradient(currentColor 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 40%, transparent 80%)'
          }}
        ></div>
      </div>
      <Link
        href="https://lokapal.eth.limo"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-5 sm:text-lg flex items-center gap-2 underline underline-offset-4 animate-in slide-in-from-bottom-4 fade-in duration-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      >
        {dict.home.linktree}
        <MoveUpRightIcon className="w-4 h-4 font-extrabold" />
      </Link>
      <h1 className="text-3xl font-bold mb-4 sm:text-6xl animate-in slide-in-from-bottom-4 fade-in duration-700">
        {dict.home.main_header}
      </h1>
      <p className="mb-8 sm:text-lg max-w-[1200px] text-muted-foreground animate-in slide-in-from-bottom-4 fade-in duration-700">
        {dict.home.sub_header}
      </p>

      {/* Responsive button grid - added justify-center for desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row lg:justify-center items-center gap-4 w-full max-w-4xl px-4 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-400">
        <LocalizedLink
          href={`/devotion${getPageRoutesForSection("devotion")[0].href}`}
          className={buttonVariants({
            variant: "devotion",
            className: "px-6 w-full lg:w-auto transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
            size: "lg"
          })}
        >
          {dict.home.devotion}
        </LocalizedLink>
        <LocalizedLink
          href={`/howtodao${getPageRoutesForSection("howtodao")[0].href}`}
          className={buttonVariants({
            variant: "howtodao",
            className: "px-6 w-full lg:w-auto transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
            size: "lg",
          })}
        >
          {dict.home.howtodao}
        </LocalizedLink>
        <LocalizedLink
          href={`/thoughtchain`}
          className={buttonVariants({
            variant: "thoughtchain",
            className: "px-6 w-full lg:w-auto transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
            size: "lg",
          })}
        >
          {dict.home.thoughtchain}
        </LocalizedLink>
        <LocalizedLink
          href={`/conciliatorics${getPageRoutesForSection("conciliatorics")[0].href}`}
          className={buttonVariants({
            variant: "conciliatorics",
            className: "px-6 w-full lg:w-auto transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
            size: "lg",
          })}
        >
          {dict.home.conciliatorics}
        </LocalizedLink>
      </div>

      <span className="flex flex-row italic items-start sm:gap-2 gap-0.5 text-muted-foreground text-md mt-7 font-code sm:text-base text-sm font-medium animate-in slide-in-from-bottom-4 fade-in duration-700 delay-600">
        <Image
          src="/images/icon-transparent.png"
          alt=""
          width={388}
          height={388}
          className="w-6 h-6 sm:mr-1 mt-0.5 animate-pulse"
        />
        {"Choose your path"}
        <Image
          src="/images/icon-transparent.png"
          alt=""
          width={388}
          height={388}
          className="w-6 h-6 sm:mr-1 mt-0.5 animate-pulse delay-1000"
        />
      </span>
    </div>
  );
}