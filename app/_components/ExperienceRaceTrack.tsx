'use client';

import { MY_EXPERIENCE } from '@/lib/data';

const TICKER_ITEMS = MY_EXPERIENCE.flatMap((exp) =>
    exp.roles.map((r) => `${r.title} · ${exp.company}`),
);

export default function ExperienceRaceTrack() {
    const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

    return (
        <div className="relative mb-8 overflow-hidden rounded-lg border border-border/60 bg-background-light/10 py-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent z-[1]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent z-[1]" />
            <div
                className="flex gap-10 whitespace-nowrap animate-exp-ticker"
                style={{ animationDuration: `${TICKER_ITEMS.length * 3}s` }}
            >
                {items.map((label, i) => (
                    <span
                        key={`${label}-${i}`}
                        className="font-anton text-sm md:text-base uppercase tracking-wide text-muted-foreground shrink-0"
                    >
                        {label}
                        <span className="mx-4 text-primary opacity-50">◆</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
