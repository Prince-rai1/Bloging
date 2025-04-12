import React from 'react'

function Button({
    text = "Button",
    type = "button",
    bgColor = "bg-blue-500",
    textColor = "text-white",
    borderRadius = "rounded",
    classname = "",
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor}
     ${textColor} ${borderRadius} ${classname}`} 
     type={type} 
     {...props}>
       {text}
    </button>
  )
}

export default Button