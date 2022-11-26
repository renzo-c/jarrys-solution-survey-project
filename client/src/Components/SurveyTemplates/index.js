import React, { useState, useEffect, useContext } from "react";
import SurveyTemplateList from "./SurveyTemplateList";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Store from "../../Contexts/Store";
import { Wrapper } from "../Commons";
import { Box, Button, Grid, Typography } from "@mui/material";
import BallotIcon from "@mui/icons-material/Ballot";

const SurveyTemplate = () => {
  const [surveyTemplates, setSurveyTemplates] = useState(null);
  const { handleBgColor } = useContext(Store);
  const history = useHistory();

  useEffect(() => {
    renderSurveyTemplates();
    handleBgColor("white");
  }, []);

  const renderSurveyTemplates = () => {
    axios
      .get(`/api/admin/survey-templates`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setSurveyTemplates(res.data);
      })
      .catch((err) => {
        console.log("Error rendering Survey Templates!", err);
      });
  };

  const handleDeleteSurveyTemplate = (id) => {
    axios
      .get(`/api/survey-templates/delete/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        alert("Survey Template deleted!");
        history.push("/survey-templates")
      })
      .catch((err) => {
        console.log("Error deleting Survey Template!", err);
      });
    axios
      .get(`/api/admin/survey-templates`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setSurveyTemplates(res.data);
      })
      .catch((err) => {
        console.log("Error fetching Survey Templates!", err);
      });
  };

  return (
    <Wrapper>
      <Grid container alignItems="center">
        <Grid item xs={5}>
          <h1>Survey Templates' list</h1>
        </Grid>
        <Grid item xs={2}>
          <Link to="/survey-templates/create-survey-template" style={{ textDecoration: "none" }}>
            <Button variant="outlined">
              <BallotIcon />
              <Box px={1}/>
              <Typography variant="h7">Add Template</Typography> 
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <SurveyTemplateList
            surveyTemplates={surveyTemplates}
            deleteSurveyTemplate={handleDeleteSurveyTemplate}
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default SurveyTemplate;
export { default as DisplaySurveyTemplate } from "./DisplaySurveyTemplate";
export { default as UpdateSurveyTemplate } from "./UpdateSurveyTemplate";
export { default as CreateSurveyTemplate } from "./CreateSurveyTemplate";
