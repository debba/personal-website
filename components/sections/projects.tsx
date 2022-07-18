import React from "react";
import ServiceBox from "./_services/box";
import {ServiceItem} from "../../interfaces/data";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";

export const ProjectsSection : React.FC<{ }> = ({}) => {

    const { translate : t } = useG11n<typeof DICTIONARY>(DICTIONARY, false)

    return (
        <section id="projects" className="py-3 md:py-[100px]">
            <h2 className="font-roboto text-secondary-color text-center font-extralight uppercase text-3xl md:text-5xl text-white mb-4 leading-normal break-words tracking-tight">
                { t('section_projects') as string }
            </h2>

        </section>
    )
}

export default ProjectsSection;
