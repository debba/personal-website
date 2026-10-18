import Image from "next/image";
import Link from "next/link";
import React from "react";
import {useRouter} from "next/router";
import {getLocale} from "next-g11n";

export interface LogoProps {
    onClick?: () => void
}

export const Logo : React.FC<LogoProps> = ({onClick}) => {
    const router = useRouter();
    const g11nLocale = getLocale(router);

    return (
        <Link
            href="/"
            locale={g11nLocale}
            onClick={onClick}
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-lg text-fg">
            {/* The white mark is swapped for the blue one on dark backgrounds, and on hover. */}
            <Image priority src="/images/logo-single-blue.png" alt="" width={36} height={36}
                   className="block dark:hidden dark:group-hover:block"/>
            <Image priority src="/images/logo-single.png" alt="" width={36} height={36}
                   className="hidden dark:block dark:group-hover:hidden"/>
            <span className="text-sm font-bold uppercase tracking-wider transition-colors group-hover:text-accent">
                Andrea Debernardi
            </span>
        </Link>
    );
}

export default Logo;
