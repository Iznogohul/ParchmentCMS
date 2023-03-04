require('dotenv').config();
const express = require('express');

const app = express();
const os = require('os');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const compression = require('compression');

const PORT = process.env.PORT || '3000';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test';
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(cors());
app.use(bodyParser.json({ limit: '16mb' })); // for sending the html content
app.use(compression());
const logger = require('./logger');

mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
const { connection } = mongoose;

connection.once('open', () => {
  logger.debug('MongoDB database connection established successfully');
});

const postRouter = require('./routes/post.route');

app.use('/api/v1/posts/', postRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
  res.status(200).send(`<div> Welcome to Blog Headless CMS API.</div><p>To get started, please refer to the Swagger Documentation <a href="http://localhost:${PORT}/api-docs">here</a>.</p>`);
});
app.get('/health', (req, res, next) => {
  const cpuUsage = process.cpuUsage();
  const uptime = process.uptime();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();

  if (connection.readyState) {
    res.status(200).json({
      result: 'success',
      cpuUsage,
      uptime,
      totalMemory,
      freeMemory,
      mongoStatus: connection.readyState,
    });
  } else {
    res.statusCode = 500;
    next(
      new Error(
        'Failed to connect to MongoDB',
      ),
    );
  }
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || res.statusCode || 500);
  if (req.app.get('env') !== 'development') {
    res.json({ result: 'failure', message: err.message });
  } else {
    res.json({ result: 'failure', message: err.message, stack: err });
  }
  next();
});
const server = app.listen(PORT, () => {
  logger.debug(`Server is running on Port: ${PORT}`);
});

module.exports = { app, server };
