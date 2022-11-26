import React, { useState, useContext } from "react";
import { regAuth } from "../../../Helpers/copies";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Auth from "../../../Contexts/Auth";

import { Card, Typography, TextField, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "1em",
    maxWidth: "350px",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
  },
  spacing: {
    padding: "1em 0",
  },
}));

const RegAuthForm = ({ login }) => {
  const { setAuth } = useContext(Auth);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldError, setFieldError] = useState("");
  const history = useHistory();
  const classes = useStyles();

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const validateEmail = (email) =>
    email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  const validate = () => {
    const [username, password, email] = Object.values(credentials);
    console.log({ username, password, email });
    if (!username) {
      setErrorMessage("Username is a required field");
      setFieldError("username");
      return false;
    } else if (!password) {
      setErrorMessage("Password is a required field");
      setFieldError("password");
      return false;
    } else if (!email) {
      setErrorMessage("Email is a required field");
      setFieldError("email");
      return false;
    } else if (!validateEmail(email)) {
      setErrorMessage("Email is not correctly formatted");
      setFieldError("email");
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    axios.post("/api/login", credentials).then((response) => {
      if (!response.data.auth) {
        alert(response.data.msg);
      } else {
        localStorage.setItem("token", response.data.token);
        setAuth(response.data.auth);
        alert(`Welcome, ${credentials.username}`);
        history.push("/survey-templates");
      }
    });
  };

  const handleRegister = () => {
    const isValid = validate();
    console.log(isValid);
    if (!isValid) {
      return;
    }
    axios
      .post("/api/register", credentials)
      .then((response) => {
        if (!response.data.auth) {
          alert(response.data.msg);
        } else {
          localStorage.setItem("token", response.data.token);
          setAuth(response.data.auth);
          alert(response.data.msg);
          history.push("/survey-templates");
        }
      })
      .catch((err) => {
        console.log("Error saving user", err);
      });
  };

  return (
    <Card elevation={3} className={clsx(classes.card, classes.actions)}>
      <Typography align="center" variant="h4">
        {login ? regAuth.loginLabel : regAuth.registerLabel}
      </Typography>
      <Box pt={4} />
      <TextField
        InputLabelProps={{ shrink: true }}
        label="Username"
        error={"username" === fieldError}
        helperText={"username" === fieldError ? errorMessage : ""}
        type="text"
        placeholder="Enter Username"
        name="username"
        required
        onChange={onChangeValue}
        value={credentials.username}
      />
      <Box pt={2} />

      {login ? null : (
        <>
          <TextField
            InputLabelProps={{ shrink: true }}
            label="Email"
            error={"email" === fieldError}
            helperText={"email" === fieldError ? errorMessage : ""}
            type="text"
            placeholder="Enter Email"
            name="email"
            required
            onChange={onChangeValue}
            value={credentials.email}
          />
          <Box pt={2} />
        </>
      )}

      <TextField
        InputLabelProps={{ shrink: true }}
        label="Password"
        error={"password" === fieldError}
        helperText={"password" === fieldError ? errorMessage : ""}
        type="password"
        placeholder="Enter Password"
        name="password"
        required
        onChange={onChangeValue}
        value={credentials.password}
      />

      <Typography align="center" className={classes.spacing}>
        {login ? regAuth.noAccount : regAuth.hasAccount}
        <Link to={login ? regAuth.toRegister : regAuth.toLogin}>
          click here
        </Link>
      </Typography>

      <Button
        variant="contained"
        onClick={login ? handleLogin : handleRegister}
      >
        {login ? regAuth.buttonLogin : regAuth.buttonRegister}
      </Button>
    </Card>
  );
};

export default RegAuthForm;
