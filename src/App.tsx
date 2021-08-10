import Appbar from './Appbar';
import { useState, useEffect } from 'react';
import { ReactComponent as Icon } from './icon.svg'
const ipc = window.require('electron').ipcRenderer;

function App() {
  const [name, setName] = useState();

  useEffect(() => {
    setName(ipc.sendSync('app', 'title'));
  }, [])

  const openLink = async (e:any, link:any) => {
    e.preventDefault();
    await ipc.send('link', link);
  }

  return (
    <>
      <Appbar />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <Icon className="mb-4" />
        <h1>{name}</h1>
        <h2><a href="https://github.com/DerLev/electron-react-app/" target="_blank" rel="noopener noreferrer" onClick={(e) => openLink(e, 'https://github.com/DerLev/electron-react-app/')}>Open on GitHub</a></h2>
      </div>
    </>
  );
}

export default App;
