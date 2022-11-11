import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

import { client } from "../client";

const Login = ({ user, handleSignOut }) => {
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          typ="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="logo" className="130px" />
          </div>

          <div className="shadow-2xl">
            <div id="signInDiv"></div>
            {Object.keys(user).length !== 0 && (
              <button onClick={handleSignOut}>Sign out</button>
            )}

            {user && (
              <div>
                <img src={user.picture} alt="" />
                <h3>{user.name}</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
