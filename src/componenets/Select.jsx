import React, {useId} from "react";

function Select(
    {label,
    options,
    className="",
    ...props
    }, ref) {
    
    const id = useId()

    return(
        <div className="w-full">
            {label && <label htmlFor={id}></label>}
            <select
            {...props}
            id={id}
            ref={ref}
            className={`px-3 py-2 rounded-lg ${className}`}
            >
                {options?.map((children)=>(
                    <option key={children} value={children}>
                        {children}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)