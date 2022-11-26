import React from "react";
import { useParams } from "react-router-dom";
import {
  ShortAnswerTemplate,
  AgreeDisagreeTemplate,
  Wrapper,
} from "../Commons";
import { useHistory } from "react-router-dom";
import { UPDATE, questionTypes } from "../../Helpers/constants";

const UpdateSurveyTemplate = () => {
  const { id, surveyTemplateType } = useParams();
  const history = useHistory();

  const renderTemplate = () => {
    switch (surveyTemplateType) {
      case questionTypes.AGREE_DISAGREE:
        return (
          <AgreeDisagreeTemplate id={id} history={history} action={UPDATE} />
        );

      case questionTypes.SHORT_ANSWER:
        return (
          <ShortAnswerTemplate id={id} history={history} action={UPDATE} />
        );
      default:
        return (
          <ShortAnswerTemplate id={id} history={history} action={UPDATE} />
        );
    }
  };

  return <Wrapper>{renderTemplate()}</Wrapper>;
};

export default UpdateSurveyTemplate;
