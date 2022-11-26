import "./App.css";
import React, { useState, useEffect } from "react";
import { NavBarMenu } from "./Components";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Contexts/Auth";
import { StoreProvider } from "./Contexts/Store";
import ROUTES, { RenderRoutes } from "./Helpers/routes";

import axios from "axios";

function App() {
  const [auth, setAuth] = useState(null);
  const [bgColor, setBgColor] = useState("unset");

  useEffect(() => {
    userAuthenticated();
  }, []);

  const userAuthenticated = () => {
    axios
      .get("/api/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => setAuth(response.data.auth));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };
  const handleBgColor = (colorString) => {
    setBgColor(colorString);
  };

  if (auth === null) {
    return <div>...Loading</div>;
  }

  return (
    <AuthProvider value={{ auth, setAuth, handleLogout }}>
      <StoreProvider value={{ handleBgColor }}>
        <div
          style={{
            position: "absolute",
            backgroundColor: bgColor,
            height: "100%",
            width: "100vw",
            zIndex: -10,
            overflow: "hidden",
          }}
        ></div>
        <Router>
          <NavBarMenu />
          <RenderRoutes routes={ROUTES} />
        </Router>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
