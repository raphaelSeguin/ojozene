import axios from 'axios';

export default async (song) => 
    await axios.post('/API/playlist', song)
