import React from 'react';
import ReactDOM from 'react-dom';
import Temperature from './Components/Temperature';

it('Temperature renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Temperature />, div);
    ReactDOM.unmountComponentAtNode(div);
});

// must test async . .. . . 

// it('LeafMap renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<LeafMap />, div);
//     ReactDOM.unmountComponentAtNode(div);
// });