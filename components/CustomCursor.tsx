'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);

    useGSAP((_, contextSafe) => {
        if (window.innerWidth < 768) return;

        const cursor = cursorRef.current;
        if (!cursor) return;

        gsap.set(cursor, {
            xPercent: -50,
            yPercent: -50,
            opacity: 0,
        });

        const xTo = gsap.quickTo(cursor, 'x', {
            duration: 0.015,
            ease: 'power3.out',
        });
        const yTo = gsap.quickTo(cursor, 'y', {
            duration: 0.055,
            ease: 'power2.out',
        });

        const handleMouseMove = contextSafe?.((e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
            gsap.to(cursor, {
                opacity: 1,
                duration: 0.12,
                overwrite: 'auto',
            });
        }) as EventListener;

        const handleMouseLeave = contextSafe?.(() => {
            gsap.to(cursor, { opacity: 0, duration: 0.15 });
        }) as EventListener;

        const handleMouseEnter = contextSafe?.(() => {
            gsap.to(cursor, { opacity: 1, duration: 0.12 });
        }) as EventListener;

        window.addEventListener('mousemove', handleMouseMove);
        document.documentElement.addEventListener(
            'mouseleave',
            handleMouseLeave,
        );
        document.documentElement.addEventListener(
            'mouseenter',
            handleMouseEnter,
        );

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.documentElement.removeEventListener(
                'mouseleave',
                handleMouseLeave,
            );
            document.documentElement.removeEventListener(
                'mouseenter',
                handleMouseEnter,
            );
        };
    });

    return (
        <div
            ref={cursorRef}
            id="cursor"
            className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
            aria-hidden="true"
        >
            <svg
                width="27"
                height="30"
                viewBox="0 0 27 30"
                fill="none"
                strokeWidth="2"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_0_8px_rgba(0,255,120,0.35)]"
            >
                <path
                    d="M20.0995 11.0797L3.72518 1.13204C2.28687 0.258253 0.478228 1.44326 0.704999 3.11083L3.28667 22.0953C3.58333 24.2768 7.33319 24.6415 8.3792 22.7043C9.5038 20.6215 10.8639 18.7382 12.43 17.7122C13.996 16.6861 16.2658 16.1911 18.6244 15.9918C20.8181 15.8063 21.9811 12.2227 20.0995 11.0797Z"
                    className="fill-primary stroke-background/60"
                />
            </svg>
        </div>
    );
};

export default CustomCursor;
