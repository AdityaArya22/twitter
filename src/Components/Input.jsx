import React ,{useId} from "react";

const Input = React.forwardRef(function Input(
   { 
    labelClass,
    label,
    className="",
    type="text",
    ...props},ref)
{
    const id = useId()
    return <div className="flex justify-center items-start">
        
        {label && <label htmlFor={id} className={`capitalize w-24 text-center mr-4 text-xl ${labelClass}`}>{label}</label>}
        <input className={`${className} px-3 py-2 w-[70%] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:shadow-md transition duration-200 ease-in-out`} {...props} type={type} ref={ref} id={id}/>
    </div>
})

export default Input