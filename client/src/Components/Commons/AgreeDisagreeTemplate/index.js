import React, { useEffect, useState } from "react";
import axios from "axios";
import { UPDATE } from "../../../Helpers/constants";
import {
  Box,
  Button,
  Switch,
  Grid,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const AgreeDisagreeTemplate = ({ id, action, history }) => {
  const [surveyTemplate, setSurveyTemplate] = useState(null);
  const [disabled, setDisabled] = useState(action === UPDATE ? false : true);

  useEffect(() => {
    renderSurveyTemplate();
  }, []);

  const renderSurveyTemplate = () => {
    if (id) {
      axios
        .get(`/api/admin/survey-templates/${id}`, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setSurveyTemplate(response.data);
        })
        .catch((err) => {
          console.log("Error fetching Survey Template!");
        });
    }
  };

  const saveChanges = (e, id) => {
    axios
      .post(`/api/survey-templates/update/${id}`, surveyTemplate, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("Survey Template updated!", res);
        history.push("/survey-templates");
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

  const handleChangeValueQuestion = (e, index) => {
    if (action === UPDATE) {
      const value = e.target.value;
      const name = e.target.name;

      let newQuestions = JSON.parse(JSON.stringify(surveyTemplate.questions));
      newQuestions[index][name] = value;
      setSurveyTemplate({ ...surveyTemplate, questions: newQuestions });
    }
  };

  const handleChangeValueSurveyTemplate = (e) => {
    const name = e.target.name;
    let value = "";
    if (name === "active") {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
    setSurveyTemplate({ ...surveyTemplate, [name]: value });
  };

  if (!surveyTemplate) {
    return <div>...Loading</div>;
  }
  return (
    <Grid container spacing={5} maxWidth="750px">
      <Grid item xs={12} display="flex">
        {action === UPDATE ? (
          <TextField
            fullWidth
            id="surveyTemplateTitle"
            name="title"
            label="Title"
            value={surveyTemplate.title}
            placeholder="select a title"
            onChange={handleChangeValueSurveyTemplate}
          />
        ) : (
          <Typography variant="h4">{surveyTemplate.title}</Typography>
        )}

        <Box display="flex" alignItems="center" mx={5}>
          <Typography>Inactive</Typography>
          <Switch
            checked={surveyTemplate.active}
            onChange={handleChangeValueSurveyTemplate}
            name="active"
            inputProps={{ "aria-label": "controlled" }}
            disabled={disabled}
          />
          <Typography>Active</Typography>
        </Box>
      </Grid>
      {typeof surveyTemplate.questions === "object"
        ? surveyTemplate.questions.map((q, index) => (
            <Grid key={index} item xs={12} container>
              <Grid item xs={12} container spacing={2}>
                <Grid item xs={12}>
                  {action === UPDATE ? (
                    <TextField
                      fullWidth
                      id={index}
                      name="question"
                      label={`Question ${index + 1}`}
                      value={q.question}
                      onChange={(e) => handleChangeValueQuestion(e, index)}
                    />
                  ) : (
                    <Typography variant="h6">{`${index + 1} - ${
                      q.question
                    }`}</Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Box mt={2} />
                  <RadioGroup
                    aria-label={q.question}
                    name="answer"
                    value={q.answer}
                    disabled
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Agree"
                      disabled
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="Disagree"
                      disabled
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Grid>
          ))
        : null}
      {action === UPDATE ? (
        <Grid item xs={12}>
          <Button
            variant="outlined"
            onClick={(e) => saveChanges(e, surveyTemplate._id)}
          >
            Save Changes
          </Button>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default AgreeDisagreeTemplate;
