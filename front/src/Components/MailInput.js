import React, {useState} from 'react';

import postAddmail from '../calls/postAddmail';

export default (props) => {
    const [buttonText, setButtonText] = useState('Keep in touch!');
    const inputRef = React.createRef();

    return (
        <form
            onSubmit={ e => {
                e.preventDefault();
                const email = inputRef.current.value;
                postAddmail({email})
                    .then( res => {
                        if (res.status === 201) {
                            setButtonText('thanks!');
                        }
                    });
                inputRef.current.value = '';
                inputRef.current.placeholder = '';
            }}
            onFocus={ () => 'clear input'}
        >
            <input 
                ref={inputRef}
                className="left" 
                type="email" 
                placeholder="your email" 
                required></input>
            <button className="right">{buttonText}</button>
        </form>
    );
}