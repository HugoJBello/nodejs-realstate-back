import React, { Component } from 'react';
import { getExecutions } from './services/executionService';
class ScrapingExecutions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dbName: "state-execution-airbnb-scraping",
            limit: 10,
            skip: 0,
            retrievedExec: null
        }
    }

    componentDidMount() {
        const retrievedExec = getExecutions(this.state.dbName, this.state.limit, this.state.skip);
        console.log(retrievedExec);
        this.setState({ retrievedExec })
    }

    render() {
        return (<div>Scraping executions</div>);
    }
}

export default ScrapingExecutions;