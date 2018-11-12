export const UPDATE_SCRAPER = "scraper:updateScraper";
export const GET_SCRAPER = "scraper:getScraper";

export const UPDATE_EXECUTION_ID = "scraper:updateExecutionId";
export const GET_EXECUTION_ID = "scraper:getExecutionId";


export const updateScraper = newScraper => ({
    type: UPDATE_SCRAPER,
    payload: {
        scraper: newScraper
    }
})

export const updateExecutionId = newExecutionId => ({
    type: UPDATE_EXECUTION_ID,
    payload: {
        executionId: newExecutionId
    }
})

export const getScraper = () => ({
    type: GET_SCRAPER,
})

export const getExecutionId = () => ({
    type: GET_EXECUTION_ID,
})
