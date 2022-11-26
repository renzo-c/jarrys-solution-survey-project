import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ShortAnswer = ({ localSurvey, onChange, onSubmit }) => {
  return (
    <Grid container maxWidth="600px">
      {typeof localSurvey.questions === "object"
        ? localSurvey.questions.map((q, index) => (
            <Grid key={index} item xs={12}>
              <div key={index}>
                <div>
                  <Typography id={toString(index)} name="question">
                    {`${index + 1} - ${q.question}`}
                  </Typography>
                  <Box mt={1} />
                  <TextField
                  fullWidth
                    multiline
                    id={toString(index)}
                    name="answer"
                    value={q.answer}
                    onChange={(e) => onChange(e, index)}
                  />
                  <Box mt={4} />
                </div>
              </div>
            </Grid>
          ))
        : null}
      <Grid item xs={12} container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Button variant="contained" onClick={onSubmit}>
            Send Survey
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Link to="/surveys" style={{ textDecoration: "none" }}>
            <Button variant="contained">Back to Surveys</Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ShortAnswer;
