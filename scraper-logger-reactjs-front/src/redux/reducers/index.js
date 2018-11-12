import { combineReducers } from 'redux';
import scraper from './scraper';
import executionId from './executionId';
export default combineReducers({
    scraper, executionId
});
