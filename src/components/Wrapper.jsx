import React from "react";
import clsx from "clsx";


export default function Wrapper({ children, className }) {
    return (
         <div className={clsx("max-w-7xl mx-auto relative w-full", className)}>
            {children}
        </div>
    )
}