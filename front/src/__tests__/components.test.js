import React from 'react';
import ReactDOM from 'react-dom';

import App         from '../App';
import Temperature from '../Components/Temperature';
import LoadBar     from '../Components/LoadBar';
import Playlist    from '../Components/Playlist';
import Welcome     from '../Components/Welcome';
import MailInput   from '../Components/MailInput';

import { PimpedModal, Paragraph, Rainbow, Background, MapContainer, MapDisplay, WeatherDescription, MapFooter, Sticker, Collapsible } from '../Components/styled.js';


describe('Test components mounting without crashing', () => {

    it('App renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Temperature renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Temperature />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('LoadBar renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<LoadBar />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Playlist renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Playlist />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Welcome renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Welcome />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('MailInput renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MailInput />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('PimpedModal renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PimpedModal />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Paragraph renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Paragraph />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Rainbow renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Rainbow />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Background renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Background />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('MapContainer renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MapContainer />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('MapDisplay renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MapDisplay />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('WeatherDescription renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<WeatherDescription />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('MapFooter renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MapFooter />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Collapsible renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Collapsible />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Sticker renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Sticker />, div);
        ReactDOM.unmountComponentAtNode(div);
    });



})