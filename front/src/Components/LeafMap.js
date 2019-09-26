import React, { useState, useEffect } from 'react';
import L from 'leaflet';

import Container from 'react-bootstrap/Container';
import Row from       'react-bootstrap/Row';
import Col from       'react-bootstrap/Col';
import Collapse from  'react-bootstrap/Collapse';

import Temperature from './Temperature';
import Playlist from    './Playlist';
import MailInput from   './MailInput';

import playSong from '../calls/playSong.js';

import { MapContainer, MapDisplay, WeatherDescription, Sticker, MapFooter, Collapsible } from './styled';

import '../../node_modules/leaflet/dist/leaflet.css';

export default ({ coords, mapboxAccessToken, stickerURL, weatherReport, playlist }) => {

    const [aboutCollapse, setAboutCollapse]       = useState(false);
    const [playlistCollapse, setPlaylistCollapse] = useState(false);

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
    }
    
    playSong(playlist[0].preview);

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

    return (
        <Container fluid>
            <Row>
                <Col lg={{span: 8, offset: 2}} sm={{span:12}}>
                    <MapContainer visible={true}>
                        
                        <MapDisplay id="weather-map"/>
                        {
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
                <Col lg={{span: 8, offset: 2}} sm={{span:12}}>
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


