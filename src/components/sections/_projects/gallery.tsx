import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {getLocale, useG11n} from 'next-g11n';
import type {ProjectMedia} from '../../../interfaces/data';
import {DICTIONARY} from '../../../i18n/dictionary';
import {localize} from '../../../helpers/localize';

export default function ProjectGallery({media}: {media: ProjectMedia[]}) {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const locale = getLocale(useRouter());
    const images = media.filter(item => item.kind === 'image');
    const [selected, setSelected] = useState<number | null>(null);
    const dialog = useRef<HTMLDialogElement>(null);
    const active = selected === null ? null : images[selected];

    useEffect(() => {
        if (selected === null || !dialog.current) return;
        if (!dialog.current.open) dialog.current.showModal();
        const overflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {document.body.style.overflow = overflow;};
    }, [selected]);

    const close = () => dialog.current?.close();
    const move = (direction: number) => setSelected(current => current === null ? null : (current + direction + images.length) % images.length);

    if (!media.length) return null;
    return (
        <section aria-labelledby="project-gallery-title" className="mt-12">
            <h2 id="project-gallery-title" className="section-title">{t('project_gallery') as string}</h2>
            <p className="mt-2 text-muted">{t('project_gallery_hint') as string}</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {media.map(item => {
                    const caption = localize(item.caption, locale);
                    return <figure key={item.src} className={`tile flex flex-col ${item.kind === 'video' ? 'sm:col-span-2' : ''}`}>
                        {item.kind === 'image' ? (
                            <button type="button" onClick={() => setSelected(images.indexOf(item))}
                                    aria-label={`${t('project_enlarge') as string}: ${caption}`}
                                    className="group relative block aspect-video w-full bg-surface-2 focus-visible:outline-offset-[-3px]">
                                <Image src={item.src} alt={caption} fill sizes="(min-width: 640px) 50vw, 100vw"
                                       className="object-contain p-3 transition-transform group-hover:scale-[1.02]"/>
                                <span aria-hidden="true" className="absolute bottom-3 right-3 rounded-full border border-line bg-bg px-3 py-1 text-sm text-fg">⤢</span>
                            </button>
                        ) : (
                            <video controls playsInline muted preload="none" poster={item.poster}
                                   aria-label={caption} aria-describedby={`video-description-${media.indexOf(item)}`}
                                   className="aspect-video w-full bg-black object-contain">
                                <source src={item.src} type="video/mp4"/>
                                <a href={item.src}>{t('project_download_video') as string}</a>
                            </video>
                        )}
                        <figcaption id={item.kind === 'video' ? `video-description-${media.indexOf(item)}` : undefined}
                                    className="p-5 text-sm leading-relaxed text-muted">{caption}</figcaption>
                    </figure>;
                })}
            </div>
            <dialog ref={dialog} onClose={() => setSelected(null)} onClick={event => {if (event.target === event.currentTarget) close();}}
                    onKeyDown={event => {
                        if (event.key === 'ArrowLeft') {event.preventDefault(); move(-1);}
                        if (event.key === 'ArrowRight') {event.preventDefault(); move(1);}
                    }}
                    aria-labelledby="gallery-image-caption"
                    className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-6xl overflow-y-auto rounded-2xl border border-line bg-surface p-4 text-fg shadow-xl backdrop:bg-black/80 sm:p-6">
                {active && <>
                    <div className="flex items-start justify-between gap-4">
                        <p id="gallery-image-caption" className="max-w-3xl text-sm leading-relaxed">{localize(active.caption, locale)}</p>
                        <button type="button" onClick={close} aria-label={t('project_close_gallery') as string}
                                className="btn-secondary h-11 w-11 shrink-0 p-0 text-xl">×</button>
                    </div>
                    <div className="relative mt-4 h-[60dvh] w-full">
                        <Image src={active.src} alt={localize(active.caption, locale)} fill sizes="95vw" className="object-contain"/>
                    </div>
                    <a href={active.src} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center rounded-lg px-2 text-sm text-fg underline underline-offset-4">
                        {t('project_original_image') as string}
                        <span className="sr-only"> {t('opens_new_tab') as string}</span>
                    </a>
                    {images.length > 1 && <div className="mt-4 flex items-center justify-between gap-3">
                        <button type="button" onClick={() => move(-1)} aria-label={t('project_previous_image') as string} className="btn-secondary px-4">←</button>
                        <p aria-live="polite" className="text-sm text-muted">{selected + 1} / {images.length}</p>
                        <button type="button" onClick={() => move(1)} aria-label={t('project_next_image') as string} className="btn-secondary px-4">→</button>
                    </div>}
                </>}
            </dialog>
        </section>
    );
}
