import React, {useEffect, useState} from "react";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";

const formatTime = () => new Intl.DateTimeFormat('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Rome'
}).format(new Date());

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

    return (
        <section aria-labelledby="location-title"
                 className={`tile flex flex-col justify-between bg-gradient-to-b from-[#0c4a6e] to-[#1e3a8a] p-6 text-white ${className}`}>
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
            </p>
        </section>
    );
}

export default LocationTile;
