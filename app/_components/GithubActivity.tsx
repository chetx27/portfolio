'use client';
import SectionTitle from '@/components/SectionTitle';
import { GENERAL_INFO } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const theme = {
    dark: ['#0c100c', '#485d60', '#738296', '#b5c7b7', '#e3eae4'],
};

function CalendarSkeleton() {
    return (
        <div className="flex flex-col gap-3" aria-hidden="true">
            <div className="flex gap-1">
                {Array.from({ length: 53 }).map((_, i) => (
                    <div
                        key={i}
                        className="size-3 rounded-sm bg-border/40 animate-pulse"
                        style={{ animationDelay: `${(i % 7) * 80}ms` }}
                    />
                ))}
            </div>
            <div className="flex gap-1">
                {Array.from({ length: 53 }).map((_, i) => (
                    <div
                        key={i}
                        className="size-3 rounded-sm bg-border/30 animate-pulse"
                        style={{ animationDelay: `${(i % 5) * 60}ms` }}
                    />
                ))}
            </div>
            <p className="text-xs text-muted-foreground/60 mt-1">
                Loading contribution graph…
            </p>
        </div>
    );
}

function CalendarFallback() {
    return (
        <div className="flex flex-col items-start gap-4 py-4">
            <p className="text-sm text-muted-foreground max-w-[36ch] leading-relaxed">
                Contribution graph unavailable right now — view activity
                directly on GitHub.
            </p>
            <a
                href={GENERAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 px-5 py-2.5 text-sm font-medium text-primary transition duration-200 hover:border-primary/50"
            >
                View @{GENERAL_INFO.githubUser} on GitHub →
            </a>
        </div>
    );
}

const GitHubCalendar = dynamic(
    () =>
        import('react-github-calendar').then((mod) => mod.GitHubCalendar),
    {
        ssr: false,
        loading: () => <CalendarSkeleton />,
    },
);

function GitHubCalendarWrapper() {
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
        'loading',
    );
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (status === 'loading') {
                setStatus('error');
            }
        }, 12000);

        return () => clearTimeout(timeout);
    }, [status]);

    useEffect(() => {
        if (status !== 'loading') return;

        const container = containerRef.current;
        if (!container) return;

        const observer = new MutationObserver(() => {
            const hasBlocks = container.querySelector('rect, svg');
            if (hasBlocks) {
                setStatus('ready');
            }
        });

        observer.observe(container, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, [status]);

    if (status === 'error') {
        return <CalendarFallback />;
    }

    return (
        <div ref={containerRef}>
            {status === 'loading' && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-background-light/10 backdrop-blur-[1px] rounded-lg">
                    <CalendarSkeleton />
                </div>
            )}
            <GitHubCalendar
                username={GENERAL_INFO.githubUser}
                colorScheme="dark"
                theme={theme}
                blockSize={12}
                blockMargin={4}
                fontSize={12}
            />
        </div>
    );
}

const GithubActivity = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from('.github-reveal', {
                y: 32,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.08,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 90%',
                },
            });
        },
        { scope: containerRef },
    );

    return (
        <section
            className="py-12 md:py-16 border-t border-border/40"
            id="github"
            ref={containerRef}
        >
            <div className="container">
                <div className="github-reveal">
                    <SectionTitle title="GitHub Activity" />
                    <p className="mb-8 max-w-[42ch] text-muted-foreground">
                        Commits, PRs, and late-night pushes —{' '}
                        <a
                            href={GENERAL_INFO.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline-offset-4 hover:underline transition-colors duration-200"
                        >
                            @{GENERAL_INFO.githubUser}
                        </a>
                    </p>
                </div>
                <div className="github-reveal relative overflow-x-auto rounded-xl border border-border bg-background-light/20 backdrop-blur-sm p-4 md:p-6">
                    <GitHubCalendarWrapper />
                </div>
            </div>
        </section>
    );
};

export default GithubActivity;
