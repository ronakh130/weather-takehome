
const express = require('express');
const weatherController = require('../controllers/weatherController.js');
const weatherRouter = express.Router();

weatherRouter.get('/:city/:country', weatherController.getWeatherByCity, weatherController.formatWeather, (req, res) => {
  res.status(200).json(res.locals.output);
});

module.exports = weatherRouter;
