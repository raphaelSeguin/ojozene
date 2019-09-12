import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import styled from 'styled-components';

import Container from 'react-bootstrap/Container';
import Row from       'react-bootstrap/Row';
import Col from       'react-bootstrap/Col';
import Collapse from  'react-bootstrap/Collapse';

import Temperature from './Temperature';
import Playlist from    './Playlist';
import MailInput from   './MailInput';
import LoadBar from     './LoadBar';

import { MapContainer, MapDisplay, WeatherDescription, Sticker, MapFooter, Collapsible } from './styled';

import getPos from               '../calls/geoloc';
import getMapboxAccessToken from '../calls/getMapboxAccessToken';
import getSticker from           '../calls/getSticker.js';
import getWeather from           '../calls/getWeather.js';
import getSong from              '../calls/getSong.js';
import getPlaylist from          '../calls/getPlaylist.js';
import postSong from             '../calls/postSong.js';

import '../../node_modules/leaflet/dist/leaflet.css';

const playSong = (audioContext) => (songUrl) => {
    audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
    const bufferSource = audioContext.createBufferSource();
    const request = new XMLHttpRequest();

    const decodeSuccess = function (buffer) {
        bufferSource.buffer = buffer;
        bufferSource.connect(audioContext.destination);
        bufferSource.loop = true;
        bufferSource.start();
    }
    const decodeError = function (error) {
        console.log(error)
    }

    request.open('GET', songUrl, true);
    request.responseType = 'arraybuffer';
    request.onload = () => audioContext.decodeAudioData(request.response, decodeSuccess, decodeError);

        //     .then( buffer => {
        //         bufferSource.buffer = buffer;
        //         bufferSource.connect(audioContext.destination);
        //         bufferSource.loop = true;
        //         bufferSource.start();
        //     })
        // };

    request.send();
}

export default ({ audioContext }) => {

    const [loadingStatus, setLoading]                = useState(true);
    const [aboutCollapse, setAboutCollapse]       = useState(false);
    const [playlistCollapse, setPlaylistCollapse] = useState(false);

    // const [message, setMessage] = useState('');

    const [coords, setCoords] = useState([]);
    const [mapboxAccessToken, setMapboxAccessToken] = useState('');
    const [weatherReport, setWeatherReport] = useState('');
    const [stickerURL, setStickerURL] = useState('');
    const [playlist, setPlaylist] = useState([]);

    const playlistCollapseToggle = e => {
        e.stopPropagation();
        if (aboutCollapse && !playlistCollapse) {
            setAboutCollapse(false);
            setPlaylistCollapse(true);
        } 
        else if (!aboutCollapse && !playlistCollapse) {
            setPlaylistCollapse(true);
        }
        else if (!aboutCollapse && playlistCollapse) {
            setPlaylistCollapse(false);
        }
        else if (aboutCollapse && playlistCollapse) {
            //setPlaylistCollapse(false);
        }
    }
    const aboutCollapseToggle = e => {
        e.stopPropagation();
        if (!aboutCollapse && playlistCollapse) {
            setAboutCollapse(true);
            setPlaylistCollapse(false);
        } 
        else if (!aboutCollapse && !playlistCollapse) {
            setAboutCollapse(true);
        }
        else if (aboutCollapse && !playlistCollapse) {
            setAboutCollapse(false);
        }
        else if (aboutCollapse && playlistCollapse) {
            console.log('what happenneeeeddd???!!!')
        }
    }

    // geolocation
    useEffect( () => {
        getPos()
            .then( pos => setCoords( [pos.coords.latitude, pos.coords.longitude ] ))
            .catch( err => {
                console.log(err);
                // if (err.code === 1) {
                //     setMessage( 'please enable geolocation' );
                // } else if (err.code === 2) {
                //     setMessage( 'geolocation is impossible' )
                // } else if (err.code === 3) {
                //     setMessage( 'geolocation takes too much time' );
                // }
            });
    }, []);

    // mapbox accessToken
    useEffect( () => {
        getMapboxAccessToken()
            .then( setMapboxAccessToken )
            .catch( err => {
                console.log(err);
            })
    }, []);

    // mapbox
    useEffect( () => {
        if (coords.length && mapboxAccessToken) {
            let mymap = L.map('weather-map', {zoomControl: false})
                .setView(coords, 17);

            L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${mapboxAccessToken}`, {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                // style: 'mapbox://styles/mapbox/streets-v10',
                accessToken: mapboxAccessToken
            }).addTo(mymap);
        }
    }, [coords, mapboxAccessToken]);

    // getWeather
    useEffect( () => {
        if( coords.length ) {
            getWeather(coords)
                .then( setWeatherReport )
        }
    }, [coords]);

    // get Sticker
    useEffect( () => {
        if (weatherReport) {
            const weatherDescriptionArray = weatherReport.weather[0].description.split(' ');
            const query = weatherDescriptionArray.length > 1 ? weatherDescriptionArray[weatherDescriptionArray.length-1] : weatherDescriptionArray[0];
            getSticker(query) 
                .then( setStickerURL )
        }
    }, [weatherReport]);
    
    // get Song
    useEffect( () => {
        if ( weatherReport ) {
            getSong(weatherReport.weather[0].description)
                .then( song => { 
                    postSong(song)
                        .then( getPlaylist )
                        .then( setPlaylist )
                    return song;
                })
                .then( song => playSong(audioContext)(song.preview) )
                .then( () => setLoading(false) )
        }
    }, [weatherReport])

    return (
        <Container fluid>
            <Row>
                <Col lg={{span: 10, offset: 1}} sm={{span:12}}>
                    { loadingStatus && <LoadBar /> }
                    <MapContainer visible={!loadingStatus}>
                        
                        <MapDisplay id="weather-map"/>
                        {
                            !loadingStatus &&
                            weatherReport &&
                            weatherReport.weather[0] &&
                            <WeatherDescription>
                                {weatherReport.weather[0].description},{' '}
                                <Temperature temp={(weatherReport.main.temp)} initUnit="CELSIUS"/>
                            </WeatherDescription>
                        }
                        <Sticker stickerURL={stickerURL} />
                        <MapFooter>
                            <button
                                className="smaller"
                                onClick={ e => playlistCollapseToggle(e)}
                                aria-controls="playlist-collapse"
                                aria-expanded={playlistCollapse}
                            >
                                Playlist
                            </button>
                            <button
                                className="smaller"
                                onClick={ e => aboutCollapseToggle(e)}
                                aria-controls="about-collapse"
                                aria-expanded={aboutCollapse}
                            >
                                About
                            </button>
                            <MailInput />
                        </MapFooter>
                    </MapContainer>
                </Col>
            </Row>
            <Row>
                <Col lg={{span: 6, offset: 3}} sm={{span: 10, offset: 1}}>
                    <Collapse in={aboutCollapse}>
                        <Collapsible>
                            <p>FullStack Javascript Tech Degree final project @ <a href="https://teamtreehouse.com/raphalseguin" target="blank">Teamtreehouse.com</a></p>
                            <p>API credits : Weather report (<a href="https://openweathermap.org/" target="blank">Openweathermap</a>), Map (<a href="https://www.openstreetmap.org/" target="blank">Openstreetmap</a>) Music (<a href="https://www.deezer.com/" target="blank">Deezer</a>),  Sticker (<a href="https://giphy.com/" target="blank">Giphy</a>)</p>
                        </Collapsible>
                    </Collapse>
                    <Collapse in={playlistCollapse}>
                        <Collapsible>
                            <Playlist playlist={playlist} />
                        </Collapsible>
                    </Collapse>
                </Col>
            </Row>
        </Container>
    )
}


