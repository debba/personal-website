import {ServiceItem} from "../../interfaces/props";
import React from "react";
import ServiceBox from "./_services/box";

export const PortfolioSection : React.FC<{  }> = ({}) => {
    return (
        <section id="portfolio" className="py-3 md:py-[100px]">
            <h2 className="font-roboto text-secondary-color text-center font-extralight uppercase text-3xl md:text-5xl text-white mb-4 leading-normal break-words tracking-tight">Portfolio</h2>

            <p className="text-center font-roboto text-xl">Under construction</p>

            <div className="md:p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5 md:gap-12">



            </div>

        </section>
    )
}

export default PortfolioSection;
