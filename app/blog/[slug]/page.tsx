import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { getBlogPostBySlug, blogPosts, type BlogPost } from "@/lib/blog-data";
import { getDbBlogPostBySlug } from "@/lib/database-service";

export const dynamicParams = true;
export const revalidate = 0;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts
    .filter((p) => p.published)
    .map((post) => ({
      slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dbPost = await getDbBlogPostBySlug(slug);
  const post = dbPost || getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const title = `${post.title} | Sheferoy Guppy`;
  return {
    title,
    description: post.excerpt,
    keywords: [post.category, "guppy care", "aquarium", "fish breeding", "Sheferoy Guppy"],
    authors: [{ name: post.author || "Sheferoy Guppy" }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description: post.excerpt,
      type: "article",
      publishedTime: "published_at" in post ? post.published_at : (post as BlogPost).publishedAt,
      authors: [post.author || "Sheferoy Guppy"],
      url: `/blog/${post.slug}`,
    },
  };
}

function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={`${keyPrefix}-${i}`} className="font-semibold text-heading">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

function ArticleBody({ content }: { content: string }) {
  return (
    <div className="space-y-5">
      {content.split("\n").map((line, index) => {
        const trimmed = line.trim();

        if (trimmed.startsWith("# ")) {
          return (
            <h2 key={index} id="article-title" className="font-display text-3xl font-bold tracking-tight text-heading pt-4">
              {trimmed.replace("# ", "")}
            </h2>
          );
        }

        if (trimmed.startsWith("## ")) {
          return (
            <h3 key={index} className="pt-6 font-display text-2xl font-bold text-heading">
              {trimmed.replace("## ", "")}
            </h3>
          );
        }

        if (trimmed.startsWith("- ")) {
          return (
            <li
              key={index}
              className="ml-5 list-disc pl-1 text-base leading-relaxed text-body marker:text-brand"
            >
              {renderInline(trimmed.replace("- ", ""), `li-${index}`)}
            </li>
          );
        }

        if (/^\d+\.\s/.test(trimmed)) {
          return (
            <li
              key={index}
              className="ml-5 list-decimal pl-1 text-base leading-relaxed text-body marker:text-brand"
            >
              {renderInline(trimmed.replace(/^\d+\.\s/, ""), `li-${index}`)}
            </li>
          );
        }

        if (trimmed) {
          return (
            <p key={index} className="text-base leading-relaxed text-body">
              {renderInline(trimmed, `p-${index}`)}
            </p>
          );
        }

        return null;
      })}
    </div>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const dbPost = await getDbBlogPostBySlug(slug);
  const localPost = getBlogPostBySlug(slug);

  if (!dbPost && !localPost) {
    notFound();
  }

  const post: BlogPost = {
    id: dbPost?.id ? Number(dbPost.id) : (localPost?.id || 1),
    title: dbPost?.title || localPost?.title || slug,
    slug: dbPost?.slug || localPost?.slug || slug,
    excerpt: dbPost?.excerpt || localPost?.excerpt || "",
    content: dbPost?.content || localPost?.content || "",
    category: dbPost?.category || localPost?.category || "Care Guides",
    author: dbPost?.author || localPost?.author || "Sheferoy Guppy",
    publishedAt: dbPost?.published_at || localPost?.publishedAt || new Date().toISOString().split("T")[0],
    published: dbPost ? (dbPost.is_published !== false) : (localPost?.published ?? true),
    readTime: dbPost?.read_time || localPost?.readTime || "5 min read",
  };

  const relatedPosts = blogPosts
    .filter((p) => p.published && p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const morePosts =
    relatedPosts.length > 0
      ? relatedPosts
      : blogPosts.filter((p) => p.published && p.id !== post.id).slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border bg-page">
        <div className="mx-auto flex max-w-site items-center gap-3 px-4 py-4 sm:px-6 lg:px-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-muted transition-colors hover:text-brand"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            The Journal
          </Link>
          <span className="text-border" aria-hidden="true">
            /
          </span>
          <span className="truncate font-sans text-xs font-semibold uppercase tracking-wider text-heading">
            {post.category}
          </span>
        </div>
      </div>

      <article className="bg-page pb-20 pt-10 lg:pt-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
          <header>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="rounded-full bg-secondary border border-border px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-brand">
                {post.category}
              </span>
              <time
                dateTime={post.publishedAt}
                className="font-sans text-xs text-muted"
              >
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs text-muted">
                <Clock className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                {post.readTime}
              </span>
            </div>

            <h1 className="mt-6 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-heading">
              {post.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-body">{post.excerpt}</p>

            <div className="mt-7 flex items-center gap-3 border-t border-border pt-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white font-display text-sm font-bold shadow-sm">
                11
              </span>
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-wider text-heading">
                  {post.author}
                </p>
                <p className="font-sans text-[11px] uppercase tracking-wider text-muted">
                  Kanyakumari, Tamil Nadu
                </p>
              </div>
            </div>
          </header>

          <div className="my-10 border-t border-border" aria-hidden="true" />

          <Reveal>
            <ArticleBody content={post.content} />
          </Reveal>

          {/* CTA */}
          <Reveal className="mt-14">
            <div className="rounded-3xl border border-border bg-surface p-8 text-center sm:p-10 shadow-card">
              <h2 className="font-display text-2xl font-bold text-heading">Still have questions about this strain?</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-body">
                Write to our hatchery on WhatsApp for personal guidance — from tank water parameters to choosing your first
                breeding trio.
              </p>
              <WhatsAppButton className="mt-6 bg-brand hover:bg-brand-hover text-white shadow-sm">Ask us on WhatsApp</WhatsAppButton>
            </div>
          </Reveal>
        </div>
      </article>

      {/* More reading */}
      {morePosts.length > 0 && (
        <section className="border-t border-border bg-secondary/40 py-16 lg:py-20" aria-labelledby="more-reading-heading">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
            <div className="flex items-end justify-between gap-6">
              <h2 id="more-reading-heading" className="font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                Continue reading
              </h2>
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand hover:text-brand-hover font-sans">
                All articles
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {morePosts.map((relatedPost, i) => (
                <Reveal key={relatedPost.id} delay={i * 100}>
                  <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brand">
                      {relatedPost.category}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-bold leading-snug text-heading group-hover:text-brand transition-colors">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <span className="absolute inset-0" aria-hidden="true" />
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-body">
                      {relatedPost.excerpt}
                    </p>
                    <p className="mt-5 inline-flex items-center gap-1.5 border-t border-border pt-4 text-xs text-muted">
                      <Clock className="h-3 w-3 text-gold" aria-hidden="true" />
                      {relatedPost.readTime}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
