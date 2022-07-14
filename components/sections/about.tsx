import Image from "next/image";

export const AboutSection = () => {
    return (
        <section id="about">
            <div className="grid lg:grid-cols-2 gap-4 flex items-start">
                <div className="mt-12 lg:mt-0 text-center">
                    <Image className={"object-none object-center"} loading="lazy" src={"/images/me.jpg"}
                           alt="Andrea" width="450px" height="450px"/>
                </div>
                <div className="mb-12 lg:mb-0 py-8">
                    <div className="md:w-1/2">
                        <h1 className={"font-roboto text-secondary-color font-extralight uppercase text-3xl md:text-5xl text-white mb-4 leading-normal break-words tracking-tight"}>
                            Andrea Debernardi
                        </h1>
                    </div>
                    <h2 className="font-roboto text-normal uppercase text-2xl">Full stack web developer</h2>
                    <p className="mt-5 font-roboto font-semibold text-sm">After taking my first steps into the MS-DOS environment thanks to dad’s help, I soon started to explore the world of colours and windows. Driven by an unquenchable curiosity, I quickly learned all the things that now – together with some more knowledge and maturity – represent my profession.
                        But in this field knowledge is never enough, and there is no limit to my curiosity: therefore, I always keep my skills up to date and continuously look for new and more efficient tools.
                        I like to engage in new challenges, I hate to waste time and I love traveling, music, movies and quality food.</p>
                </div>
            </div>
        </section>
    )
}

export default AboutSection;
