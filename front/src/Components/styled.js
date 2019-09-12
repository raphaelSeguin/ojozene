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
        border: 5px solid ${colors.cloud};
        background-color: ${colors.skyblue};
    }
    div.modal-body {
        padding: 0px;
    }
    h1 {
        margin: 20px;
        font-weight: 900;
        font-size: 3em;
    }
    button {
        color: ${colors.skyblue};
        font-size: 2em;
        font-weight: inherit;
        border-radius: 20px;
        border: none;
        margin: 20px;
        background-color: ${colors.nightblue};
        transition: color 0.7s, background-color 0.7s;
    }
    button:hover {
        background-color: ${colors.nightbluelight};
        color: ${colors.sun};
    }
`

export const Paragraph = styled.p`
    font-size: 1.3em;
    margin: 0px;
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
    margin-top: 50px;
    font-size: 3em;
    font-weight: 800;
    text-align: center;
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
    background-image: linear-gradient( ${colors.skyblue}, ${colors.cloud} );
    height: 100%;
    overflow: hide;
`;


export const MapContainer = styled.div`
    position: relative;
    height: 400px;
    margin: 50px 0;
    margin-bottom: 0px;
    div {
        visibility: ${ props => !!props.visible ? 'visible' : 'hidden'}
    }
`

export const MapDisplay = styled.div`
    position: absolute;
    height: 400px;
    width: 100%;
    border-radius: 20px 20px 0 0;
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
    margin: 10px auto;
    text-align: center;
    button, input {
        width: 150px;
        outline: none;
        color: ${colors.nightblue};
        font-size: 20px;
        font-weight: inherit;
        border-radius: 25px;
        border: 2px solid ${colors.sun};
        background-color: ${colors.skyblue};
        transition: color 0.4s, border 0.4s;
        margin: 10px 50px;
    }
    input {
        background-color: ${colors.cloud};
        text-align: center;
    }
    button:hover {
        color: ${colors.nightbluelight};
        border: 2px solid ${colors.nightblue};
    }
    .smaller {
        width: 100px;
    }
    .left {
        border-right: none;
        border-radius: 25px 0 0 25px;
        margin: 0;
    }
    .right {
        border-radius: 0 25px 25px 0;
        margin: 0;
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
export const Collapsible = styled.div`
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 0 0 30px 30px;
    border: none;
    color: ${colors.nightblue};
    h1, p {
        margin: 0 30px;
    }
`