"use client";

import { getDocsTocs } from "@/lib/markdown";
import clsx from "clsx";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

type Props = { data: Awaited<ReturnType<typeof getDocsTocs>> };

export default function TocObserver({ data }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const intersectingEntries: { id: string; top: number }[] = [];
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            const rect = entry.target.getBoundingClientRect();
            intersectingEntries.push({ id, top: rect.top });
          }
        }
      });

      if (intersectingEntries.length > 0) {
        // Sort by position and pick the topmost
        intersectingEntries.sort((a, b) => a.top - b.top);
        setActiveId(intersectingEntries[0].id);
      }
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "0px 0px -75% 0px",
      threshold: 0.1,
    });

    const elements = data.map((item) =>
      document.getElementById(item.href.slice(1))
    );

    elements.forEach((el) => {
      if (el && observer.current) {
        observer.current.observe(el);
      }
    });

    return () => {
      if (observer.current) {
        elements.forEach((el) => {
          if (el) {
            observer.current!.unobserve(el);
          }
        });
      }
    };
  }, [data]);

  return (
    <div className="flex flex-col gap-2.5 text-sm dark:text-stone-300/85 text-stone-800 ml-0.5">
      {data.map(({ href, level, text }, index) => {
        return (
          <Link
            key={href + text + level + index}
            href={href}
            className={clsx(
              // Base styles with transition
              "transition-opacity duration-200 ease-in-out hover:opacity-75",
              // Padding based on level
              {
                "pl-0": level == 2,
                "pl-4": level == 3,
                "pl-8": level == 4,
              },
              // Active state
              {
                "dark:font-medium font-semibold !text-red-500 !opacity-100":
                  activeId == href.slice(1),
              }
            )}
          >
            {text}
          </Link>
        );
      })}
    </div>
  );
}