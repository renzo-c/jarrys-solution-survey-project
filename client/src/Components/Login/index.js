import React, { useContext, useEffect } from "react";
import { RegAuthForm, Spacing } from "../Commons";
import Store from "../../Contexts/Store";
import { Grid, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Wrapper } from "../Commons";

const useStyles = makeStyles((theme) => ({
  spacing: {
    marginTop: "5em",
  },
}));

const Login = () => {
  const { handleBgColor } = useContext(Store);
  const classes = useStyles();

  useEffect(() => {
    handleBgColor("#202020");
  }, []);

  return (
    <Wrapper sx={{padding: "8em 5em 0em"}}>
      <Grid container display="flex" justifyContent="space-around">
        <Grid container item xs={6}>
          <Grid
            container
            direction="column"
            alignItems="left"
            sx={{ ml: "5em" }}
          >
            <Spacing paddingTop={"3em"} />
            <Typography color="white" variant="h3">
              Welcome to
              <br />
              Jarry's solution
            </Typography>
            <Box className={classes.spacing} />
            <Typography color="white" variant="h5">
              Let's create
              <br />
              your own Survey!
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <RegAuthForm login />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Login;
