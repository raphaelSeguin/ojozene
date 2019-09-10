import React from 'react';
import { useEffect, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { PimpedModal, Paragraph } from './styled';

export default ({buttonHandler, initAudioContext}) => {
    const [showState, setShowState] = useState(false);

    const hideAndNext = () => {
        setShowState(false);
        setTimeout(buttonHandler, 1000);
    }

    useEffect( () => {
        const timeout = setTimeout( () => setShowState(true), 800);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <PimpedModal
            onHide={() => null}
            show={showState}
            size="lg"
            animation={true}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h1>OJO ZENE</h1>
                <Paragraph>
                    OJO means weather in yoruba.<br/>
                    ZENE means music in Hungarian.<br/>
                    Music recommandation based on weather ?
                </Paragraph>
                <Button
                    onClick={() => {
                        initAudioContext();
                        hideAndNext();
                    }}
                >Let's see !</Button>
            </Modal.Body>
        </PimpedModal>
    )
}
