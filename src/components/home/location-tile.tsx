import React, {useEffect, useState} from "react";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";

const formatTime = () => new Intl.DateTimeFormat('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Rome'
}).format(new Date());

const STARS = ['20% 30%', '70% 20%', '85% 45%', '40% 12%', '55% 40%', '10% 55%', '92% 10%']
    .map(position => `radial-gradient(1.5px 1.5px at ${position}, white, transparent)`).join(', ');

// Roughly when it is light on the Ligurian coast; precise enough for a decoration.
const isDaytime = (time: string) => {
    const hour = Number(time.slice(0, 2));
    return hour >= 7 && hour < 19;
};

export const LocationTile: React.FC<{ className?: string, headingLevel?: 2 | 3 }> = ({className = '', headingLevel = 2}) => {
    const Heading = `h${headingLevel}` as 'h2' | 'h3';
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    // Rendered only on the client so server and browser markup always match.
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        setTime(formatTime());
        const timer = setInterval(() => setTime(formatTime()), 30_000);
        return () => clearInterval(timer);
    }, []);

    const night = time !== null && !isDaytime(time);

    return (
        <section aria-labelledby="location-title"
                 className={`tile flex flex-col justify-between bg-gradient-to-b p-6 text-white transition-colors ${night ? 'from-[#020617] to-[#1e1b4b]' : 'from-[#0c4a6e] to-[#1e3a8a]'} ${className}`}>
            {night && <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70" style={{backgroundImage: STARS}}/>}
            <svg aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full text-white/10" viewBox="0 0 400 100" preserveAspectRatio="none">
                <path fill="currentColor" d="M0 40c50 0 50-20 100-20s50 20 100 20 50-20 100-20 50 20 100 20v60H0z"/>
                <path fill="currentColor" d="M0 65c50 0 50-15 100-15s50 15 100 15 50-15 100-15 50 15 100 15v35H0z"/>
            </svg>
            <div className="relative">
                <Heading id="location-title" className="tile-label text-white">
                    <span aria-hidden="true">📍 </span>{t('location_title') as string}
                </Heading>
                <p className="mt-3 text-lg leading-snug">{t('location_desc') as string}</p>
            </div>
            <p className="relative">
                <span className="tile-label block text-white">{t('location_time') as string}</span>
                <span className="text-4xl font-bold tabular-nums">{time ?? '--:--'}</span>
                {time && <span className="ml-2 text-3xl" role="img" aria-label={t(night ? 'location_night' : 'location_day') as string}>{night ? '🌙' : '☀️'}</span>}
            </p>
        </section>
    );
}

export default LocationTile;
