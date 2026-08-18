'use client';

import { CONTACT_LINKS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TICKET_W = 960;
const TICKET_H = 580;
const PERF = 728 / TICKET_W;

function ticketPath(w: number, h: number) {
    const r = (26 / TICKET_W) * w;
    const n = (20 / TICKET_W) * w;
    const p = PERF * w;

    return [
        `M ${r} 0`,
        `L ${p - n} 0`,
        `A ${n} ${n} 0 0 0 ${p + n} 0`,
        `L ${w - r} 0`,
        `A ${r} ${r} 0 0 0 ${w} ${r}`,
        `L ${w} ${h - r}`,
        `A ${r} ${r} 0 0 0 ${w - r} ${h}`,
        `L ${p + n} ${h}`,
        `A ${n} ${n} 0 0 0 ${p - n} ${h}`,
        `L ${r} ${h}`,
        `A ${r} ${r} 0 0 0 0 ${h - r}`,
        `L 0 ${r}`,
        `A ${r} ${r} 0 0 0 ${r} 0`,
        'Z',
    ].join(' ');
}

type ContactLink = (typeof CONTACT_LINKS)[number];

const ContactSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const clipPath = `path('${ticketPath(TICKET_W, TICKET_H)}')`;

    useGSAP(
        () => {
            gsap.from('.contact-ticket-wrap', {
                y: 48,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 88%',
                },
            });
        },
        { scope: sectionRef },
    );

    const handleCopy = async (id: string, value: string) => {
        await navigator.clipboard.writeText(value);
        setCopiedId(id);
        window.setTimeout(() => setCopiedId(null), 1800);
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="border-t border-border/40 py-section"
        >
            <div className="container flex justify-center px-4 sm:px-6">
                <div
                    className="contact-ticket-wrap contact-pass-ticket contact-ticket-huge relative w-full text-foreground"
                    style={{ clipPath }}
                >
                    <div className="relative z-[1] flex min-h-[580px]">
                        <div className="flex flex-1 flex-col px-8 py-10 sm:px-12 sm:py-12 md:px-14 md:py-14">
                            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                                Portfolio · General admission
                            </p>

                            <h2 className="mt-6 font-anton text-[clamp(3rem,10vw,5.5rem)] leading-[0.92] text-primary lowercase">
                                connect with me.
                            </h2>

                            <ul className="mt-10 space-y-3.5 sm:mt-12 sm:space-y-4">
                                {CONTACT_LINKS.map((link) => (
                                    <ContactRow
                                        key={link.id}
                                        link={link}
                                        copied={copiedId === link.id}
                                        onCopy={handleCopy}
                                    />
                                ))}
                            </ul>

                            <p className="mt-auto pt-10 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                                Chethana G · Bengaluru · 2026
                            </p>
                        </div>

                        <div className="relative w-[22%] min-w-[80px] shrink-0 border-l border-dashed border-primary/25 sm:min-w-[100px]">
                            <div className="absolute inset-y-0 left-0 w-px bg-[repeating-linear-gradient(to_bottom,hsl(var(--primary)/0.45)_0_6px,transparent_6px_12px)]" />
                            <div className="flex h-full items-center justify-center py-8 text-sm font-medium uppercase tracking-[0.14em] text-primary/80 [writing-mode:vertical-rl] sm:text-base">
                                Admit one
                            </div>
                            <span className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-[clamp(3rem,9vw,5rem)] font-bold tabular-nums tracking-[-0.04em] text-primary/25 [writing-mode:vertical-rl]">
                                2026
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

function ContactRow({
    link,
    copied,
    onCopy,
}: {
    link: ContactLink;
    copied: boolean;
    onCopy: (id: string, value: string) => void;
}) {
    const canCopy = 'copyValue' in link && Boolean(link.copyValue);

    return (
        <li className="grid grid-cols-[80px_1fr_auto] items-center gap-3 rounded-lg border border-white/10 bg-background/35 px-4 py-3 backdrop-blur-sm sm:grid-cols-[96px_1fr_auto] sm:px-5 sm:py-3.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary/80">
                {link.label}
            </span>

            <span
                className="truncate text-base font-medium text-foreground"
                title={link.handle}
            >
                {link.handle}
            </span>

            <div className="flex items-center gap-2">
                {canCopy && (
                    <button
                        type="button"
                        onClick={() =>
                            onCopy(link.id, link.copyValue as string)
                        }
                        className={cn(
                            'inline-flex size-9 items-center justify-center rounded-full border transition',
                            copied
                                ? 'border-primary bg-primary/15 text-primary'
                                : 'border-white/15 bg-white/5 hover:border-primary/40',
                        )}
                        aria-label={`Copy ${link.label}`}
                    >
                        {copied ? <Check size={15} /> : <Copy size={15} />}
                    </button>
                )}
                <a
                    href={link.href}
                    target={link.id === 'email' ? undefined : '_blank'}
                    rel={
                        link.id === 'email'
                            ? undefined
                            : 'noopener noreferrer'
                    }
                    className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:border-primary/40 hover:text-primary"
                    aria-label={`Open ${link.label}`}
                >
                    <ArrowUpRight size={15} />
                </a>
            </div>
        </li>
    );
}

export default ContactSection;
