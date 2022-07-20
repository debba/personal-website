// 404.js
import Link from 'next/link'

export default function FourOhFourd() {
    return <div  className="py-3 md:py-[100px]">
        <h1 className="mt-[100px] md:mt-0 font-roboto text-3xl font-bold uppercase text-center">404 - Page Not Found</h1>
        <p className={"text-center font-roboto mt-2"}>

            <Link href="/">
                <a
                    className="bg-secondary-color text-indigo-100  hover:bg-indigo-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                <span>Go back home</span>
                </a>
            </Link>
        </p>
    </div>
}
