import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {getLocale, useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";

const LINES = ['manifesto_1', 'manifesto_2', 'manifesto_3', 'manifesto_4', 'manifesto_5'] as const;

export const ManifestoTile: React.FC<{ className?: string }> = ({className = ''}) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const router = useRouter();
    const g11nLocale = getLocale(router);

    return (
        <section aria-labelledby="manifesto-title" className={`tile flex flex-col p-7 md:p-9 ${className}`}>
            <h1 id="manifesto-title" className="text-2xl font-bold tracking-tight text-fg md:text-3xl">
                Andrea <span className="text-muted">{t('manifesto_building') as string}</span>{' '}
                <Link href="/projects/tabularis" locale={g11nLocale}
                      className="underline decoration-2 underline-offset-4 hover:text-accent">Tabularis</Link>
                <span className="text-muted">.</span>
            </h1>
            <hr className="my-6 border-line"/>
            <ul role="list" className="flex-1 space-y-5 text-lg leading-relaxed text-muted">
                {LINES.map(line => {
                    const text = t(line) as string;
                    // The starred line points at the footnote below.
                    const [before, after] = text.split('*');
                    return (
                        <li key={line}>
                            {before}
                            {after !== undefined && (
                                <><sup aria-hidden="true" className="text-[#ef4444]">*</sup>{after}</>
                            )}
                        </li>
                    );
                })}
            </ul>
            <p className="mt-8 text-sm text-muted">
                <span aria-hidden="true" className="text-[#ef4444]">* </span>
                <Link href="/projects" locale={g11nLocale} className="underline-offset-4 hover:text-fg hover:underline">
                    {t('manifesto_note') as string}
                </Link>
            </p>
        </section>
    );
}

export default ManifestoTile;
