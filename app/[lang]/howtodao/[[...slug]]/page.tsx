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

  // 🔑 pass "howtodao" explicitly as the section
  const res = await getDocsForSlug("howtodao", slugPath, lang);

  if (!res) notFound();

  // Construct the full pathname that getPreviousNext expects
  const fullPathname = `/${lang}/howtodao/${slugPath}`;

  return (
    <div className="flex items-start gap-10">
      <div className="flex-[4.5] pt-10">
        <Typography>
          <h1 className="text-3xl !-mt-1.5 animate-in slide-in-from-bottom-4 fade-in duration-700">
            {res.frontmatter.title}
          </h1>
          <p className="-mt-4 text-muted-foreground italic text-[16.5px] animate-in slide-in-from-bottom-4 fade-in duration-700">
            {res.frontmatter.description}
          </p>
          <img 
            src="/images/banner-green.png" 
            alt="" 
            className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-400"
          />
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-600">
            {res.content}
          </div>
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-800">
            <Pagination pathname={fullPathname} dict={dict} section="howtodao" lang={lang}/>
          </div>
        </Typography>
      </div>
      <Toc section="howtodao" path={slugPath} dict={dict} lang={lang}/>
    </div>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { slug = [], lang } = params;

  const slugPath = slug.join("/");

  // 🔑 same here
  const res = await getDocsForSlug("howtodao", slugPath, lang);
  if (!res) return {};

  const { frontmatter } = res;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

// In howtodao/[[...slug]]/page.tsx  
export function generateStaticParams() {
  return getPageRoutesForSection("howtodao").map((item) => ({
    slug: item.href.split("/").slice(1),
  }));
}