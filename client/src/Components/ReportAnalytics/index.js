import React, { useEffect, useState } from "react";
import { Wrapper } from "../Commons";
import { Typography, Grid, Box } from "@mui/material";
import { Table } from "../Commons";
import axios from "axios";

const ReportAnalytics = () => {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    getSurveysReportData();
  }, []);

  const getSurveysReportData = async () => {
    axios
      .get(`/api/admin/report/surveys`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log({ table: response });
        setRows(response.data);
      })
      .catch((err) => {
        console.log("Error fetching data of all surveys!", err);
      });
  };

  return (
    <Wrapper>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4">Admin Reports</Typography>
      </Box>
      <Box pt={5} />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {rows && <Table rows={rows} />}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default ReportAnalytics;
