import { makeStyles } from "@mui/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;


const createSurveyTemplateStyles = makeStyles((theme) => ({
  button: {
    borderStyle: "dashed",
    borderColor: "gray",
    backgroundColor: "transparent",
    cursor: "pointer",
    borderRadius: "1em",
  },
  selectContainer: {
    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    width: 250,
  }
}));

export default createSurveyTemplateStyles;