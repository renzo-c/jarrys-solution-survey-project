import React from "react";
import {
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  CardActionArea,
  Button,
} from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";

const CardDownload = ({ onClick }) => (
  <Button
    variant="outlined"
    startIcon={<GetAppIcon />}
    sx={{ color: "white" }}
    onClick={onClick}
  >
    Download Report
  </Button>
);

export default CardDownload;
