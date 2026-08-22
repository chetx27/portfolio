'use client';
import { IExperience } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

interface Props {
    item: IExperience;
    wide?: boolean;
}

const ExperienceTile = ({ item, wide }: Props) => {
    const tileRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const { contextSafe } = useGSAP(() => {}, { scope: tileRef });

    const roleTitle = item.roles[0].title;

    const handleMouseMove = contextSafe?.((e: React.MouseEvent) => {
        const title = titleRef.current;
        if (!title) return;

        const rect = tileRef.current!.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        gsap.to(title, {
            x: x * 40,
            y: y * 16,
            duration: 0.5,
            ease: 'power2.out',
        });
    });

    const resetTitle = contextSafe?.(() => {
        const title = titleRef.current;
        if (!title) return;
        gsap.to(title, { x: 0, y: 0, duration: 0.6, ease: 'power3.out' });
    });

    return (
        <article
            ref={tileRef}
            className={`exp-card exp-bento-tile flex w-full flex-col p-6 md:p-8 min-h-[260px] md:min-h-[300px] ${
                wide ? 'md:col-span-2' : ''
            }`}
            style={{
                backgroundColor: item.blockColor,
                color: item.blockTextColor,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTitle}
        >
            <div className="flex items-center gap-4 mb-6">
                <div className="size-11 shrink-0 rounded-lg bg-black/10 flex items-center justify-center">
                    <Image
                        src={item.logo}
                        alt=""
                        width={32}
                        height={32}
                        className="size-7 object-contain"
                        unoptimized
                    />
                </div>
                <div>
                    <p className="text-base md:text-lg font-medium leading-tight">
                        {item.company}
                    </p>
                    {item.location && (
                        <p className="text-xs md:text-sm opacity-70 mt-0.5">
                            {item.location}
                        </p>
                    )}
                </div>
            </div>

            <h3
                ref={titleRef}
                className="font-anton text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] will-change-transform mb-auto"
            >
                {roleTitle}
            </h3>

            <div className="mt-8 pt-5 border-t border-current/15 space-y-3">
                {item.roles.map((role) => (
                    <div key={role.title} className="space-y-1.5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-sm">
                            <span className="font-medium">{role.title}</span>
                            <span className="opacity-70 text-xs sm:text-sm">
                                {role.duration}
                            </span>
                        </div>
                        {role.contribution && (
                            <p className="text-xs md:text-sm opacity-75 leading-relaxed max-w-prose">
                                {role.contribution}
                            </p>
                        )}
                    </div>
                ))}
                {item.roles.some((r) => r.skills?.length) && (
                    <div className="flex flex-wrap gap-2 pt-1">
                        {item.roles.flatMap((r) => r.skills ?? []).map((s) => (
                            <span
                                key={s}
                                className="text-xs px-2.5 py-1 rounded-full border border-current/25"
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
};

export default ExperienceTile;
