import axios from 'axios';

export default async ({email}) => await axios.post('/API/addmail', {email})