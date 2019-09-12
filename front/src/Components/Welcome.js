import React from 'react';
import { useEffect, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
                <h1>ojozene</h1>
                <Row>
                    <Col md={{span: 8, offset: 2}} sm={{span: 10, offset: 1}}>
                        <Paragraph>
                            ojozene plays you a song matching the weather on your location.
                        </Paragraph>
                    </Col>
                </Row>
                
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
