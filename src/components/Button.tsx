import { MouseEventHandler } from "react"

interface buttonProps {
  text: string,
  type?: any,
  block?: boolean,
  light?: boolean,
  className?: any,
  onClick?: MouseEventHandler,
  loading?: boolean,
  disabled?: boolean,
  color?: 'primary' | 'secondary'
}

function Button({ text, type, block, light, className, onClick, loading, disabled, color }: buttonProps) {
  function btnColor() {
    if(color) {
      if(color === 'primary') {
        return `${light ? `bg-indigo-400 active:bg-indigo-500 ${disabled ? 'text-gray-500' : 'text-black'}` : `bg-indigo-700 active:bg-indigo-600 ${disabled ? 'text-gray-500' : 'text-white'}`}`
      } else if(color === 'secondary') {
        return `${light ? `bg-gray-200 active:bg-gray-300 ${disabled ? 'text-gray-500' : 'text-black'}` : `bg-gray-800 active:bg-gray-700 ${disabled ? 'text-gray-500' : 'text-white'}`}`
      }
    } else {
      return `${light ? `bg-gray-200 active:bg-gray-300 ${disabled ? 'text-gray-500' : 'text-black'}` : `bg-gray-800 active:bg-gray-700 ${disabled ? 'text-gray-500' : 'text-white'}`}`
    }
  }

  return (
    <div className={`${block ? 'block' : 'inline-block'}`}>
      <button type={type} onClick={onClick} disabled={loading || disabled} className={`${block ? 'block w-full' : 'inline-block'} ${btnColor()} px-2 py-0.5 outline-none transition duration-300 rounded disabled:cursor-not-allowed font-medium select-none ${className}`}>
        <span className={`${loading ? 'hidden' : 'inline-block'}`}>{text}</span>
        <span className={`h-4 w-4 rounded-full ${light ? 'LoaderLight' : 'Loader'} ${loading ? 'inline-block' : 'hidden'}`}></span>
      </button>
    </div>
  )
}

export default Button
