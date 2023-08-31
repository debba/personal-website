import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import {useRouter} from "next/router";
import {getLocale} from "next-g11n";
import {useTheme} from "next-themes";

export interface LogoProps {
    onClick?: Function
}

export const Logo : React.FC<LogoProps> = (props) => {

    const [isHovering, setIsHovered] = useState(false);
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    const router = useRouter();
    const g11nLocale = getLocale(router);
    const { theme } = useTheme();

    return (
        <div onClick={() => props.onClick && props.onClick()} onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave} className="text-secondary-color dark:text-white hover:text-secondary-color dark:hover:text-secondary-color">
            <Link
                href="/"
                locale={g11nLocale}
                className="flex items-center flex-shrink-0  mb-3">

                <Image priority={true} src={`/images/logo-single${theme !== 'dark' || isHovering ? '-blue': ''}.png`} alt={"Andrea Debernardi"} width={54} height={54}/>
                <span className="font-roboto text-lg uppercase tracking-tight">Andrea Debernardi</span>

            </Link>
        </div>
    );
}

export default Logo;
