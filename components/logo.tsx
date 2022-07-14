import Image from "next/image";
import Link from "next/link";

export const Logo = () => {

    return (
            <Link href="/">
                <a  className="flex items-center flex-shrink-0 text-white mb-3">
                    <Image src={"/images/logo-single.png"} alt={"Andrea Debernardi"} width={54} height={54}/>
                    <span className="font-roboto text-lg uppercase tracking-tight hover:text-secondary-color">Andrea Debernardi</span>
                </a>
            </Link>
    )
}

export default Logo;
