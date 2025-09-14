import { PropsWithChildren } from "react";
import { PageBackground } from "@/components/page-background";

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <PageBackground>
      <div className="flex flex-col items-start justify-center pt-8 pb-10 w-full mx-auto">
        {children}
      </div>
    </PageBackground>
  );
}
