import { Typography } from "@/components/typography";
import Toc from "@/components/toc";
import { getDictionary, LangProps } from "@/lib/dictionaries";
import { getAboutContent } from "@/lib/markdown";
import { Metadata } from 'next';
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: LangProps): Promise<Metadata> {
  const { lang } = await params;
  
  const res = await getAboutContent(lang);
  if (!res) {
    return {
      title: 'About',
      description: 'Learn more about our mission, values, and the team behind this platform.',
    };
  }

  const { frontmatter } = res;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export default async function AboutPage({ params }: LangProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const res = await getAboutContent(lang);
  
  if (!res) notFound();

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Main content */}
      <div className="flex-[4.5] pt-2 w-full lg:pl-32">
        <Typography>
          <h1 className="text-3xl !-mt-1.5 animate-in slide-in-from-bottom-4 fade-in duration-700">{res.frontmatter.title}</h1>
          <p className="-mt-4 text-muted-foreground text-[16.5px] animate-in slide-in-from-bottom-4 fade-in duration-700">
            {res.frontmatter.description}
          </p>
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-400">{res.content}</div>
        </Typography>
      </div>
      
      {/* Table of Contents - hidden on mobile, sidebar on desktop */}
      <div className="hidden lg:block lg:flex-1 lg:min-w-[200px] lg:sticky lg:top-20">
        <Toc section="about" path="" dict={dict} lang={lang}/>
      </div>
    </div>
  );
}