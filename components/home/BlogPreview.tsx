import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Calendar } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { blogPosts } from "@/lib/blog-data";

export default function BlogPreview() {
  const posts = blogPosts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  const [lead, ...rest] = posts;
  if (!lead) return null;

  return (
    <section className="relative bg-page py-20 lg:py-28 border-t border-border" aria-labelledby="journal-heading">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-secondary/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
                <BookOpen className="h-3.5 w-3.5 text-brand" />
                The Breeder Journal
              </div>
              <h2 id="journal-heading" className="mt-4 font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl lg:text-5xl">
                Notes on Care, <span className="text-brand">Breeding & Water</span>
              </h2>
              <p className="mt-3 text-sm text-body">
                Field knowledge directly from our Kanyakumari breeding rooms — water chemistry, selective genetics, and conditioning.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand hover:text-brand-hover transition-colors font-sans"
            >
              All Articles
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Lead article */}
          <Reveal className="lg:col-span-7">
            <article className="group h-full flex flex-col rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-card hover:shadow-card-hover transition-all duration-300">
              <Link href={`/blog/${lead.slug}`} className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-brand border border-border">
                      {lead.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                      <Clock className="h-3.5 w-3.5 text-gold" />
                      {lead.readTime}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-2xl sm:text-3xl font-bold text-heading group-hover:text-brand transition-colors leading-snug">
                    {lead.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-body">
                    {lead.excerpt}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-border flex items-center justify-between text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(lead.publishedAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-brand group-hover:translate-x-1 transition-transform">
                    Read article <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </article>
          </Reveal>

          {/* Secondary list */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {rest.map((post, i) => (
              <Reveal key={post.id} delay={i * 80}>
                <article className="group rounded-2xl border border-border bg-surface p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
                  <Link href={`/blog/${post.slug}`} className="flex items-start gap-5">
                    <span className="text-2xl font-bold text-brand/25 font-mono">
                      0{i + 2}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-brand">
                          {post.category}
                        </span>
                        <span className="text-xs text-muted">
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-base font-bold text-heading group-hover:text-brand transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-body">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
