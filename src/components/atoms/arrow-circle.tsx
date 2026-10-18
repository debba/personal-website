import React from "react";

export const ArrowCircle: React.FC = () => (
    <span className="arrow-circle" aria-hidden="true">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M8 7h9v9"/>
        </svg>
    </span>
);

export default ArrowCircle;
