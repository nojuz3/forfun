import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./comps/Login";
import image from "./assets/PTicon.png";
import Main from "./comps/Main";
import Load from "./comps/Load";
import nara from "./assets/nara.png"
import { Page1, Page2 , Page3, Page4 } from "./pages/pages";

function App() {
  const [showStartup, setShowStartup] = useState(true);

  if (showStartup) {
    return <Load onComplete={() => setShowStartup(false)} />;
  }

  return (
    <Router basename="/">
      <div class="main">
        <div class="inner-main">
          <div class="center">
            <div class="icon-box">
              <img src={nara} class="icon" />
              <p class="text-icon">Nara Industries</p>
            </div>
            <div class="line"></div>

            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/main" element={<Main />} />
              <Route path="/main/redact01" element={<Page1 />} />
              <Route path="/main/redact02" element={<Page2 />} />
              <Route path="/main/redact03" element={<Page3 />} />
              <Route path="/main/ungpu" element={<Page4 />} />
              <Route path="*" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
