const express = require("express");
const controller = require("../controllers/questionContoller");
const router = express.Router();

router.route("/question").get(controller.getAllQuestions).post(controller.createQuestion);
router.route("/question/:id").get(controller.getQuestionById).put(controller.updateQuestion).post(controller.createQuestion);

module.exports = router;