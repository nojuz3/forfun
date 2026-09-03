import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import img from "../assets/PTicon.png";
import ximg from "../assets/x.jpg";
import img2 from "../assets/02.jpg";
import img3 from "../assets/03.jpg";
import lock from "../assets/L.png";
import LC from "../assets/LC.jpg"


import audioenter from "../assets/sfxtype.wav";

export default function Main() {
  const [cc, setCc] = useState(true);
  const [access, setAccess] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const audioentRef = useRef(null);

  function check(user) {
    if (!user || (user.role !== "admin" && user.role !== "user")) {
      navigate("/");
    }
  }

  useEffect(() => {
    audioentRef.current = new Audio(audioenter);
    audioentRef.current.volume = 0.75;

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/pages/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          check(res.data.user);
          setAccess(res.data.user.role);
        }
      } catch (error) {
        console.log(error);
        check("false");
      }
    };
    const fetch = async () => {
      try {
        const x = await axios.get("http://localhost:8080/api/pages/get");
        console.log(x.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
    fetchUser();
  }, []);

  function appClick(button) {
    audioentRef.current?.play();
    switch (button) {
      case "01":
        navigate("/main/redact01");
        break;
      case "02":
        navigate("/main/redact02");
        break;
      case "03":
        navigate("/main/redact03");
        break;
      case "DataExpunged":
        navigate("/main/ungpu");
        break;
    }
  }

  const Click = async () => {
    audioentRef.current?.play();
    if (!cc) {
      setCc(true);
    } else {
      setShowLogoutConfirm(true);
    }
  };

  const handleLogout = () => {
    audioentRef.current?.play();
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleCancelLogout = () => {
    audioentRef.current?.play();
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <div class="window-main">
        <div class="window-header-main">
          <p>Terminal Explorer</p>
          <button onClick={() => Click()}>X</button>
        </div>
        {access == "admin" && (
          <div class="window-content-main">
            <div class="main-box-1" onDoubleClick={() => appClick("01")}>
              <img src={ximg} />
            </div>
            <div class="main-box-1" onDoubleClick={() => appClick("02")}>
              <img src={img2} />
            </div>
            <div class="main-box-1" onDoubleClick={() => appClick("03")}>
              <img src={img3} />
            </div>
          </div>
        )}
        {access == "user" && (
          <div class="window-content-main">

            <div class="glitch glitch-animation" onDoubleClick={() => appClick("DataExpunged")}>
              <img src={LC} />
            </div>
          </div>
        )}
      </div>

      {showLogoutConfirm && (
        <div class="logout-overlay">
          <div class="window-logout">
            <div class="window-header">
              <p>Confirm Logout</p>
            </div>
            <div class="logout-content">
              <p>Are you sure you want to logout?</p>
              <div class="logout-buttons">
                <button onClick={handleLogout} class="button-main">
                  Yes
                </button>
                <button onClick={handleCancelLogout} class="button-main">
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
