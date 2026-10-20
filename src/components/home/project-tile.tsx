import React, {useRef, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";
import {getLocale} from "next-g11n";
import {ProjectItem} from "../../interfaces/data";
import {localize} from "../../helpers/localize";
import ProjectCover from "../atoms/project-cover";
import ArrowCircle from "../atoms/arrow-circle";
import ProjectLinks from '../sections/_projects/links';

// `showIcon` replaces the emoji with the project's real logo when it has one;
// `featured` gives a larger caption with the full description, for big tiles.
// `hoverVideo` plays a silent demo over the cover while a mouse hovers the tile.
export const ProjectTile: React.FC<{ project: ProjectItem, className?: string, showIcon?: boolean, featured?: boolean, detailed?: boolean, technologies?: string[], website?: string, documentation?: boolean, hoverVideo?: string }> = ({
    project,
    className = '',
    showIcon = false,
    featured = false,
    detailed = false,
    technologies = [],
    website,
    documentation,
    hoverVideo
}) => {
    const router = useRouter();
    const g11nLocale = getLocale(router);
    const logo = showIcon ? project.image?.icon : undefined;
    const Heading = detailed ? 'h2' : 'p';
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);

    // The video is only requested on the first hover, and never on touch screens or with reduced motion.
    const startVideo = () => {
        const video = videoRef.current;
        if (!video || !hoverVideo || !matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
        if (!video.getAttribute('src')) video.src = hoverVideo;
        video.play().catch(() => undefined);
    };
    const stopVideo = () => {
        videoRef.current?.pause();
        setPlaying(false);
    };

    return (
        <div className={`tile flex min-h-[17rem] flex-col ${project.accent ? 'tile-accent' : ''} ${className}`}
             style={project.accent ? {'--project-accent': project.accent} as React.CSSProperties : undefined}
             onMouseEnter={hoverVideo ? startVideo : undefined} onMouseLeave={hoverVideo ? stopVideo : undefined}>
        <Link href={`/projects/${project.github_name}`} locale={g11nLocale}
              className="group flex flex-1 flex-col rounded-3xl transition-colors hover:bg-surface-2 focus-visible:outline-offset-[-3px]">
            <div className={`relative mx-5 mt-5 flex-1 overflow-hidden rounded-2xl ${detailed ? 'min-h-[12rem]' : ''}`}>
                {project.image?.cover ? (
                    <ProjectCover image={project.image} alt="" forceStill
                                  sizes="(min-width: 1024px) 50vw, 100vw"
                                  className="absolute inset-0 h-full w-full object-contain transition duration-500 group-hover:scale-[1.04]"/>
                ) : (
                    <span aria-hidden="true"
                          className="absolute inset-0 flex items-center justify-center text-6xl">{project.emoji || '</>'}</span>
                )}
                {hoverVideo && <video ref={videoRef} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1}
                                      onPlaying={() => setPlaying(true)}
                                      className={`absolute inset-0 h-full w-full bg-surface object-contain transition-opacity duration-300 ${playing ? 'opacity-100' : 'opacity-0'}`}/>}
            </div>
            <div className="flex items-center gap-3 p-4">
                <ArrowCircle/>
                <div className="min-w-0">
                    <Heading className={`flex items-center font-semibold text-fg ${featured ? 'gap-2.5 text-2xl' : 'gap-1.5'}`}>
                        {logo ? (
                            <Image src={logo} alt="" width={featured ? 32 : 20} height={featured ? 32 : 20}
                                   className={`shrink-0 rounded-md object-contain ${featured ? 'h-8 w-8' : 'h-5 w-5'}`}/>
                        ) : project.emoji && <span aria-hidden="true">{project.emoji}</span>}
                        <span className={detailed ? 'break-words' : 'truncate'}>{project.name}</span>
                    </Heading>
                    <p className={detailed ? 'mt-2 text-sm leading-relaxed text-muted' : featured ? 'mt-1 text-muted' : 'truncate text-sm text-muted'}>{localize(project.short_description, g11nLocale)}</p>
                    {!!technologies?.length && <ul role="list" className="mt-3 flex flex-wrap gap-1.5">{technologies.map(technology => <li key={technology} className="chip text-xs">{technology}</li>)}</ul>}
                </div>
            </div>
        </Link>
        {detailed && <div className="px-4 pb-5">
            <ProjectLinks projectName={project.name} compact documentation={documentation}
                          githubData={{html_url: `https://github.com/${project.github_user}/${project.github_name}`, homepage: website || ''}}/>
        </div>}
        </div>
    );
}

export default ProjectTile;
