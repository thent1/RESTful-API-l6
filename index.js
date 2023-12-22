const express = require('express');
//const router = require("./routes");
const AppError = require("./utils/appError");
const errorHandler = require("./utils/errorHandler");
const questionRouter = require("./routes/questionRouter")
const quizRouter = require("./routes/quizRouter")
const app = express()
const PORT = 3000

app.use(express.json());
app.use(questionRouter);
app.use(quizRouter);

app.all("*", (req, res, next) => {
    next(new AppError(`The URL ${req.originalUrl} doesn't exists`, 404));
});
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

module.exports = app;