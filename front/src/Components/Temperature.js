import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const kelvinToCelsius = kelvin => (kelvin - 273.15);
const kelvinToFahrenheit = kelvin => ((kelvin - 273.15) * 9/5 + 32);

export default ({temp, initUnit}) => {
    const [displayTemp, setDisplayTemp] = useState(temp);
    const [displayUnit, setDisplayUnit] = useState('');
    const [unit, setUnit] = useState(initUnit);

    useEffect(() => {
        if( unit === 'CELSIUS') {
            setDisplayTemp(kelvinToCelsius(temp).toFixed(0));
            setDisplayUnit('°C');
        }
        if( unit === 'FAHRENHEIT') {
            setDisplayTemp(kelvinToFahrenheit(temp).toFixed(0));
            setDisplayUnit('°F');
        }
    }, [temp, unit])
    return (
        <>
            <FixedWidth
                onClick={() => setUnit(unit === 'CELSIUS' ? 'FAHRENHEIT' : 'CELSIUS')}
            >
                { displayTemp }{ displayUnit }
                
            </FixedWidth>
            <SmallNote>(click to switch units)</SmallNote>
        </>
    )
}

const FixedWidth = styled.div`
    display: inline-block;
    width: 100px;
`
const SmallNote = styled.span`
    font-size: 10px;
`