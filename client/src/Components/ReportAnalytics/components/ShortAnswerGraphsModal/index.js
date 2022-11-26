import React, { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import { FullScreenDialog, Wrapper } from "../../../Commons";
import axios from "axios";
import {
  createShortAnswerLineChartGraphData,
  createShortAnswerLineChartLabels,
  createOptionsLine,
} from "../../../../Helpers/helperFunctions";
import { useReactToPrint } from "react-to-print";
import CardDownload from "../CardDownload";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ShortAnswerGraphsModal = ({ surveyTemplateId }) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [data, setData] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    if (fetchedData) {
      setData(
        createShortAnswerLineChartGraphData(
          createShortAnswerLineChartLabels(fetchedData),
          fetchedData
        )
      );
    }
  }, [fetchedData]);

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
        <Wrapper>
          <Grid container spacing={4}>
            {data && (
              <Grid item xs={4}>
                <Line
                  options={createOptionsLine("Respondents by Date")}
                  data={data}
                />
              </Grid>
            )}
          </Grid>
        </Wrapper>
      </div>
    </FullScreenDialog>
  );
};

export default ShortAnswerGraphsModal;
