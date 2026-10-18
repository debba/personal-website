import React from "react";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";
import {getLocale} from "next-g11n";
import {ProjectItem} from "../../interfaces/data";
import {localize} from "../../helpers/localize";
import ProjectCover from "../atoms/project-cover";
import ArrowCircle from "../atoms/arrow-circle";

// `showIcon` replaces the emoji with the project's real logo when it has one;
// `featured` gives a larger caption with the full description, for big tiles.
export const ProjectTile: React.FC<{ project: ProjectItem, className?: string, showIcon?: boolean, featured?: boolean }> = ({
    project,
    className = '',
    showIcon = false,
    featured = false
}) => {
    const router = useRouter();
    const g11nLocale = getLocale(router);
    const logo = showIcon ? project.image?.icon : undefined;

    return (
        <Link href={`/projects/${project.github_name}`} locale={g11nLocale}
              className={`tile group flex min-h-[17rem] flex-col ${className}`}>
            <div className="relative mx-5 mt-5 flex-1 overflow-hidden rounded-2xl">
                {project.image?.cover ? (
                    <ProjectCover image={project.image} alt="" forceStill
                                  sizes="(min-width: 1024px) 50vw, 100vw"
                                  className="absolute inset-0 h-full w-full object-contain transition duration-500 group-hover:scale-[1.04]"/>
                ) : (
                    <span aria-hidden="true"
                          className="absolute inset-0 flex items-center justify-center text-6xl">{project.emoji || '</>'}</span>
                )}
            </div>
            <div className="flex items-center gap-3 p-4">
                <ArrowCircle/>
                <div className="min-w-0">
                    <p className={`flex items-center font-semibold text-fg ${featured ? 'gap-2.5 text-2xl' : 'gap-1.5'}`}>
                        {logo ? (
                            <Image src={logo} alt="" width={featured ? 32 : 20} height={featured ? 32 : 20}
                                   className={`shrink-0 rounded-md object-contain ${featured ? 'h-8 w-8' : 'h-5 w-5'}`}/>
                        ) : project.emoji && <span aria-hidden="true">{project.emoji}</span>}
                        <span className="truncate">{project.name}</span>
                    </p>
                    <p className={featured ? 'mt-1 text-muted' : 'truncate text-sm text-muted'}>{localize(project.short_description, g11nLocale)}</p>
                </div>
            </div>
        </Link>
    );
}

export default ProjectTile;
