'use client';

import { cn } from '@/lib/utils';
import type { IProject } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ArrowUpRight, Github } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

type ProjectTheme = {
    panel: string;
    text: string;
    glow: string;
    muted: string;
};

const PROJECT_THEMES: Record<string, ProjectTheme> = {
    tarang4all: {
        panel: '#485d60',
        text: '#e3eae4',
        glow: 'rgba(181, 199, 183, 0.55)',
        muted: 'rgba(227, 234, 228, 0.78)',
    },
    rootfood: {
        panel: '#738296',
        text: '#e3eae4',
        glow: 'rgba(227, 234, 228, 0.45)',
        muted: 'rgba(227, 234, 228, 0.82)',
    },
    ragepaint: {
        panel: '#b5c7b7',
        text: '#0c100c',
        glow: 'rgba(72, 93, 96, 0.35)',
        muted: 'rgba(12, 16, 12, 0.72)',
    },
    trinetraai: {
        panel: '#485d60',
        text: '#e3eae4',
        glow: 'rgba(115, 130, 150, 0.5)',
        muted: 'rgba(227, 234, 228, 0.78)',
    },
    canopy: {
        panel: '#e3eae4',
        text: '#0c100c',
        glow: 'rgba(181, 199, 183, 0.5)',
        muted: 'rgba(12, 16, 12, 0.68)',
    },
};

const DEFAULT_THEME: ProjectTheme = PROJECT_THEMES.tarang4all;

type GlassProjectCardProps = {
    project: IProject;
    index: number;
    totalCards: number;
};

function GlassProjectCard({ project, index, totalCards }: GlassProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const href = project.sourceCode ?? project.liveUrl ?? '#';
    const theme = PROJECT_THEMES[project.slug] ?? DEFAULT_THEME;
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
                className="relative w-[min(96vw,1120px)]"
                style={{
                    top: `calc(-2vh + ${index * 16}px)`,
                    transformOrigin: 'top',
                }}
            >
                <div
                    className="absolute -inset-1 rounded-[30px] opacity-80 blur-sm"
                    style={{
                        background: `linear-gradient(135deg, ${theme.glow}, transparent 55%, ${theme.glow})`,
                    }}
                />

                <article className="glass-project-card relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0c100c]">
                    <div className="grid min-h-[520px] lg:min-h-[580px] lg:grid-cols-[1.15fr_0.85fr]">
                        <div className="relative min-h-[280px] overflow-hidden border-b border-white/10 lg:min-h-full lg:border-b-0 lg:border-r lg:border-white/10">
                            <Image
                                src={project.longThumbnail}
                                alt={project.title}
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 1024px) 96vw, 640px"
                                priority={index === 0}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0c100c]/90 via-[#0c100c]/15 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#0c100c]/10 lg:to-[#0c100c]/75" />

                            <span
                                className="absolute left-6 top-6 rounded-full border px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur-md"
                                style={{
                                    borderColor: `${theme.text}33`,
                                    backgroundColor: `${theme.panel}cc`,
                                    color: theme.text,
                                }}
                            >
                                _{(index + 1).toString().padStart(2, '0')}
                            </span>
                        </div>

                        <div
                            className="relative flex flex-col justify-center gap-6 p-7 sm:p-9 lg:p-10"
                            style={{
                                backgroundColor: theme.panel,
                                color: theme.text,
                            }}
                        >
                            <div
                                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                                style={{
                                    backgroundImage:
                                        'radial-gradient(circle at 20% 20%, white 1px, transparent 2px), radial-gradient(circle at 80% 70%, white 1px, transparent 2px)',
                                    backgroundSize: '28px 28px, 34px 34px',
                                }}
                            />

                            <div className="relative">
                                <p
                                    className="text-[11px] font-medium uppercase tracking-[0.32em]"
                                    style={{ color: theme.muted }}
                                >
                                    {project.year} · Selected work
                                </p>
                                <h3 className="mt-3 font-anton text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[0.95] lowercase">
                                    {project.title}
                                </h3>
                            </div>

                            <p
                                className="relative max-w-[40ch] text-[15px] leading-relaxed sm:text-base"
                                style={{ color: theme.muted }}
                            >
                                {project.description}
                            </p>

                            <div className="relative flex flex-wrap gap-2.5">
                                {project.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-full border px-3.5 py-1.5 text-xs font-medium"
                                        style={{
                                            borderColor: isLight
                                                ? 'rgba(12,16,12,0.18)'
                                                : 'rgba(227,234,228,0.22)',
                                            backgroundColor: isLight
                                                ? 'rgba(12,16,12,0.06)'
                                                : 'rgba(0,0,0,0.12)',
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
                                        className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition hover:scale-[1.03]"
                                        style={{
                                            backgroundColor: isLight
                                                ? '#0c100c'
                                                : '#e3eae4',
                                            color: isLight
                                                ? '#e3eae4'
                                                : '#0c100c',
                                        }}
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
                                        className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition hover:scale-[1.03]"
                                        style={{
                                            borderColor: isLight
                                                ? 'rgba(12,16,12,0.25)'
                                                : 'rgba(227,234,228,0.35)',
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
                                        className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition hover:scale-[1.03]"
                                        style={{
                                            borderColor: isLight
                                                ? 'rgba(12,16,12,0.25)'
                                                : 'rgba(227,234,228,0.35)',
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
