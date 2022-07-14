import Image from "next/image";
import {useState} from "react";
import Logo from "./logo";

export const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between flex-wrap bg-extra-dark p-6">
            <Logo />
            <div className={"block lg:hidden"}>
                <button onClick={() => setIsNavOpen((prev) => !prev)}
                    className="flex items-center px-3 py-2 border rounded text-secondary-color border-secondary-color hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                    </svg>
                </button>
            </div>
            <div className="w-full block lg:flex lg:items-center lg:w-auto">
                <div  className={!isNavOpen ? "hidden lg:block" : ''} >
                    <a href="#responsive-header"
                       className="font-roboto block font-semibold mt-4 lg:inline-block lg:mt-0 text-white hover:text-secondary-color mr-4">
                        ABOUT ME
                    </a>
                    <a href="#responsive-header"
                       className="font-roboto font-semibold  block mt-4 lg:inline-block lg:mt-0 text-white hover:text-secondary-color mr-4">
                        SERVICES
                    </a>
                    <a href="#responsive-header"
                       className="font-roboto font-semibold  block mt-4 lg:inline-block lg:mt-0 text-white hover:text-secondary-color">
                        CONTACT
                    </a>
                </div>

            </div>
        </nav>
    )
}
