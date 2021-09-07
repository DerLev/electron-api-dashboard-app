import React from 'react'

interface switchProps {
  value: boolean,
  setValue: React.Dispatch<React.SetStateAction<boolean>> | Function,
  label?: string,
  color?: "red" | "yellow" | "green" | "blue" | undefined,
  disabled?: boolean
}

function Switch({value, setValue, label, color, disabled}: switchProps) {
  return (
    <div className={`flex gap-2 cursor-pointer w-max ${disabled ? 'cursor-not-allowed opacity-50' : ''}`} onClick={() => { if(!disabled) setValue(!value) }}>
      <div
        className={`
          ${ value ? `
            ${color === "red" ? `bg-red-600 hover:bg-red-500 ${disabled ? 'hover:bg-red-600' : ''}` : ''}
            ${color === "yellow" ? `bg-yellow-500 hover:bg-yellow-400 ${disabled ? 'hover:bg-yellow-500' : ''}` : ''}
            ${color === "green" || !color ? `bg-green-600 hover:bg-green-500 ${disabled ? 'hover:bg-green-600' : ''}` : ''}
            ${color === "blue" ? `bg-indigo-600 hover:bg-indigo-500 ${disabled ? 'hover:bg-indigo-600' : ''}` : ''}
          ` : `bg-gray-600 hover:bg-gray-500 ${disabled ? 'hover:bg-gray-600' : ''}` }
          w-10 h-5 rounded-full relative transition-all duration-300 group my-1
        `}
      >
        <div
          className={`
            bg-white w-5 h-5 rounded-full border-2
            ${ value ? `
              ${color === "red" ? `border-red-600 group-hover:border-red-500 ${disabled ? 'group-hover:border-red-600' : ''}` : ''}
              ${color === "yellow" ? `border-yellow-500 group-hover:border-yellow-400 ${disabled ? 'group-hover:border-yellow-500' : ''}` : ''}
              ${color === "green" || !color ? `border-green-600 group-hover:border-green-500 ${disabled ? 'group-hover:border-green-600' : ''}` : ''}
              ${color === "blue" ? `border-indigo-600 group-hover:border-indigo-500 ${disabled ? 'group-hover:border-indigo-600' : ''}` : ''}
            ` : `border-gray-600 group-hover:border-gray-500 ${disabled ? 'group-hover:border-gray-600' : ''}` }
            absolute top-0
            ${ value ? 'left-5' : 'left-0' }
            transition-all duration-300
          `}
        ></div>
      </div>
      {
        label &&
        <div className="flex items-center">
          <p className="text-sm font-light text-gray-300">{label}</p>
        </div>
      }
    </div>
  )
}

export default Switch
