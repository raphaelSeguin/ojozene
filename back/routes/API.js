const express = require('express');
const router = express.Router();
const { addMail } = require('../db/db');

const { MAPBOX_TOKEN, GIPHY_TOKEN, OPENWEATHER_TOKEN } = process.env;

const axios = require('axios');

const log = data => {
  console.log(data);
  return data;
}

router.get('/', function(req, res, next) {
  res.send('project 12 API');
});

router.get('/mapboxaccesstoken', (req, res) => res.send( MAPBOX_TOKEN ) )

router.get('/giphysticker', (req, res) => {
    
    const { q } = req.query;

    axios.get(`https://api.giphy.com/v1/stickers/search`, {
      params: {
        api_key: GIPHY_TOKEN,
        q
      }
    })
      .then( response => {
          if (response.data.data.length > 0) {
              return response;
          }
          return axios.get(`https://api.giphy.com/v1/stickers/search`, {
            params: {
              api_key: GIPHY_TOKEN,
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
            appid: OPENWEATHER_TOKEN
        }
    })
        .then( response =>  res.json(response.data) )
        .catch( err => res.json(err))
        ;
})

router.get('/song', (req, res) => {
    const {q} = req.query
    // const tracks = [];

    // const getTracks = async (query, array, max) => 
    //   await axios.get(`https://api.deezer.com/search/track`, { params: { query } })
    //     .then( res => {
    //       res.data.data.forEach( song => {
    //         const { id, title, preview, link } = song;
    //         array.push({ id, title, preview, link });
    //       })
    //       if (res.data.next && array.length < max) {
    //         return getTracks(query, array, max);
    //       }
    //       return;
    //     });
      
    // getTracks(q, tracks, 1000)
    //     .then( () => {
    //       const randomIndex = Math.floor(Math.random() * tracks.length);
    //       console.log('I got ' + tracks.length + ' songs');
    //       res.json(tracks[randomIndex]);
    //     })
    //     .catch( err => res.json(err));

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
    .catch( err => res.json(err));
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

router.post('/addmail', (req, res) => {
    const {email} = req.body;
    if (!email) {
      res.status(400).send('Bad Request');
    }
    addMail(email)
      .then( () => res.status(201).end() )
      .catch( () => res.status(503).end() )
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