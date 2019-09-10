import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default () => {

    const [flag, setFlag] = useState(false);
    const [value, setValue] = useState(0);
    const [message, setMessage] = useState('');
    
    useEffect( () => {
        axios.get('/API/random-value')
            .then( res => setValue( parseInt(res.data.value, 10)) )
    }, [flag]);
    useEffect( () => {
        const cleaner = setTimeout( () => setMessage('coucou !'), 1000);
        return () => clearTimeout(cleaner);
    });

    return (
        <div>
            <h1>API Check</h1>
            <p>
                Ceci est une valeur aléatoire : {value}
            </p>
            <Button 
                    size="sm"
                    onClick={ () => setFlag(!flag) }>
                    Encore !
                </Button>
            <p>{message}</p>
        </div>
    )
}