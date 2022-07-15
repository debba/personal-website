import React from "react";
import Link from "next/link";
import {MenuItem} from "../../../interfaces/data";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../../i18n/dictionary";

export const MenuItemSection : React.FC<{ menuItem: MenuItem}> = ({menuItem}) => {

    const { translate : t } = useG11n<typeof DICTIONARY>(DICTIONARY, true);
    const menuItemTitle = menuItem['i18n'] as 'menu_aboutme' ;

    return (
        <Link href={menuItem['link']}>
            <a
                className="uppercase font-roboto block font-semibold mt-4 lg:inline-block lg:mt-0 text-white hover:text-secondary-color mr-4">
                { t( menuItemTitle ) as string }
            </a>
        </Link>
    )
}

export default MenuItemSection;
