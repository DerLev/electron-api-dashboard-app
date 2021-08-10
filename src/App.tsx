import Appbar from './Appbar';
import Navbar from './Navbar';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

function App() {
  return (
    <>
      <Appbar />
      <div className="flex flex-row flex-grow">
        <Navbar />
        <div className="w-full relative">
          <SimpleBar forceVisible="y" autoHide={false} style={{ position: 'absolute', width: '100%', height: 'calc(100vh - 1.313rem)' }}>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
            <h1>content</h1>
          </SimpleBar>
        </div>
      </div>
    </>
  );
}

export default App;
