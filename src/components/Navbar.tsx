import { useState, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as MinimizeSvg } from '../minimize.svg';
import { ReactComponent as MaximizeSvg } from '../maximize.svg';
import { ReactComponent as CloseSvg } from '../close.svg';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon, UserIcon, DownloadIcon, RefreshIcon } from '@heroicons/react/outline';
const ipc = window.require('electron').ipcRenderer

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com'
}
const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Shorturls', href: '/shourturls', current: false },
  { name: 'Pings', href: '/pings', current: false },
  { name: 'Notifications', href: '/notifications', current: false },
  { name: 'Emergency', href: '/emergency', current: false },
  { name: 'Files', href: '/files', current: false },
  { name: 'Invites', href: '/discord/invites', current: false },
  { name: 'Update', href: '/update', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '/account' },
  { name: 'Settings', href: '/settings' },
  { name: 'Logout', href: '/auth/logout' },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

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


function Navbar() {
  const [update, setUpdate] = useState('none');

  ipc.on('update', (e:any, arg:any) => {
    if(arg === 'available') {
      setUpdate('available');
    }

    if(arg === 'downloaded') {
      setUpdate('downloaded');
    }
  });

  let location = useLocation();

  return (
    <Disclosure as="nav" className="bg-gray-800 select-none pb-3">
      {({ open }) => (
        <>
          <div className="flex justify-end -mb-3">
            {
              update === 'downloaded' &&
              <button className="text-gray-500 hover:text-white hover:bg-green-500 transition duration-500 cursor-pointer px-2 flex items-center justify-center focus:outline-none rounded-none my-0" onClick={restart}>
                <RefreshIcon className="w-3 h-3" />
                <RefreshIcon className="animate-ping absolute opacity-40 w-3 h-3" />
              </button>
            }
            {
              update === 'available' &&
              <button className="text-gray-500 hover:text-gray-500 bg-transparent hover:bg-gray-800 px-2 cursor-wait focus:outline-none rounded-none my-0">
                <DownloadIcon className="animate-pulse w-3 h-3" />
              </button>
            }
            <button className="text-gray-500 hover:text-gray-400 bg-transparent hover:bg-gray-800 cursor-pointer transition duration-500 py-1 px-2 focus:outline-none rounded-none my-0" onClick={minimize}>
              <MinimizeSvg className="h-3 w-3" />
            </button>
            <button className="text-gray-500 hover:text-gray-400 bg-transparent hover:bg-gray-800 cursor-pointer transition duration-500 py-1 px-2 focus:outline-none rounded-none my-0" onClick={maximize}>
              <MaximizeSvg className="h-3 w-3" />
            </button>
            <button className="text-gray-500 hover:text-white bg-transparent hover:bg-red-500 cursor-pointer transition duration-500 py-1 px-2 focus:outline-none rounded-none my-0" onClick={close}>
              <CloseSvg className="h-3 w-3" />
            </button>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8"
                    src="https://api.mc-mineserver.de/v3/files/22a6bf06d5cdaef170979cdd35a26a32.svg"
                    alt="McMineserver"
                    id="ctxMenu"
                    draggable={false}
                    onClick={ctxMenu}
                  />
                </div>
                <div className="hidden lg:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          location.pathname === item.href
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={location.pathname === item.href ? 'page' : undefined}
                        draggable={false}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white my-0">
                        <span className="sr-only">Open user menu</span>
                        <UserIcon className="h-6 w-6 rounded-full" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <Link
                                to={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                                draggable={false}
                              >
                                {item.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none my-0">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            {({ close }) => (
              <>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        location.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={location.pathname === item.href ? 'page' : undefined}
                      draggable={false}
                      onClick={() => close()}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0 text-gray-400">
                      <UserIcon className="h-10 w-10 rounded-full" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          location.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700',
                          'block px-3 py-2 rounded-md text-base font-medium'
                        )}
                        draggable={false}
                        onClick={() => close()}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
