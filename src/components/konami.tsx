import React, {useEffect, useState} from 'react';
import {useG11n} from 'next-g11n';
import {DICTIONARY} from '../i18n/dictionary';

const SEQUENCE = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
const COLORS = ['#22d3ee', '#facc15', '#a855f7', '#22c55e', '#ef4444', '#3b82f6', '#f97316'];
const DURATION = 5000;

interface Block {
    left: number;
    size: number;
    color: string;
    style: React.CSSProperties;
}

const makeBlocks = (): Block[] => Array.from({length: 40}, (_, index) => ({
    left: Math.random() * 100,
    size: 16 + Math.round(Math.random() * 24),
    color: COLORS[index % COLORS.length],
    style: {
        '--delay': `${Math.round(Math.random() * 1500)}ms`,
        '--duration': `${2000 + Math.round(Math.random() * 1500)}ms`,
        '--spin': `${Math.random() > 0.5 ? '' : '-'}${90 * Math.ceil(Math.random() * 3)}deg`,
    } as React.CSSProperties,
}));

// ↑ ↑ ↓ ↓ ← → ← → B A: a short rain of Tetris blocks.
export default function Konami() {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const [blocks, setBlocks] = useState<Block[] | null>(null);

    useEffect(() => {
        let progress = 0;
        let timer: ReturnType<typeof setTimeout>;
        const onKey = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();
            progress = key === SEQUENCE[progress] ? progress + 1 : key === SEQUENCE[0] ? 1 : 0;
            if (progress < SEQUENCE.length) return;
            progress = 0;
            const motion = matchMedia('(prefers-reduced-motion: no-preference)').matches;
            setBlocks(motion ? makeBlocks() : []);
            clearTimeout(timer);
            timer = setTimeout(() => setBlocks(null), DURATION);
        };
        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('keydown', onKey);
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            {blocks && <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
                {blocks.map((block, index) => (
                    <span key={index} className="konami-block absolute top-0 rounded-[3px] shadow-lg"
                          style={{...block.style, left: `${block.left}%`, width: block.size, height: block.size, background: block.color}}/>
                ))}
            </div>}
            <div role="status" className="pointer-events-none fixed inset-x-0 top-24 z-[71] flex justify-center px-4">
                {blocks && <p className="rounded-full bg-fg px-5 py-2.5 text-sm font-semibold text-bg shadow-xl">{t('konami_message') as string}</p>}
            </div>
        </>
    );
}
