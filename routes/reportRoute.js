const mongoose = require("mongoose");
const Surveys = mongoose.model("Surveys");
const SurveyTemplateReport = mongoose.model("SurveyTemplateReport")
const SurveyReport = mongoose.model("SurveyReport")
const SurveyTemplates = mongoose.model("SurveyTemplates");
const verifyJWT = require("../middlewares/verifyJWT");

let reportController = require('../controllers/report')

module.exports = (app) => {
    app.get(`/api/admin/report/surveys`, verifyJWT, reportController.getSurveyTemplateReportSummary);

    app.get(`/api/admin/report/surveys/:id`, verifyJWT, reportController.getSurveyReport);

    app.get('/api/admin/report/download', verifyJWT, reportController.getSurveyTemplateReportSummaryCsv);
	
    app.get('/api/admin/report/surveys/:id/download', verifyJWT, reportController.getSurveyReportCsv);
}
