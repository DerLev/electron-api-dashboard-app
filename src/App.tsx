import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

function App() {
  return (
    <Router>
      <Appbar />
      <div className="flex flex-row flex-grow">
        <Navbar />
        <div className="w-full relative">
          <SimpleBar forceVisible={"y"} autoHide={false} style={{ position: 'absolute', width: '100%', height: 'calc(100vh - 1.313rem)', overflowX: 'hidden' }} className="px-3 py-1">
            <Switch>
              <Route exact path="/">
                <Home />
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
