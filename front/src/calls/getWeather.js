import axios from 'axios';

export default async ([latitude, longitude]) => {
    const response = await axios.get('/API/weather', {
        params: {
            latitude,
            longitude
        }
    });
    return response.data;
}
    
 