'use client';
import { BLOG_POSTS, GENERAL_INFO } from '@/lib/data';
import { useRef } from 'react';

const Blog = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section
            className="pt-section pb-section w-full border-t border-border/40"
            id="blog"
            ref={containerRef}
        >
            <div className="container w-full">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground mb-3">
                            Thinking in public
                        </p>
                        <h2 className="font-anton text-[clamp(2.5rem,8vw,4rem)] leading-none text-primary lowercase">
                            writing.
                        </h2>
                        <p className="mt-4 max-w-[42ch] text-muted-foreground text-sm md:text-base leading-relaxed">
                            I don&apos;t just build things — I write about
                            tech, culture, and the questions that come up while
                            shipping.
                        </p>
                    </div>
                </div>

                <a
                    href={GENERAL_INFO.medium}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-card group flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full p-6 md:p-8 mb-5 rounded-xl border border-primary/30 bg-primary/5 no-underline transition duration-200 hover:bg-primary/10 hover:border-primary"
                >
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full bg-foreground/10 flex items-center justify-center shrink-0">
                            <MediumIcon />
                        </div>
                        <div>
                            <p className="font-anton text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors duration-200">
                                @chetx27
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Essays on tech, culture & building — read on
                                Medium
                            </p>
                        </div>
                    </div>
                    <span className="text-sm text-primary shrink-0">
                        View all stories →
                    </span>
                </a>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 w-full">
                    {BLOG_POSTS.map((post) => (
                        <BlogCard key={post.url} post={post} />
                    ))}
                </div>
            </div>
        </section>
    );
};

function BlogCard({ post }: { post: (typeof BLOG_POSTS)[number] }) {
    return (
        <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-card group flex w-full flex-col p-6 md:p-8 min-h-[260px] rounded-xl no-underline transition duration-200 hover:scale-[1.01] hover:opacity-95"
            style={{
                backgroundColor: post.blockColor,
                color: post.blockTextColor,
            }}
        >
            <p className="text-xs uppercase tracking-widest opacity-70 mb-3">
                Medium · {post.date}
            </p>

            <h3 className="font-anton text-[clamp(1.25rem,3.5vw,2.25rem)] leading-[1.05] mb-4 group-hover:translate-x-1 transition-transform duration-200">
                {post.title}
            </h3>

            <p className="text-sm opacity-85 leading-relaxed mb-auto line-clamp-3">
                {post.excerpt}
            </p>

            <div className="mt-6 pt-4 border-t border-current/15 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                        <span
                            key={t}
                            className="text-xs px-2.5 py-1 rounded-full border border-current/25"
                        >
                            {t}
                        </span>
                    ))}
                </div>
                <span className="text-xs font-medium opacity-80">
                    {post.readTime} →
                </span>
            </div>
        </a>
    );
}

function MediumIcon() {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-foreground"
        >
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
    );
}

export default Blog;
