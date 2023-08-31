import React from "react";
import {ProjectProps} from "../../../interfaces/props";
import GithubButton from "../../atoms/ghbutton";
import Button from "../../atoms/button";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../../i18n/dictionary";

export const ProjectLinks : React.FC<{ githubData: ProjectProps['githubData']}> = ({githubData}) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);

    return (
        <div className="text-center mt-5">
            <div className="inline-flex shadow-sm" role="group">
            <GithubButton url={githubData.html_url} title={t('github_repo') as string}/>
            {
                githubData.homepage && (
                    <Button className="
                    ml-2 text-white dark:text-gray-800 bg-secondary-color dark:bg-white hover:bg-slate-600 dark:hover:bg-slate-500 dark:hover:text-white hover:border dark:hover:border-white font-bold py-2 px-4 rounded inline-flex items-center
                    " url={githubData.homepage} svgClassName={"w-4 h-4 mr-"} icon={"M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"} title={t('project_url' ) as string }/>
                )
            }
            </div>
        </div>
    )
}

export default ProjectLinks;
