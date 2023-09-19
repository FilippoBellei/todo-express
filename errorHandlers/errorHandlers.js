// 500 error handler
const errorHandler500 = (err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.json({ result: false });
};

// 404 error handler
const errorHandler404 = (req, res) => {
    res.status(404);
    res.json({ result: false });
};

module.exports = { errorHandler500, errorHandler404 };
