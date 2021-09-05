import { useState, useEffect } from "react";
// import Switch from "./components/Switch";
const ipc = window.require('electron').ipcRenderer;

function Settings() {
  const [autostart, setAutostart] = useState(false);
  const [minimizeToTray, setMinimizeToTray] = useState(false);

  useEffect(() => {
    const userPrefs = ipc.sendSync('settings', 'get');
    setAutostart(userPrefs.autoStart);
    setMinimizeToTray(userPrefs.minimizeToTray);
  }, [])

  const changeAutostart = (value:boolean) => {
    setAutostart(value);
    if(value === true) {
      ipc.send('settings', 'autostart-on');
    } else {
      ipc.send('settings', 'autostart-off');
    }
  }

  const changeMinmizeToTray = (value:boolean) => {
    setMinimizeToTray(value);
    if(value === true) {
      ipc.send('settings', 'minmizeToTray-on');
    } else {
      ipc.send('settings', 'minmizeToTray-off');
    }
  }

  return (
    <div>
      <h1 className="mb-4">Settings</h1>
      <Option checkbox={autostart} setCheckbox={changeAutostart} title="Autostart" description="Whether the app should start automatically when windows starts" />
      <Option checkbox={minimizeToTray} setCheckbox={changeMinmizeToTray} title="Minimize to tray" description="Whether the app should minimize to the system tray when closed" />
    </div>
  )
}

interface optionProps {
  checkbox: Boolean,
  setCheckbox: Function,
  title: String,
  description: String
}

function Option({ checkbox, setCheckbox, title, description }: optionProps) {
  return (
    <div className="flex items-center mr-10 my-4">
      <div className="flex-grow cursor-pointer select-none" onClick={() => setCheckbox(!checkbox)}>
        <h4>{title}</h4>
        <p className="text-sm">{description}</p>
      </div>
      <div>
        {/* <Switch checkbox={checkbox} setCheckbox={setCheckbox} /> */}
      </div>
    </div>
  )
}

export default Settings
