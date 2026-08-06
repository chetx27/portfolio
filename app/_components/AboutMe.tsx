'use client';
import { Terminal } from '@/components/ui/terminal';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TERMINAL_LINES = [
    'Full stack developer with a UI/UX mindset.',
    'Shipping signal dashboards, accessibility tools, ecommerce.',
    'Next.js · React · Python · computer vision.',
];

const AboutMe = () => {
    const container = React.useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from('.slide-up-and-fade', {
                y: 60,
                opacity: 0,
                stagger: 0.06,
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top 78%',
                },
            });
        },
        { scope: container },
    );

    return (
        <section className="py-section" id="about-me">
            <div className="container" ref={container}>
                <h2 className="text-2xl md:text-4xl font-light mb-8 slide-up-and-fade max-w-3xl leading-snug">
                    I merge engineering with design — every interface should
                    feel intentional, and every system should scale.
                </h2>

                <p className="pb-3 border-b border-border text-muted-foreground text-sm slide-up-and-fade">
                    This is me.
                </p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    <div className="md:col-span-3 slide-up-and-fade flex justify-center md:justify-start">
                        <div className="relative w-[200px] h-[280px] md:w-[220px] md:h-[300px] shrink-0 overflow-hidden rounded-lg border border-border/50 bg-background-light/10">
                            <Image
                                src="/chethana.jpg"
                                alt="Chethana G"
                                fill
                                className="object-cover object-[center_15%]"
                                sizes="220px"
                                priority
                            />
                        </div>
                    </div>

                    <div className="md:col-span-9 slide-up-and-fade space-y-5">
                        <p className="text-3xl md:text-4xl font-anton leading-tight">
                            Hi, I&apos;m Chethana.
                        </p>
                        <Terminal lines={TERMINAL_LINES} typingSpeed={22} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
