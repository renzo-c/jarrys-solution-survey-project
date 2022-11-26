import { questionTypes } from "./constants";

export const newSurveyTemplate = {
  type: "",
  title: "",
};

export const newShortAnswerQuestionObj = {
  type: questionTypes.SHORT_ANSWER, //for db purposes
  question: "",
  answer: "",
};

export const newYesNoQuestionObj = {
  type: questionTypes.AGREE_DISAGREE,
  question: "",
  answer: false,
};

export const multipleChoiceQuestionObj = {
  type: questionTypes.MUTIPLE_CHOICE,
  question: "",
  answer: false,
};
