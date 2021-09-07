import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { ExclamationIcon } from '@heroicons/react/outline';
import axios from 'axios';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import Navbar from './components/Navbar';
import Home from './Home';
import Settings from './Settings';

axios.defaults.baseURL = 'https://api.mc-mineserver.de/v3';


function App() {
  const [title, setTitle] = useState('Dashboard');

  return(
    <Router>
      <div className="h-screen flex flex-col">
        <Navbar />

        <header className="bg-white shadow">
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${title === 'Dashboard' ? 'py-6' : 'py-2'} transition-all duration-300 ease-in-out`}>
            <h1 className="text-3xl font-bold text-gray-900">
              { title }
            </h1>
          </div>
        </header>
        <main className="overflow-hidden flex flex-col">
          <SimpleBar style={{ height: '100%' }} forceVisible="y" autoHide={false}>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Switch>
                  <Route exact path="/">
                    <Home setTitle={setTitle} />
                  </Route>
                  <Route path="/settings">
                    <Settings setTitle={setTitle} />
                  </Route>
                  <Route path="*">
                    <NotFound setTitle={setTitle} />
                  </Route>
                </Switch>
            </div>
          </SimpleBar>
        </main>
      </div>
    </Router>
  );
}

interface notFoundProps {
  setTitle: React.Dispatch<React.SetStateAction<string>>
}

function NotFound({ setTitle }: notFoundProps) {
  useEffect(() => {
    setTitle('Error');
  })

  let location = useLocation();

  return (
    <div>
      <h1 className="text-xl flex items-center justify-center gap-3">
        <ExclamationIcon className="w-6 h-6" />
        <code>404: {location.pathname}</code>
      </h1>
    </div>
  );
}

export default App;
