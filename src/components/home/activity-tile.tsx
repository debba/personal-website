import React from "react";
import Image from "next/image";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";
import {ActivityItem} from "../../interfaces/data";
import Button from "../atoms/button";

export const ActivityTile: React.FC<{ activity: ActivityItem, className?: string, headingLevel?: 2 | 3 }> = ({activity, className = '', headingLevel = 2}) => {
    const Heading = `h${headingLevel}` as 'h2' | 'h3';
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const titleId = `activity-${activity.id}`;

    return (
        <section aria-labelledby={titleId} className={`tile flex flex-col p-7 text-white ${activity.bg_color} ${className}`}>
            <span aria-hidden="true" className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/10"/>
            <div className="flex h-12 items-center">
                {activity.logo ? (
                    <Image loading="lazy" src={activity.logo} alt={activity.logo_alt || ''} width={48} height={48}/>
                ) : (
                    <span aria-hidden="true" className="text-4xl">{activity.emoji}</span>
                )}
            </div>
            <Heading id={titleId} className="tile-title mt-6 text-white">{t(activity.name as 'section_activity_webagency') as string}</Heading>
            <p className="tile-label text-white">{t(activity.title as 'section_activity_webagency_title') as string}</p>
            <p className="mt-4 flex-1 text-sm leading-relaxed">{t(activity.full_desc as 'section_activity_webagency_summary') as string}</p>
            {activity.buttons && (
                <div className="mt-5 flex flex-wrap gap-2">
                    {activity.buttons.map(button => (
                        <Button
                            key={button.link}
                            className="btn bg-white px-4 text-gray-900 hover:bg-white/85"
                            url={button.link}
                            openSelf={!button.external}
                            title={t(button.button_text || 'section_activity_gotolink') as string}
                            icon={button.button_icon || "M7 17 17 7M8 7h9v9"}
                            filledIcon={!!button.button_icon_fill}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default ActivityTile;
