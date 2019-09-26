import React, {useState, useEffect} from 'react';

import LeafMap    from './Components/LeafMap';
import Welcome    from './Components/Welcome';

import { Background } from './Components/styled';

import getPos from               './calls/geoloc';
import getMapboxAccessToken from './calls/getMapboxAccessToken';

import log from './calls/log.js';

import getSticker from           './calls/getSticker.js';
import getWeather from           './calls/getWeather.js';
import getSong from              './calls/getSong.js';
import getPlaylist from          './calls/getPlaylist.js';
import postSong from             './calls/postSong.js';

export default () => {

    const stages = {
        WELCOME: 'WELCOME',
        APP: 'APP',
    }

    const [stage, setStage]                         = useState(stages.WELCOME);

    const [errorMessage, setErrorMessage]           = useState('');     // error
    const [ready, setReady]                         = useState(false);  // user clicked
    const [closeModal, setCloseModal]               = useState(false);

    const [coords, setCoords]                       = useState([]);
    const [mapboxAccessToken, setMapboxAccessToken] = useState('');
    const [weatherReport, setWeatherReport]         = useState('');
    const [stickerURL, setStickerURL]               = useState('');
    const [playlist, setPlaylist]                   = useState([]);

    // geolocation
    useEffect( () => {
        getPos()
            .then( log("coordinates") )
            .then( pos => setCoords( [pos.coords.latitude, pos.coords.longitude ] ))
            .then( () => setErrorMessage('') )
            .catch( err => {
                if (err.code === 1) {
                    setErrorMessage( 'please enable geolocation' );
                } else if (err.code === 2) {
                    setErrorMessage( 'geolocation is impossible' );
                } else if (err.code === 3) {
                    setErrorMessage( 'geolocation takes too much time' );
                }
            });
    }, []);

    // mapbox accessToken
    useEffect( () => {
        getMapboxAccessToken()
            .then( log("mapbox access token") )
            .then( setMapboxAccessToken )
            .catch( err => {
                console.log(err);
            })
    }, []);

    // getWeather
    useEffect( () => {
        if( coords.length ) {
            getWeather(coords)
                .then( setWeatherReport )
                .then( () => setErrorMessage('') )
                .catch( err => {
                    setErrorMessage('Error while loading weather report');
                    console.log(err); 
                })
        }
    }, [coords]);

    // get Sticker
    useEffect( () => {
        if (weatherReport) {
            const weatherDescriptionArray = weatherReport.weather[0].description.split(' ');
            const query = weatherDescriptionArray.length > 1 ? weatherDescriptionArray[weatherDescriptionArray.length-1] : weatherDescriptionArray[0];
            getSticker(query) 
                .then( setStickerURL )
                .then( () => setErrorMessage('') )
                .catch( err => {
                    setErrorMessage('Error while loading sticker');
                    console.log(err); 
                })
        }
    }, [weatherReport]);
    
    // get Song
    useEffect( () => {
        if ( weatherReport ) {
            getSong(weatherReport.weather[0].description)
                .then( song => {
                    log('song')(song);
                    postSong(song)
                        .then( getPlaylist )
                        .then( setPlaylist )
                    return song;
                })
                .then( () => setErrorMessage('') )
                .catch( err => {
                    setErrorMessage('Error while loading song');
                    console.log(err); 
                })
        }
    }, [weatherReport])

    useEffect( () => {
        log('ready')(ready);
        if( ready && !errorMessage && playlist.length && stickerURL) {
            setCloseModal(true);
            setTimeout( () => setStage(stages.APP), 800)
        }
    }, [ready, errorMessage, playlist, stickerURL, stages]);

    return (
        <Background>
            {
                stage === 'WELCOME' &&
                <Welcome 
                    ready={ready}
                    errorMessage={errorMessage}
                    buttonHandler={ () => setReady(true) }
                    closeModal={ closeModal }
                />
            }
            {
                stage === 'APP' &&
                <LeafMap 
                    {...{
                        coords, 
                        mapboxAccessToken, 
                        weatherReport, 
                        stickerURL, 
                        playlist
                    }}
                />
            }
        </Background>
    )
}