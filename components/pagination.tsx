import { getPreviousNext } from "@/lib/markdown";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import LocalizedLink from "./localized-link";
import { Dictionary } from "@/lib/dictionaries";

export default function Pagination({
  pathname,
  dict,
  section,
  // lang,
}: {
  pathname: string;
  dict: Dictionary;
  section: "fmao" | "conciliatorics";
  lang: string;
}) {
  const res = getPreviousNext(pathname, section);

  return (
    <div className="flex justify-between sm:py-10 py-7 gap-3">
      <div className="flex-1 max-w-[50%]">
        {res.prev && (
          <LocalizedLink
            className="no-underline w-full flex flex-col p-3 border rounded h-auto hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 items-start"
            href={`/${section}${res.prev.href}`}
          >
            <span className="flex items-center text-muted-foreground text-xs whitespace-nowrap mb-1">
              <ChevronLeftIcon className="w-[1rem] h-[1rem] mr-1 flex-shrink-0" />
              {dict[section].previous}
            </span>
            <span 
              className="text-left text-sm leading-tight break-words"
              style={{ 
                wordWrap: 'break-word', 
                overflowWrap: 'break-word',
                maxWidth: '100%'
              }}
            >
              {dict.leftbar[res.prev.title as keyof typeof dict.leftbar]}
            </span>
          </LocalizedLink>
        )}
      </div>
      
      <div className="flex-1 max-w-[50%]">
        {res.next && (
          <LocalizedLink
            className="no-underline w-full flex flex-col p-3 border rounded h-auto hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 items-end"
            href={`/${section}${res.next.href}`}
          >
            <span className="flex items-center text-muted-foreground text-xs whitespace-nowrap mb-1">
              {dict[section].next}
              <ChevronRightIcon className="w-[1rem] h-[1rem] ml-1 flex-shrink-0" />
            </span>
            <span 
              className="text-right text-sm leading-tight break-words"
              style={{ 
                wordWrap: 'break-word', 
                overflowWrap: 'break-word',
                maxWidth: '100%'
              }}
            >
              {dict.leftbar[res.next.title as keyof typeof dict.leftbar]}
            </span>
          </LocalizedLink>
        )}
      </div>
    </div>
  );
}