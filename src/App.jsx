import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import * as React from 'react';
import Home from './views/Home';
import Store from './views/Store';

const App = () => {
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/store" element={Store} />
            <Route path="*" element={<NoMatch />} />
        </Routes>
    )
}

function NoMatch() {
    return (
      <div>
        <h2>Nothing to see here!</h2>
        <p>
          <Link to="/">Go to the home page</Link>
        </p>
      </div>
    );
  }
export default App;
