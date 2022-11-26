import React from "react";
import { Typography, TextField, Grid, Button, Box, Card } from "@mui/material";

const ShortAnswerQuestion = ({
  index,
  questionObj,
  handleChangeValueQuestion,
  handleRemoveQuestion,
}) => {
  return (
    <Card
      key={index}
      style={{ padding: "1em 2em", margin: "1em 0" }}
      sx={{ border: 1, borderColor: "grey.500" }}
    >
      <Grid container>
        <Grid item xs={10}>
          <Box>
            <Typography variant="h6">{`Question ${index + 1}: `}</Typography>
            <TextField
              id={toString(index)}
              size="small"
              name="question"
              value={questionObj.question}
              placeholder="Question in max 80 characters"
              onChange={(e) => handleChangeValueQuestion(e, index)}
            >
              {questionObj.question}
            </TextField>
            <Box pt={2} />
            <Typography variant="h6">{`Answer: `}</Typography>
            <TextField
              id={toString(index)}
              multiline
              size="small"
              name="answer"
              value={questionObj.answer}
              placeholder="Answer in max 280 characters"
              onChange={(e) => handleChangeValueQuestion(e, index)}
              disabled={true}
            >
              {questionObj.answer}
            </TextField>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={(e) => handleRemoveQuestion(e, index)}>Remove</Button>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ShortAnswerQuestion;
