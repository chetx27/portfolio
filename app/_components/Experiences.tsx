'use client';
import { MY_EXPERIENCE } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';
import ExperienceHeading from './ExperienceHeading';
import ExperienceTile from './ExperienceTile';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Experiences = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from('.exp-card', {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
            });
        },
        { scope: containerRef },
    );

    return (
        <section className="py-section w-full" id="my-experience">
            <div className="container w-full" ref={containerRef}>
                <ExperienceHeading />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 w-full">
                    {MY_EXPERIENCE.map((item, index) => (
                        <ExperienceTile
                            key={item.company}
                            item={item}
                            wide={index === MY_EXPERIENCE.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experiences;
