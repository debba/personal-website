import React from "react";
import {Header} from "./header";
import {Footer} from "./footer";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../i18n/dictionary";
import Konami from "./konami";

type LayoutProps = {
    children: React.ReactNode,
};

export const Layout = ({ children } : LayoutProps) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);

    return (
        <>
            <a href="#main" className="skip-link">{t('skip_to_content') as string}</a>
            <Header />
            <main id="main" tabIndex={-1} className="focus:outline-none md:pt-6">
                <div className="container mx-auto px-4 md:px-6">
                    {children}
                </div>
            </main>
            <Footer />
            <Konami />
        </>
    )
}
