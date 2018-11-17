import React, { Component } from 'react';
import { getExecutions } from './services/executionService';
class ScrapingExecutions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dbName: "state-execution-airbnb-scraping",
            limit: 100,
            skip: 0,
            maxDateDiff: 1000 * 60 * 20,
            retrievedExec: null
        }
    }

    async componentDidMount() {
        const retrievedExec = await getExecutions(this.state.dbName, this.state.limit, this.state.skip);
        this.setState({ retrievedExec })
        this.findOutIfActive();
        console.log(this.state);
    }

    render() {
        return (<div>Scraping executions</div>);
    }

    findOutIfActive = () => {
        const retrievedExec = this.state.retrievedExec;
        const maxDateDiff = this.state.maxDateDiff;

        retrievedExec.map((exec) => {
            const date = (new Date(exec.date)).getTime();
            const dateNow = (new Date()).getTime();
            const dateDiff = dateNow - date
            exec.isActive = dateDiff < maxDateDiff;
        });

    }
}

export default ScrapingExecutions;