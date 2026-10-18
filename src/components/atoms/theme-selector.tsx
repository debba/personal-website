import React, {useId, useRef, useSyncExternalStore, type ReactNode} from "react";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";
import {themeStorageKey, type Theme} from "../../lib/theme";

const themeEvent = "debbaweb-theme-change";
const subscribeToHydration = () => () => {};

function getTheme(): Theme {
    const theme = document.documentElement.dataset.theme;
    return theme === "light" || theme === "dark" ? theme : "auto";
}

function applyTheme(theme: Theme) {
    document.documentElement.dataset.theme = theme;
    try {
        localStorage.setItem(themeStorageKey, theme);
    } catch {
        // The current page still works when browser storage is unavailable.
    }
    window.dispatchEvent(new Event(themeEvent));
}

function subscribe(onChange: () => void) {
    // Keep other open tabs in sync with the stored preference.
    function onStorage(event: StorageEvent) {
        if (event.key !== themeStorageKey && event.key !== null) return;
        const value = event.newValue;
        document.documentElement.dataset.theme = value === "light" || value === "dark" ? value : "auto";
        onChange();
    }

    window.addEventListener(themeEvent, onChange);
    window.addEventListener("storage", onStorage);
    return () => {
        window.removeEventListener(themeEvent, onChange);
        window.removeEventListener("storage", onStorage);
    };
}

const OPTIONS: { value: Theme, label: 'theme_light' | 'theme_dark' | 'theme_auto', icon: ReactNode }[] = [
    {
        value: "light",
        label: "theme_light",
        icon: (
            <>
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
            </>
        ),
    },
    {
        value: "dark",
        label: "theme_dark",
        icon: <path d="M20.9 13.3A9 9 0 0 1 10.7 3.1a9 9 0 1 0 10.2 10.2Z"/>,
    },
    {
        value: "auto",
        label: "theme_auto",
        icon: (
            <>
                <rect x="3" y="4" width="18" height="12" rx="2"/>
                <path d="M8 20h8m-4-4v4"/>
            </>
        ),
    },
];

export const ThemeSelector: React.FC<{ showLabels?: boolean, className?: string }> = ({showLabels = false, className = ''}) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const hydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
    const theme = useSyncExternalStore(subscribe, getTheme, () => "auto" as Theme);
    const descriptionId = useId();
    const groupName = useId();
    const audioRef = useRef<HTMLAudioElement>(null);

    const onChange = (value: Theme) => {
        applyTheme(value);
        audioRef.current?.play().catch(() => {});
    };

    return (
        <>
            <fieldset
                className={`segmented ${className}`}
                disabled={!hydrated}
                aria-describedby={descriptionId}
            >
                <legend className="sr-only">{t('theme_label') as string}</legend>
                {OPTIONS.map(({value, label, icon}) => {
                    const text = t(label) as string;
                    return (
                        <label key={value} title={text}
                               className="segmented-item relative cursor-pointer has-[:checked]:bg-accent has-[:checked]:text-on-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal">
                            <input
                                className="sr-only"
                                type="radio"
                                name={groupName}
                                value={value}
                                checked={theme === value}
                                aria-label={text}
                                onChange={() => onChange(value)}
                            />
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                {icon}
                            </svg>
                            {showLabels && <span aria-hidden="true">{text}</span>}
                        </label>
                    );
                })}
            </fieldset>
            <span id={descriptionId} className="sr-only">{t('theme_desc') as string}</span>
            <audio ref={audioRef} src="/audio/switch.mp3" preload="none"/>
        </>
    );
}

export default ThemeSelector;
