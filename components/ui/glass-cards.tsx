'use client';

import { cn } from '@/lib/utils';
import type { IProject } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ArrowUpRight, Github } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const PROJECT_GLOW = [
    'rgba(181, 199, 183, 0.85)',
    'rgba(115, 130, 150, 0.9)',
    'rgba(227, 234, 228, 0.75)',
    'rgba(72, 93, 96, 0.95)',
    'rgba(127, 190, 150, 0.8)',
] as const;

const PROJECT_GLOW_SOFT = [
    'rgba(181, 199, 183, 0.35)',
    'rgba(115, 130, 150, 0.4)',
    'rgba(227, 234, 228, 0.3)',
    'rgba(72, 93, 96, 0.45)',
    'rgba(127, 190, 150, 0.35)',
] as const;

type GlassProjectCardProps = {
    project: IProject;
    index: number;
    totalCards: number;
    color: string;
};

function GlassProjectCard({
    project,
    index,
    totalCards,
    color,
}: GlassProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const href = project.sourceCode ?? project.liveUrl ?? '#';

    useEffect(() => {
        const card = cardRef.current;
        const container = containerRef.current;
        if (!card || !container) return;

        const targetScale = 1 - (totalCards - index) * 0.045;

        gsap.set(card, { scale: 1, transformOrigin: 'center top' });

        const trigger = ScrollTrigger.create({
            trigger: container,
            start: 'top center',
            end: 'bottom center',
            scrub: 0.8,
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
            className="flex h-[100vh] items-center justify-center sticky top-0"
        >
            <div
                ref={cardRef}
                className="relative w-[min(92vw,920px)]"
                style={{
                    top: `calc(-4vh + ${index * 22}px)`,
                    transformOrigin: 'top',
                }}
            >
                <div
                    className="absolute -inset-[3px] rounded-[27px] -z-10"
                    style={{
                        background: `conic-gradient(from 0deg, transparent 0deg, ${color} 70deg, transparent 160deg, ${PROJECT_GLOW_SOFT[index % PROJECT_GLOW_SOFT.length]} 250deg, transparent 360deg)`,
                    }}
                />

                <article className="glass-project-card relative overflow-hidden rounded-3xl border border-white/15">
                    <div className="grid min-h-[420px] md:min-h-[460px] md:grid-cols-[1.05fr_0.95fr]">
                        <div className="relative min-h-[220px] overflow-hidden border-b border-white/10 md:min-h-0 md:border-b-0 md:border-r">
                            <Image
                                src={project.longThumbnail}
                                alt={project.title}
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 768px) 92vw, 460px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-background/10 md:to-background/70" />
                            <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-background/50 px-3 py-1 text-xs uppercase tracking-widest text-primary backdrop-blur-sm">
                                _{(index + 1).toString().padStart(2, '0')}
                            </span>
                        </div>

                        <div className="relative flex flex-col justify-center gap-5 p-6 sm:p-8">
                            <div>
                                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                                    {project.year}
                                </p>
                                <h3 className="mt-2 font-anton text-[clamp(2rem,5vw,3rem)] leading-none text-primary lowercase">
                                    {project.title}
                                </h3>
                            </div>

                            <p className="max-w-[38ch] text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-foreground/90"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-3 pt-2">
                                {project.sourceCode && (
                                    <a
                                        href={project.sourceCode}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs uppercase tracking-wider text-primary transition hover:bg-primary/20"
                                    >
                                        <Github size={14} />
                                        GitHub
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-wider text-foreground transition hover:border-primary/40 hover:text-primary"
                                    >
                                        Live
                                        <ArrowUpRight size={14} />
                                    </a>
                                )}
                                {!project.liveUrl && (
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-wider text-foreground transition hover:border-primary/40 hover:text-primary"
                                    >
                                        View
                                        <ArrowUpRight size={14} />
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
        <div ref={sectionRef} className={cn('w-full', className)}>
            {projects.map((project, index) => (
                <GlassProjectCard
                    key={project.slug}
                    project={project}
                    index={index}
                    totalCards={projects.length}
                    color={
                        PROJECT_GLOW[index % PROJECT_GLOW.length] ??
                        PROJECT_GLOW[0]
                    }
                />
            ))}
        </div>
    );
}

export default StackedProjectCards;
