
const express = require('express');
const weatherRouter = require('../routes/weatherRouter.js')

const port = 3000;
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pageNotFoundHandler = (req, res) =>
  res.status(404).send('Sorry, Page not found');

const errorHandler = (err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(err);
  return res.status(errorObj.status).json(errorObj.message);
};

app.use('/weather', weatherRouter);
app.use(pageNotFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

module.exports = app;
