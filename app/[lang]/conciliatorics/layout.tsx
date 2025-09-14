import { Leftbar } from "@/components/leftbar";
import { PageBackground } from "@/components/page-background";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageBackground>
      <div className="flex items-start gap-8">
        <Leftbar key="leftbar" />
        <div className="flex-[5.25]">{children}</div>
      </div>
    </PageBackground>
  );
}