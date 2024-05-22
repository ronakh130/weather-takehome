const axios = require('axios');

const weatherController = {
  async getWeatherByCity(req, res, next) {
    const { city, country } = req.params;
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.API_KEY}&units=Imperial`
      )
      .then((apiRes) => {
        res.locals.data = apiRes.data;
      })
      .catch((e) => {
        if (e.response) {
          return next({
            status: 400,
            log: 'weatherController.getWeatherByCity: ERROR: Error getting city results, double check city and country',
            message: {
              err: 'Error occurred while fetching data. Check server logs for more details.',
            },
          });
        } else if (e.request) {
          return next({
            status: 504,
            log: 'weatherController.getWeatherByCity: ERROR: No response from API.',
            message: {
              err: 'Error occurred while fetching data. Check server logs for more details.',
            },
          });
        }
        return next(e);
      });
    return next();
  },
  formatWeather(req, res, next) {
    const data = res.locals.data;
    const { city, country } = req.params;

    const output = {
      city: city[0].toUpperCase() + city.slice(1),
      country,
      temp: data.main.temp,
      high: data.main.temp_max,
      low: data.main.temp_min,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      desc: data.weather[0].description,
    };

    res.locals.output = output;
    return next();
  },
};

module.exports = weatherController;
