'use client';

import { CONTACT_LINKS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TICKET_W = 780;
const TICKET_H = 500;
const PERF = 592 / TICKET_W;
const INK = '#3f2d22';

function ticketPath(w: number, h: number) {
    const r = (22 / TICKET_W) * w;
    const n = (18 / TICKET_W) * w;
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
    const ticketRef = useRef<HTMLDivElement>(null);
    const glareRef = useRef<HTMLDivElement>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [hovering, setHovering] = useState(false);

    const clipPath = `path('${ticketPath(TICKET_W, TICKET_H)}')`;

    useGSAP(
        () => {
            gsap.from('.contact-reveal', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.08,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
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

    const onTicketMove = useCallback((e: React.PointerEvent) => {
        const el = ticketRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - rect.left) / rect.width - 0.5;
        const dy = (e.clientY - rect.top) / rect.height - 0.5;

        el.style.transform = `perspective(1100px) rotateX(${-(dy * 2) * 6}deg) rotateY(${dx * 2 * 6}deg)`;

        if (glareRef.current) {
            glareRef.current.style.background = `radial-gradient(42% 58% at ${(dx + 0.5) * 100}% ${(dy + 0.5) * 100}%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 72%)`;
        }
    }, []);

    const onTicketLeave = useCallback(() => {
        setHovering(false);
        if (ticketRef.current) {
            ticketRef.current.style.transform =
                'perspective(1100px) rotateX(0deg) rotateY(0deg)';
        }
        if (glareRef.current) {
            glareRef.current.style.background = 'transparent';
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="border-t border-border/40 py-section"
        >
            <div className="container">
                <div className="contact-reveal mb-10 md:mb-12">
                    <p className="mb-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
                        Contact
                    </p>
                    <h2 className="font-anton text-[clamp(2.75rem,9vw,5.5rem)] leading-[0.92] text-primary lowercase">
                        let&apos;s connect.
                    </h2>
                    <p className="mt-4 max-w-[42ch] text-muted-foreground">
                        One pass — all the ways to reach me. Open a link or
                        copy what you need.
                    </p>
                </div>

                <div className="contact-reveal flex justify-center">
                    <div
                        ref={ticketRef}
                        className="contact-pass-ticket relative w-full max-w-[780px] will-change-transform"
                        style={{
                            clipPath,
                            transformStyle: 'preserve-3d',
                            transition: hovering
                                ? 'none'
                                : 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                        onPointerEnter={() => setHovering(true)}
                        onPointerMove={onTicketMove}
                        onPointerLeave={onTicketLeave}
                    >
                        <div
                            ref={glareRef}
                            aria-hidden
                            className="pointer-events-none absolute inset-0 z-[2]"
                            style={{
                                clipPath,
                                transition: hovering
                                    ? 'none'
                                    : 'background 400ms ease-out',
                            }}
                        />

                        <div className="relative z-[1] flex min-h-[500px] text-[#3f2d22]">
                            <div className="flex flex-1 flex-col px-7 py-8 sm:px-10 sm:py-9">
                                <p
                                    className="whitespace-pre-line text-[10px] uppercase leading-relaxed tracking-[0.22em] sm:text-[11px]"
                                    style={{ color: INK, opacity: 0.72 }}
                                >
                                    {`Portfolio presents\nGeneral admission · Contact`}
                                </p>

                                <h3
                                    className="mt-5 font-anton text-[clamp(2.5rem,8vw,4.25rem)] leading-none tracking-tight"
                                    style={{ color: INK }}
                                >
                                    CHETHANA G
                                </h3>

                                <ul className="mt-8 space-y-3 sm:mt-10">
                                    {CONTACT_LINKS.map((link) => (
                                        <ContactRow
                                            key={link.id}
                                            link={link}
                                            copied={copiedId === link.id}
                                            onCopy={handleCopy}
                                        />
                                    ))}
                                </ul>

                                <p
                                    className="mt-auto pt-8 text-[10px] uppercase tracking-[0.18em] sm:text-[11px]"
                                    style={{ color: INK, opacity: 0.65 }}
                                >
                                    Bengaluru · Open for collabs · 2026
                                </p>
                            </div>

                            <div
                                className="relative w-[24%] min-w-[72px] shrink-0 border-l border-dashed sm:min-w-[88px]"
                                style={{ borderColor: `${INK}44` }}
                            >
                                <div
                                    className="absolute inset-y-0 left-0 w-px"
                                    style={{
                                        backgroundImage: `repeating-linear-gradient(to bottom, ${INK}55 0 6px, transparent 6px 12px)`,
                                    }}
                                />
                                <div
                                    className="flex h-full items-center justify-center py-6 font-medium uppercase tracking-[0.12em]"
                                    style={{
                                        color: INK,
                                        opacity: 0.82,
                                        writingMode: 'vertical-rl',
                                        fontSize: 'clamp(0.65rem, 2.2vw, 0.95rem)',
                                    }}
                                >
                                    Admit one
                                </div>
                                <span
                                    className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-bold tabular-nums opacity-40"
                                    style={{
                                        color: '#c4a574',
                                        writingMode: 'vertical-rl',
                                        fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                                        letterSpacing: '-0.04em',
                                    }}
                                >
                                    2026
                                </span>
                            </div>
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
        <li
            className="grid grid-cols-[72px_1fr_auto] items-center gap-2 rounded-md border border-[#3f2d22]/10 bg-[#faf6ef]/60 px-3 py-2.5 sm:grid-cols-[88px_1fr_auto] sm:gap-3 sm:px-4"
        >
            <span
                className="text-[10px] font-medium uppercase tracking-[0.16em] sm:text-[11px]"
                style={{ color: INK, opacity: 0.7 }}
            >
                {link.label}
            </span>

            <span
                className="truncate text-sm font-medium sm:text-[15px]"
                style={{ color: INK }}
                title={link.handle}
            >
                {link.handle}
            </span>

            <div className="flex items-center gap-1.5">
                {canCopy && (
                    <button
                        type="button"
                        onClick={() =>
                            onCopy(link.id, link.copyValue as string)
                        }
                        className={cn(
                            'inline-flex size-8 items-center justify-center rounded-full border transition',
                            copied
                                ? 'border-[#485d60] bg-[#485d60]/15 text-[#485d60]'
                                : 'border-[#3f2d22]/20 bg-white/50 hover:border-[#3f2d22]/35',
                        )}
                        aria-label={`Copy ${link.label}`}
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
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
                    className="inline-flex size-8 items-center justify-center rounded-full border border-[#3f2d22]/20 bg-white/50 transition hover:border-[#3f2d22]/35"
                    aria-label={`Open ${link.label}`}
                >
                    <ArrowUpRight size={14} />
                </a>
            </div>
        </li>
    );
}

export default ContactSection;
