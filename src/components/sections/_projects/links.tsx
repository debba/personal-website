import React from "react";
import {ProjectProps} from "../../../interfaces/props";
import GithubButton from "../../atoms/ghbutton";
import Button from "../../atoms/button";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../../i18n/dictionary";

export const ProjectLinks : React.FC<{ githubData: ProjectProps['githubData']}> = ({githubData}) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);

    return (
        <div className="flex flex-wrap gap-3">
            <GithubButton url={githubData.html_url} title={t('github_repo') as string}/>
            {
                githubData.homepage && (
                    <Button className="btn-secondary" url={githubData.homepage}
                            icon={"M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"}
                            title={t('project_url') as string}/>
                )
            }
        </div>
    )
}

export default ProjectLinks;
