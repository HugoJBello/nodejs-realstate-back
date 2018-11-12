import { UPDATE_SCRAPER, GET_SCRAPER } from '../actions'

const scraper = (state = "", action) => {
    switch (action.type) {
        case UPDATE_SCRAPER:
            return action.payload.scraper;
        case GET_SCRAPER:
            return state;
        default:
            return state;
    }
}
export default scraper
