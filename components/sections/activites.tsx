import React from "react";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";
import {ACTIVITIES} from "../../data/activities";
import ActivityBox from "./_activities/box";

export const ActivitiesSection: React.FC<{}> = ({}) => {

    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false)

    return (
        <section id="activities" className="py-3 md:py-[100px]">
            <h2 className="font-roboto text-secondary-color text-center font-extralight uppercase text-3xl md:text-5xl text-white mb-4 leading-normal break-words tracking-tight">
                {t('section_activities') as string}
            </h2>

            <p className={"text-center font-roboto text-xl mb-2"}>
                {t('section_activities_desc') as string}
            </p>


            <section className="grid lg:grid-cols-3 grid-cols-1 gap-10 mt-5 antialiased">

                {
                    ACTIVITIES
                        .map((activity, key) => (
                            <ActivityBox activity={activity} key={key}/>
                        ))
                }

            </section>


        </section>
    )
}

export default ActivitiesSection;
