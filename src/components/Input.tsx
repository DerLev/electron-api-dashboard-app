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
    <div className={`my-1.5 rounded w-full px-2 py-1 outline-none transition duration-300 ring-0 focus:ring-2 ring-opacity-30 ring-blue-700 ${light ? ' bg-gray-200 text-black' : 'bg-gray-800 text-white'} disabled:cursor-not-allowed disabled:text-gray-500`}>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} className="bg-transparent border-0 outline-none block w-full" />
    </div>
  )
}

Input.defaultProps = {
  type: 'text'
}

export default Input
