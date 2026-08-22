'use client';
import SectionTitle from '@/components/SectionTitle';
import { MY_STACK } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CATEGORY_LABELS: Record<string, string> = {
    'AI / ML': 'AI / ML',
    'Systems / Backend': 'Systems / Backend',
    Frontend: 'Frontend',
    'Tools / Infrastructure': 'Tools / Infrastructure',
};

const Skills = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const slideUpEl =
                containerRef.current?.querySelectorAll('.slide-up');

            if (!slideUpEl?.length) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'bottom 80%',
                    scrub: 0.5,
                },
            });

            tl.from('.slide-up', {
                opacity: 0,
                y: 40,
                ease: 'none',
                stagger: 0.4,
            });
        },
        { scope: containerRef },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 50%',
                    end: 'bottom 10%',
                    scrub: 1,
                },
            });

            tl.to(containerRef.current, {
                y: -150,
                opacity: 0,
            });
        },
        { scope: containerRef },
    );

    return (
        <section className="py-section" id="my-stack" ref={containerRef}>
            <div className="container">
                <SectionTitle title="My Stack" />

                <p className="mb-12 max-w-[48ch] text-muted-foreground -mt-4">
                    Engineering areas I work in — not a resume dump, just where
                    most of my time goes.
                </p>

                <div className="space-y-10 md:space-y-12">
                    {Object.entries(MY_STACK).map(([key, skills]) => (
                        <div className="grid sm:grid-cols-12 gap-4" key={key}>
                            <div className="sm:col-span-4 md:col-span-3">
                                <p className="slide-up text-2xl md:text-3xl font-anton leading-none text-muted-foreground">
                                    {CATEGORY_LABELS[key] ?? key}
                                </p>
                            </div>

                            <div className="sm:col-span-8 md:col-span-9 flex flex-wrap gap-2.5">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className={cn(
                                            'slide-up inline-flex items-center rounded-full border border-border/60',
                                            'bg-background-light/20 px-4 py-2 text-sm md:text-base',
                                            'text-foreground transition-colors duration-200',
                                            'hover:border-primary/40 hover:bg-primary/5',
                                        )}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
