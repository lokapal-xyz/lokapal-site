import Pagination from "@/components/pagination";
import Toc from "@/components/toc";
import { getPageRoutesForSection } from "@/lib/routes-config";
import { notFound } from "next/navigation";
import { getDocsForSlug } from "@/lib/markdown";
import { Typography } from "@/components/typography";
import { getDictionary, LangProps } from "@/lib/dictionaries";
import Image from "next/image";

type PageProps = {
  params: Promise<{ slug: string[] }>;
} & LangProps;

export default async function DocsPage(props: PageProps) {
  const params = await props.params;
  const { slug = [], lang } = params;

  const dict = await getDictionary(lang);
  const slugPath = slug.join("/");

  // 🔑 pass "fmao" explicitly as the section
  const res = await getDocsForSlug("fmao", slugPath, lang);

  if (!res) notFound();

  // Construct the full pathname that getPreviousNext expects
  const fullPathname = `/${lang}/fmao/${slugPath}`;

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
          <Image
            src="/images/banner-green.png"
            alt=""
            width={1580}
            height={140}
            priority
            className="animate-in fade-in duration-700 delay-400"
          />
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-600">
            {res.content}
          </div>
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-800">
            <Pagination pathname={fullPathname} dict={dict} section="fmao" lang={lang}/>
          </div>
        </Typography>
      </div>
      <Toc section="fmao" path={slugPath} dict={dict} lang={lang}/>
    </div>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { slug = [], lang } = params;

  const slugPath = slug.join("/");

  // 🔑 same here
  const res = await getDocsForSlug("fmao", slugPath, lang);
  if (!res) return {};

  const { frontmatter } = res;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export function generateStaticParams() {
  return getPageRoutesForSection("fmao").map((item) => ({
    slug: item.href.split("/").slice(1),
  }));
}