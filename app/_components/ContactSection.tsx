'use client';

import AdmitOneTicket from '@/components/ui/admit-one-ticket';
import { CONTACT_TICKETS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Check, Copy } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TicketStage = dynamic(
    () => Promise.resolve({ default: AdmitOneTicket }),
    {
        ssr: false,
        loading: () => (
            <div className="aspect-[741/425] w-full max-w-[741px] animate-pulse rounded-xl bg-background-light/30" />
        ),
    },
);

const ContactSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useGSAP(
        () => {
            gsap.from('.contact-reveal', {
                y: 56,
                opacity: 0,
                duration: 0.95,
                ease: 'power3.out',
                stagger: 0.12,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 82%',
                },
            });

            gsap.to('.contact-orb', {
                y: -20,
                duration: 4.5,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                stagger: { each: 0.7, from: 'random' },
            });
        },
        { scope: sectionRef },
    );

    const handleCopy = async (
        e: React.MouseEvent,
        id: string,
        value?: string,
    ) => {
        e.preventDefault();
        e.stopPropagation();
        if (!value) return;
        await navigator.clipboard.writeText(value);
        setCopiedId(id);
        window.setTimeout(() => setCopiedId(null), 1800);
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative overflow-hidden border-t border-border/40 py-section"
        >
            <div className="contact-orb pointer-events-none absolute -left-28 top-10 size-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="contact-orb pointer-events-none absolute -right-20 bottom-0 size-[28rem] rounded-full bg-accent/10 blur-3xl" />

            <div className="container relative">
                <div className="contact-reveal mb-10 md:mb-14">
                    <p className="mb-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
                        Contact
                    </p>
                    <h2 className="font-anton text-[clamp(2.75rem,9vw,5.5rem)] leading-[0.92] text-primary lowercase">
                        let&apos;s connect.
                    </h2>
                    <p className="mt-5 max-w-[48ch] text-muted-foreground">
                        Pick your lane — each ticket opens LinkedIn, Discord,
                        Medium, or email. Tilt them, click through, or copy
                        handles where noted.
                    </p>
                </div>

                <div className="contact-reveal contact-ticket-grid mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-12">
                    {CONTACT_TICKETS.map((ticket) => {
                        const canCopy = Boolean(ticket.copyValue);
                        const copied = copiedId === ticket.id;

                        return (
                            <article
                                key={ticket.id}
                                className="group relative flex flex-col items-center"
                            >
                                <a
                                    href={ticket.href}
                                    target={
                                        ticket.id === 'email'
                                            ? undefined
                                            : '_blank'
                                    }
                                    rel={
                                        ticket.id === 'email'
                                            ? undefined
                                            : 'noopener noreferrer'
                                    }
                                    className="contact-ticket-link relative block w-full max-w-[741px] no-underline"
                                    aria-label={`Open ${ticket.event}`}
                                >
                                    <div className="contact-ticket-scale mx-auto w-full origin-center">
                                        <TicketStage
                                            name={ticket.name}
                                            presenter={ticket.presenter}
                                            event={ticket.event}
                                            venue={ticket.venue}
                                            dates={ticket.dates}
                                            stubText={ticket.stubText}
                                            watermark={ticket.watermark}
                                            texture={ticket.texture}
                                            gradient={ticket.gradient}
                                            width={741}
                                            tilt={{
                                                maxTilt: 11,
                                                scale: 1.03,
                                                glare: 0.18,
                                            }}
                                        />
                                    </div>
                                </a>

                                {canCopy && (
                                    <button
                                        type="button"
                                        onClick={(e) =>
                                            handleCopy(
                                                e,
                                                ticket.id,
                                                ticket.copyValue,
                                            )
                                        }
                                        className={cn(
                                            'mt-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background-light/20 px-4 py-2 text-xs uppercase tracking-[0.22em] text-muted-foreground transition hover:border-primary/40 hover:text-primary',
                                            copied && 'border-primary/50 text-primary',
                                        )}
                                    >
                                        {copied ? (
                                            <Check size={14} />
                                        ) : (
                                            <Copy size={14} />
                                        )}
                                        {copied
                                            ? 'Copied'
                                            : `Copy ${ticket.id}`}
                                    </button>
                                )}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
