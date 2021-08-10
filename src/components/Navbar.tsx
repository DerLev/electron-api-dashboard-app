import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faHome, faLink, faNetworkWired, faBell, faRunning, faFile, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

function Navbar() {
  return (
    <div style={{ height: 'calc(100vh - 1.313rem)' }} className="flex flex-col justify-between items-center border-r-2 border-gray-800 p-2 mr-1 z-40">
      <ul>
        <Navitem icon={faHome} tooltip="Home" link="/" />
        <Navitem icon={faLink} tooltip="Shorturls" link="/shorturls" />
        <Navitem icon={faNetworkWired} tooltip="Pings" link="/pings" />
        <Navitem icon={faBell} tooltip="Notifications" link="/notification" />
        <Navitem icon={faRunning} tooltip="Emergency Shutdown" link="/emergency" />
        <Navitem icon={faFile} tooltip="Files" link="/files" />
        <Navitem icon={faDiscord} tooltip="Invites" link="/invites" />
        <Navitem icon={faCodeBranch} tooltip="Update" link="/update" />
      </ul>
      <ul>
        <Navitem icon={faCog} tooltip="Settings" rotateOnHover={true} link="/settings" />
      </ul>
    </div>
  )
}


type NavitemProps = {
  icon: any,
  link: string,
  tooltip?: string,
  rotateOnHover?: boolean
}

function Navitem({icon, link, tooltip, rotateOnHover}:NavitemProps) {
  const location = useLocation();

  return (
    <li className="my-1 first:mt-0 last:mb-0">
      <Link to={link} className={`group relative text-gray-400 border-gray-800 bg-gray-900 border-2 p-4 cursor-pointer block filter hover:brightness-125 transition duration-200 active:brightness-150 select-none rounded-full ${location.pathname === link ? 'brightness-115' : ''}`}>
        <FontAwesomeIcon icon={icon} style={{ height: '1.125rem', width: '1.125rem' }} className={`absolute top-1/2 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 transition duration-300 ${rotateOnHover ? 'group-hover:rotate-90' : ''}`} />
        {
          tooltip &&
          <span className="absolute top-1/2 left-full opacity-0 invisible transform-gpu -translate-y-1/2 bg-gray-700 px-2 py-1 rounded text-gray-100 group-hover:left-10 group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-md w-max">{tooltip}</span>
        }
      </Link>
    </li>
  )
}

export default Navbar
