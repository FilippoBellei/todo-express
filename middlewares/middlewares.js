const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');

// Compression, security, logger and json parser middlewares
const compressionMiddleware = compression();
const securityMiddleware = helmet();
const loggerMiddleware = morgan(':date :remote-addr ":method :url" :status');
const jsonParserMiddleware = express.json();

module.exports = {
    compressionMiddleware,
    securityMiddleware,
    loggerMiddleware,
    jsonParserMiddleware
};
