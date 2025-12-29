import { useState, useEffect, useRef } from "react";
import axios from "axios";
import audio from "../assets/snd.wav";
import audioenter from "../assets/sfxtype.wav"
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [text, setText] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const audioent = new Audio(audioenter)
  audioent.volume = 0.75;

  const handleKeyDown = () => {
    const audioplay = new Audio(audio);
    audioplay.volume = 0.25;
    audioplay.play();
  };

  function typeText(fulltext) {
    for (let i = 0; i <= fulltext.length; i++) {
      setTimeout(() => {
        setText(fulltext.slice(0, i));
      }, i * 100);
    }
  }

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api");
        if (res.data.success && !ignore) {
          typeText(res.data.data);
        }
      } catch (err) {
        if (!ignore) {
          console.log(err);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  const Click = async () => {
    window.location.reload();
  };
  const handleClick = async () => {
    console.log(password, user);
    audioent.play();
    navigate("/main");
  };

  // Inside Login component:
  const navigate = useNavigate();

  const handleLogin = () => {
    // After successful login
    navigate("/main");
  };

  return (
    <div class="window">
      <div class="window-header">
        <p>OMVB Login</p>
        <button onClick={() => Click()}>X</button>
      </div>
      <div class="window-content">
        <div>{text}</div>
        <input
          type="password"
          onKeyDown={handleKeyDown}
          onChange={(e) => setUser(e.target.value)}
          class="input-main"
        />
        <input
          type="password"
          onKeyDown={handleKeyDown}
          onChange={(e) => setPassword(e.target.value)}
          class="input-main"
        />
        <button onClick={(e) => handleClick()} class="button-main">
          Login
        </button>
      </div>
    </div>
  );
}
