import React from 'react';
import { useEffect, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import LoadBar from './LoadBar.js';

import { PimpedModal, Paragraph } from './styled';

export default ({
    buttonHandler,
    errorMessage,
    ready,
    hideHandler,
    closeModal }) => {

    const [showState, setShowState]                   = useState(false);
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

    const buttonHandle = () => {
        if ( showWelcomeMessage ) {
            setShowWelcomeMessage(false);
            if (!errorMessage) {
                buttonHandler();
            }
        } else {
            document.location.reload();
        }
    }
    useEffect( () => {
        if(closeModal) {
            setShowState(false);
        }
    }, [closeModal]);

    useEffect( () => {
        const timeout = setTimeout( () => setShowState(true), 500);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <PimpedModal
            show={ showState }
            size="lg"
            animation={true}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h1>ojozene</h1>
                <Row>
                    <Col md={{span: 8, offset: 2}} sm={{span: 10, offset: 1}}>
                        {
                            showWelcomeMessage &&
                            <Paragraph>
                                ojozene plays you a song matching the weather on your location.
                            </Paragraph>
                        }
                        {
                            errorMessage && !showWelcomeMessage &&
                            <Paragraph>{errorMessage}</Paragraph>
                        }
                        {
                            !errorMessage && !showWelcomeMessage &&
                            <LoadBar/>
                        }
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                {
                    (errorMessage || showWelcomeMessage) &&
                    <Button
                        onClick={ buttonHandle }
                    >
                        {
                            showWelcomeMessage && "Let's see !"
                        }
                        {
                            !showWelcomeMessage && "refresh"
                        }
                    </Button>
                }
            </Modal.Footer>
        </PimpedModal>
    )
}
