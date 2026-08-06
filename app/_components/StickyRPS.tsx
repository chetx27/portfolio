'use client';

import { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';

type Choice = 'rock' | 'paper' | 'scissors';
type Outcome = 'win' | 'lose' | 'draw' | null;

const CHOICES: Choice[] = ['rock', 'paper', 'scissors'];

function beats(a: Choice, b: Choice): Outcome {
    if (a === b) return 'draw';
    if (
        (a === 'rock' && b === 'scissors') ||
        (a === 'paper' && b === 'rock') ||
        (a === 'scissors' && b === 'paper')
    )
        return 'win';
    return 'lose';
}

/** Halftone / dotted black-and-white hand glyphs — not emoji/toy hands */
function DottedHand({
    choice,
    mirror = false,
    size = 56,
}: {
    choice: Choice | null;
    mirror?: boolean;
    size?: number;
}) {
    const id = `dots-${choice ?? 'idle'}-${mirror ? 'm' : 'l'}`;

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            className={cn(
                'select-none',
                mirror && '-scale-x-100',
                !choice && 'opacity-40',
            )}
            aria-hidden
        >
            <defs>
                <pattern
                    id={id}
                    width="4"
                    height="4"
                    patternUnits="userSpaceOnUse"
                >
                    <circle cx="1.2" cy="1.2" r="0.9" fill="#e3eae4" />
                </pattern>
                <pattern
                    id={`${id}-dark`}
                    width="3.5"
                    height="3.5"
                    patternUnits="userSpaceOnUse"
                >
                    <circle cx="1" cy="1" r="0.85" fill="#0c100c" />
                </pattern>
            </defs>

            {/* wrist stump */}
            <rect
                x="24"
                y="48"
                width="16"
                height="12"
                rx="2"
                fill={`url(#${id})`}
                stroke="#e3eae4"
                strokeWidth="1.2"
            />

            {choice === 'rock' || !choice ? (
                <>
                    {/* fist */}
                    <ellipse
                        cx="32"
                        cy="34"
                        rx="16"
                        ry="14"
                        fill={`url(#${id})`}
                        stroke="#e3eae4"
                        strokeWidth="1.4"
                    />
                    <ellipse
                        cx="32"
                        cy="32"
                        rx="10"
                        ry="8"
                        fill="none"
                        stroke="#0c100c"
                        strokeWidth="0.8"
                        opacity="0.35"
                    />
                    {/* knuckle dots */}
                    {[22, 28, 34, 40].map((x) => (
                        <circle
                            key={x}
                            cx={x}
                            cy="24"
                            r="2.2"
                            fill={`url(#${id}-dark)`}
                            stroke="#e3eae4"
                            strokeWidth="0.6"
                        />
                    ))}
                </>
            ) : null}

            {choice === 'paper' ? (
                <>
                    {/* open palm */}
                    <path
                        d="M20 48 V22 Q20 14 28 14 H36 Q44 14 44 22 V48 Z"
                        fill={`url(#${id})`}
                        stroke="#e3eae4"
                        strokeWidth="1.4"
                    />
                    {/* fingers */}
                    {[18, 26, 34, 42].map((x, i) => (
                        <rect
                            key={x}
                            x={x}
                            y={6 + (i === 0 || i === 3 ? 2 : 0)}
                            width="6"
                            height="18"
                            rx="3"
                            fill={`url(#${id})`}
                            stroke="#e3eae4"
                            strokeWidth="1"
                        />
                    ))}
                    {/* thumb */}
                    <path
                        d="M44 30 Q54 28 54 36 Q54 42 46 42"
                        fill={`url(#${id})`}
                        stroke="#e3eae4"
                        strokeWidth="1.2"
                    />
                </>
            ) : null}

            {choice === 'scissors' ? (
                <>
                    {/* palm base */}
                    <ellipse
                        cx="30"
                        cy="40"
                        rx="12"
                        ry="10"
                        fill={`url(#${id})`}
                        stroke="#e3eae4"
                        strokeWidth="1.4"
                    />
                    {/* V fingers */}
                    <rect
                        x="18"
                        y="8"
                        width="7"
                        height="30"
                        rx="3.5"
                        transform="rotate(-18 21.5 23)"
                        fill={`url(#${id})`}
                        stroke="#e3eae4"
                        strokeWidth="1.2"
                    />
                    <rect
                        x="34"
                        y="8"
                        width="7"
                        height="30"
                        rx="3.5"
                        transform="rotate(18 37.5 23)"
                        fill={`url(#${id})`}
                        stroke="#e3eae4"
                        strokeWidth="1.2"
                    />
                    {/* tucked fingers */}
                    {[26, 32].map((x) => (
                        <circle
                            key={x}
                            cx={x}
                            cy="36"
                            r="3"
                            fill={`url(#${id}-dark)`}
                            stroke="#e3eae4"
                            strokeWidth="0.5"
                        />
                    ))}
                </>
            ) : null}
        </svg>
    );
}

const LABEL: Record<Choice, string> = {
    rock: 'Rock',
    paper: 'Paper',
    scissors: 'Scissors',
};

const StickyRPS = () => {
    const [open, setOpen] = useState(false);
    const [player, setPlayer] = useState<Choice | null>(null);
    const [bot, setBot] = useState<Choice | null>(null);
    const [outcome, setOutcome] = useState<Outcome>(null);
    const [shaking, setShaking] = useState(false);
    const [score, setScore] = useState({ you: 0, bot: 0 });

    const play = useCallback((choice: Choice) => {
        if (shaking) return;
        setShaking(true);
        setPlayer(null);
        setBot(null);
        setOutcome(null);

        // shake / countdown feel
        window.setTimeout(() => {
            const botPick = CHOICES[Math.floor(Math.random() * 3)];
            const result = beats(choice, botPick);
            setPlayer(choice);
            setBot(botPick);
            setOutcome(result);
            setShaking(false);
            if (result === 'win')
                setScore((s) => ({ ...s, you: s.you + 1 }));
            if (result === 'lose')
                setScore((s) => ({ ...s, bot: s.bot + 1 }));
        }, 700);
    }, [shaking]);

    const outcomeCopy =
        outcome === 'win'
            ? 'You win'
            : outcome === 'lose'
              ? 'Bot wins'
              : outcome === 'draw'
                ? 'Draw'
                : shaking
                  ? '…'
                  : 'Pick one';

    return (
        <div className="max-xl:hidden fixed left-0 top-1/2 -translate-y-1/2 z-[5] flex items-center">
            {/* slim rail — part of the page edge */}
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-label={open ? 'Close rock paper scissors' : 'Play rock paper scissors'}
                className={cn(
                    'group flex flex-col items-center gap-3 py-5 px-1.5 border border-l-0 border-border/70',
                    'bg-background/90 backdrop-blur-sm text-muted-foreground hover:text-foreground transition-colors',
                    open && 'border-primary/40 text-primary',
                )}
            >
                <span
                    className="text-[10px] uppercase tracking-[0.22em] font-medium"
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                >
                    RPS
                </span>
                <span className="block w-px h-6 bg-border group-hover:bg-primary/50" />
                <DottedHand choice="rock" size={22} />
            </button>

            {/* game panel — docks into the left edge, not a floating modal */}
            <div
                className={cn(
                    'origin-left transition-all duration-300 ease-out overflow-hidden border border-l-0 border-border/70',
                    'bg-background/95 backdrop-blur-md',
                    open
                        ? 'w-[240px] opacity-100 translate-x-0'
                        : 'w-0 opacity-0 -translate-x-2 pointer-events-none border-transparent',
                )}
            >
                <div className="w-[240px] p-4">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                            vs bot
                        </p>
                        <p className="font-mono text-xs text-primary">
                            {score.you} — {score.bot}
                        </p>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex flex-col items-center gap-1 flex-1">
                            <span className="text-[9px] uppercase tracking-widest text-muted-foreground">
                                You
                            </span>
                            <div
                                className={cn(
                                    'rounded-md border border-border/60 bg-background-light/10 p-2',
                                    shaking && 'animate-pulse',
                                )}
                            >
                                <DottedHand
                                    choice={shaking ? 'rock' : player}
                                    size={52}
                                />
                            </div>
                        </div>

                        <span className="text-[10px] text-muted-foreground/60 font-anton">
                            VS
                        </span>

                        <div className="flex flex-col items-center gap-1 flex-1">
                            <span className="text-[9px] uppercase tracking-widest text-muted-foreground">
                                Bot
                            </span>
                            <div
                                className={cn(
                                    'rounded-md border border-border/60 bg-background-light/10 p-2',
                                    shaking && 'animate-pulse',
                                )}
                            >
                                <DottedHand
                                    choice={shaking ? 'rock' : bot}
                                    mirror
                                    size={52}
                                />
                            </div>
                        </div>
                    </div>

                    <p
                        className={cn(
                            'text-center text-xs font-medium mb-3 h-4',
                            outcome === 'win' && 'text-primary',
                            outcome === 'lose' && 'text-accent',
                            outcome === 'draw' && 'text-muted-foreground',
                        )}
                    >
                        {outcomeCopy}
                    </p>

                    <div className="grid grid-cols-3 gap-1.5">
                        {CHOICES.map((c) => (
                            <button
                                key={c}
                                type="button"
                                disabled={shaking}
                                onClick={() => play(c)}
                                className={cn(
                                    'flex flex-col items-center gap-1 py-2 rounded-md border border-border/50',
                                    'bg-background-light/5 hover:border-primary/50 hover:bg-primary/5 transition',
                                    'disabled:opacity-50 disabled:pointer-events-none',
                                    player === c && !shaking && 'border-primary/60 bg-primary/10',
                                )}
                            >
                                <DottedHand choice={c} size={28} />
                                <span className="text-[8px] uppercase tracking-wider text-muted-foreground">
                                    {LABEL[c]}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StickyRPS;
