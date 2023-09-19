const express = require('express');
const {
    compressionMiddleware,
    securityMiddleware,
    loggerMiddleware,
    jsonParserMiddleware
} = require('./middlewares/middlewares');
const todoController = require('./controllers/todoControllers');
const {
    errorHandler500,
    errorHandler404
} = require('./errorHandlers/errorHandlers');

const app = express();
const port = 3000;

// Middlewares
app.use(compressionMiddleware);
app.use(securityMiddleware);
app.use(loggerMiddleware);
app.use(jsonParserMiddleware);

// Controllers
app.use('/todo', todoController);

// Error handlers
app.use(errorHandler500);
app.use(errorHandler404);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/`);
});
