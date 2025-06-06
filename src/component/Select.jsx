import React, {forwardRef, useId} from 'react'

function Select({
  option = [],
  label,
  className = '',
  ...props
}, ref) {
 
  const id = useId()

  return (
    <div className='w-full'>
      {label && <label htmlFor={id} className=''>{label}</label>}
      <select id={id}
        ref={ref}
        className={`px-3 py-2 
          rounded-lg bg-white 
          text-black outline-none 
          focus:bg-gray-50 duration-200 border 
          border-gray-200 w-full 
          ${className}`}
        {...props}
      >
        {
          option?.map((options,index)=>(
            <option key={index} value={options}>
              {options}
            </option>
          ))
        }
      </select>
    </div>
  )
}

export default forwardRef(Select)