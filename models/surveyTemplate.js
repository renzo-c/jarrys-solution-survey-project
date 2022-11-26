let mongoose = require('mongoose');

let SurveyTemplates = mongoose.Schema({
    id: String,
    title: String,
    type: String,
    questions: Array,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    },
    active: Boolean
},
{
  collection: "surveyTemplates"
});

module.exports = mongoose.model('SurveyTemplates', SurveyTemplates);