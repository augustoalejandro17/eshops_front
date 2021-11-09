import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import * as React from 'react';
import DefaultHeader from './views/DefaultHeader';
import Home from './views/Home';
import Shop from './views/Shop';

const App = () => {
    return(
        <Routes>
            <Route path="/" element={<DefaultHeader/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/shop/:shopIndex" element={<Shop/>}/>
                <Route path="*" element={<NoMatch />} />
            </Route>
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
