import React from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { Link } from "react-router-dom";

const AgreeDisagree = ({ localSurvey, onChange, onSubmit }) => {
  return (
    <Grid container>
      {typeof localSurvey.questions === "object"
        ? localSurvey.questions.map((q, index) => (
            <Grid key={index} item xs={12} key={index}>
                <Typography id={toString(index)} name="question" variant="h6">
                  {`${index + 1} - ${q.question}`}
                </Typography>
                <Box mt={2} />
                <RadioGroup
                  aria-label={q.question}
                  name="answer"
                  value={q.answer}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Agree"
                    onChange={(e) => onChange(e, index)}
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Disagree"
                    onChange={(e) => onChange(e, index)}
                  />
                </RadioGroup>
                <Box mt={4} />
              </Grid>
          ))
        : null}
      <Grid item xs={12} container>
        <Grid item xs={2}>
          <Button variant="contained" onClick={onSubmit}>
            Send Survey
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Link to="/surveys" style={{ textDecoration: "none" }}>
            <Button variant="contained">Back to Surveys</Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AgreeDisagree;
