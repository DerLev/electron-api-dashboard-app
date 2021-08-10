import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Appbar from './Appbar';
import Navbar from './Navbar';
import Home from './Home';
import Settings from './Settings';
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
