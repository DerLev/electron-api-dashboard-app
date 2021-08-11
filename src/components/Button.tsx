import { MouseEventHandler } from "react"

interface buttonProps {
  text: string,
  type?: any,
  block?: boolean,
  light?: boolean,
  className?: any,
  onClick?: MouseEventHandler,
  loading?: boolean,
  disabled?: boolean
}

function Button({ text, type, block, light, className, onClick, loading, disabled }: buttonProps) {
  return (
    <div className={`${block ? 'block' : 'inline-block'}`}>
      <button type={type} onClick={onClick} disabled={loading || disabled} className={`${block ? 'block w-full' : 'inline-block'} ${light ? `border-gray-300 bg-gray-200 focus:border-blue-500 active:bg-gray-100 ${disabled ? 'text-gray-500' : 'text-black'}` : `border-gray-700 bg-gray-800 focus:border-blue-400 active:bg-gray-700 ${disabled ? 'text-gray-500' : 'text-white'}`} border-2 ring-0 focus:ring-2 ring-opacity-30 ring-blue-700 px-2 py-1 outline-none transition duration-300 rounded disabled:cursor-not-allowed ${className}`}>
        <span className={`${loading ? 'hidden' : 'inline-block'}`}>{text}</span>
        <span className={`h-4 w-4 rounded-full Loader ${loading ? 'inline-block' : 'hidden'}`}></span>
      </button>
    </div>
  )
}

export default Button
