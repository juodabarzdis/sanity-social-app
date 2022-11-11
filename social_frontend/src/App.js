import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Login from "./components/Login";
import Home from "./container/Home";

const App = () => {
  const [user, setUser] = useState({});

  const handleCallbackResponse = (response) => {
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    localStorage.setItem("user", JSON.stringify(userObject));
    const { name, jti, picture } = userObject;

    const doc = {
      _id: jti,
      _type: "user",
      userName: name,
      image: picture,
    };
    document.getElementById("signInDiv").hidden = true;
  };

  const handleSignOut = (e) => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_API_TOKEN,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <Routes>
      <Route
        path="login"
        element={<Login user={user} handleSignOut={handleSignOut} />}
      />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
