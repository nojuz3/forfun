import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import img from "../assets/PTicon.png";
import ximg from "../assets/x.jpg"
import lock from "../assets/L.png"
import audioenter from "../assets/sfxtype.wav"


export default function Main() {
  const [cc, setCc] = useState(true);
  const navigate = useNavigate();

    const audioent = new Audio(audioenter)
    audioent.volume = 0.75;

  function appClick(button) {
    audioent.play();
    setCc(false);
  }


  const Click = async () => {
    audioent.play();
    if (!cc) {
      setCc(true);
    } else {
      navigate("/");
    }
  };

  if (!cc) {
    return (
      <div class="window-main">
        <div class="window-header-main">
            <p>OMVB Explorer</p>
          <button onClick={() => Click()}>X</button>
        </div>
        <div class="window-content-main">
          <div class="grid">
            <div class="img-corner">
              <img src={img} />
            </div>
            <div class="side-text">
                <p>████████ █████ █████ ██████ ████ █████████ ███</p>
                <p>██████ █████████ ███████ ████████ ████████</p>
            </div>
            <div class="text-header">
                <h2>████████ ████ ██████ ████████ ████ ███████ ███████</h2>
            </div>
            <div class="text-content">
                <p>████████ ██████ ██████████  █████ ████████ ████████ ███████████ ██████████</p>
                <p>███ █████ ████████████████ ████████ ████████ █████ ████████</p>
                <p>████████ █████ █████████ █████████████ ████████ ███████ ████████ ████████</p>
            </div>
            <div class="side-content"></div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div class="window-main">
        <div class="window-header-main">
          <p>OMVB Explorer</p>
          <button onClick={() => Click()}>X</button>
        </div>
        <div class="window-content-main">
          <div class="main-box-1" onDoubleClick={() => appClick(1)}>
            <img src={ximg}/>
          </div>
          <div class="main-box-1 dn">
            <img src={lock}/>
          </div>
          <div class="main-box-1 dn">
            <img src={lock}/>
          </div>
        </div>
      </div>
    );
  }
}
