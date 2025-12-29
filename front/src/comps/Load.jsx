import { useState, useEffect } from "react";
import image from "../assets/PTicon.png";
import start from "../assets/start.wav"
import click from "../assets/sfxtype.wav"

export default function Load({ onComplete }) {
    const audio = new Audio(start);
    const audio2 = new Audio(click);
  useEffect(() => {
    audio.play();

    const timer = setTimeout(() => {
      audio2.play();
      onComplete();
    }, 5500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div class="main">
      <div class="inner-main-load">
        <div class="center">
          <div class="icon-box-load">
            <img src={image} class="icon-load" />
            <p class="text-icon-load">Orion Corporation OMBV Terminal Starting up..<span class="flashing">.</span></p>
          </div>
          <div class="line"></div>
        </div>
      </div>
    </div>
  );
}
//
