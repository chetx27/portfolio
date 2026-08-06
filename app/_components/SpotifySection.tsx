'use client';
import { SPOTIFY } from '@/lib/data';
import MoltenMetal from '@/components/MoltenMetal/MoltenMetal';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SpotifySection = () => {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from('.music-bar', {
                scaleY: 0.2,
                stagger: 0.05,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: { trigger: ref.current, start: 'top 85%' },
            });

            gsap.to('.music-bar', {
                scaleY: 'random(0.3, 1)',
                duration: 0.8,
                stagger: { each: 0.08, from: 'random' },
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
        },
        { scope: ref },
    );

    return (
        <section className="py-12 md:py-16 w-full" id="music">
            <div className="container w-full" ref={ref}>
                <div className="relative rounded-2xl overflow-hidden border border-white/10 min-h-[300px] md:min-h-[340px]">
                    <MoltenMetal
                        color1="#485d60"
                        color2="#b5c7b7"
                        color3="#e3eae4"
                        speed={0.35}
                        scale={4}
                        detail={3}
                        glow={1.6}
                        opacity={0.95}
                        mouseInteraction={false}
                        className="!absolute inset-0"
                    />

                    <div className="absolute inset-0 bg-background/10 pointer-events-none" />

                    <div className="relative z-[1] grid lg:grid-cols-12 gap-4 md:gap-5 p-4 md:p-6 min-h-[300px] md:min-h-[340px]">
                        {/* Left glass — copy + waveform + profile link */}
                        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-xl p-6 md:p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-primary/90 mb-3 font-medium">
                                    On Spotify
                                </p>
                                <h2 className="font-anton text-3xl md:text-4xl leading-tight lowercase text-foreground">
                                    my
                                    <span className="text-primary">
                                        {' '}
                                        soundtrack
                                    </span>
                                </h2>
                                <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
                                    What I listen to while designing, debugging,
                                    and shipping. Follow along on Spotify.
                                </p>
                            </div>

                            <div className="flex items-end gap-1 h-16 mt-8">
                                {Array.from({ length: 24 }).map((_, i) => (
                                    <span
                                        key={i}
                                        className="music-bar w-1.5 rounded-full bg-primary origin-bottom"
                                        style={{
                                            height: `${30 + (i % 5) * 12}%`,
                                        }}
                                    />
                                ))}
                            </div>

                            <a
                                href={SPOTIFY.profileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                            >
                                <SpotifyIcon small />
                                Follow on Spotify →
                            </a>
                        </div>

                        {/* Right glass — working embed (no user-page 404) */}
                        <div className="lg:col-span-7 flex flex-col rounded-xl overflow-hidden border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] min-h-[280px]">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <SpotifyIcon small />
                                    <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                                        Now playing
                                    </span>
                                </div>
                                <a
                                    href={SPOTIFY.profileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[11px] text-primary hover:underline"
                                >
                                    @{SPOTIFY.handle} →
                                </a>
                            </div>

                            <iframe
                                src={SPOTIFY.embedUrl}
                                title="Spotify player"
                                className="w-full flex-1 min-h-[232px] border-0 bg-transparent"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

function SpotifyIcon({ small = false }: { small?: boolean }) {
    const size = small ? 20 : 48;
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="#1DB954"
            aria-hidden
        >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
    );
}

export default SpotifySection;
