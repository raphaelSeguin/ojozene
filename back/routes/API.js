const express = require('express');
const router = express.Router();
const { createUser, findToto } = require('../db/db');
const { mapboxAccessToken } = require('../../config.js');
const { giphyAccessToken } = require('../../config.js');
const { openweatherAccessToken } = require('../../config.js');
const axios = require('axios');

const log = data => {
  console.log(data);
  return data;
}

router.get('/', function(req, res, next) {
  res.send('project 12 API');
});

router.get('/mapboxaccesstoken', (req, res) => res.send( mapboxAccessToken ) )

router.get('/giphysticker', (req, res) => {
    
    const { q } = req.query;

    axios.get(`https://api.giphy.com/v1/stickers/search`, {
      params: {
        api_key: giphyAccessToken,
        q
      }
    })
      .then( response => {
          if (response.data.data.length > 0) {
              return response;
          }
          return axios.get(`https://api.giphy.com/v1/stickers/search`, {
            params: {
              api_key: giphyAccessToken,
              q: "frog"
            }
          })
      })
      .then( response => {
        if (response.data.data.length > 0) {
            const randomIndex = Math.floor(Math.random() * response.data.data.length);
            return response.data.data[randomIndex].images.fixed_width.url;
        } else {
          throw Error('I cant get no sticker :(');
        }
    })
      .then( url => res.send(url))
      .catch( err => console.log('\n- - - - - -\ngiphysticker error\n', err))
      ;
})

router.get('/weather', (req, res) => {
    const {latitude, longitude} = req.query;

    axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
        params: {
            lat: latitude,
            lon: longitude,
            appid: openweatherAccessToken
        }
    })
        .then( response =>  res.json(response.data) )
        .catch( err => res.json(err))
        ;
})

router.get('/song', (req, res) => {
    const {q} = req.query
    axios.get(`https://api.deezer.com/search/track`, {
        params: {
          q
        }
    })
    .then( response => {
        const randomIndex = Math.floor(Math.random() * response.data.data.length);

        const choice = response.data.data[randomIndex];

        const { id, title, preview, link } = choice;
        const artist  = choice.artist.name;

        res.json({ id, title, preview, link, artist });
    })
    .catch( err => res.json(err))
    ;
})

router.get('/playlist', (req, res) => {
  res.json(req.session.playlist);
})

router.post('/playlist', (req, res) => {
  const tune = req.body;
  if ( req.session.playlist ) {
    req.session.playlist.unshift(tune);
  } else {
    req.session.playlist = [tune];
  }
  res.status(200);
  res.send('OK');
})

module.exports = router;

// router.get('/random-value', (req, res) => {
//   res.json( {value: Math.floor(Math.random() * 0xffffffff)} );
// });

// router.get('/findtoto', async (req, res) => {
//   const user = await findToto();
//   res.json(user);
// });

// router.post('/createuser', async (req, res) => {
//   const { name, pass } = req.body;

//   const result = await createUser({name, pass});

//   res.json( result );
// });