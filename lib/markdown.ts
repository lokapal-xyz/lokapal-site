import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import { promises as fs } from "fs";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import { ROUTES, getRecurrsiveAllLinks, getRoutesForSection } from "./routes-config";
import { visit } from "unist-util-visit";
import matter from "gray-matter";
import { Locale } from "./locale";


// custom components imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Pre from "@/components/markdown/pre";
import Note from "@/components/markdown/note";
import { Stepper, StepperItem } from "@/components/markdown/stepper";
import Image from "@/components/markdown/image";
import Link from "@/components/markdown/link";
import Outlet from "@/components/markdown/outlet";
import { ShardButtons } from '@/components/markdown/shard-buttons';
import { ShardDialog } from '@/components/markdown/shard-dialog';
// Book Tokens components
import BookTokenGrid from '@/components/BookTokens/BookTokenGrid';
import ConnectButtonWrapper from '@/components/BookTokens/ConnectButtonWrapper';
import ContractAddress from '@/components/BookTokens/ContractAddress';

// add custom components
const components = {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  pre: Pre,
  Note,
  Stepper,
  StepperItem,
  Image: Image,
  a: Link,
  Outlet,
  ShardButtons,
  ShardDialog,
  BookTokenGrid,
  ContractAddress,
  ConnectButton: ConnectButtonWrapper, // Use wrapper instead of direct import
};

// can be used for other pages like blogs, Guides etc
async function parseMdx<Frontmatter>(rawMdx: string) {
  return await compileMDX<Frontmatter>({
    source: rawMdx,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          preProcess,
          rehypeCodeTitles,
          rehypePrism,
          rehypeSlug,
          rehypeAutolinkHeadings,
          postProcess,
        ],
        remarkPlugins: [remarkGfm],
      },
    },
    components,
  });
}

// logic for docs

export type BaseMdxFrontmatter = {
  title: string;
  description: string;
};

export async function getDocsForSlug(
  section: "fmao" | "conciliatorics",
  slug: string,
  lang: string
) {
  try {
    const contentPath = getDocsContentPath(section, lang, slug);
    const rawMdx = await fs.readFile(contentPath, "utf-8");
    return await parseMdx<BaseMdxFrontmatter>(rawMdx);
  } catch (err) {
    console.log(err);
  }
}


export async function getDocsTocs(
  section: "fmao" | "conciliatorics" | "about",
  slug: string,
  lang: string
) {
  const contentPath = getDocsContentPath(section, lang, slug);
  const rawMdx = await fs.readFile(contentPath, "utf-8");
  // captures between ## - #### can modify accordingly
  const headingsRegex = /^(#{2,4})\s(.+)$/gm;
  let match;
  const extractedHeadings = [];
  while ((match = headingsRegex.exec(rawMdx)) !== null) {
    const headingLevel = match[1].length;
    const headingText = match[2].trim();
    const slug = sluggify(headingText);
    extractedHeadings.push({
      level: headingLevel,
      text: headingText,
      href: `#${slug}`,
    });
  }
  return extractedHeadings;
}


export function getPreviousNext(
  path: string,
  section: "fmao" | "conciliatorics" | "about", // Reserved for future section filtering
  // lang: string Reserved for future localization features
) {
   // Get section-specific routes instead of all routes
  const sectionRoutes = getRoutesForSection(section);
  const allLinks = sectionRoutes.map((route) => getRecurrsiveAllLinks(route)).flat();
  

  const pathParts = path.split('/').filter(part => part !== '');

  let normalizedPath = '';
  if (pathParts.length > 2) {
    // Skip language (index 0) and section (index 1), take the rest
    normalizedPath = pathParts.slice(2).join('/');
  }

  // Find current page index by comparing the normalized path
  const currentIndex = allLinks.findIndex((link) => {
    // Remove leading slash from link href for comparison
    const linkHref = link.href.startsWith('/') ? link.href.slice(1) : link.href;
    
    return normalizedPath === linkHref;
  });

  // If current page not found, return null for both
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const result = {
    prev: currentIndex > 0 ? allLinks[currentIndex - 1] : null,
    next: currentIndex < allLinks.length - 1 ? allLinks[currentIndex + 1] : null,
  };

  return result;
}


function sluggify(text: string) {
  return text
    .normalize("NFKC") // Normalize Unicode (important for consistency)
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, "-") // Replace spaces with hyphens
    .replace(/[!\"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~]/g, ""); // Remove punctuation
}

function justGetFrontmatterFromMD<Frontmatter>(rawMd: string): Frontmatter {
  return matter(rawMd).data as Frontmatter;
}


function getDocsContentPath(section: string, lang: string, slug: string) {
  return path.join(
    process.cwd(),
    "contents",
    section,
    lang,
    slug,
    "index.mdx"
  );
}


export async function getAllChilds(section: "fmao" | "conciliatorics" | "about", pathString: string, lang: string) {
  const items = pathString.split("/").filter((it) => it != "");
  let page_routes_copy = ROUTES;

  let prevHref = "";
  for (const it of items) {
    const found = page_routes_copy.find((innerIt) => innerIt.href == `/${it}`);
    if (!found) break;
    prevHref += found.href;
    page_routes_copy = found.items ?? [];
  }
  if (!prevHref) return [];

  return await Promise.all(
    page_routes_copy.map(async (it) => {
      const totalPath = path.join(
        process.cwd(),
        `/contents/${section}/`,
        lang,
        prevHref,
        it.href,
        "index.mdx",
      );
      const raw = await fs.readFile(totalPath, "utf-8");
      return {
        ...justGetFrontmatterFromMD<BaseMdxFrontmatter>(raw),
        href: `/${lang}/${section}${prevHref}${it.href}`,
      };
    }),
  );
}


// for copying the code in pre
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const preProcess = () => (tree: any) => {
  visit(tree, (node) => {
    if (node?.type === "element" && node?.tagName === "pre") {
      const [codeEl] = node.children;
      if (codeEl.tagName !== "code") return;
      node.raw = codeEl.children?.[0].value;
    }
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postProcess = () => (tree: any) => {
  visit(tree, "element", (node) => {
    if (node?.type === "element" && node?.tagName === "pre") {
      node.properties["raw"] = node.raw;
    }
  });
};

export type Author = {
  avatar?: string;
  handle: string;
  username: string;
  handleUrl: string;
};

export type BlogMdxFrontmatter = BaseMdxFrontmatter & {
  date: string;
  authors: Author[];
  cover: string;
};

export async function getAllBlogStaticPaths(lang: Locale) {
  try {
    const blogFolder = path.join(process.cwd(), `/contents/thoughtchain/${lang}`);
    const res = await fs.readdir(blogFolder);
    return res.map((file) => file.split(".")[0]);
  } catch (err) {
    console.log(err);
  }
}

export async function getAllBlogs(lang: Locale) {
  const blogFolder = path.join(process.cwd(), `/contents/thoughtchain/${lang}`);
  const files = await fs.readdir(blogFolder);
  const uncheckedRes = await Promise.all(
    files.map(async (file) => {
      if (!file.endsWith(".mdx")) return undefined;
      const filepath = path.join(
        process.cwd(),
        `/contents/thoughtchain/${lang}/${file}`,
      );
      const rawMdx = await fs.readFile(filepath, "utf-8");
      return {
        ...justGetFrontmatterFromMD<BlogMdxFrontmatter>(rawMdx),
        slug: file.split(".")[0],
      };
    }),
  );
  return uncheckedRes.filter((it) => !!it) as (BlogMdxFrontmatter & {
    slug: string;
  })[];
}

export async function getBlogForSlug(slug: string, lang: Locale) {
  const blogFile = path.join(
    process.cwd(),
    "/contents/thoughtchain/",
    `${lang}/${slug}.mdx`,
  );
  try {
    const rawMdx = await fs.readFile(blogFile, "utf-8");
    return await parseMdx<BlogMdxFrontmatter>(rawMdx);
  } catch {
    return undefined;
  }
}

export async function getAboutContent(lang: Locale) {
  const aboutFile = path.join(
    process.cwd(),
    "/contents/about/",
    `${lang}/index.mdx`,
  );
  try {
    const rawMdx = await fs.readFile(aboutFile, "utf-8");
    return await parseMdx<BlogMdxFrontmatter>(rawMdx); // Using the same frontmatter type as blog
  } catch {
    return undefined;
  }
}