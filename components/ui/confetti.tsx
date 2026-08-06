'use client';

import confetti from 'canvas-confetti';
import { useCallback } from 'react';

export function fireConfetti() {
    const end = Date.now() + 800;
    const colors = ['#b5c7b7', '#e3eae4', '#485d60', '#738296'];

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.7 },
            colors,
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.7 },
            colors,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
    })();
}

export function useConfettiClick() {
    return useCallback(() => fireConfetti(), []);
}
