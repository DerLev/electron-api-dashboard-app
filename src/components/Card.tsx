import { ReactElement } from "react"

interface cardProps {
  children: ReactElement,
  title?: string
}

function Card({children, title}: cardProps) {
  return (
    <div className="px-4 py-4 sm:px-0">
      <div className="bg-gray-700 rounded-lg px-4 py-2 shadow-lg" style={{minHeight: '2rem'}}>
        {
          title &&
          <h1 className="text-gray-400 text-xl -mt-2 -mx-4 block bg-gray-800 border-b border-gray-900 rounded-t-lg pt-2 pb-1 px-4 mb-2">{title}</h1>
        }
        {children}
      </div>
    </div>
  )
}

export default Card
