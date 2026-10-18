import Link from "next/link";
import {useRouter} from "next/router";
import {getLocale, useG11n} from "next-g11n";
import Logo from "./logo";
import {MENU} from "../data/menu";
import {DICTIONARY} from "../i18n/dictionary";
import LanguagePicker from "./sections/_header/language.picker";
import ThemeSelector from "./atoms/theme-selector";

export const Header = () => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const router = useRouter();
    const g11nLocale = getLocale(router);

    const isActive = (link: string) => {
        if (link === '/') return router.pathname === '/';
        return router.pathname.startsWith(link);
    };

    return (
        <header>
            <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 pt-5 md:px-6">
                <Logo/>
                <div className="flex items-center gap-2">
                    <LanguagePicker/>
                    <ThemeSelector/>
                </div>
            </div>

            {/* Floating pill navigation: bottom of the screen on phones, top on larger screens. */}
            <nav aria-label={t('nav_label') as string}
                 className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 md:bottom-auto md:top-5 pointer-events-none">
                <ul role="list"
                    className="pointer-events-auto flex items-center gap-0.5 rounded-full border border-line bg-surface/85 p-1 shadow-lg shadow-black/5 backdrop-blur-md">
                    {MENU.map((menuItem) => {
                        const active = isActive(menuItem.link);
                        return (
                            <li key={menuItem.link}>
                                <Link href={menuItem.link} locale={g11nLocale}
                                      aria-current={active ? 'page' : undefined}
                                      className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-2.5 text-[13px] font-semibold transition-colors sm:px-4 sm:text-sm ${active ? 'bg-bg text-fg shadow-sm' : 'text-muted hover:text-fg'}`}>
                                    {menuItem.link === '/projects' && (
                                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#ef4444]"/>
                                    )}
                                    {t(menuItem.i18n as 'menu_home') as string}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    )
}
