"use client";

import { getRoutesForSection } from "@/lib/routes-config";
import SubLink from "./sublink";
import { usePathname } from "next/navigation";

export default function DocsMenu({ isSheet = false }) {
  const pathname = usePathname();
  const SECTION_REGEX = /^\/[a-z]{2}\/(devotion|howtodao|conciliatorics)/;

  if (!SECTION_REGEX.test(pathname)) return null;

  const [, , section] = pathname.split("/"); // e.g. "devotion"
  const sectionRoutes = getRoutesForSection(section as "devotion" | "howtodao" | "conciliatorics");

  return (
    <div className="flex flex-col gap-3.5 mt-5 pr-2 pb-6">
      {sectionRoutes.map((item, index) => {
        const modifiedItems = {
          ...item,
          href: `/${section}${item.href}`,
          level: 0,
          isSheet,
        };
        return <SubLink key={item.title + index} {...modifiedItems} />;
      })}
    </div>
  );
}