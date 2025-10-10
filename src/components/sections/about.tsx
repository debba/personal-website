import Image from "next/image";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";
import React, {useRef, useState} from "react";
import {ImageState} from "../../interfaces/states";

export const AboutSection = () => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false)
    const [image, setImage] = useState<ImageState>('me');
    const audioRef = useRef<HTMLAudioElement>(null);

    async function  handleMousePosition() {
        setImage(
            image === 'me' ?
                'me_cartoon' :
                'me'
        );
        await audioRef?.current?.play();
    }

    return (
        <section id="about" className="section py-3 md:py-[100px] max-lg:landscape:py-3">
            <div className="grid lg:grid-cols-2 gap-4 items-center">
                <div onMouseOver={handleMousePosition} onMouseOut={handleMousePosition}
                     className="mt-12 lg:mt-0 text-center mx-auto group">
                    <Image loading="eager" priority={true} src={`/images/${image}.jpg`}
                           className="aspect-square group-hover:scale-110 transition duration-500 ease-in-out"
                           alt="Andrea" width="400" height="400"/>
                    <audio ref={audioRef} src='/audio/flip_page.mp3' />
                </div>
                <div className="mb-12 lg:mb-0 py-8">
                    <div className="md:w-1/2">
                        <h1 className={"font-roboto text-secondary-color font-extralight uppercase text-3xl md:text-5xl mb-4 leading-normal break-words tracking-tight"}>
                            Andrea Debernardi
                        </h1>
                    </div>
                    <h2 className="font-roboto text-secondary-color dark:text-white text-normal uppercase text-xl">Full
                        stack web developer</h2>
                    <p className="mt-5 text-black dark:text-white font-roboto font-semibold text-sm">{t('about_claim') as string}</p>
                </div>
            </div>
        </section>
    )
}

export default AboutSection;
