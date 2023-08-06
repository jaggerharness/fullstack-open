const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');

const requestLogger = middleware.requestLogger;
const tokenExtractor = middleware.tokenExtractor;
const userExtractor = middleware.userExtractor;

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(tokenExtractor);
app.use(userExtractor);

app.use('/api/blogs', userExtractor, blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

// Only available when running tests
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
