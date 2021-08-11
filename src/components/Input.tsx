interface inputProps {
  type: string,
  placeholder?: string,
  light?: boolean
}

function Input({type, placeholder, light}: inputProps) {
  return (
    <div className="my-1.5">
      <input type={type} placeholder={placeholder} className={`border-2 rounded bg-transparent w-full px-2 py-1 outline-none transition duration-300 ring-0 focus:ring-2 ring-opacity-30 ring-blue-700 ${light ? 'border-gray-300 bg-gray-200 focus:border-blue-500' : 'border-gray-700 bg-gray-800 focus:border-blue-400'}`} />
    </div>
  )
}

Input.defaultProps = {
  type: 'text'
}

export default Input
