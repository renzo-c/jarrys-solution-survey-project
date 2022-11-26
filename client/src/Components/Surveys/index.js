import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Store from "../../Contexts/Store";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Wrapper } from "../Commons";
import BallotIcon from "@mui/icons-material/Ballot";

const Surveys = () => {
  const { handleBgColor } = useContext(Store);
  const [surveys, setSurveys] = useState(null);

  useEffect(() => {
    handleBgColor("white");
  }, []);

  useEffect(() => {
    renderSurveys();
  }, []);

  const renderSurveys = () => {
    axios
      .get(`/api/survey-templates`)
      .then((res) => {
        setSurveys(res.data);
      })
      .catch((err) => {
        console.log("Error rendering List of surveys!", err);
      });
  };

  if (surveys === null || surveys === undefined || !surveys.length) {
    return <Wrapper>No Surveys available</Wrapper>;
  }

  return (
    <Wrapper>
      <h1>Available Surveys</h1>
      <List>
        {surveys.filter(rs => rs.active).map((s, idx) => (
          <Link
            to={`surveys/survey/${s._id}`}
            style={{ textDecoration: "none", color: "black" }}
            key={idx}
          >
            <ListItem key={idx}>
              <ListItemButton>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <BallotIcon />
                  <Box mx={2}/>
                  <Typography variant="h6" my={1}>
                    {s.title}
                  </Typography>
                </div>
              </ListItemButton>
            </ListItem>
            <Divider variant="fullWidth" component="li" />
          </Link>
        ))}
      </List>
    </Wrapper>
  );
};

export default Surveys;
export { default as Survey } from "./Survey";
// export { default as UpdateSurveyTemplate } from "./UpdateSurveyTemplate";
// export { default as CreateSurveyTemplate } from "./CreateSurveyTemplate";
