const AppError = require("../utils/appError");
const connection = require("../database");

exports.getAllQuestions = (req, res, next) => {
    connection.query("SELECT * FROM question", function (err, data, fields){
        if (err) return next(new AppError(err));
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        })
    });
}

exports.createQuestion = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    const values = [
        req.body.type,
        req.body.number,
        req.body.description,
        req.body.Quiz_id,
    ];

    connection.query(
        "INSERT INTO question (id, type, number, description, Quiz_id) VALUES(?)",
        [values],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "question added",
            });
        }
    );
};

exports.getQuestionById = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No question id found", 404))
    }
    connection.query(
        "SELECT * FROM question WHERE id = ?",
        [req.params.id],
        function (err, data, fields) {
            if (data.length === 0) return next(new AppError(err, 404))
            if (err) return next(new AppError(err, 500))
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            })
        }
    )
}

exports.updateQuestion = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No question id found", 404))
    }
    connection.query(
        "UPDATE question SET type=?, number=?, description=?",
        [
            req.body.type,
            req.body.number,
            req.body.name,
        ],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500))
            res.status(201).json ({
                    status: "success",
                    message: "question info updated",
                })
        }
    )
}

exports.deleteQuestion = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No question id found"))
    }
    connection.query(
        "DELETE FROM question WHERE id=?",
        [req.params.id],
        function (err, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "question deleted"
            })
        }
    )
}