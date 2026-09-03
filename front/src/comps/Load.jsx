import { useState, useEffect, useRef } from "react";
import image from "../assets/PTicon.png";
import startSound from "../assets/start.wav";
import click from "../assets/sfxtype.wav";
import nara from "../assets/nara.png"

export default function Load({ onComplete }) {
  const [start, setStart] = useState(false);
  const audioRef = useRef(new Audio(startSound));
  const audio2Ref = useRef(new Audio(click));

  function bootup() {
    setStart(true);
    audioRef.current.play();
    setTimeout(() => {
      audio2Ref.current.play();
      setTimeout(() => {
        onComplete();
      }, 50);
    }, 5500);
  }

  if (!start) {
    return (
      <div class="main">
        <div class="inner-main-start">
          <button class="button-load" onClick={() => bootup()}>
            O<p>I</p>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div class="main">
        <div class="inner-main-load">
          <div class="center">
            <div class="icon-box-load">
              <img src={nara} class="icon-load" />
              <p class="text-icon-load">
                Nara Industries Terminal Starting up..
                <span class="flashing">.</span>
              </p>
            </div>
            <div class="line"></div>
          </div>
        </div>
      </div>
    );
  }
}
//
