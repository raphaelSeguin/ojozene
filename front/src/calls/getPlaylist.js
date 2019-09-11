import axios from 'axios';

export default async () => {
    const response = await axios.get('/API/playlist');
    return response.data;
}