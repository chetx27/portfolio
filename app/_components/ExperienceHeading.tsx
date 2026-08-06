'use client';
import { useEffect, useRef } from 'react';
import { animate, svg, stagger } from 'animejs';

const ExperienceHeading = () => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;

        const run = () => {
            if (started.current) return;
            started.current = true;

            const lines = el.querySelectorAll('.line');
            if (!lines.length) return;

            animate(svg.createDrawable(lines), {
                draw: ['0 0', '0 1', '1 1'],
                ease: 'inOutQuad',
                duration: 2000,
                delay: stagger(80),
                loop: true,
                loopDelay: 3000,
            });
        };

        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) run();
            },
            { threshold: 0.4 },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={wrapRef} className="mb-10 md:mb-12 w-full">
            <h2
                className="font-anton text-[clamp(2.5rem,10vw,5.5rem)] leading-none text-primary lowercase mb-5"
                aria-label="experience"
            >
                experience
            </h2>

            <svg
                className="block h-[3px] w-full text-primary"
                viewBox="0 0 800 3"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path
                    className="line"
                    d="M0 1.5 L800 1.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="none"
                />
            </svg>
            <svg
                className="block h-[2px] w-[78%] mt-2 text-muted-foreground"
                viewBox="0 0 624 2"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path
                    className="line"
                    d="M0 1 L624 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                />
            </svg>
            <svg
                className="block h-[2px] w-[52%] mt-2 text-muted-foreground/60"
                viewBox="0 0 416 2"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path
                    className="line"
                    d="M0 1 L416 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                />
            </svg>
            <svg
                className="block h-[2px] w-[30%] mt-2 text-muted-foreground/40"
                viewBox="0 0 240 2"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path
                    className="line"
                    d="M0 1 L240 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                />
            </svg>
        </div>
    );
};

export default ExperienceHeading;
