import React, {useEffect, useId, useMemo, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import {getLocale, useG11n} from 'next-g11n';
import {DICTIONARY} from '../i18n/dictionary';
import {MENU} from '../data/menu';
import {PROJECTS} from '../data/projects';
import {localize} from '../helpers/localize';

interface Command {
    id: string;
    label: string;
    hint: string;
    group: string;
    run: () => void;
}

const normalize = (value: string) => value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// Quick navigation for keyboard users: ⌘K / Ctrl+K, or the search button in the header.
export default function CommandPalette() {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const router = useRouter();
    const g11nLocale = getLocale(router);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listId = useId();
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(0);
    const [mac, setMac] = useState(false);

    const open = () => {
        const dialog = dialogRef.current;
        if (!dialog || dialog.open) return;
        setQuery('');
        setActive(0);
        dialog.showModal();
        inputRef.current?.focus();
    };
    const close = () => dialogRef.current?.close();

    useEffect(() => {
        setMac(/Mac|iPhone|iPad/.test(navigator.platform));
        const onKey = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                if (dialogRef.current?.open) close(); else open();
            }
        };
        window.addEventListener('keydown', onKey);
        router.events.on('routeChangeStart', close);
        return () => {
            window.removeEventListener('keydown', onKey);
            router.events.off('routeChangeStart', close);
        };
    }, [router.events]);

    const commands = useMemo<Command[]>(() => {
        const go = (href: string) => () => { close(); router.push(href, undefined, {locale: g11nLocale}); };
        return [
            ...MENU.map(item => ({
                id: `page-${item.link}`, label: t(item.i18n as 'menu_home') as string, hint: item.link,
                group: t('palette_pages') as string, run: go(item.link),
            })),
            ...PROJECTS.filter(project => !project.localeBlacklist?.includes(g11nLocale)).map(project => ({
                id: `project-${project.github_name}`, label: `${project.emoji ? `${project.emoji} ` : ''}${project.name}`,
                hint: localize(project.short_description, g11nLocale), group: t('palette_projects') as string,
                run: go(`/projects/${project.github_name}`),
            })),
            {
                id: 'link-github', label: 'GitHub', hint: 'github.com/debba', group: t('palette_links') as string,
                run: () => { close(); window.open('https://github.com/debba', '_blank', 'noopener'); },
            },
        ];
    }, [g11nLocale, router, t]);

    const results = useMemo(() => {
        const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
        return commands.filter(command => {
            const text = normalize(`${command.label} ${command.hint} ${command.group}`);
            return terms.every(term => text.includes(term));
        });
    }, [commands, query]);

    const onInputKey = (event: React.KeyboardEvent) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            const step = event.key === 'ArrowDown' ? 1 : -1;
            setActive(index => results.length ? (index + step + results.length) % results.length : 0);
        } else if (event.key === 'Enter' && results[active]) {
            event.preventDefault();
            results[active].run();
        }
    };

    useEffect(() => {
        document.getElementById(`${listId}-${active}`)?.scrollIntoView({block: 'nearest'});
    }, [active, listId]);

    return (
        <>
            <button type="button" onClick={open} aria-keyshortcuts="Meta+K Control+K"
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-line bg-surface px-3 text-sm font-semibold text-muted transition-colors hover:text-fg">
                <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
                </svg>
                <span className="sr-only sm:not-sr-only">{t('palette_open') as string}</span>
                <kbd aria-hidden="true" className="hidden rounded-md border border-line bg-bg px-1.5 py-0.5 font-sans text-xs sm:inline">{mac ? '⌘K' : 'Ctrl K'}</kbd>
            </button>
            <dialog ref={dialogRef} data-command-palette aria-label={t('palette_label') as string}
                    onClick={event => { if (event.target === dialogRef.current) close(); }}
                    className="mt-[12vh] w-[min(36rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-line bg-surface p-0 text-fg shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm">
                <div className="flex items-center gap-3 border-b border-line px-5">
                    <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
                    </svg>
                    <input ref={inputRef} type="text" role="combobox" aria-expanded="true" aria-controls={listId} aria-autocomplete="list"
                           aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
                           aria-label={t('palette_placeholder') as string} placeholder={t('palette_placeholder') as string}
                           value={query} onChange={event => { setQuery(event.target.value); setActive(0); }} onKeyDown={onInputKey}
                           className="min-h-[56px] w-full border-0 bg-transparent px-0 text-base text-fg placeholder:text-muted focus:ring-0"/>
                </div>
                <ul id={listId} role="listbox" aria-label={t('palette_label') as string} className="max-h-[50vh] overflow-y-auto p-2">
                    {results.map((command, index) => (
                        <li key={command.id} id={`${listId}-${index}`} role="option" aria-selected={index === active}
                            onClick={command.run} onMouseMove={() => setActive(index)}
                            className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl px-3 py-2.5 ${index === active ? 'bg-surface-2' : ''}`}>
                            <span className="min-w-0">
                                <span className="block truncate font-semibold">{command.label}</span>
                                <span className="block truncate text-sm text-muted">{command.hint}</span>
                            </span>
                            <span className="shrink-0 text-xs font-semibold text-muted">{command.group}</span>
                        </li>
                    ))}
                </ul>
                {!results.length && <p role="status" className="px-5 pb-5 text-sm text-muted">{t('palette_empty') as string}</p>}
            </dialog>
        </>
    );
}
