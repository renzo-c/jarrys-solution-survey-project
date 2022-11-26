import React from "react";
import { useParams } from "react-router-dom";
import {
  ShortAnswerTemplate,
  AgreeDisagreeTemplate,
  Wrapper,
} from "../Commons";
import { useHistory } from "react-router-dom";
import { READ, questionTypes } from "../../Helpers/constants";

const DisplaySurveyTemplate = () => {
  const { id, surveyTemplateType } = useParams();
  const history = useHistory();

  const renderTemplate = () => {
    switch (surveyTemplateType) {
      case questionTypes.AGREE_DISAGREE:
        return (
          <AgreeDisagreeTemplate id={id} history={history} action={READ} />
        );

      case questionTypes.SHORT_ANSWER:
        return <ShortAnswerTemplate id={id} history={history} action={READ} />;
      default:
        return <ShortAnswerTemplate id={id} history={history} action={READ} />;
    }
  };
  return <Wrapper>{renderTemplate()}</Wrapper>;
};

export default DisplaySurveyTemplate;
