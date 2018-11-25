import { combineReducers } from 'redux';
import scraperSummary from './scraperSummary';
import executionId from './executionId';
import dbName from './dbName';
export default combineReducers({
    scraperSummary, executionId, dbName
});
