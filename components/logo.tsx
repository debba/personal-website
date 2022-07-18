import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";

export const Logo : React.FC<{onClick: Function}> = ({onClick}) => {

    const [isHovering, setIsHovered] = useState(false);
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    return (
        <div onClick={() => onClick()} onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave} className="text-white hover:text-secondary-color">
            <Link href="/">
                <a  className="flex items-center flex-shrink-0  mb-3">
                    <Image src={`/images/logo-single${isHovering ? '-blue': ''}.png`} alt={"Andrea Debernardi"} width={54} height={54}/>
                    <span className="font-roboto text-lg uppercase tracking-tight">Andrea Debernardi</span>
                </a>
            </Link>
        </div>
    )
}

export default Logo;
