import axios from 'axios';

export default async () => {
    const json = await axios.get('/API/mapboxaccesstoken')
        .catch( err => console.log("I can't get mapboxaccesstoken because :\n", err) );
    return json.data;
}
    
