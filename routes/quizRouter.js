const express = require("express");
const controller = require("../controllers/quizController");
const router = express.Router();

router.route("/quiz").get(controller.getAllQuizes).post(controller.createQuiz);
router.route("/quiz/:id").get(controller.getQuizById).put(controller.updateQuiz).delete(controller.deleteQuiz);

module.exports = router;