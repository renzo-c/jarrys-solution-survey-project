import React, { useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Grid, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { FullScreenDialog, Wrapper } from "../../../Commons";
import axios from "axios";
import { AGREE_DISAGREE_GRAPH_LABELS } from "../../../../Helpers/constants";
import {
  createGraphData,
  createOptionsHBar,
} from "../../../../Helpers/helperFunctions";
import { useReactToPrint } from "react-to-print";
import CardDownload from "../CardDownload";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AgreeDisagreeGraphsModal = ({ surveyTemplateId }) => {
  const [fetchedData, setFetchedData] = useState(null);
  const componentRef = useRef();

  console.log({ singleReport: fetchedData });
  const handleReportData = () => {
    if (surveyTemplateId) {
      axios
        .get(`/api/admin/report/surveys/${surveyTemplateId}`, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setFetchedData(response.data);
        })
        .catch((err) => {
          console.log("Error fetching report data for survey!");
        });
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <FullScreenDialog
      cb={handleReportData}
      surveyTitle={fetchedData?.title}
      downloadPDF={<CardDownload onClick={handlePrint} />}
    >
      <div ref={componentRef}>
        <div style={{ display: "none" }}>
          <Typography align="center" variant="h5">{`Report of Survey ${
            fetchedData?.title
          } - ${new Date().toString()}`}</Typography>
        </div>
        <Wrapper>
          <Grid container spacing={4}>
            {fetchedData &&
              fetchedData.questions &&
              fetchedData.questions.length &&
              fetchedData.questions.map((q, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Bar
                    options={createOptionsHBar(index + 1, q.question)}
                    data={createGraphData(
                      [q.yesAnswered, q.noUnAnswered],
                      AGREE_DISAGREE_GRAPH_LABELS
                    )}
                  />
                </Grid>
              ))}
          </Grid>
        </Wrapper>
      </div>
    </FullScreenDialog>
  );
};

export default AgreeDisagreeGraphsModal;
