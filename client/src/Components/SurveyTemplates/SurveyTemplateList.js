import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Box,
  Divider,
  Grid,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import BallotIcon from "@mui/icons-material/Ballot";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const SurveyTemplateList = ({ surveyTemplates, deleteSurveyTemplate }) => {
  if (
    surveyTemplates === null ||
    surveyTemplates === undefined ||
    !surveyTemplates.length
  ) {
    return <div>No Survey Template have been created</div>;
  }

  return (
    <List>
      {surveyTemplates.map((s, idx) => (
        <div key={idx}>
          <ListItem key={idx}>
            <Grid
              container
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid item xs={5}>
                <Box display="flex" alignItems="center">
                  <BallotIcon />
                  <Box px={1} />
                  <Typography variant="h6" my={1}>
                    {s.title}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3} container justifyContent="space-around">
                <Grid item={1}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`survey-templates/display-survey-template/${s.type}/${s._id}`}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      <VisibilityIcon />
                      <Typography variant="h7">Show</Typography>
                    </Box>
                  </Link>
                </Grid>
                <Grid item={1}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/survey-templates/update-survey-template/${s.type}/${s._id}`}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      <ModeIcon />
                      <Typography variant="h7">Update</Typography>
                    </Box>
                  </Link>
                </Grid>
                <Grid item={1}>
                  <Button onClick={() => deleteSurveyTemplate(s._id)}>
                    <Box display="flex" flexDirection="column">
                      <DeleteOutlineIcon />
                      <Typography variant="h7">Delete</Typography>
                    </Box>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
          <Divider variant="fullWidth" component="li" />
        </div>
      ))}
    </List>
  );
};

export default SurveyTemplateList;
