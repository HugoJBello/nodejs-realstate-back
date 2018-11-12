import axios from 'axios';

const BASE_URL = 'http://hbello.info:3001';

const dbSummariesFotocasa = "summaries-fotocasa-scraping"

export { getSummaries, getSummary };

const getSummary = (entryName) => {
    //const url = `${BASE_URL}/entries/entry/name=${entryName}`;
    //axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    //return axios.get(url).then(response => response.data);
}

///summaries/summaries-fotocasa-scraping/skip=0&limit=2
const getSummaries = (dbName, limit, skip) => {
    const url = `${BASE_URL}/summaries/${dbName}/skip=${skip}&limit=${limit}`;
    //axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    return axios.get(url).then(response => response.data);
}
