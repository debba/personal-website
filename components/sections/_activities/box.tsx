import React from "react";
import {ActivityItem} from "../../../interfaces/data";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../../i18n/dictionary";
import Image from "next/image";

export const ActivityBox : React.FC<{ activity: ActivityItem}> = ({activity}) => {

    const { translate : t } = useG11n<typeof DICTIONARY>(DICTIONARY, false);

    const activityName = t(activity.name  as 'section_activity_webagency' ) as string;
    const activityTitle = t(activity.title  as 'section_activity_webagency_title' ) as string;
    const activitySummary = t(activity.full_desc  as 'section_activity_webagency_summary' ) as string;
    const activityBgColor = activity.bg_color;
    const activityHoverButtonBgColor = activity.hover_button_bg_color;
    const activityAdditionalClasses = activity?.add_class || '';

    return (
        <article
            className={`flex flex-col shadow-xl mx-auto max-w-sm ${activityBgColor} py-10 px-12 transform duration-500 hover:-translate-y-2 cursor-pointer max-h-190 rounded-md ${activityAdditionalClasses}`}>
            {
                activity.logo && (
                    <div className={"text-center mt-5"}>
                        <Image loading={"lazy"} src={activity.logo} alt={activity.name} width={90} height={90} />
                    </div>
                )
            }
            <h1 className="font-bold text-xl font-roboto uppercase mt-20 mb-10">{activityName}</h1>
            <h2 className="font-semibold mb-5 text-white font-roboto">{activityTitle}</h2>
            <p className="text-sm leading-relaxed text-white font-roboto">
                {activitySummary}
            </p>
            {
                activity.link && (
                    <div className={"text-center mt-5"}>
                        <a href={activity.link} target={"_blank"}
                            className={`bg-white text-gray-800 ${activityHoverButtonBgColor} hover:text-white hover:border hover:border-white font-bold py-2 px-4 rounded inline-flex items-center`} rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`${activity.button_icon ? 'fill-current' : ''} w-4 h-4 mr-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d={activity.button_icon || "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"} />
                            </svg>
                            <span>
                                {t(activity.button_text  || 'section_activity_gotolink') as string}
                            </span>
                        </a>
                    </div>
                )
            }


        </article>
    )
}

export default ActivityBox;
