const mongoose = require("mongoose");
const Surveys = mongoose.model("Surveys");
const Users = mongoose.model("Users");
const SurveyTemplates = mongoose.model("SurveyTemplates");
const verifyJWT = require("../middlewares/verifyJWT");

module.exports.addSurvey = async (req, res) => {
    const adminId = req.body.user;
    const user = await Users.findById(adminId);
    const surveyOwner = { ownerId: user._id, username: user.username };

    let newSurvey = Surveys({
        title: req.body.title,
        type: req.body.type,
        questions: req.body.questions,
        creationDate: new Date().toLocaleDateString(),
        surveyOwner,
        templateId: req.body._id,
    });

    Surveys.create(newSurvey, (err, surveyTemplate) => {
        if (err) {
            res.end(err);
        } else {
            res.json({ success: true, msg: "New Survey added!." });
        }
    });
}

module.exports.getAllSurveyTemplate = async (req, res) => {
    try {
        let surveyTemplates = await SurveyTemplates.find({
            active: true
        })
        return res.json(surveyTemplates);
    } catch (error) {
        return res.send(error);
    }
}

module.exports.getAllAdminSurveyTemplate = async (req, res) => {
    const userIdInToken = res.locals.id;
    try {
        let surveyTemplates = await SurveyTemplates.find({
            user: { _id: userIdInToken },
        }).populate("user", "username");
        // const surveyTemplates = await SurveyTemplates.find().populate('user', 'username').select('type user');
        return res.json(surveyTemplates);
    } catch (error) {
        return res.send(error);
    }
}

module.exports.getSpecificAdminSurveyTemplate = async (req, res) => {
    let id = req.params.id;
    try {
        const surveyTemplate = await SurveyTemplates.findById(id).exec();
        return res.json(surveyTemplate);
    } catch (error) {
        return res.send(error);
    }
}

module.exports.getSurveyTemplate = async (req, res) => {
    let id = req.params.id;
    try {
        const surveyTemplate = await SurveyTemplates.findById(id).exec();
        if(surveyTemplate.active==true){
            return res.json(surveyTemplate);
        }else{
            let x = {
                type: "ERROR",
                error: 404,
                errorMsg: "Inactive survey"
            }
            return res.send(x);
        }
    } catch (error) {
        return res.send(error);
    }
}

module.exports.addSurveyTemplate = async (req, res) => {
    let newSurveyTemplate = SurveyTemplates({
        title: req.body.title,
        type: req.body.type,
        questions: req.body.questions,
        user: res.locals.id,
        active: true,
    });

    SurveyTemplates.create(newSurveyTemplate, (err, surveyTemplate) => {
        if (err) {
            res.end(err);
        } else {
            res.json({ success: true, msg: "New Survey Template added!." });
        }
    });
}

module.exports.deleteSurveyTemplate = async (req, res, next) => {
    let id = req.params.id;
    SurveyTemplates.remove({ _id: id }, (err) => {
        if (err) {
            res.end(err);
        } else {
            res.json({ success: true, msg: "Survey Template deleted." });
        }
    });
}

module.exports.getSurveyTemplateForUpdate = async (req, res, next) => {
    let id = req.params.id;

    SurveyTemplates.findById(id, (err, itemToEdit) => {
        if (err) {
            res.end(err);
        } else {
            res.json({ success: true, msg: "", surveyTemplate: itemToEdit });
        }
    });
}

module.exports.processSurveyTemplateForUpdate = async (req, res, next) => {
    let id = req.params.id;

    let updatedSurveyTemplate = SurveyTemplates({
        _id: id,
        title: req.body.title,
        type: req.body.type,
        questions: req.body.questions,
        active: req.body.active,
    });

    SurveyTemplates.updateOne({ _id: id }, updatedSurveyTemplate, (err) => {
        if (err) {
            res.end(err);
        } else {
            res.json({
                success: true,
                msg: "Survey Template updated.",
                surveyTemplate: updatedSurveyTemplate,
            });
        }
    });
}