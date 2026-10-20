import React, {useId, useRef, useState, KeyboardEvent} from "react";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import {getLocale, useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";
import {ProjectItem} from "../../interfaces/data";
import {localize} from "../../helpers/localize";
import ArrowCircle from "../atoms/arrow-circle";
import {DAILY_WORK} from '../../data/daily-work';

/*
 * A dock of project icons working as an ARIA tab list: arrow keys, Home and End move
 * between projects, and the panel above shows the selected one.
 */
export const DockTile: React.FC<{ projects: ProjectItem[], className?: string }> = ({projects, className = ''}) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const router = useRouter();
    const g11nLocale = getLocale(router);
    const [selected, setSelected] = useState(0);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const baseId = useId();
    const project = projects[selected];

    const select = (index: number) => {
        const next = (index + projects.length) % projects.length;
        setSelected(next);
        tabRefs.current[next]?.focus();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        const keys: Record<string, () => void> = {
            ArrowRight: () => select(selected + 1),
            ArrowLeft: () => select(selected - 1),
            Home: () => select(0),
            End: () => select(projects.length - 1),
        };
        if (keys[event.key]) {
            event.preventDefault();
            keys[event.key]();
        }
    };

    return (
        <div className={`tile flex flex-col gap-5 p-6 md:p-7 ${className}`}>
        <section aria-labelledby={`${baseId}-title`} className="flex flex-col gap-4">
            <h2 id={`${baseId}-title`} className="tile-label flex items-center gap-2">
                <span aria-hidden="true" className="h-2 w-2 rounded-sm bg-accent"/>
                {t('dock_label') as string}
            </h2>

            <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${selected}`}
                 className="flex items-start gap-4 rounded-2xl border border-line bg-bg p-4">
                <div className="min-w-0 flex-1">
                    <p className="font-semibold text-fg">{project.name}</p>
                    <p className="mt-1 text-sm text-muted">{localize(project.short_description, g11nLocale)}</p>
                </div>
                <Link href={`/projects/${project.github_name}`} locale={g11nLocale} className="group inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full">
                    <ArrowCircle/>
                    <span className="sr-only">{t('dock_open') as string}: {project.name}</span>
                </Link>
            </div>

            <div role="tablist" aria-label={t('dock_label') as string}
                 className="-mx-2 flex flex-wrap gap-2 px-2 py-2">
                {projects.map((item, index) => (
                    <button
                        key={item.github_name}
                        ref={el => {
                            tabRefs.current[index] = el;
                        }}
                        id={`${baseId}-tab-${index}`}
                        type="button"
                        role="tab"
                        aria-selected={index === selected}
                        aria-controls={`${baseId}-panel`}
                        tabIndex={index === selected ? 0 : -1}
                        title={item.name}
                        onClick={() => setSelected(index)}
                        onKeyDown={onKeyDown}
                        className={`shrink-0 rounded-[22px] border-2 p-1.5 transition-colors duration-150 ${index === selected ? 'border-accent bg-accent/10' : 'border-transparent hover:bg-surface-2'}`}>
                        {/* The 8px inset keeps the 22px outer and 14px inner corners concentric. */}
                        <span className="block h-[52px] w-[52px] overflow-hidden rounded-[14px]">
                            {item.image?.icon ? <Image src={item.image.icon} alt="" width={52} height={52}
                                   className="block h-full w-full object-contain"/> :
                                <span aria-hidden="true" className="flex h-full w-full items-center justify-center bg-surface-2 text-3xl">{item.emoji}</span>}
                        </span>
                        <span className="sr-only">{item.name}</span>
                    </button>
                ))}
            </div>
        </section>
        <section aria-labelledby={`${baseId}-work-title`} className="border-t border-line pt-5">
            <h2 id={`${baseId}-work-title`} className="tile-label">{t('daily_work_label') as string}</h2>
            <ul role="list" className="mt-3 grid gap-3 lg:grid-cols-2">
                {DAILY_WORK.map(product => <li key={product.name} className="min-w-0">
                    <a href={localize(product.url, g11nLocale)} target="_blank" rel="noopener noreferrer"
                       className="group flex h-full items-center gap-3 rounded-2xl border border-line bg-bg p-3 transition-colors hover:bg-surface-2">
                        <Image src={product.icon} alt="" width={44} height={44} className={`h-11 w-11 shrink-0 rounded-xl object-contain ${product.iconClassName ?? ''}`}/>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-fg">{product.name} <span aria-hidden="true">↗</span></p>
                            <p className="mt-1 text-xs leading-relaxed text-muted">{localize(product.description, g11nLocale)}</p>
                        </div>
                        <span className="sr-only">{t('opens_new_tab') as string}</span>
                    </a>
                </li>)}
            </ul>
        </section>
        </div>
    );
}

export default DockTile;
