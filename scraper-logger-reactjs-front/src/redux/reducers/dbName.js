import { UPDATE_DBNAME, GET_DBNAME } from '../actions'

const dbName = (state = "summaries-fotocasa-scraping", action) => {
    switch (action.type) {
        case UPDATE_DBNAME:
            return action.payload.dbName;
        case GET_DBNAME:
            return state;
        default:
            return state;
    }
}
export default dbName
