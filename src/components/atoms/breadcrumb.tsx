import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {getLocale, useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

export const Breadcrumb: React.FC<{ items: BreadcrumbItem[] }> = ({items}) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const router = useRouter();
    const g11nLocale = getLocale(router);

    return (
        <nav aria-label={t('breadcrumb_label') as string}>
            <ol role="list" className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <li>
                    <Link href="/" locale={g11nLocale} className="inline-flex items-center rounded hover:text-accent">
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                        </svg>
                        <span className="sr-only">Home</span>
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={item.label} className="flex items-center gap-2">
                        <span aria-hidden="true" className="text-line">/</span>
                        {item.href && index < items.length - 1 ? (
                            <Link href={item.href} locale={g11nLocale} className="hover:text-accent">{item.label}</Link>
                        ) : (
                            <span aria-current="page" className="font-medium text-fg">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export default Breadcrumb;
