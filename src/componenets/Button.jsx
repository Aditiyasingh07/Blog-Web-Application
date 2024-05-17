import React from "react";

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button className={`btn btn-primary ${bgColor} ${textColor} ${className} ${type}`} {...props}>
            {children}
        </button>
    )
}

export default Button