import React from "react";
import Image from "next/image";
import {CustomerPortfolio} from "../../../interfaces/props";

export const PortfolioCustomer : React.FC<{ customer: CustomerPortfolio}> = ({customer}) => {
    return (

        <div className="group w-full lg:max-w-full lg:flex border dark:border-0 border-secondary-color cursor-pointer hover:border-2 relative">
            <div className="absolute w-full h-full top-0 left-0 bg-secondary-color transition-opacity ease-in duration-100 opacity-100 hidden group-hover:flex group-hover:opacity-90 items-center justify-center">
                <p className="text-center text-white font-bold font-roboto">
                    {customer.name}
                </p>
            </div>
            <Image loading={"lazy"} src={ `/images/customers/${customer.url_name}`} width={400} height={250} alt={customer.name} />
        </div>
    )
}

export default PortfolioCustomer;
