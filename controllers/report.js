const mongoose = require("mongoose");
const { mapReduce } = require("../models/survey");
const Surveys = mongoose.model("Surveys");
const SurveyTemplateReport = mongoose.model("SurveyTemplateReport");
const SurveyReport = mongoose.model("SurveyReport");
const SurveyTemplates = mongoose.model("SurveyTemplates");
const json = require('json2csv');

module.exports.getSurveyTemplateReportSummaryCsv = async (req, res) => {
  const userIdInToken = res.locals.id;
  try {
    let surveyTemplates = await SurveyTemplates.find({
      user: { _id: userIdInToken },
    }).populate("user", "username");

    let surveys = await Surveys.find();
    let surveyTemplateReports = [];

    surveyTemplates.forEach((element) => {
      let x = 0;
      surveys.forEach((survey) => {
        if (element._id == survey.templateId) {
          x++;
        }
      });

      let templateReport = {
        "Survey Title": element.title,
        "Status": element.active,
        "Respondents": x
      };
      surveyTemplateReports.push(templateReport);
    });


    const field = Object.keys(surveyTemplateReports[0]);
    const json2csv = new json.Parser({ field });
    const csv = json2csv.parse(surveyTemplateReports);
    res.header('Content-Type', 'text/csv');
    res.attachment("download.csv");
    return res.send(csv);
  } catch (error) {
    return res.send(error);
  }

};

module.exports.getSurveyReportCsv = async (req, res) => {  
  let id = req.params.id;
  try {
    let surveyTemplate = await SurveyTemplates.findById(id).exec();
    let surveys = await Surveys.find({
      templateId: id,
    });

    let report = {
      templateId: id,
      title: surveyTemplate.title,
      respondents: surveys.length,
      questions: []
    };
    let templateReport = "{ \"Survey Title\": \"" + report.title +"\",\"Status\": \""+surveyTemplate.active+"\",\"Respondents\": "+surveys.length+",";

    let ctr = 1;
    surveyTemplate.questions.forEach((question) => {
      let yesAnsweredCount = 0;
      let noUnAnsweredCount = 0;

      surveys.forEach((survey) => {
        survey.questions.forEach((answer) => {
          if (answer.question == question.question) {
            if (surveyTemplate.type == "AGREE_DISAGREE") {
              if (answer.answer == "true") {
                yesAnsweredCount++;
              } else {
                noUnAnsweredCount++;
              }
            } else if (
              surveyTemplate.type == "shortAnswerQuestion" ||
              surveyTemplate.type == "SHORT_ANSWER"
            ) {
              if (answer.answer.trim() == "") {
                noUnAnsweredCount++;
              } else {
                yesAnsweredCount++;
              }
            }
          }
        });        
      });

      if(question.type=="AGREE_DISAGREE"){
        templateReport += " \"Q"+ctr+"-Agree\": "+yesAnsweredCount+", \"Q"+ctr+"-Disagree\": "+noUnAnsweredCount+","
      }else{
        templateReport += " \"Q"+ctr+"-Answered\": "+yesAnsweredCount+", \"Q"+ctr+"-Unanswered\": "+noUnAnsweredCount+","
      }
      ctr++;
      
    });

    const dateMap = new Map();
    surveys.forEach(survey => {
      var date = survey.creationDate.toLocaleDateString('en-US');
      var ctr = 1

      if (dateMap.has(date)) {
        ctr = 1 + dateMap.get(date);
      }
      dateMap.set(date, ctr);
    });

    dateMap.forEach(function (value, key) {
      let x = {
        data: key,
        respondents: value
      }
      templateReport += " \""+key+"\": "+value+","
    });


    templateReport = templateReport.substring(0, templateReport.length - 1);
    templateReport +="}";
    let x = JSON.parse(templateReport)
    const field = Object.keys(x);
    const json2csv = new json.Parser({ field });
    const csv = json2csv.parse(x);
    res.header('Content-Type', 'text/csv');
    res.attachment("download.csv");
    return res.send(csv);
  } catch (error) {
    return res.send(error);
  }

};


module.exports.getSurveyTemplateReportSummary = async (req, res) => {
  const userIdInToken = res.locals.id;
  try {
    let surveyTemplates = await SurveyTemplates.find({
      user: { _id: userIdInToken },
    }).populate("user", "username");

    let surveys = await Surveys.find();

    let surveyTemplateReports = [];

    surveyTemplates.forEach((element) => {
      let x = 0;
      surveys.forEach((survey) => {
        if (element._id == survey.templateId) {
          x++;
        }
      });

      let templateReport = new SurveyTemplateReport({
        title: element.title,
        templateId: element._id,
        active: element.active,        
        type: element.type,
        respondents: x,
      });
      surveyTemplateReports.push(templateReport);
    });

    return res.json(surveyTemplateReports);
  } catch (error) {
    return res.send(error);
  }
};

module.exports.getSurveyReport = async (req, res) => {
  let id = req.params.id;
  try {
    let surveyTemplate = await SurveyTemplates.findById(id).exec();
    let surveys = await Surveys.find({
      templateId: id,
    });

    let report = new SurveyReport({
      templateId: id,
      title: surveyTemplate.title,
      type: surveyTemplate.type,
      respondents: surveys.length,
    });

    surveyTemplate.questions.forEach((question) => {
      let yesAnsweredCount = 0;
      let noUnAnsweredCount = 0;

      surveys.forEach((survey) => {
        survey.questions.forEach((answer) => {
          if (answer.question == question.question) {
            if (surveyTemplate.type == "AGREE_DISAGREE") {
              if (answer.answer == "true") {
                yesAnsweredCount++;
              } else {
                noUnAnsweredCount++;
              }
            } else if (
              surveyTemplate.type == "shortAnswerQuestion" ||
              surveyTemplate.type == "SHORT_ANSWER"
            ) {
              if (answer.answer.trim() == "") {
                noUnAnsweredCount++;
              } else {
                yesAnsweredCount++;
              }
            }
          }
        });
      });

      let x = {
        question: question.question,
        yesAnswered: yesAnsweredCount,
        noUnAnswered: noUnAnsweredCount,
      };
      report.questions.push(x);
    });

    const dateMap = new Map();
    surveys.forEach(survey => {
      var date = survey.creationDate.toLocaleDateString('en-US');
      var ctr = 1

      if (dateMap.has(date)) {
        ctr = 1 + dateMap.get(date);
      }
      dateMap.set(date, ctr);
    });

    dateMap.forEach(function (value, key) {
      let x = {
        data: key,
        respondents: value
      }
      report.respondentsByDate.push(x);
    });

    return res.json(report);
  } catch (error) {
    return res.send(error);
  }
};

