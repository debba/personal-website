import React, {useEffect, useState} from "react";

export const Counter: React.FC<{end: number, duration:number}> = ({end, duration}) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let start = 0;
        // if zero, return
        if (start === end) return;

        // find duration per increment
        let incrementTime = (duration / end) * 1000;

        // timer increments start counter
        // then updates count
        // ends if start reaches end
        let timer = setInterval(() => {
            start += 1;
            setCount(start)
            if (start === end) clearInterval(timer)
        }, incrementTime);

        // dependency array
    }, [end, duration]);

    return (
        <span className="count">
            {count}
        </span>
    );
}
