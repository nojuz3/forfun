import React from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../js/authcomp.js";
import { useAudioClick } from "../js/audio.js";
import img from "../assets/PTicon.png";
import audioenter from "../assets/sfxtype.wav";

export default function Page1() {
  const navigate = useNavigate();
  const { isAdmin } = useAdminAuth();
  console.log(useAdminAuth());
  const playAndNavigate = useAudioClick(audioenter);

  const handleClick = () => playAndNavigate(navigate, "/main");
  if (!isAdmin) return null;
  return (
    <div className="window-main-page">
      <div className="window-header-main">
        <p>OMVB ACCP</p>
        <button onClick={handleClick}>X</button>
      </div>
      <div className="window-content-main page-font">
        <div className="grid">
          <div className="img-corner">
            <img src={img} alt="PT Icon" />
          </div>
          <div className="side-text">
            <p>
              Identification: ████████ <br />
              Clasification: ██████
              <br /> Type: ███████
            </p>
            <p>██████ █████████ ███████ ████████ ████████</p>
          </div>
          <div className="text-header">
            <h2>████████ ████ ██████ ████████ ████ ███████ ███████</h2>
          </div>
          <div className="text-content">
            <p>
              ████████ ████ ██████ ████████ ████ ███████ ███████
              <br />
              ████ ████████ ██████ ████████ ████ ███████ ████████ ███████ ████
              ██████ ████████ ████ ███████ ███████ ████████ ████ ██████ ███
              █████ ███ ███ █████ ███████
              <br />
              ████████ ████ ██████ ████████ ████ ███████ ███████
              <br />
              ████████ █████ ██ ███ ████ ████ ███████ ███████ ████ ████████ ████
              ██████ ████████ ████ ███████ ███████
              <br />
              ████ ████████ ██████ ████████ ████ ███████ ████████ ███████ ████
              ██████ ████████ ████ ███████ ███████ ████████ ████ ██████ ███
              █████ ███ ███ █████ ███████
              <br />
              ████████ ████ ██████ ████████ ████ ███████ ███████
              <br />
              ████████ █████ ██ ███ ████ ████ ███████ ███████ ████ ████████ ████
              ██████ ████████ ████ ███████ ███████
              <br />
              ████████ █████ ██ ███ ████ ████ ███████ ███████ ████ ████████ ████
              ██████ ████████ ████ ███████ ███████
              <br />
              ████ ████████ ██████ ████████ ████ ███████ ████████ ███████ ████
              ██████ ████████ ████ ███████ ███████
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
