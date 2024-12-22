import React from 'react'

const Button = ({
    className="",
    type="button",
    children,
    ...props
}) => {
  return (
    <button className={`${className} px-3 py-2 bg-slate-700 text-white font-bold rounded-lg text-center transition-colors cursor-pointer hover:bg-slate-900`} {...props}>{children}</button>
  )
}

export default Button