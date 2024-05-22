# Weather Takehome for BDIPlus

Please go to <https://weather-takehome-tau.vercel.app/> for the app.

Created with React/Express and deployed on Vercel.

Weather data supplier: <https://openweathermap.org/>.

### Thoughts

Since I used this third party API to provide the data, I didn't see a need to utilize MongoDB here.

However, if it was required, the best use case I would see is to store previously fetched weather data into the mongo databases with a timestamp.

If the timestamp got too old, we would fetch from the API again to avoid stale data and update the table accordingly.

Feel free to email me at <rhirpara130@gmail.com> for further questions.
