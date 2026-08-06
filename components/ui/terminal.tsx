'use client';

import { useEffect, useRef, useState } from 'react';

interface TerminalProps {
    lines: string[];
    typingSpeed?: number;
    className?: string;
}

export function Terminal({
    lines,
    typingSpeed = 28,
    className = '',
}: TerminalProps) {
    const [display, setDisplay] = useState<string[]>([]);
    const [lineIdx, setLineIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const done = useRef(false);

    useEffect(() => {
        if (lineIdx >= lines.length) {
            done.current = true;
            return;
        }
        const current = lines[lineIdx];
        if (charIdx < current.length) {
            const t = setTimeout(() => {
                setDisplay((prev) => {
                    const next = [...prev];
                    next[lineIdx] = current.slice(0, charIdx + 1);
                    return next;
                });
                setCharIdx((c) => c + 1);
            }, typingSpeed);
            return () => clearTimeout(t);
        }
        const t = setTimeout(() => {
            setLineIdx((l) => l + 1);
            setCharIdx(0);
        }, 400);
        return () => clearTimeout(t);
    }, [lineIdx, charIdx, lines, typingSpeed]);

    return (
        <div
            className={`rounded-lg border border-border bg-[#0a0e0a] overflow-hidden font-mono text-sm ${className}`}
        >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border/60 bg-background-light/30">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 text-[10px] text-muted-foreground uppercase tracking-widest">
                    chethana@portfolio
                </span>
            </div>
            <div className="p-4 min-h-[120px] space-y-2 text-primary/90 leading-relaxed">
                {display.map((line, i) => (
                    <p key={i}>
                        <span className="text-muted-foreground select-none">
                            {'> '}
                        </span>
                        {line}
                        {i === lineIdx && !done.current && (
                            <span className="inline-block w-2 h-4 ml-0.5 bg-primary animate-pulse align-middle" />
                        )}
                    </p>
                ))}
            </div>
        </div>
    );
}
