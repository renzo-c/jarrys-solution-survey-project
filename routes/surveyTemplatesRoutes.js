const mongoose = require("mongoose");
const SurveyTemplates = mongoose.model("SurveyTemplates");
const verifyJWT = require("../middlewares/verifyJWT");

let surveyController = require('../controllers/survey');

module.exports = (app) => {
  app.get(`/api/survey-templates`, surveyController.getAllSurveyTemplate);

  app.get(`/api/admin/survey-templates`, verifyJWT, surveyController.getAllAdminSurveyTemplate);

  app.get(`/api/admin/survey-templates/:id`, verifyJWT, surveyController.getSpecificAdminSurveyTemplate);

  app.get(`/api/survey-templates/:id`, surveyController.getSurveyTemplate);

  app.post(`/api/survey-templates/add`, verifyJWT, surveyController.addSurveyTemplate);

  app.get(`/api/survey-templates/delete/:id`, verifyJWT, surveyController.deleteSurveyTemplate);

  app.get(`/api/survey-templates/update/:id`, verifyJWT, surveyController.getSurveyTemplateForUpdate);

  app.post(`/api/survey-templates/update/:id`, verifyJWT, surveyController.processSurveyTemplateForUpdate );
};
