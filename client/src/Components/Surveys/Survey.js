import React, { useState, useEffect } from "react";
import ShortAnswer from "./ShortAnswer";
import ErrorTemplate from "./Error";
import { useParams } from "react-router-dom";
import { openAPI } from "../../apis";
import { Box, Typography, Link, Button, IconButton } from "@mui/material";
import { useHistory } from "react-router-dom";
import { Wrapper } from "../Commons";
import { questionTypes } from "../../Helpers/constants";
import AgreeDisagree from "./AgreeDisagree";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const Survey = () => {
  const { id } = useParams();
  const [localSurvey, setLocalSurvey] = useState(null);
  const history = useHistory();
  console.log({ localSurvey });
  useEffect(() => {
    const runThis = () => {
      if (id) {
        openAPI
          .get(`/api/survey-templates/${id}`)
          .then((s) => setLocalSurvey(s.data));
      }
    };
    runThis();
  }, []);

  const onChangeValueShortAnswer = (e, index) => {
    const { name, value } = e.target;

    let newQuestions = JSON.parse(JSON.stringify(localSurvey.questions));
    newQuestions[index][name] = value;
    setLocalSurvey({ ...localSurvey, questions: newQuestions });
  };

  const onChange = (e, index) => {
    switch (localSurvey.type) {
      case questionTypes.SHORT_ANSWER:
        onChangeValueShortAnswer(e, index);
        break;
      default:
        onChangeValueShortAnswer(e, index);
    }
  };

  const onSubmit = () => {
    openAPI.post("/api/survey/add", localSurvey).then((res) => {
      console.log(res);
      if (res.data.success) {
        setLocalSurvey(null);
        alert(res.data.msg);
        history.push("/surveys");
      }
    });
  };

  const renderSurvey = (inputArgs) => {

    switch (localSurvey.type) {
      case questionTypes.AGREE_DISAGREE:
        return <AgreeDisagree {...inputArgs} />;
      case questionTypes.SHORT_ANSWER:
        return <ShortAnswer {...inputArgs} />;
      case questionTypes.ERROR:
        return <ErrorTemplate {...inputArgs} />;
      default:
        return <ShortAnswer {...inputArgs} />;
    }
  };

  if (!localSurvey) {
    return <div>...Loading</div>;
  }

  return (
    <Wrapper>
      <Typography variant="h4">{localSurvey.title}</Typography>
      <Box mt={5} />
      {renderSurvey({ localSurvey, onChange, onSubmit })}
    </Wrapper>
  );
};

export default Survey;
