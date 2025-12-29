import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./comps/Login";
import image from "./assets/PTicon.png";
import Main from "./comps/Main";
import Load from "./comps/Load"


function App() {
  const [showStartup, setShowStartup] = useState(true);
  const test = true

  if (showStartup) {
    return <Load onComplete={() => setShowStartup(false)} />;
  }

  return (
    <Router>
      <div class="main">
        <div class="inner-main">
          <div class="center">
            <div class="icon-box">
              <img src={image} class="icon" />
              <p class="text-icon">Orion Corporation</p>
            </div>
            <div class="line"></div>

            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/main" element={<Main />} />
              <Route path="*" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
