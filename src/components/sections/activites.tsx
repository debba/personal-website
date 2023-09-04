import React from "react";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";
import ActivityBox from "./_activities/box";
import {ActivityItem} from "../../interfaces/data";

export const ActivitiesSection: React.FC<{ activities: ActivityItem[] }> = ({activities}) => {

    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false)

    return (
        <section id="activities" className="py-3 md:py-[100px] max-lg:landscape:py-3">
            <h2 className="font-roboto text-secondary-color text-center font-extralight uppercase text-3xl md:text-5xl mb-4 leading-normal break-words tracking-tight">
                {t('section_activities') as string}
            </h2>

            <p className={"text-black dark:text-white text-center font-roboto font-semibold text-sm mb-2"}>
                {t('section_activities_desc') as string}
            </p>


            <section className="grid lg:grid-cols-3 grid-cols-1 gap-10 mt-5 antialiased">

                {
                    activities
                        .map((activity, key) => (
                            <ActivityBox activity={activity} key={key}/>
                        ))
                }

            </section>


        </section>
    )
}

export default ActivitiesSection;
