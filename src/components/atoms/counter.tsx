import React, {useEffect, useState} from "react";

export const Counter: React.FC<{end: number, duration:number, locale?: string}> = ({end, duration, locale = 'en'}) => {
    const format = (value: number) => new Intl.NumberFormat(locale, {useGrouping: 'always'} as Intl.NumberFormatOptions).format(value);
    const [count, setCount] = useState(end)

    useEffect(() => {
        if (end <= 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setCount(end);
            return;
        }

        const startedAt = performance.now();
        let frame = requestAnimationFrame(function tick(now) {
            const progress = Math.min((now - startedAt) / (duration * 1000), 1);
            setCount(Math.round(end * progress));
            if (progress < 1) frame = requestAnimationFrame(tick);
        });

        return () => cancelAnimationFrame(frame);
    }, [end, duration]);

    return (
        <>
            {/* Screen readers get the final value instead of every intermediate step. */}
            <span aria-hidden="true">{format(count)}</span>
            <span className="sr-only">{format(end)}</span>
        </>
    );
}
