interface buttonProps {
  type?: "button" | "submit" | "reset" | undefined,
  text: string,
  block?: boolean,
  disabled?: boolean,
  color?: "red" | "yellow" | "green" | "blue" | undefined
}

function Button({ type, text, block, disabled, color }: buttonProps) {
  return (
    <button type={type} className={`
      ${block ? 'block w-full' : 'mx-2 first:ml-0 last:mr-0'}
      ${disabled ? 'hover:bg-gray-800 hover:text-gray-300 cursor-not-allowed opacity-50' : ''}
      ${color === "red" ? `bg-red-600 hover:bg-red-500 ${disabled ? 'hover:bg-red-600' : ''}` : ''}
      ${color === "yellow" ? `bg-yellow-500 hover:bg-yellow-400 ${disabled ? 'hover:bg-yellow-500' : ''}` : ''}
      ${color === "green" ? `bg-green-600 hover:bg-green-500 ${disabled ? 'hover:bg-green-600' : ''}` : ''}
      ${color === "blue" ? `bg-indigo-600 hover:bg-indigo-500 ${disabled ? 'hover:bg-indigo-600' : ''}` : ''}
    `}>
      {text}
    </button>
  )
}

export default Button
