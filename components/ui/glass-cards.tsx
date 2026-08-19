'use client';

import { cn } from '@/lib/utils';
import type { IProject } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ArrowUpRight, Github } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

/** Same bento palette as experience + blog sections */
const SITE_BENTO = [
    { panel: '#485d60', text: '#e3eae4', muted: 'rgba(227, 234, 228, 0.78)' },
    { panel: '#738296', text: '#e3eae4', muted: 'rgba(227, 234, 228, 0.82)' },
    { panel: '#485d60', text: '#e3eae4', muted: 'rgba(227, 234, 228, 0.78)' },
    { panel: '#b5c7b7', text: '#0c100c', muted: 'rgba(12, 16, 12, 0.72)' },
    { panel: '#e3eae4', text: '#0c100c', muted: 'rgba(12, 16, 12, 0.68)' },
] as const;

type GlassProjectCardProps = {
    project: IProject;
    index: number;
    totalCards: number;
};

function GlassProjectCard({ project, index, totalCards }: GlassProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const href = project.sourceCode ?? project.liveUrl ?? '#';
    const theme = SITE_BENTO[index % SITE_BENTO.length];
    const isLight = theme.text === '#0c100c';

    useEffect(() => {
        const card = cardRef.current;
        const container = containerRef.current;
        if (!card || !container) return;

        const targetScale = 1 - (totalCards - index - 1) * 0.022;

        gsap.set(card, { scale: 1, transformOrigin: 'center top' });

        const trigger = ScrollTrigger.create({
            trigger: container,
            start: 'top center',
            end: 'bottom center',
            scrub: 0.65,
            onUpdate: (self) => {
                const scale = gsap.utils.interpolate(
                    1,
                    targetScale,
                    self.progress,
                );
                gsap.set(card, {
                    scale: Math.max(scale, targetScale),
                    transformOrigin: 'center top',
                });
            },
        });

        return () => trigger.kill();
    }, [index, totalCards]);

    return (
        <div
            ref={containerRef}
            className="flex h-[105vh] items-center justify-center sticky top-[6vh]"
            style={{ zIndex: index + 20 }}
        >
            <div
                ref={cardRef}
                className="relative w-[min(98vw,1280px)]"
                style={{
                    top: `calc(-2vh + ${index * 18}px)`,
                    transformOrigin: 'top',
                }}
            >
                <div className="absolute -inset-1.5 rounded-[32px] bg-primary/15 opacity-70 blur-md" />

                <article className="glass-project-card relative overflow-hidden rounded-[30px] border border-border/60 bg-background">
                    <div className="grid min-h-[560px] lg:min-h-[640px] lg:grid-cols-[1.15fr_0.85fr]">
                        <div className="relative min-h-[300px] overflow-hidden border-b border-border/40 lg:min-h-full lg:border-b-0 lg:border-r lg:border-border/40">
                            <Image
                                src={project.longThumbnail}
                                alt={project.title}
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 1024px) 98vw, 720px"
                                priority={index === 0}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-background/15 lg:to-background/80" />

                            <span
                                className="absolute left-7 top-7 rounded-full border px-4 py-2 text-sm font-medium uppercase tracking-[0.2em] backdrop-blur-md"
                                style={{
                                    borderColor: `${theme.text}33`,
                                    backgroundColor: `${theme.panel}dd`,
                                    color: theme.text,
                                }}
                            >
                                _{(index + 1).toString().padStart(2, '0')}
                            </span>
                        </div>

                        <div
                            className="relative flex flex-col justify-center gap-7 p-8 sm:p-10 lg:p-12"
                            style={{
                                backgroundColor: theme.panel,
                                color: theme.text,
                            }}
                        >
                            <div className="relative">
                                <p
                                    className="text-xs font-medium uppercase tracking-[0.32em] sm:text-[13px]"
                                    style={{ color: theme.muted }}
                                >
                                    {project.year} · Selected work
                                </p>
                                <h3
                                    className={cn(
                                        'mt-3 font-anton text-[clamp(2.5rem,6vw,4.25rem)] leading-[0.95] lowercase',
                                        isLight ? 'text-[#0c100c]' : 'text-primary',
                                    )}
                                >
                                    {project.title}
                                </h3>
                            </div>

                            <p
                                className="relative max-w-[42ch] text-base leading-relaxed sm:text-[17px]"
                                style={{ color: theme.muted }}
                            >
                                {project.description}
                            </p>

                            <div className="relative flex flex-wrap gap-2.5">
                                {project.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-full border px-4 py-2 text-sm font-medium"
                                        style={{
                                            borderColor: isLight
                                                ? 'rgba(12,16,12,0.15)'
                                                : 'rgba(227,234,228,0.2)',
                                            backgroundColor: isLight
                                                ? 'rgba(12,16,12,0.05)'
                                                : 'rgba(0,0,0,0.1)',
                                            color: theme.text,
                                        }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="relative flex flex-wrap gap-3 pt-1">
                                {project.sourceCode && (
                                    <a
                                        href={project.sourceCode}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wider transition hover:scale-[1.03]',
                                            isLight
                                                ? 'bg-[#0c100c] text-[#e3eae4]'
                                                : 'bg-primary text-primary-foreground',
                                        )}
                                    >
                                        <Github size={15} />
                                        GitHub
                                    </a>
                                )}
                                {project.liveUrl ? (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold uppercase tracking-wider transition hover:scale-[1.03] hover:border-primary/50 hover:text-primary"
                                        style={{
                                            borderColor: isLight
                                                ? 'rgba(12,16,12,0.22)'
                                                : 'rgba(227,234,228,0.3)',
                                            color: theme.text,
                                        }}
                                    >
                                        Live demo
                                        <ArrowUpRight size={15} />
                                    </a>
                                ) : (
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold uppercase tracking-wider transition hover:scale-[1.03] hover:border-primary/50 hover:text-primary"
                                        style={{
                                            borderColor: isLight
                                                ? 'rgba(12,16,12,0.22)'
                                                : 'rgba(227,234,228,0.3)',
                                            color: theme.text,
                                        }}
                                    >
                                        View repo
                                        <ArrowUpRight size={15} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}

type StackedProjectCardsProps = {
    projects: IProject[];
    className?: string;
};

export function StackedProjectCards({
    projects,
    className,
}: StackedProjectCardsProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        gsap.fromTo(
            section,
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: 'power2.out' },
        );
    }, []);

    return (
        <div ref={sectionRef} className={cn('relative w-full', className)}>
            {projects.map((project, index) => (
                <GlassProjectCard
                    key={project.slug}
                    project={project}
                    index={index}
                    totalCards={projects.length}
                />
            ))}
        </div>
    );
}

export default StackedProjectCards;
