import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Auth from "../../Contexts/Auth";
import { AppBar, Box, Button as NativeButton, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../../assets/images/logo.png";

const Button = ({ children, ...rest }) => (
  <NativeButton
    sx={{
      mx: "1em",
      ":hover": {
        bgcolor: "primary.dark",
        color: "white",
        padding: "5px 7px 5px 7px",
        border: "1px solid white",
        ...rest,
      },
    }}
  >
    {children}
  </NativeButton>
);

const NavBarMenuAuth = ({ handleLogout }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: ".5px 0 .5px 0",
      }}
    >
      <div style={{ display: "flex" }}>
        <Link style={{ textDecoration: "none" }} to="/home">
          <div style={{ width: "140px", margin: "0 1em 0 1em" }}>
            <img src={logo} style={{ width: "100%", height: "100%" }} />
          </div>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/survey-templates">
          <Button color="inherit">
            <Typography color="white">Survey Templates</Typography>
          </Button>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/report-analytics">
          <Button color="inherit">
            <Typography color="white">Report Analytics</Typography>
          </Button>
        </Link>
      </div>
      <div>
        <Link style={{ textDecoration: "none" }} to="/users">
          <Button color="inherit">
            <AccountCircleIcon style={{ color: "white" }} />
            <Typography color="white">Profile</Typography>
          </Button>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/home"
          onClick={handleLogout}
        >
          <Button color="inherit">
            <Typography color="white">Log out</Typography>
          </Button>
        </Link>
      </div>
    </div>
  );
};

const NavBarMenuNoAuth = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1px 0 1px 0",
      }}
    >
      <div style={{ display: "inherit" }}>
        <Link style={{ textDecoration: "none" }} to="/home">
          <div style={{ width: "140px", margin: "0 1em 0 1em" }}>
            <img src={logo} style={{ width: "100%", height: "100%" }} />
          </div>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/surveys">
          <Button>
            <Typography color="white">Surveys</Typography>
          </Button>
        </Link>
      </div>
      <div>
        <Link style={{ textDecoration: "none" }} to="/login">
          <Button>
            <Typography color="white">Login</Typography>
          </Button>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/register">
          <Button>
            <Typography color="white">Register</Typography>
          </Button>
        </Link>
      </div>
    </div>
  );
};

const NavBarMenu = () => {
  const { auth, handleLogout } = useContext(Auth);

  return (
    <AppBar style={{ padding: ".5em 0 " }}>
      {auth ? (
        <NavBarMenuAuth handleLogout={handleLogout} />
      ) : (
        <NavBarMenuNoAuth />
      )}
    </AppBar>
  );
};

export default NavBarMenu;
