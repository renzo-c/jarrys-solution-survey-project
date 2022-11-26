import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Wrapper } from "../Commons";
import { Box, Grid, Typography, Button } from "@mui/material";

const DisplayUser = () => {
  const { id } = useParams();
  const [localUser, setLocalUser] = useState(null);

  useEffect(() => {
    if (!localUser) {
      renderUser();
    }
  }, []);

  const renderUser = () => {
    if (id) {
      axios
        .get(`/api/users/${id}`, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setLocalUser(response.data);
        })
        .catch((err) => {
          console.log("Error fetching user!");
        });
    }
  };

  if (!localUser) {
    return <div>...Loading user data</div>;
  }
  console.log({ localUser });
  return (
    <Wrapper>
      <Typography variant="h4">User Profile</Typography>
      <Box pt={2} />
      <Grid container display="flex" flexDirection="column" spacing={2}>
        <Grid item={12} display="flex" alignItems="center">
          <Typography variant="h6">Name: </Typography>
          <Box px={3} />
          <Typography variant="h7">
            {localUser.name
              ? localUser.name
              : "<< Update and Register your name >>"}
          </Typography>
        </Grid>

        <Grid item={12} display="flex" alignItems="center">
          <Typography variant="h6">Username: </Typography>
          <Box px={3} />
          <Typography variant="h7">{localUser.username}</Typography>
        </Grid>
        <Grid item={12} display="flex" alignItems="center">
          <Typography variant="h6">Email: </Typography>
          <Box px={3} />
          <Typography variant="h7">{localUser.email}</Typography>
        </Grid>
        <Grid item={12} display="flex" alignItems="center">
          <Link to="/users" style={{ textDecoration: "none" }}>
            <Button variant="outlined">Back</Button>
          </Link>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default DisplayUser;
