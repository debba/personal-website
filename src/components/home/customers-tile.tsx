import React from "react";
import Image from "next/image";
import {CustomerPortfolio} from "../../interfaces/props";

// Grid of customer logos; the surrounding section provides the heading.
export const CustomersTile: React.FC<{ customers: CustomerPortfolio[], className?: string }> = ({customers, className = ''}) => {
    return (
        <div className={`tile p-5 md:p-7 ${className}`}>
            <ul role="list" className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-8">
                {customers.map(customer => (
                    <li key={customer.url_name} title={customer.name}>
                        <Image loading="lazy" src={`/images/customers/${customer.url_name}`} width={160} height={100}
                               alt={customer.name}
                               className="h-auto w-full rounded-xl bg-white grayscale transition hover:grayscale-0"/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CustomersTile;
