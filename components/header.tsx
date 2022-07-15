import {useState} from "react";
import Logo from "./logo";
import Link from "next/link";

export const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <nav className="flex fixed w-full items-center justify-between z-10 flex-wrap bg-extra-dark p-4">
            <Logo/>
            <div className={"block lg:hidden"}>
                <button onClick={() => setIsNavOpen((prev) => !prev)}
                        className="flex items-center px-3 py-2 border rounded text-secondary-color border-secondary-color hover:text-white hover:border-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-current h-3 w-3" fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor" strokeWidth="2">
                        <title>Menu</title>
                        <path strokeLinecap="round" strokeLinejoin="round" d={
                            isNavOpen ? "M6 18L18 6M6 6l12 12" : "M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                        } />
                    </svg>
                </button>
            </div>
            <div className="w-full block lg:flex lg:items-center lg:w-auto">
                <div className={!isNavOpen ? "hidden lg:block" : ''}>
                    <Link href="/#about">
                        <a
                            className="font-roboto block font-semibold mt-4 lg:inline-block lg:mt-0 text-white hover:text-secondary-color mr-4">
                            ABOUT ME
                        </a>
                    </Link>
                    <Link href="/#services">
                        <a className="font-roboto font-semibold block mt-4 lg:inline-block lg:mt-0 text-white
                            hover:text-secondary-color mr-4">
                            SERVICES
                        </a>
                    </Link>
                    <Link href="/#portfolio">
                        <a className="font-roboto font-semibold block mt-4 lg:inline-block lg:mt-0 text-white
                            hover:text-secondary-color mr-4">
                            PORTFOLIO
                        </a>
                    </Link>
                    <Link href="/#contact">
                        <a
                            className="font-roboto font-semibold  block mt-4 lg:inline-block lg:mt-0 text-white hover:text-secondary-color">
                            CONTACT
                        </a>
                    </Link>
                </div>

            </div>
        </nav>
    )
}
