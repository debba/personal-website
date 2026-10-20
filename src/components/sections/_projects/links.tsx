import React from "react";
import {ProjectProps} from "../../../interfaces/props";
import GithubButton from "../../atoms/ghbutton";
import Button from "../../atoms/button";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../../i18n/dictionary";

export const ProjectLinks : React.FC<{ githubData: Pick<ProjectProps['githubData'], 'html_url' | 'homepage'>, documentation?: boolean, projectName?: string, compact?: boolean }> = ({githubData, documentation = false, projectName, compact = false}) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);

    return (
        // Cards use two quiet, equal-width buttons; the project page keeps the prominent pair.
        <div role="group" aria-label={projectName} className={compact ? 'grid grid-cols-[auto_1fr] gap-2 border-t border-line pt-4' : 'flex flex-wrap gap-3'}>
            <GithubButton url={githubData.html_url} title={compact ? 'GitHub' : t('github_repo') as string}
                          className={compact ? `btn-card-dark ${githubData.homepage ? '' : 'col-span-2'}` : undefined}/>
            {
                githubData.homepage && (
                    <Button className={compact ? 'btn-card-light' : 'btn-secondary'} url={githubData.homepage}
                            icon={"M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"}
                            title={t(documentation ? 'project_documentation' : compact ? 'project_website' : 'project_url') as string}/>
                )
            }
        </div>
    )
}

export default ProjectLinks;
