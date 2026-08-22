'use client';
import TransitionLink from '@/components/TransitionLink';
import { IProject } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

interface Props {
    project: IProject;
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ProjectDetails = ({ project }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const caseStudy = project.caseStudy;
    const techSignal = project.techStack.join(' · ');

    useGSAP(
        () => {
            if (!containerRef.current) return;

            gsap.set('.fade-in-later', {
                autoAlpha: 0,
                y: 24,
            });
            const tl = gsap.timeline({ delay: 0.35 });

            tl.to('.fade-in-later', {
                autoAlpha: 1,
                y: 0,
                stagger: 0.08,
                duration: 0.5,
                ease: 'power2.out',
            });
        },
        { scope: containerRef },
    );

    return (
        <section className="pt-5 pb-section">
            <div className="container" ref={containerRef}>
                <TransitionLink
                    back
                    href="/#selected-projects"
                    className="mb-10 md:mb-14 inline-flex gap-2 items-center group h-12 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                    <ArrowLeft className="size-5 group-hover:-translate-x-1 group-hover:text-primary transition-all duration-200" />
                    Back to projects
                </TransitionLink>

                {/* Hero */}
                <div className="fade-in-later relative mb-12 md:mb-16 overflow-hidden rounded-2xl border border-border/60">
                    <div className="relative aspect-[16/9] sm:aspect-[21/9] min-h-[220px]">
                        <Image
                            src={project.longThumbnail}
                            alt={project.title}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, 1280px"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                            <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground mb-3">
                                {project.year} · Case study
                            </p>
                            <h1 className="font-anton text-[clamp(2.5rem,8vw,5rem)] leading-[0.95] lowercase text-primary">
                                {project.title}
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-16 max-w-5xl">
                    {/* Main content */}
                    <div className="space-y-10">
                        <div className="fade-in-later">
                            <p className="text-xl md:text-2xl leading-relaxed text-foreground">
                                {project.description}
                            </p>
                            {project.highlight && (
                                <p className="mt-4 text-muted-foreground leading-relaxed border-l-2 border-primary/40 pl-4">
                                    {project.highlight}
                                </p>
                            )}
                        </div>

                        {caseStudy && (
                            <>
                                <div className="fade-in-later space-y-3">
                                    <h2 className="font-anton text-sm uppercase tracking-[0.2em] text-muted-foreground">
                                        The problem
                                    </h2>
                                    <p className="text-base md:text-lg leading-relaxed text-foreground/90">
                                        {caseStudy.problem}
                                    </p>
                                </div>

                                {caseStudy.whyInteresting && (
                                    <div className="fade-in-later space-y-3">
                                        <h2 className="font-anton text-sm uppercase tracking-[0.2em] text-muted-foreground">
                                            Why it&apos;s interesting
                                        </h2>
                                        <p className="text-base md:text-lg leading-relaxed text-foreground/90">
                                            {caseStudy.whyInteresting}
                                        </p>
                                    </div>
                                )}

                                <div className="fade-in-later space-y-4">
                                    <h2 className="font-anton text-sm uppercase tracking-[0.2em] text-muted-foreground">
                                        What I built
                                    </h2>
                                    <ul className="space-y-2.5">
                                        {caseStudy.built.map((item) => (
                                            <li
                                                key={item}
                                                className="flex gap-3 text-base leading-relaxed text-foreground/90"
                                            >
                                                <span className="text-primary shrink-0 mt-1.5 size-1.5 rounded-full bg-primary" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="fade-in-later space-y-4">
                                    <h2 className="font-anton text-sm uppercase tracking-[0.2em] text-muted-foreground">
                                        Technical components
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {caseStudy.technical.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-full border border-border/60 bg-background-light/20 px-3.5 py-1.5 text-sm text-foreground"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {caseStudy.challenge && (
                                    <div className="fade-in-later space-y-3">
                                        <h2 className="font-anton text-sm uppercase tracking-[0.2em] text-muted-foreground">
                                            What made it non-trivial
                                        </h2>
                                        <p className="text-base md:text-lg leading-relaxed text-foreground/90">
                                            {caseStudy.challenge}
                                        </p>
                                    </div>
                                )}

                                {caseStudy.impact && (
                                    <div className="fade-in-later space-y-3">
                                        <h2 className="font-anton text-sm uppercase tracking-[0.2em] text-muted-foreground">
                                            Impact
                                        </h2>
                                        <p className="text-base md:text-lg leading-relaxed text-foreground/90">
                                            {caseStudy.impact}
                                        </p>
                                    </div>
                                )}
                            </>
                        )}

                        {project.role && (
                            <div className="fade-in-later space-y-3">
                                <h2 className="font-anton text-sm uppercase tracking-[0.2em] text-muted-foreground">
                                    My role
                                </h2>
                                <p className="text-base leading-relaxed text-foreground/90">
                                    {project.role}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="fade-in-later space-y-6 lg:sticky lg:top-24 lg:self-start">
                        <div className="rounded-xl border border-border/60 bg-background-light/15 p-6 space-y-5">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                                    Stack
                                </p>
                                <p className="text-sm leading-relaxed text-foreground/90">
                                    {techSignal}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2.5 pt-2 border-t border-border/40">
                                {project.sourceCode && (
                                    <a
                                        href={project.sourceCode}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition duration-200 hover:brightness-105"
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
                                        className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-foreground transition duration-200 hover:border-primary/50 hover:text-primary"
                                    >
                                        Live demo
                                        <ArrowUpRight size={15} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>

                {project.images.length > 0 && (
                    <div
                        className="fade-in-later mt-16 flex flex-col gap-4 max-w-3xl mx-auto"
                        id="images"
                    >
                        {project.images.map((image) => (
                            <div
                                key={image}
                                className="relative w-full aspect-[750/400] overflow-hidden rounded-xl border border-border/60"
                            >
                                <Image
                                    src={image}
                                    alt={`${project.title} screenshot`}
                                    fill
                                    className="object-cover"
                                    sizes="800px"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectDetails;
