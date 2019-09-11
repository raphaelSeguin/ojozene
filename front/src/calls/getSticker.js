import axios from 'axios';

export default async (query) => {
    const response = await axios.get(`/API/giphysticker`, {
        params: {
            q: query
        }
    });
    return response.data;
}
    