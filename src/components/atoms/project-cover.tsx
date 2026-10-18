import React from "react";
import Image from "next/image";
import {ProjectImage} from "../../interfaces/data";

/*
 * Animated covers (GIFs) fall back to a still frame when the visitor prefers reduced motion.
 * `forceStill` always uses the still frame, e.g. in card grids where animation adds noise.
 */
export const ProjectCover: React.FC<{ image: ProjectImage, alt: string, className?: string, forceStill?: boolean, sizes?: string }> = ({
    image,
    alt,
    className = '',
    forceStill = false,
    sizes
}) => {
    if (!image.cover) return null;

    if (image.still) {
        return (
            <picture>
                {!forceStill && <source media="(prefers-reduced-motion: reduce)" srcSet={image.still}/>}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={forceStill ? image.still : image.cover} alt={alt} loading="lazy" decoding="async"
                     className={className}/>
            </picture>
        );
    }

    return <Image src={image.cover} alt={alt} fill sizes={sizes} className={className}
                  unoptimized={image.cover.endsWith('.gif')}/>;
}

export default ProjectCover;
