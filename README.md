# ojozene

[_ojozene_](https://ojozene.herokuapp.com) is my final and 12th project for teamtreehouse.com FullStack Javascript Techdegree.

### To run the app locally:

* create a .env file in the back/ directory and fill in your credentials for a [mongoDB database](https://mlab.com/home) and tokens for [mapbox](https://docs.mapbox.com/help/glossary/access-token/), [giphy](https://developers.giphy.com/) and [openweather](https://openweathermap.org/appid) APIs ([deezer](https://developers.deezer.com/) is token free).
```
DB_USER=<db_user_name>
DB_PASS=<db_password>
DB_NAME=<db_name>
DB_URL=<db_url>
MAPBOX_TOKEN=<mapbox_token>
GIPHY_TOKEN=<giphy_token>
OPENWEATHER_TOKEN=<openweather_token>
```
* ```npm run dev``` 
or
* add ```NODE_ENV=production``` to the .env file in the /back directory, run ```npm run build``` in the /front directory and ```npm start```in the root directory.

---

Warning:
Firefox sometimes refuses geolocation even when allowed by user prompt. To fix it, you just need to go into System Preferences > Security & Privacy > Privacy, check "Enable Location Services," and specify Firefox as one of the apps that's allowed access.