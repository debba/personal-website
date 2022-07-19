import React from "react";
import Image from "next/image";

export const PortfolioCustomer : React.FC<{ customerName: string}> = ({customerName}) => {
    return (

        <div className="w-full lg:max-w-full lg:flex">
            <Image loading={"lazy"} src={ `/images/customers/${customerName}`} width={400} height={250} alt={customerName} />
        </div>
    )
}

export default PortfolioCustomer;
