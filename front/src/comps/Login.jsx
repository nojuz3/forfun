import { useState, useEffect, useRef } from "react";
import axios from "axios";
import audio from "../assets/snd.wav";
import audioenter from "../assets/sfxtype.wav"
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [text, setText] = useState("");
  const [token , setToken] = useState("");
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message , setMessage] = useState("");

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

  const navigate = useNavigate();

  const handleLogin = async () => {
    audioent.play();
    if(!username && !password){
      setMessage("Invalid"); 
      return;
    } 
    try {
      const res = await axios.post("http://localhost:8080/api/pages/login", {
        username,
        password,
      });
      if(res.data.success){
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setMessage("Invalid");
    }
    setPassword("");
    setUsername("");
  };
  function proceed(){
    const tokenX = localStorage.getItem("token")
    if(tokenX == token){
      navigate("/main");
    }
    
  }

  return (
    <div class="window">
      <div class="window-header">
        <p>Terminal Login</p>
        <button onClick={() => Click()}>X</button>
      </div>
      <div class="window-content">
        <div>{text}</div>
        <input
          type="password"
          onKeyDown={handleKeyDown}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          class="input-main"
        />
        <input
          type="password"
          onKeyDown={handleKeyDown}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          class="input-main"
        />
        <button onClick={(e) => handleLogin()} class="button-main">
          Login
        </button>
        <div class="error">{message}</div>
      </div>
      {success &&(
        <div class="P-overlay">
          <div class="window-P">
            <div class="window-header">
              <p>Terminal</p>
            </div>
            <div class="P-content">
              <p>Login Success</p>
              <div class="P-buttons">
                <button onClick={proceed} class="button-main">
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
