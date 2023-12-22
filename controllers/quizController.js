const AppError = require("../utils/appError");
const connection = require("../database");

exports.getAllQuizes = (req, res, next) => {
    connection.query("SELECT * FROM quiz", function (err, data, fields) {
        if (err) return next(new AppError(err));
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        })
    })
}

exports.createQuiz = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    const values = [
        req.body.description,
        req.body.name,
    ];

    connection.query(
        "INSERT INTO quiz (description, name) VALUES(?)",
        [values],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "quiz added",
            });
        }
    );
};

exports.getQuizById = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No quiz id found", 404))
    }
    connection.query(
        "SELECT * FROM quiz WHERE id = ?",
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

exports.updateQuiz = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No quiz id found", 404))
    }
    connection.query(
        "UPDATE quiz SET description=?, name=?",
        [
            req.body.description,
            req.body.name,
        ],
        (err, data, fields) => {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "quiz info updated",
            })
        }
    )
}

exports.deleteQuiz = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No quiz id found"))
    }
    connection.query(
        "DELETE FROM quiz WHERE id=?",
        [req.params.id],
        function (err, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "quiz deleted",
            })
        }
    )
}