'use client';

import { CONTACT_LINKS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ContactLink = (typeof CONTACT_LINKS)[number];

const ContactSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useGSAP(
        () => {
            gsap.from('.contact-reveal', {
                y: 48,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 82%',
                },
            });

            gsap.to('.contact-orb', {
                y: -18,
                duration: 4,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                stagger: { each: 0.6, from: 'random' },
            });
        },
        { scope: sectionRef },
    );

    const handleCopy = async (e: React.MouseEvent, link: ContactLink) => {
        e.preventDefault();
        e.stopPropagation();
        if (!('copyValue' in link) || !link.copyValue) return;
        await navigator.clipboard.writeText(link.copyValue);
        setCopiedId(link.id);
        window.setTimeout(() => setCopiedId(null), 1800);
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative overflow-hidden border-t border-border/40 py-section"
        >
            <div className="contact-orb pointer-events-none absolute -left-24 top-16 size-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="contact-orb pointer-events-none absolute -right-16 bottom-8 size-96 rounded-full bg-accent/15 blur-3xl" />

            <div className="container relative">
                <div className="contact-reveal mb-12 md:mb-16">
                    <p className="mb-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
                        Contact
                    </p>
                    <h2 className="font-anton text-[clamp(2.75rem,9vw,5.5rem)] leading-[0.92] text-primary lowercase">
                        let&apos;s connect.
                    </h2>
                    <p className="mt-5 max-w-[46ch] text-muted-foreground">
                        LinkedIn for the professional lane, Discord for the fast
                        lane, Medium for the think pieces — or just email me
                        directly.
                    </p>
                </div>

                <div
                    ref={stageRef}
                    className="contact-reveal contact-stage relative mx-auto max-w-5xl"
                    style={{ perspective: '1400px' }}
                >
                    <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-border/30 bg-gradient-to-br from-background-light/25 via-transparent to-primary/5" />
                    <div className="pointer-events-none absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-border/80 to-transparent" />

                    <div className="relative grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:gap-5 md:p-6">
                        {CONTACT_LINKS.map((link, index) => (
                            <ContactCard
                                key={link.id}
                                link={link}
                                index={index}
                                copied={copiedId === link.id}
                                onCopy={(e) => handleCopy(e, link)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

interface ContactCardProps {
    link: ContactLink;
    index: number;
    copied: boolean;
    onCopy: (e: React.MouseEvent) => void;
}

const ContactCard = ({ link, index, copied, onCopy }: ContactCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const { contextSafe } = useGSAP(() => {}, { scope: cardRef });

    const depth = index % 2 === 0 ? 28 : 16;
    const canCopy = 'copyValue' in link && Boolean(link.copyValue);

    const handleMouseMove = contextSafe?.((e: React.MouseEvent) => {
        const card = cardRef.current;
        const glow = glowRef.current;
        const icon = iconRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
            rotateX: -y * 14,
            rotateY: x * 14,
            z: depth,
            duration: 0.45,
            ease: 'power2.out',
            transformPerspective: 1200,
        });

        if (glow) {
            gsap.to(glow, {
                x: x * 36,
                y: y * 28,
                duration: 0.55,
                ease: 'power2.out',
            });
        }

        if (icon) {
            gsap.to(icon, {
                z: 42,
                rotateZ: x * 8,
                duration: 0.45,
                ease: 'power2.out',
            });
        }
    });

    const resetTilt = contextSafe?.(() => {
        const card = cardRef.current;
        const glow = glowRef.current;
        const icon = iconRef.current;

        if (card) {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                z: 0,
                duration: 0.75,
                ease: 'power3.out',
            });
        }
        if (glow) {
            gsap.to(glow, { x: 0, y: 0, duration: 0.75, ease: 'power3.out' });
        }
        if (icon) {
            gsap.to(icon, {
                z: 18,
                rotateZ: 0,
                duration: 0.75,
                ease: 'power3.out',
            });
        }
    });

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            className={cn(
                'contact-card group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl p-6 md:min-h-[240px] md:p-8',
                'wide' in link && link.wide && 'md:col-span-2 md:min-h-[200px] md:flex-row md:items-end md:gap-8',
            )}
            style={{
                backgroundColor: link.blockColor,
                color: link.blockTextColor,
                transformStyle: 'preserve-3d',
            }}
        >
            <a
                href={link.href}
                target={link.id === 'email' ? undefined : '_blank'}
                rel={link.id === 'email' ? undefined : 'noopener noreferrer'}
                className="absolute inset-0 z-[1] rounded-2xl no-underline"
                aria-label={`Open ${link.label}`}
            />
            <div
                ref={glowRef}
                className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-70"
                style={{ backgroundColor: link.glow }}
            />

            <div
                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage:
                        'linear-gradient(135deg, white 0%, transparent 45%, transparent 55%, white 100%)',
                }}
            />

            <div className="relative z-[2] flex items-start justify-between gap-4">
                <div
                    ref={iconRef}
                    className="contact-icon-shell flex size-14 shrink-0 items-center justify-center rounded-2xl border border-current/15 bg-black/10 shadow-[0_18px_40px_rgba(0,0,0,0.22)] backdrop-blur-sm"
                    style={{ transform: 'translateZ(18px)' }}
                >
                    <ContactIcon id={link.id} />
                </div>

                <button
                    type="button"
                    onClick={canCopy ? onCopy : undefined}
                    className={cn(
                        'relative z-[3] inline-flex size-10 items-center justify-center rounded-full border border-current/20 bg-black/5 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110',
                        !canCopy && 'pointer-events-none',
                    )}
                    aria-label={canCopy ? `Copy ${link.label}` : `Open ${link.label}`}
                    aria-hidden={!canCopy}
                    tabIndex={canCopy ? 0 : -1}
                >
                    {copied ? (
                        <Check size={16} />
                    ) : canCopy ? (
                        <Copy size={16} />
                    ) : (
                        <ArrowUpRight size={16} />
                    )}
                </button>
            </div>

            <div
                className={cn(
                    'relative z-[2] mt-8',
                    'wide' in link && link.wide && 'md:mt-0 md:flex-1',
                )}
                style={{ transform: 'translateZ(28px)' }}
            >
                <p className="text-xs uppercase tracking-[0.28em] opacity-60">
                    {link.label}
                </p>
                <h3 className="mt-2 font-anton text-[clamp(1.75rem,4vw,3rem)] leading-none break-all">
                    {link.handle}
                </h3>
                <p className="mt-3 text-sm opacity-75">{link.hint}</p>
                {canCopy && (
                    <p className="mt-4 text-xs uppercase tracking-widest opacity-50 transition-opacity group-hover:opacity-80">
                        {copied ? 'Copied!' : 'Tap icon to copy'}
                    </p>
                )}
            </div>
        </div>
    );
};

function ContactIcon({ id }: { id: ContactLink['id'] }) {
    if (id === 'linkedin') {
        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        );
    }

    if (id === 'discord') {
        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
        );
    }

    if (id === 'medium') {
        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
        );
    }

    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 7h16v10H4z" />
            <path d="m4 7 8 6 8-6" />
        </svg>
    );
}

export default ContactSection;
