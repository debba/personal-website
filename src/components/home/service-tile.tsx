import React from "react";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";
import {ServiceItem} from "../../interfaces/data";

export const ServiceTile: React.FC<{ service: ServiceItem, className?: string }> = ({service, className = ''}) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);

    return (
        <article className={`tile flex flex-col p-6 ${className}`}>
            <h3 className="tile-title">{t(service.name as 'service_frontend_development_title') as string}</h3>
            <p className="tile-text mt-3 flex-1">{t(service.description as 'service_frontend_development_desc') as string}</p>
            <ul role="list" className="mt-5 flex flex-wrap gap-1.5">
                {service.skills.map(skill => (
                    <li key={skill} className="chip bg-bg">{skill}</li>
                ))}
            </ul>
        </article>
    );
}

export default ServiceTile;
