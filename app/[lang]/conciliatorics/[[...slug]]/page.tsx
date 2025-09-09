import Pagination from "@/components/pagination";
import Toc from "@/components/toc";
import { getPageRoutesForSection } from "@/lib/routes-config";
import { notFound } from "next/navigation";
import { getDocsForSlug } from "@/lib/markdown";
import { Typography } from "@/components/typography";
import { getDictionary, LangProps } from "@/lib/dictionaries";

type PageProps = {
  params: Promise<{ slug: string[] }>;
} & LangProps;

export default async function DocsPage(props: PageProps) {
  const params = await props.params;
  const { slug = [], lang } = params;

  const dict = await getDictionary(lang);
  const slugPath = slug.join("/");

  // 🔑 pass "conciliatorics" explicitly as the section
  const res = await getDocsForSlug("conciliatorics", slugPath, lang);

  if (!res) notFound();

  // Construct the full pathname that getPreviousNext expects
  const fullPathname = `/${lang}/conciliatorics/${slugPath}`;

  return (
    <div className="flex items-start gap-10">
      <div className="flex-[4.5] pt-10">
        <Typography>
          <h1 className="text-3xl !-mt-1.5">{res.frontmatter.title}</h1>
          <p className="-mt-4 text-muted-foreground italic text-[16.5px]">
            {res.frontmatter.description}
          </p>
          <div>{res.content}</div>
          {/* Fixed: Pass the full pathname instead of just slug.join("/") */}
          <Pagination pathname={fullPathname} dict={dict} section="conciliatorics" lang={lang}/>
        </Typography>
      </div>
      <Toc section="conciliatorics" path={slugPath} dict={dict} lang={lang}/>
    </div>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { slug = [], lang } = params;

  const slugPath = slug.join("/");

  // 🔑 same here
  const res = await getDocsForSlug("conciliatorics", slugPath, lang);
  if (!res) return {};

  const { frontmatter } = res;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

// In conciliatorics/[[...slug]]/page.tsx
export function generateStaticParams() {
  return getPageRoutesForSection("conciliatorics").map((item) => ({
    slug: item.href.split("/").slice(1),
  }));
}