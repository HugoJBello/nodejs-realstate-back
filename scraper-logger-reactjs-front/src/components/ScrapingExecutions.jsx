import React, { Component } from 'react';
import { getExecutions } from './services/executionService';

class ScrapingExecutions extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div>Scraping executions</div>);
    }
}

export default ScrapingExecutions;