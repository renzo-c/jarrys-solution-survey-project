import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Wrapper, YesNoQuestion } from "../Commons";
import { ShortAnswerQuestion } from "../Commons";
import {
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Button,
  Box,
  Grid,
  TextField,
  Typography,
  Divider,
  OutlinedInput,
} from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { createSurveyTemplateStyles } from "../../styles";
import { questionTypes } from "../../Helpers/constants";
import {
  newSurveyTemplate,
  newShortAnswerQuestionObj,
  newYesNoQuestionObj,
  multipleChoiceQuestionObj,
} from "../../Helpers/initializedObjects";
import Store from "../../Contexts/Store";


const CreateSurveyTemplate = () => {
  const [surveyTemplate, setSurveyTemplate] = useState(newSurveyTemplate);
  const [surveyTemplateType, setSurveyTemplateType] = useState();
  const [questions, setQuestions] = useState([]);
  const history = useHistory();
  const classes = createSurveyTemplateStyles();

  const { handleBgColor } = useContext(Store);

  useEffect(() => {
    handleBgColor("white");
  }, []);

  const handleSelectTemplate = (value) => {
    setSurveyTemplate({ ...surveyTemplate, type: value });
  };

  const handleCreateQuestion = () => {
    let newQuestion;

    switch (surveyTemplateType) {
      case questionTypes.SHORT_ANSWER:
        newQuestion = JSON.parse(JSON.stringify(newShortAnswerQuestionObj));
        break;
      case questionTypes.AGREE_DISAGREE:
        newQuestion = JSON.parse(JSON.stringify(newYesNoQuestionObj));
        break;

      case questionTypes.MUTIPLE_CHOICE:
        newQuestion = JSON.parse(JSON.stringify(multipleChoiceQuestionObj));
        break;

      default:
        newQuestion = JSON.parse(JSON.stringify(newShortAnswerQuestionObj));
    }
    setQuestions([...questions, newQuestion]);
  };

  const handleOnChangeSurveyTemplateType = (e) => {
    const { value } = e.target;
    setSurveyTemplateType(value);
    handleSelectTemplate(value);
  };

  const handleChangeValueSurveyTemplate = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setSurveyTemplate({ ...surveyTemplate, [name]: value });
  };

  const handleChangeValueQuestion = (e, index) => {
    const value = e.target.value;
    const name = e.target.name;

    const newQuestions = [...questions];
    newQuestions[index][name] = value;
    setQuestions([...newQuestions]);
  };

  const handleRemoveQuestion = (e, index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions([...newQuestions]);
  };

  const handleSaveSurveyTemplate = () => {
    let newSurveyTemplate = { ...surveyTemplate, questions };
    axios
      .post(`/api/survey-templates/add`, newSurveyTemplate, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log({ res });
        alert("Survey Template Created!");
        resetLocalVariables();
        history.push("/survey-templates");
      })
      .catch((err) => {
        console.log("ERR", err);
      });
    resetLocalVariables();
  };

  const resetLocalVariables = () => {
    setQuestions([]);
    setSurveyTemplate(newSurveyTemplate);
    setSurveyTemplateType();
  };

  const renderUnitQuestion = (inputArgs) => {
    switch (surveyTemplateType) {
      case questionTypes.AGREE_DISAGREE:
        return <YesNoQuestion {...inputArgs} />;
      case questionTypes.SHORT_ANSWER:
        return <ShortAnswerQuestion {...inputArgs} />;
      case questionTypes.MUTIPLE_CHOICE:
        return <ShortAnswerQuestion {...inputArgs} />;
      default:
        return <ShortAnswerQuestion {...inputArgs} />;
    }
  };

  return (
    <Wrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Create a Survey Template</Typography>
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item xs={3}>
            <FormControl>
              <InputLabel id="surveyTemplateLabel">Survey Template</InputLabel>
              <Select
                labelId="surveyTemplate-label"
                id="surveyTemplate"
                value={surveyTemplateType}
                label="Survey Template"
                onChange={handleOnChangeSurveyTemplateType}
                className={classes.selectContainer}
                input={<OutlinedInput label="Select a Template" />}
              >
                <MenuItem value={questionTypes.AGREE_DISAGREE}>
                  Agree/Disagree
                </MenuItem>
                {/* <MenuItem value={questionTypes.MUTIPLE_CHOICE}>
                  Multiple choice
                </MenuItem> */}
                <MenuItem value={questionTypes.SHORT_ANSWER}>
                  Short Answer
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <TextField
              InputLabelProps={{ shrink: true }}
              id="surveyTemplateTitle"
              label="Select a Survey Title"
              variant="outlined"
              name="title"
              value={surveyTemplate.title}
              placeholder="Survey Title"
              onChange={handleChangeValueSurveyTemplate}
            />
          </Grid>
          <Grid item alignSelf="center" xs={3}>
            <button onClick={handleCreateQuestion} className={classes.button}>
              + Add Question
            </button>
          </Grid>
          <Grid item xs={1} />
          <Grid item alignSelf="center" justifyContent="flex-start" xs={3}>
            <Button
              variant="outlined"
              onClick={handleSaveSurveyTemplate}
              disabled={!questions.length}
            >
              <SaveAsIcon /> <Box px={1} />
              Save Template
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider py={1} />
        </Grid>

        {questions.map((questionObj, index) => (
          <Grid item xs={12} key={index}>
            {renderUnitQuestion({
              questionObj,
              index,
              handleChangeValueQuestion,
              handleRemoveQuestion,
            })}
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default CreateSurveyTemplate;
