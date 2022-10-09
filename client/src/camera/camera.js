import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import "./camera.css";
import { socket } from "../index.js";
import avitar from "../img/avitar.png";

//Video size
const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: "user"
};

export default function Camera(props) {
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [user, setUser] = useState(``);
  const [cameraPage, setCameraPage] = useState("off");

  useEffect(() => {
    socket.on("UserStatus", (data) => {
      setUser(data[1]);
      data[0] === 2 ? setCameraPage(`on`) : setCameraPage(`off`);
    });
  }, []);

  //Show camera
  const setCamera = () => {
    setShowCamera(!showCamera);
  };

  //Camera
  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  }, [webcamRef]);

  const submitPhoto = () => {
    socket.emit("SubmitPhoto", [user, url], function (res) {
      if (res === true) {
        setUrl(null);
        setShowCamera(false);
      } else {
        alert(`Please try again Photo did not save!`);
      }
    });
  };

  return (
    <div
      className={`camera-sheet-${cameraPage}`}
      // style={{ display: gamePage ? "visible" : "none" }}
    >
      <h1 className="camera-heading">Welcome {user}</h1>
      <h1 className="camera-welcome">Please add photo of yourself</h1>
      <div>
        {url && (
          <div>
            <img className="camera-module" src={url} alt="Screenshot" />
          </div>
        )}
        {showCamera && !url && (
          <Webcam
            className="camera-module"
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/png"
            videoConstraints={videoConstraints}
            mirrored={true}
          />
        )}
        {!showCamera && (
          <img
            className="camera-module1"
            src={avitar}
            alt="avitar"
            width="300"
            height="300"
          />
        )}
      </div>
      <div>
        <button className="button-camera" onClick={setCamera}></button>
        <button className="button-capture" onClick={capturePhoto}></button>
        <button className="button-reset" onClick={() => setUrl(null)}></button>
        <button className="button-file"></button>
        <button className="button-submit" onClick={submitPhoto}></button>
      </div>
    </div>
  );
}
