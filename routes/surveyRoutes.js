const mongoose = require("mongoose");
const Surveys = mongoose.model("Surveys");
const Users = mongoose.model("Users");

let surveyController = require('../controllers/survey');

module.exports = (app) => {
  app.post(`/api/survey/add`, surveyController.addSurvey);
};
