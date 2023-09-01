import React from "react";
import {Header} from "./header";
import {Footer} from "./footer";

type LayoutProps = {
    children: React.ReactNode,
};

export const Layout = ({ children } : LayoutProps) => {
    return (
        <>
            <Header />
            <main className="px-3 md:px-6 py-6">
                <section id="page-container">
                    <div className="container mx-auto px-2 md:px-4 text-white">
                        {children}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
