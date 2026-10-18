import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { getBlogPostBySlug, blogPosts } from "@/lib/blog-data";

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
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, "guppy care", "aquarium", "fish breeding"],
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | Sheferoy Guppy`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      url: `/blog/${post.slug}`,
    },
  };
}

function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={`${keyPrefix}-${i}`} className="font-semibold text-ivory">
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
            <h2 key={index} id="article-title" className="display-3 pt-4 text-ivory">
              {trimmed.replace("# ", "")}
            </h2>
          );
        }

        if (trimmed.startsWith("## ")) {
          return (
            <h3 key={index} className="pt-6 font-display text-2xl text-ivory">
              {trimmed.replace("## ", "")}
            </h3>
          );
        }

        if (trimmed.startsWith("- ")) {
          return (
            <li
              key={index}
              className="ml-5 list-disc pl-1 text-base leading-relaxed text-mist marker:text-gold/60"
            >
              {renderInline(trimmed.replace("- ", ""), `li-${index}`)}
            </li>
          );
        }

        if (/^\d+\.\s/.test(trimmed)) {
          return (
            <li
              key={index}
              className="ml-5 list-decimal pl-1 text-base leading-relaxed text-mist marker:text-gold/60"
            >
              {renderInline(trimmed.replace(/^\d+\.\s/, ""), `li-${index}`)}
            </li>
          );
        }

        if (trimmed) {
          return (
            <p key={index} className="text-base leading-relaxed text-mist">
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
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

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
      <div className="border-b border-white/5 bg-obsidian">
        <div className="mx-auto flex max-w-site items-center gap-3 px-4 py-4 sm:px-6 lg:px-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/50 transition-colors hover:text-gold-light"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            The Journal
          </Link>
          <span className="text-ivory/20" aria-hidden="true">
            /
          </span>
          <span className="truncate font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/80">
            {post.category}
          </span>
        </div>
      </div>

      <article className="bg-obsidian pb-20 pt-12 lg:pt-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
          <header>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="chip">{post.category}</span>
              <time
                dateTime={post.publishedAt}
                className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory/45"
              >
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span className="inline-flex items-center gap-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory/45">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {post.readTime}
              </span>
            </div>

            <h1 className="display-2 mt-6 text-ivory">{post.title}</h1>
            <p className="lede mt-5">{post.excerpt}</p>

            <div className="mt-7 flex items-center gap-3 border-t border-white/5 pt-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-gold/10 font-display text-sm text-gold-light">
                S
              </span>
              <div>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ivory/80">
                  {post.author}
                </p>
                <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-ivory/40">
                  Kanyakumari, Tamil Nadu
                </p>
              </div>
            </div>
          </header>

          <div className="hairline my-10" aria-hidden="true" />

          <Reveal>
            <ArticleBody content={post.content} />
          </Reveal>

          {/* CTA */}
          <Reveal className="mt-14">
            <div className="rounded-3xl border border-gold/15 bg-abyss p-8 text-center sm:p-10">
              <h2 className="display-3 text-ivory">Still have questions?</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mist">
                Write to us on WhatsApp for personal guidance — from tank setup to choosing your first
                breeding pair.
              </p>
              <WhatsAppButton className="mt-7">Ask us on WhatsApp</WhatsAppButton>
            </div>
          </Reveal>
        </div>
      </article>

      {/* More reading */}
      {morePosts.length > 0 && (
        <section className="border-t border-white/5 bg-abyss py-16 lg:py-20" aria-labelledby="more-reading-heading">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
            <div className="flex items-end justify-between gap-6">
              <h2 id="more-reading-heading" className="display-3 text-ivory">
                Continue reading
              </h2>
              <Link href="/blog" className="btn-link shrink-0">
                All articles
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {morePosts.map((relatedPost, i) => (
                <Reveal key={relatedPost.id} delay={i * 100}>
                  <article className="group relative flex h-full flex-col rounded-2xl border border-gold/10 bg-obsidian p-6 transition-all duration-500 ease-luxe hover:border-gold/30">
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                      {relatedPost.category}
                    </p>
                    <h3 className="mt-3 font-display text-2xl leading-snug text-ivory">
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="transition-colors hover:text-gold-light"
                      >
                        <span className="absolute inset-0" aria-hidden="true" />
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-mist">
                      {relatedPost.excerpt}
                    </p>
                    <p className="mt-5 inline-flex items-center gap-1.5 border-t border-white/5 pt-4 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory/45">
                      <Clock className="h-3 w-3" aria-hidden="true" />
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
