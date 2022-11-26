let mongoose = require('mongoose');

let SurveyTemplateReport = mongoose.Schema({
    templateId: String,
    title: String,
    type: String,
    respondents: Number,
    active: Boolean,
});

module.exports = mongoose.model('SurveyTemplateReport', SurveyTemplateReport);