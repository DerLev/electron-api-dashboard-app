import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faHome, faLink, faNetworkWired, faBell, faRunning, faFile, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

function Navbar() {
  return (
    <div style={{ height: 'calc(100vh - 1.313rem)' }} className="flex flex-col justify-between items-center border-r-2 border-gray-800 p-2 mr-1 z-40">
      <ul>
        <Navitem icon={faHome} tooltip="Home" />
        <Navitem icon={faLink} tooltip="Shorturls" />
        <Navitem icon={faNetworkWired} tooltip="Pings" />
        <Navitem icon={faBell} tooltip="Notifications" />
        <Navitem icon={faRunning} tooltip="Emergency Shutdown" />
        <Navitem icon={faFile} tooltip="Files" />
        <Navitem icon={faDiscord} tooltip="Invites" />
        <Navitem icon={faCodeBranch} tooltip="Update" />
      </ul>
      <ul>
        <Navitem icon={faCog} tooltip="Settings" />
      </ul>
    </div>
  )
}


type NavitemProps = {
  icon: any,
  tooltip?: string
}

function Navitem({icon, tooltip}:NavitemProps) {
  return (
    <li className="group rounded-full border-2 border-gray-800 bg-gray-900 p-4 my-1 relative text-gray-400 cursor-pointer filter hover:brightness-125 transition duration-200 active:brightness-150 first:mt-0 last:mb-0">
      <FontAwesomeIcon icon={icon} style={{ height: '1rem', width: '1rem' }} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      {
        tooltip &&
        <span className="absolute top-1/2 left-full opacity-0 invisible transform -translate-y-1/2 bg-gray-700 px-2 py-1 rounded text-gray-100 group-hover:left-10 group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-md w-max">{tooltip}</span>
      }
    </li>
  )
}

export default Navbar
