import React from "react";
import PortfolioCustomer from "./_portfolio/customer";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";
import {CustomerPortfolio} from "../../interfaces/props";

export const PortfolioSection : React.FC<{ customers: CustomerPortfolio[]  }> = ({customers}) => {

    const { translate : t } = useG11n<typeof DICTIONARY>(DICTIONARY, false)

    return (
        <section id="portfolio" className="section py-3 md:py-[100px] max-lg:landscape:py-3">
            <h2 className="font-roboto text-secondary-color text-center font-extralight uppercase text-3xl md:text-5xl mb-4 leading-normal break-words tracking-tight">
                {t('section_portfolio') as string}
            </h2>

            <p className="text-black dark:text-white text-center font-roboto font-semibold text-sm mb-2">
                {t('section_portfolio_desc') as string}
            </p>

            <div className="p-10 grid grid-cols-3 md:grid-cols-5 gap-5 md:gap-12">

                {customers.map((customer,  key) => (
                    <PortfolioCustomer customer={customer} key={key}/>
                ))}

            </div>

        </section>
    )
}

export default PortfolioSection;
