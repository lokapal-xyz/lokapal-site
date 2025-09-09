import { PropsWithChildren } from "react";

export default function AboutLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full mx-auto pt-4 sm:pt-8 pb-10">
      {children}
    </div>
  );
}