import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Wrapper } from "../Commons";
import { Box, Typography, TextField, Grid, Button } from "@mui/material";

const UpdateUser = () => {
  const [localUser, setLocalUser] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    renderUser();
  }, []);

  const renderUser = () => {
    axios
      .get(`/api/users/update/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log({ user: res.data.user });
        setLocalUser(res.data.user);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setLocalUser({ ...localUser, [name]: value });
  };

  const handleSaveUser = () => {
    axios
      .post(`/api/users/update/${id}`, localUser, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        alert("User updated successfully!");
        history.push("/users");
      })
      .catch((err) => {
        console.log("Error saving user", err);
      });
  };

  if (!localUser) {
    return <div>...Loading</div>;
  }

  return (
    <Wrapper>
      <Typography variant="h4">Update User page</Typography>
      <Box pt={2} />
      <Grid
        container
        display="flex"
        flexDirection="column"
        spacing={3}
        sx={{ width: "650px" }}
      >
        <Grid item>
          <TextField
            placeholder="Name"
            label="Name"
            InputLabelProps={{ shrink: true }}
            type="text"
            name="name"
            value={localUser.name}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item>
          <TextField
            placeholder="Username"
            label="Username"
            InputLabelProps={{ shrink: true }}
            type="text"
            name="username"
            value={localUser.username}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item>
          <TextField
            placeholder="Email"
            label="Email"
            InputLabelProps={{ shrink: true }}
            type="text"
            name="email"
            value={localUser.email}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item>
          <TextField
            placeholder="password"
            label="password"
            InputLabelProps={{ shrink: true }}
            type="password"
            name="password"
            value={localUser.password}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item display="flex">
          <Button variant="outlined" onClick={handleSaveUser}>
            Save User
          </Button>
          <Box mx={2} />
          <Link to="/users" style={{ textDecoration: "none" }}>
            <Button variant="outlined">Back</Button>
          </Link>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default UpdateUser;
