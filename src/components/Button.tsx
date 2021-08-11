import { DetailedHTMLProps } from "react"

interface buttonProps {
  text: string,
  type?: string
}

function Button({ text, type }: buttonProps) {
  return (
    <div>
      <button type={type}>{text}</button>
    </div>
  )
}

export default Button
