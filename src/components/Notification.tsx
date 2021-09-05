import { CSSTransition } from 'react-transition-group';

interface notificationProps {
  notification: { show: boolean, content: string }
}

function Notification({ notification }: notificationProps) {
  return (
    <div className="absolute top-1 left-1/2 transform-gpu -translate-x-1/2 z-30 w-96">
      <div className="flex flex-col">
        {
          notification.show == true &&
          <div className="bg-gray-100 text-black py-1 px-2 rounded-md shadow-md my-1">
            <span>{notification.content}</span>
          </div>
        }
      </div>
    </div>
  )
}

export default Notification
