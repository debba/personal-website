import React from "react";
import ServiceBox from "./_services/box";
import PortfolioCustomer from "./_portfolio/customer";
import {ServiceItem} from "../../interfaces/data";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";

export const PortfolioSection : React.FC<{ customersLogo: string[]  }> = ({customersLogo}) => {

    const { translate : t } = useG11n<typeof DICTIONARY>(DICTIONARY, false)

    return (
        <section id="portfolio" className="py-3 md:py-[100px]">
            <h2 className="font-roboto text-secondary-color text-center font-extralight uppercase text-3xl md:text-5xl text-white mb-4 leading-normal break-words tracking-tight">
                {t('section_portfolio') as string}
            </h2>

            <p className="text-center font-roboto text-xl mb-2">
                {t('section_portfolio_desc') as string}
            </p>

            <div className="md:p-10 grid grid-cols-3 md:grid-cols-5 gap-5 md:gap-12">

                {customersLogo.map((customerName,  key) => (
                    <PortfolioCustomer customerName={customerName} key={key}/>
                ))}

            </div>

        </section>
    )
}

export default PortfolioSection;
