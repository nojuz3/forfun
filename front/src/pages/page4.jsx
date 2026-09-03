import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAudioClick } from "../js/audio.js";
import { useEffect, useState } from "react";
//

import img from "../assets/PTicon.png";
import sideimg from "../assets/03.jpg";
import img2 from "../assets/02.jpg";
import img3 from "../assets/x.jpg";
import img4 from "../assets/LC.jpg";
import audioenter from "../assets/sfxtype.wav";

//
export default function Page4() {
  const [user, setUser] = useState("");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const navigate = useNavigate();
  const playAndNavigate = useAudioClick(audioenter);

  const imgs = [img4, img3, sideimg, img2];

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/pages/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.data.success && res.data.user.role === "user") {
          setUser(res.data.user.role);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    setNum1(Math.floor(Math.random() * 4));
    setNum2(Math.floor(Math.random() * 4));
    setNum3(Math.floor(Math.random() * 4));
    fetch();
    timeout();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNum1(Math.floor(Math.random() * 4));
      setNum2(Math.floor(Math.random() * 4));
      setNum3(Math.floor(Math.random() * 4));
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  function timeout() {
    setTimeout(() => {
      navigate("/");
      window.location.reload();
      localStorage.removeItem("token");
    }, 15500);
  }

  const handleClick = () => playAndNavigate(navigate, "/main");
  if (user != "user") {
    return null;
  }

  return (
    <div class="window-page4">
      <div class="window-header-page4">
        <p class="font2 page4-text-header">ERROR ERROR</p>
        <button onClick={handleClick}>X</button>
      </div>
      <div class="window-content-page4">
        <div class="grid-page4">
          <div class="img-corner ">
            <img class="img-white" src={img} alt="PT Icon" />
          </div>
          <div class="side-text">
            <p>
              Identification: ███████ <br />
              Clasification: ██████ <br /> Type: ██████
            </p>
            <p>███ █████ ████ ████ ██ ███ ███ ███ ███ ████</p>
            <p>██ ████ ███ ██████ ███ ███ ██ ███ ██████ ████</p>
          </div>

          <div class="text-header-page4">
            <h2>███ ██████ ██████ ███ ████████ ████ ███████ ███████</h2>
          </div>

          <div class="text-content-page4">
            <p>
              ████████ █████ ███████ ██████ ██████████ ████████ ████ ████████
            </p>
            <p>
              ███ ██████ ████████ █████ ███████ ███████████ ███ ██████ █████
            </p>
            <p>█████ ████████ ████ █████████ ████████ ███████ █████ ████████</p>
            <p>████ ████████████ █████ ████████ ████ ███████ ██████████</p>
            <p>████████ █████ █████ ███████ █████████ ████ ████████ █████</p>
            <p>███ █████████ ████████ █████ ███████ ███████████ ██████</p>
            <p>█████ ███████ ██████████ ████ ████████ █████ ████████</p>
          </div>

          <div class="side-content">
            <img class="img-side-page4" src={imgs[num1]} />
            <img class="img-side-page4" src={imgs[num2]} />
            <img class="img-side-page4" src={imgs[num3]} />
          </div>
        </div>
      </div>
    </div>
  );
}
