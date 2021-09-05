import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Appbar from './components/Appbar';
import Navbar from './components/Navbar';
import Home from './Home';
import Settings from './Settings';
import Emergency from './Emergency';
import Files from './Files';
import Invites from './Invites';
import Notifications from './Notifications';
import Pings from './Pings';
import Shorturls from './Shorturls';
import Update from './Update';
import Notification from './components/Notification';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

axios.defaults.baseURL = 'https://api.mc-mineserver.de/v3';

function App() {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [notification, setNotification] = useState({ show: false, content: '' });

  const addNotification = (content:string) => {
    setNotification({ show: true, content: content});
    setTimeout(() => {
      setNotification({ show: false, content: '' });
    }, 5000);
  }

  return (
    <Router>
      <Appbar />
      <div className="flex flex-row flex-grow">
        <Navbar />
        <div className="w-full relative">
          <Notification notification={notification} />
          <SimpleBar forceVisible={"y"} autoHide={false} style={{ position: 'absolute', width: '100%', height: 'calc(100vh - 1.313rem)', overflowX: 'hidden' }} className="px-3 py-1">
            <Switch>
              <Route exact path="/">
                <Home setAccessToken={setAccessToken} setRefreshToken={setRefreshToken} addNotification={addNotification} />
              </Route>
              <Route path="/shorturls">
                <Shorturls />
              </Route>
              <Route path="/pings">
                <Pings />
              </Route>
              <Route path="/notification">
                <Notifications />
              </Route>
              <Route path="/emergency">
                <Emergency />
              </Route>
              <Route path="/files">
                <Files />
              </Route>
              <Route path="/invites">
                <Invites />
              </Route>
              <Route path="/update">
                <Update />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
            </Switch>
          </SimpleBar>
        </div>
      </div>
    </Router>
  );
}

export default App;
