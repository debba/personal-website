import {useEffect, useRef, useState} from "react";
import Logo from "./logo";
import {MENU} from "../data/menu";
import MenuItemSection from "./sections/_header/menu.item";
import LanguagePicker from "./sections/_header/language.picker";
import ToggleDarkModeButton from "./atoms/toggle-darkmode";

export const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const closeNav = () => setIsNavOpen(false);

    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isNavOpen) return;

        function handleClick(event: MouseEvent) {

            const target = event.target as HTMLDivElement;

            if (navRef.current && !navRef.current.contains(target)) {
                closeNav();
            }

        }

        window.addEventListener("click", handleClick);

        return () => window.removeEventListener("click", handleClick);
    }, [isNavOpen]);

    return (
        <nav ref={navRef}
             className="border-b-2 border-secondary-color dark:border-b-0 flex fixed max-md:landscape:relative w-full items-center justify-between z-10 flex-wrap bg-white dark:bg-extra-dark p-4">
            <Logo onClick={() => closeNav()}/>
            <div className={"block lg:hidden"}>
                <button onClick={() => setIsNavOpen((prev) => !prev)}
                        className="flex items-center px-3 py-2 border rounded text-secondary-color border-secondary-color dark:hover:text-white dark:hover:border-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-current h-3 w-3" fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor" strokeWidth="2">
                        <title>Menu</title>
                        <path strokeLinecap="round" strokeLinejoin="round" d={
                            isNavOpen ? "M6 18L18 6M6 6l12 12" : "M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                        }/>
                    </svg>
                </button>
            </div>
            <div className="px-3 md:px-0 w-full block lg:flex lg:items-center lg:w-auto">
                <div className={!isNavOpen ? "hidden lg:block" : ''}>
                    {
                        MENU.map((menuItem, key) => <MenuItemSection menuItem={menuItem}
                                                                     menuItemSelection={() => closeNav()} key={key}/>)
                    }
                    <LanguagePicker onCloseLanguagePicker={() => closeNav()}/>
                </div>
                <div className={!isNavOpen ? "hidden lg:block" : ''}>
                    <ToggleDarkModeButton />
                </div>
            </div>
        </nav>
    )
}
