import React from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../js/authcomp.js";
import { useAudioClick } from "../js/audio.js";
import img from "../assets/PTicon.png";
import sideimg from "../assets/03.jpg"
import audioenter from "../assets/sfxtype.wav";

export default function Page3() {
  const navigate = useNavigate();
  const { isAdmin } = useAdminAuth();
  console.log(useAdminAuth());
  const playAndNavigate = useAudioClick(audioenter);
  
  const handleClick = () => playAndNavigate(navigate, "/main");
  if (!isAdmin) return null;
  return (
    <div class="window-main-page">
      <div class="window-header-main">
        <p>OMVB ACCP</p>
        <button onClick={handleClick}>X</button>
      </div>
      <div class="window-content-main page-font">
        <div class="grid">
          <div class="img-corner">
            <img src={img} alt="PT Icon" />
          </div>
          <div class="side-text">
            <p>
              Identification: ███████ <br />
              Clasification: ██████ <br /> Type: ██████
            </p>
            <p>███ █████ ████ ████ ██ ███ ███ ███ ███ ████</p>
            <p>██ ████ ███ ██████ ███ ███ ██ ███ ██████ ████</p>
          </div>

          <div class="text-header">
            <h2>███ ██████ ██████ ███ ████████ ████ ███████ ███████</h2>
          </div>

          <div class="text-content">
            <p>
              ████████ █████ ███████ ██████ ██████████ ████████ ████ ████████
            </p>
            <p>
              ███ ██████ ████████ █████ ███████ ███████████ ███ ██████ █████
            </p>
            <p>
              █████ ████████ ████ █████████ ████████ ███████ █████ ████████
            </p>
            <p>████ ████████████ █████ ████████ ████ ███████ ██████████</p>
            <p>████████ █████ █████ ███████ █████████ ████ ████████ █████</p>
            <p>███ █████████ ████████ █████ ███████ ███████████ ██████</p>
            <p>█████ ███████ ██████████ ████ ████████ █████ ████████</p>
          </div>

        </div>
      </div>
    </div>
  );
}
