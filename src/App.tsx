import React from 'react';
import SocialFeed from "./components/SocialFeed";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
      <Router>
        <Routes>
          <Route path={'/'} element={<SocialFeed/>}/>
        </Routes>
      </Router>

  );
}

export default App;
