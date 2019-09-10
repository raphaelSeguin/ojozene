import React, {useState} from 'react';

import LeafMap    from './Components/LeafMap';
import Welcome    from './Components/Welcome';

import { Background } from './Components/styled';

let audioContext = null;

export default () => {

    const stages = {
        WELCOME: 'WELCOME',
        APP: 'APP',
        SANDBOX: 'SANDBOX'
    }

    const [stage, setStage] = useState(stages.WELCOME);

    const initAudioContext = () => audioContext = audioContext || new AudioContext();

    const gotoApp = () => {
        setStage('APP');
    }

    return (
        <Background>
            {
                stage === 'WELCOME' &&
                <Welcome 
                    buttonHandler={gotoApp}
                    initAudioContext={initAudioContext}
                />
            }
            {
                stage === 'APP' &&
                <LeafMap audioContext={audioContext} />
            }
            {
                stage === 'SANDBOX' && <h1>Sand box</h1>
            }
        </Background>
    )
}
