import React, {useEffect, useMemo, useRef, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {getLocale, useG11n} from 'next-g11n';
import {DICTIONARY} from '../../i18n/dictionary';
import type {ContributionCalendar} from '../../lib/github-contributions';
import ArrowCircle from '../atoms/arrow-circle';

const CELL = 10;
const STEP = 13;
const DROP_MS = 450;
const SEQUENCE_MS = 3200;
const PIECE_COLORS = ['#22d3ee', '#facc15', '#a855f7', '#22c55e', '#ef4444', '#3b82f6', '#f97316'];

interface Piece {
    week: number;
    row: number;
    levels: number[];
}

// Splits every week into vertical runs of active days, at most four tall, like Tetris I pieces.
function toPieces(weeks: number[][]): Piece[] {
    const pieces: Piece[] = [];
    weeks.forEach((days, week) => {
        // A partial first week ends on Saturday, so its days sit at the bottom.
        const offset = week === 0 ? 7 - days.length : 0;
        let run: Piece | null = null;
        days.forEach((level, index) => {
            if (level > 0 && run && run.levels.length < 4) {
                run.levels.push(level);
            } else if (level > 0) {
                run = {week, row: index + offset, levels: [level]};
                pieces.push(run);
            } else {
                run = null;
            }
        });
    });
    return pieces;
}

// Inspired by gh-contributions-tetris-gif-maker: the year assembles itself from falling blocks.
export default function ContributionsTile({calendar, className = ''}: {calendar: ContributionCalendar; className?: string}) {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const router = useRouter();
    const g11nLocale = getLocale(router);
    const tileRef = useRef<HTMLElement>(null);
    // Without JavaScript, or with reduced motion, the finished calendar is shown.
    const [phase, setPhase] = useState<'static' | 'armed' | 'play'>('static');
    const [run, setRun] = useState(0);
    const pieces = useMemo(() => toPieces(calendar.weeks), [calendar.weeks]);
    const width = calendar.weeks.length * STEP - (STEP - CELL);
    const height = 7 * STEP - (STEP - CELL);

    useEffect(() => {
        if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
        setPhase('armed');
        const observer = new IntersectionObserver(entries => {
            if (!entries.some(entry => entry.isIntersecting)) return;
            setPhase('play');
            observer.disconnect();
        }, {threshold: 0.4});
        if (tileRef.current) observer.observe(tileRef.current);
        return () => observer.disconnect();
    }, []);

    const interval = SEQUENCE_MS / Math.max(pieces.length, 1);

    return (
        <section ref={tileRef} aria-labelledby="contributions-title" className={`tile flex flex-col gap-6 p-6 md:p-8 ${className}`}>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="tile-label text-muted">{t('contributions_label') as string}</p>
                    <h2 id="contributions-title" className="mt-2 text-2xl font-bold tracking-tight text-fg">
                        {t('contributions_title', {total: calendar.total.toLocaleString(g11nLocale)}) as string}
                    </h2>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    {phase !== 'static' && (
                        <button type="button" onClick={() => { setRun(value => value + 1); setPhase('play'); }}
                                className="btn border border-line bg-bg text-fg hover:bg-surface-2">
                            <span aria-hidden="true">▶</span>{t('contributions_replay') as string}
                        </button>
                    )}
                    <Link href="/projects/gh-contributions-tetris-gif-maker" locale={g11nLocale}
                          className="group inline-flex min-h-[44px] items-center gap-3 text-sm text-muted hover:text-fg">
                        {t('contributions_credit') as string}
                        <ArrowCircle/>
                    </Link>
                </div>
            </div>
            {/* On narrow screens the calendar keeps its height and crops to the most recent weeks. */}
            <svg key={run} role="img" aria-label={t('contributions_alt') as string} viewBox={`0 0 ${width} ${height}`}
                 preserveAspectRatio="xMaxYMid slice"
                 className={`h-32 w-full sm:h-auto ${phase === 'armed' ? 'tetris-armed' : phase === 'play' ? 'tetris-play' : ''}`}>
                {calendar.weeks.map((days, week) => {
                    const offset = week === 0 ? 7 - days.length : 0;
                    return days.map((_, index) => (
                        <rect key={`${week}-${index}`} x={week * STEP} y={(index + offset) * STEP} width={CELL} height={CELL} rx={2}
                              className="fill-fg/[0.07]"/>
                    ));
                })}
                {pieces.map((piece, index) => {
                    const delay = Math.round(index * interval);
                    const style = {
                        '--delay': `${delay}ms`,
                        '--settle': `${delay + DROP_MS + 500}ms`,
                        '--fall': (piece.row + piece.levels.length) * STEP + 4,
                        '--piece': PIECE_COLORS[index % PIECE_COLORS.length],
                    } as React.CSSProperties;
                    return (
                        <g key={`${piece.week}-${piece.row}`} className="tetris-piece" style={style}>
                            {piece.levels.map((level, cell) => (
                                <rect key={cell} x={piece.week * STEP} y={(piece.row + cell) * STEP} width={CELL} height={CELL} rx={2}
                                      className="tetris-cell" style={{'--level': `var(--contrib-${level})`} as React.CSSProperties}/>
                            ))}
                        </g>
                    );
                })}
            </svg>
        </section>
    );
}
