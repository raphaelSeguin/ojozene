export default (songUrl) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const bufferSource = audioContext.createBufferSource();
    const request = new XMLHttpRequest();

    const decodeSuccess = function (buffer) {
        bufferSource.buffer = buffer;
        bufferSource.connect(audioContext.destination);
        bufferSource.loop = true;
        bufferSource.start();
    }
    const decodeError = function (error) {
        console.log(error)
    }

    request.open('GET', songUrl, true);
    request.responseType = 'arraybuffer';
    request.onload = () => audioContext.decodeAudioData(request.response, decodeSuccess, decodeError);
    request.send();
}