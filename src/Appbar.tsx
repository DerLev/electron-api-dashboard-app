import { ReactComponent as MinimizeSvg } from './minimize.svg';
import { ReactComponent as MaximizeSvg } from './maximize.svg';
import { ReactComponent as CloseSvg } from './close.svg';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faDownload } from '@fortawesome/free-solid-svg-icons';
const ipc = window.require('electron').ipcRenderer

function Navbar() {
  const minimize = async () => {
    await ipc.send('window', 'minimize');
  }

  const maximize = async () => {
    await ipc.send('window', 'maximize');
  }

  const close = async () => {
    await ipc.send('window', 'close');
  }

  const restart = async () => {
    await ipc.send('app', 'update')
  }

  const ctxMenu = async () => {
    await ipc.send('menu', 'appBar')
  }

  const [title, setTitle] = useState();
  const [update, setUpdate] = useState('none');

  useEffect(() => {
    setTitle(ipc.sendSync('app', 'title'));
  }, []);

  ipc.on('update', (e:any, arg:any) => {
    if(arg === 'available') {
      setUpdate('available');
    }

    if(arg === 'downloaded') {
      setUpdate('downloaded');
    }
  });

  return (
    <div className="bg-gray-900 border-b border-gray-800 flex justify-between appBar items-center pl-1 sticky top-0 left-0 right-0">
      <span className="text-gray-500" onClick={ctxMenu}>{ title }</span>
      <div className="flex">
        {
          update === 'downloaded' && <span className="text-gray-500 hover:text-white hover:bg-green-500 transition duration-500 cursor-pointer px-2 flex items-center justify-center" onClick={restart}>
            <FontAwesomeIcon icon={faSyncAlt} />
            <FontAwesomeIcon icon={faSyncAlt} className="animate-ping absolute opacity-40" />
          </span>
        }
        {
          update === 'available' && <span className="text-gray-500 px-2" onClick={restart}>
            <FontAwesomeIcon icon={faDownload} className="animate-pulse" />
          </span>
        }
        <span className="text-gray-500 hover:text-gray-400 bg-transparent hover:bg-gray-800 cursor-pointer transition duration-500 py-1 px-2" onClick={minimize}>
          <MinimizeSvg />
        </span>
        <span className="text-gray-500 hover:text-gray-400 bg-transparent hover:bg-gray-800 cursor-pointer transition duration-500 py-1 px-2" onClick={maximize}>
          <MaximizeSvg />
        </span>
        <span className="text-gray-500 hover:text-white bg-transparent hover:bg-red-500 cursor-pointer transition duration-500 py-1 px-2" onClick={close}>
          <CloseSvg />
        </span>
      </div>
    </div>
  )
}

export default Navbar
