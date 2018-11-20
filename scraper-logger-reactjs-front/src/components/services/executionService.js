import axios from 'axios';

const BASE_URL = 'http://hbello.info:3001';

const dbExecutionFotocasa = "state-execution-airbnb-scraping"

export { getExecutions, getExecution };

const getExecution = (entryName) => {
    //const url = `${BASE_URL}/entries/entry/name=${entryName}`;
    //axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    //return axios.get(url).then(response => response.data);
}

// /stateExecution/state-execution-airbnb-scraping?skip=0&limit=2
const getExecutions = (dbName, limit, skip, order) => {
    const url = `${BASE_URL}/stateExecution/${dbName}?skip=${skip}&limit=${limit}&order=${order}`;
    //axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    return axios.get(url).then(response => response.data);
}
