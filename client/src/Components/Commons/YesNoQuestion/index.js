import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Box,
  Grid,
  Button,
} from "@mui/material";

const YesNoQuestion = (props) => {
  const {
    questionObj,
    handleChangeValueQuestion,
    handleRemoveQuestion,
    index,
  } = props;
  const { question, answer } = questionObj;

  const handleChange = (event) => {
    console.log({ radio: event.target.value, answer });
  };
console.log({question, answer})
  return (
    <Grid container>
      <Grid item xs={3}>
        <FormControl component="fieldset">
          <TextField
            InputLabelProps={{ shrink: true }}
            id={`surveyTemplateQuestion-${index}`}
            label={`Question-${index + 1}`}
            variant="outlined"
            name="question"
            value={question}
            placeholder="Write a question"
            onChange={(e) => handleChangeValueQuestion(e, index)}
          />
          <Box pt={2} />
          <RadioGroup
            aria-label={question}
            name="radioGroupAnswers"
            value={answer}
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Agree"
              onChange={handleChange}
              disabled
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="Disagree"
              onChange={handleChange}
              disabled
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <Button onClick={handleRemoveQuestion}>{`Remove Question ${
          index + 1
        }`}</Button>
      </Grid>
    </Grid>
  );
};

export default YesNoQuestion;
