'use client';

import TransitionLink from '@/components/TransitionLink';
import { cn } from '@/lib/utils';
import type { IProject } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ArrowUpRight, Github } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

type GlassProjectCardProps = {
    project: IProject;
    index: number;
    totalCards: number;
};

function GlassProjectCard({ project, index, totalCards }: GlassProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const techSignal = project.techStack.join(' · ');

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
            className="flex h-[105vh] max-md:h-auto max-md:min-h-0 items-center justify-center sticky max-md:relative top-[6vh] max-md:top-0 max-md:mb-8"
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
                <div className="absolute -inset-1.5 rounded-[32px] bg-primary/10 opacity-60 blur-md max-md:hidden" />

                <article className="glass-project-card relative overflow-hidden rounded-[30px] max-md:rounded-2xl border border-border/60 bg-background">
                    <div className="grid min-h-[560px] max-md:min-h-0 lg:min-h-[640px] lg:grid-cols-[1.15fr_0.85fr]">
                        <div className="relative min-h-[240px] sm:min-h-[300px] overflow-hidden border-b border-border/40 lg:min-h-full lg:border-b-0 lg:border-r lg:border-border/40">
                            <Image
                                src={project.longThumbnail}
                                alt={project.title}
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 1024px) 98vw, 720px"
                                priority={index === 0}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-background/15 lg:to-background/80" />

                            <span className="absolute left-5 top-5 sm:left-7 sm:top-7 rounded-full border border-primary/30 bg-background/80 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-primary backdrop-blur-md">
                                _{(index + 1).toString().padStart(2, '0')}
                            </span>
                        </div>

                        <div className="relative flex flex-col justify-center gap-5 sm:gap-7 p-6 sm:p-10 lg:p-12 bg-background-light/15">
                            <div className="relative">
                                <p className="text-xs font-medium uppercase tracking-[0.32em] text-muted-foreground sm:text-[13px]">
                                    {project.year} · Selected work
                                </p>
                                <h3 className="mt-3 font-anton text-[clamp(2rem,6vw,4.25rem)] leading-[0.95] lowercase text-primary">
                                    {project.title}
                                </h3>
                            </div>

                            <p className="relative max-w-[42ch] text-base leading-relaxed text-foreground sm:text-[17px]">
                                {project.description}
                            </p>

                            <p className="relative max-w-[44ch] text-sm leading-relaxed text-muted-foreground font-medium tracking-wide">
                                {techSignal}
                            </p>

                            {project.highlight && (
                                <p className="relative max-w-[44ch] text-sm leading-relaxed text-muted-foreground border-l-2 border-primary/40 pl-4">
                                    {project.highlight}
                                </p>
                            )}

                            <div className="relative flex flex-wrap gap-2.5 pt-1">
                                {project.sourceCode && (
                                    <a
                                        href={project.sourceCode}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary-foreground transition duration-200 hover:scale-[1.02] hover:brightness-105"
                                    >
                                        <Github size={15} />
                                        GitHub
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-border/60 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground transition duration-200 hover:scale-[1.02] hover:border-primary/50 hover:text-primary"
                                    >
                                        Live demo
                                        <ArrowUpRight size={15} />
                                    </a>
                                )}
                                <TransitionLink
                                    href={`/projects/${project.slug}`}
                                    className="inline-flex items-center gap-2 rounded-full border border-border/60 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground transition duration-200 hover:scale-[1.02] hover:border-primary/50 hover:text-primary"
                                >
                                    Case study
                                    <ArrowUpRight size={15} />
                                </TransitionLink>
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
