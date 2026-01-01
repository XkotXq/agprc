import React from "react";
import clsx from "clsx";


export default function Wrapper({ children, className }) {
    return (
         <div className={clsx("max-w-6xl mx-auto relative", className)}>
            {children}
        </div>
    )
}