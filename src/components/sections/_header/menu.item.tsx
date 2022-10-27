import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {MenuItem} from "../../../interfaces/data";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../../i18n/dictionary";

const MenuItemSection : React.FC<{ menuItem: MenuItem, menuItemSelection: Function}> = ({menuItem, menuItemSelection}) => {

    const { translate : t } = useG11n<typeof DICTIONARY>(DICTIONARY, true);
    const menuItemTitle = menuItem['i18n'] as 'menu_aboutme' ;

    const linkRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {

            const target = event.target as HTMLDivElement;

            if (linkRef.current && linkRef.current.contains(target) ) {
                menuItemSelection();
            }
        }
        window.addEventListener("click", handleClick);

        return () => window.removeEventListener("click", handleClick);
    }, [menuItemSelection]);


    return (
        (<Link
            href={menuItem['link']}
            ref={linkRef}
            className="pb-1 border-b-0 bg-[length:0_3px] bg-[0_100%] bg-no-repeat mt-2 bg-gradient-to-b from-transparent to-white transition-bg-size duration-500 ease-in-out  bg-gradient-to-b from-transparent to-secondary-color hover:bg-[length:100%_3px] uppercase menu-item font-roboto block font-semibold mt-4 lg:inline-block lg:mt-0 hover:text-secondary-color text-white mr-4">

            { t( menuItemTitle ) as string }

        </Link>)
    );
}

export default MenuItemSection;
