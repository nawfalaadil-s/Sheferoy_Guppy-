import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
    <section className="grain bg-ivory py-20 text-obsidian lg:py-28" aria-labelledby="journal-heading">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-editorial text-gold-dark">
                The Journal
              </p>
              <h2 id="journal-heading" className="display-2 mt-4 text-obsidian">
                Notes on Care, <span className="font-display italic text-gold-dark">Breeding & Water</span>
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex shrink-0 items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-gold-dark transition-colors hover:text-obsidian"
            >
              All articles
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          {/* Lead article */}
          <Reveal className="lg:col-span-7">
            <article className="group">
              <Link href={`/blog/${lead.slug}`} className="block">
                <div className="relative overflow-hidden rounded-2xl bg-obsidian">
                  <div className="absolute inset-0 bg-[radial-gradient(75%_80%_at_50%_40%,rgba(199,164,90,0.16)_0%,rgba(9,11,13,0)_70%)]" aria-hidden="true" />
                  <div className="relative flex aspect-[16/9] items-end p-7">
                    <div>
                      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-light">
                        {lead.category}
                      </p>
                      <h3 className="display-3 mt-2 max-w-md font-display text-ivory transition-colors group-hover:text-gold-light">
                        {lead.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-obsidian/65">{lead.excerpt}</p>
                <p className="mt-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-obsidian/45">
                  {new Date(lead.publishedAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  · {lead.readTime}
                </p>
              </Link>
            </article>
          </Reveal>

          {/* Secondary list */}
          <div className="lg:col-span-5">
            <div className="divide-y divide-obsidian/10 border-y border-obsidian/10">
              {rest.map((post, i) => (
                <Reveal key={post.id} delay={i * 120}>
                  <article className="group py-6 first:pt-0">
                    <Link href={`/blog/${post.slug}`} className="flex items-start gap-5">
                      <span className="font-display text-3xl text-gold-dark/50">
                        {String(i + 2).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-dark">
                          {post.category}
                        </p>
                        <h3 className="mt-1.5 font-display text-2xl leading-snug text-obsidian transition-colors group-hover:text-gold-dark">
                          {post.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-obsidian/60">
                          {post.excerpt}
                        </p>
                        <p className="mt-3 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-obsidian/40">
                          {post.readTime}
                        </p>
                      </div>
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
