let mongoose = require("mongoose");

let Surveys = mongoose.Schema(
  {
    id: String,
    title: String,
    type: String,
    creationDate: Date,
    questions: Array,
    surveyOwner: {
      ownerId: String,
      username: String,
    },
    templateId: String
    // template: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "SurveyTemplates",
    // },
  },
  {
    collection: "surveys",
  }
);

module.exports = mongoose.model("Surveys", Surveys);
