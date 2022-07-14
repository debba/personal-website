import Image from "next/image";

export const Logo = () => {

    return (
        <div className="flex items-center flex-shrink-0 text-white mb-3">
            <Image src={"/images/logo-single.png"} alt={"Andrea Debernardi"} width={54} height={54} />
            <span className="font-roboto text-lg uppercase tracking-tight">Andrea Debernardi</span>
        </div>
    )
}

export default Logo;
