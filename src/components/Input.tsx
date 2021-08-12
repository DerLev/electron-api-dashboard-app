import { ChangeEventHandler } from "react"

interface inputProps {
  type: string,
  placeholder?: string,
  light?: boolean,
  onChange: ChangeEventHandler,
  value: string,
  disabled?: boolean
}

function Input({type, placeholder, light, onChange, value, disabled}: inputProps) {
  return (
    <>
      <span className={`text-left block mt-1.5 text-sm select-none ${light ? ' text-black' : 'text-white'}`}>{placeholder}</span>
      <div className={`mb-1.5 rounded w-full px-2 py-0.5 outline-none transition duration-300 ring-0 focus-within:ring-2 ring-opacity-75 ring-indigo-500 ${light ? ' bg-gray-200 text-black' : 'bg-gray-800 text-white'} disabled:cursor-not-allowed disabled:text-gray-500`}>
        <input type={type} value={value} onChange={onChange} disabled={disabled} className="bg-transparent border-0 outline-none block w-full" />
      </div>
    </>
  )
}

Input.defaultProps = {
  type: 'text'
}

export default Input
