import Image from "next/image";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";

export const AboutSection = () => {
    const { translate : t } = useG11n<typeof DICTIONARY>(DICTIONARY, false)

    return (
        <section id="about" className="py-3 md:py-[100px] max-lg:landscape:py-3">
            <div className="grid lg:grid-cols-2 gap-4 flex items-center">
                <div className="mt-12 lg:mt-0 text-center mx-auto">
                    <Image loading="lazy" src={"/images/me.jpg"}
                           alt="Andrea" width="450" height="450"/>
                </div>
                <div className="mb-12 lg:mb-0 py-8">
                    <div className="md:w-1/2">
                        <h1 className={"font-roboto text-secondary-color font-extralight uppercase text-3xl md:text-5xl mb-4 leading-normal break-words tracking-tight"}>
                            Andrea Debernardi
                        </h1>
                    </div>
                    <h2 className="font-roboto text-secondary-color dark:text-white text-normal uppercase text-xl">Full stack web developer</h2>
                    <p className="mt-5 text-black dark:text-white font-roboto font-semibold text-sm">{ t('about_claim') as string }</p>
                </div>
            </div>
        </section>
    )
}

export default AboutSection;
