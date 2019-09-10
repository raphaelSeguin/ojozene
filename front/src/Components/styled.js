import {
    Modal
} from 'react-bootstrap';
import styled, {keyframes } from 'styled-components';
import colors from './colors';

export const PimpedModal = styled(Modal)`
    font-family: 'Quicksand', sans-serif;
    text-align: center;
    font-weight: 700;
    color: ${colors.nightblue};
    div.modal-content {
        border-radius: 50px;
        border: 10px solid ${colors.cloud};
        background-color: ${colors.skyblue};
    }
    div.modal-body {
        padding: 50px;
    }
    h1 {
        margin: 40px;
        font-weight: 900;
    }
    button {
        color: ${colors.skyblue};
        font-size: 30px;
        font-weight: inherit;
        border-radius: 20px;
        border: none;
        background-color: ${colors.nightblue};
        transition: color 0.7s, background-color 0.7s;
    }
    button:hover {
        background-color: ${colors.nightbluelight};
        color: ${colors.sun};
    }
`

export const Paragraph = styled.p`
    font-size: 30px;
    margin: 40px;
`;

const blink = keyframes`
    0% {
        color: #FF0000;
    }
    14% {
        color: #FF7F00;
    }
    28% {
        color: #FFFF00;
    }
    42% {
        color: #00FF00;
    }
    57% {
        color: #0000FF;
    }
    71% {
        color: #4B0082;
    }
    85% {
        color: #8B00FF;
    }
    100% {
        color: #FF0000;
    }
`

export const Rainbow = styled.div`
    font-size: 80px;
    font-weight: 800;
    span:nth-child(1n) {
        animation-timing-function: linear;
        animation: ${blink} ${props => props.duration}s infinite;
        animation-delay: 0s;
    }
    span:nth-child(2n) {
        animation-timing-function: linear;
        animation: ${blink} ${props => props.duration}s infinite;
        animation-delay: -${props => props.duration / 7 * 1}s;
    }
    span:nth-child(3n) {
        animation-timing-function: linear;
        animation: ${blink} ${props => props.duration}s infinite;
        animation-delay: -${props => props.duration / 7 * 2}s;
    }
    span:nth-child(4n) {
        animation-timing-function: linear;
        animation: ${blink} ${props => props.duration}s infinite;
        animation-delay: -${props => props.duration / 7 * 3}s;
    }
    span:nth-child(5n) {
        animation-timing-function: linear;
        animation: ${blink} ${props => props.duration}s infinite;
        animation-delay: -${props => props.duration / 7 * 4}s;
    }
    span:nth-child(6n) {
        animation-timing-function: linear;
        animation: ${blink} ${props => props.duration}s infinite;
        animation-delay: -${props => props.duration / 7 * 5}s;
    }
    span:nth-child(7n) {
        animation-timing-function: linear;
        animation: ${blink} ${props => props.duration}s infinite;
        animation-delay: -${props => props.duration / 7 * 6}s;
    }
`

export const Background = styled.div`
    background-image: linear-gradient( #0cf, #1e7 );
    height: 100%;
    overflow: hide;
`;


export const MapContainer = styled.div`
    position: relative;
    height: 400px;
    margin: 50px;
    margin-bottom: 10px;
    div {
        visibility: ${ props => !!props.visible ? 'visible' : 'hidden'}
    }
`

export const MapDisplay = styled.div`
    position: absolute;
    height: 400px;
    width: 100%;
    border-radius: 20px;
    top: 0px;
`

export const WeatherDescription = styled.h1`
    text-align: center;
    position: absolute;
    width: 100%;
    top: 0px;
    z-index: 1000;
    margin: 20px 0px;
    user-select: none;
`

export const MapFooter = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0px;
    z-index: 1000;
    visibility: ${ props => props.visible ? 'visible' : 'hidden'}
    margin: 50px auto;
    text-align: center;
    button {
        outline: none;
        color: ${colors.nightblue};
        font-size: 20px;
        font-weight: inherit;
        border-radius: 25px;
        border: 2px solid ${colors.sun};
        background-color: ${colors.skyblue};
        transition: color 0.4s, border 0.4s;
        margin: 0 10px;
    }
    button:hover {
        color: ${colors.nightbluelight};
        border: 2px solid ${colors.nightblue};
    }
`

export const Sticker = styled.div`
    position: absolute;
    background-image: url(${ props => props.stickerURL });
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1000;
    pointer-events: none;
    width: 100%;
    top: 100px;
    height: 200px;
`
