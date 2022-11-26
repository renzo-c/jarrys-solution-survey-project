import React, { useContext, useEffect } from "react";
import Store from "../../Contexts/Store";
import { Grid, Typography, Box, Button } from "@mui/material";
import { Wrapper, Spacing } from "../Commons";
import bgImage from "../../assets/images/bg-home.png";
import { makeStyles } from "@mui/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  spacing: {
    marginTop: "5em",
  },
  button: {
    backgroundColor: "#8E0B0B",
    width: "175px",
    color: "white",
    borderRadius: "5em",
    "&:hover": {
      backgroundColor: "red",
    },
  },
}));

const Home = () => {
  const { handleBgColor } = useContext(Store);
  const classes = useStyles();

  useEffect(() => {
    handleBgColor("black");
  }, []);

  return (
    <Wrapper sx={{padding: "5em 5em 0em"}}>
      <Grid container display="flex" justifyContent="space-around">
        <Grid item xs={6} container>
          <Grid container direction="column" alignItems="left">
            <Spacing paddingTop={"3em"} />
            <Typography color="white" variant="h3">
              Welcome to
              <br />
              Jarry's solution
            </Typography>
            <Box className={classes.spacing} />
            <Typography color="white" variant="h5">
              Let's create
              <br /> your own survey!
            </Typography>
            <Box pt={5} />
            <Link to='/survey-templates/create-survey-template' style={{ textDecoration: "none" }}>
            <Button className={classes.button}>Create a Survey</Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={4} sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "relative",
              "&::before": {
                content: "''",
                position: "absolute",
                top: 0,
                left: 0,
                height: "500px",
                width: "500px",
                backgroundImage: `url(${bgImage})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
                transform: "translate(-40%, -5%)",
              },
            }}
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Home;
