import { useId } from "react";
import React from "react";

const Select = ({
  label,
  labelClass,
  options = [],
  className = "",
  ...props
},ref) => {
  const id = useId();
  return (
    <div className="flex items-center gap-10">
      {label && (
        <label
          htmlFor={id}
          className={`capitalize w-24 text-center whitespace-nowrap mr-4 text-xl ${labelClass}`}
        >
          {label}
        </label>
      )}
      <select
      ref={ref}
        id={id}
        className={`px-4 py-2 w-1/2 rounded-lg capitalize font-bold border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:shadow-md transition duration-200 ease-in-out ${className}`}
        {...props}
      >
        {options?.map((option) => {
          return (
            <option
              className="font-bold text-gray-700 hover:bg-gray-100"
              key={option}
            >
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
