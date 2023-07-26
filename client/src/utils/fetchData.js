import axios from 'axios';

export const fetchData = async (getURL) => await axios.get(getURL);
