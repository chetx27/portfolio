'use client';
import SectionTitle from '@/components/SectionTitle';
import { GENERAL_INFO } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const theme = {
    dark: ['#0c100c', '#485d60', '#738296', '#b5c7b7', '#e3eae4'],
};

const GitHubCalendar = dynamic(
    () =>
        import('react-github-calendar').then((mod) => mod.GitHubCalendar),
    {
        ssr: false,
        loading: () => (
            <div className="h-[120px] flex items-center justify-center text-sm text-muted-foreground">
                Loading contributions…
            </div>
        ),
    },
);

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
                            className="text-primary underline-offset-4 hover:underline"
                        >
                            @{GENERAL_INFO.githubUser}
                        </a>
                    </p>
                </div>
                <div
                    className="github-reveal overflow-x-auto rounded-xl border border-border bg-background-light/20 backdrop-blur-sm p-4 md:p-6"
                >
                    <GitHubCalendar
                        username={GENERAL_INFO.githubUser}
                        colorScheme="dark"
                        theme={theme}
                        blockSize={12}
                        blockMargin={4}
                        fontSize={12}
                    />
                </div>
            </div>
        </section>
    );
};

export default GithubActivity;
