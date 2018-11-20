import React, { Component } from 'react';
import { getSummaries } from './services/summariesService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ReactBsTable = require('react-bootstrap-table');
const BootstrapTable = ReactBsTable.BootstrapTable;
const TableHeaderColumn = ReactBsTable.TableHeaderColumn;

class ScrapingSummaries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dbName: "summaries-fotocasa-scraping",
            limit: 1,
            skip: 0,
            order: -1,
            maxDateDiff: 1000 * 60 * 20,
            retrievedExec: null
        }
    }

    async componentDidMount() {
        const retrievedExec = await getSummaries(this.state.dbName, this.state.limit, this.state.skip, this.state.order);
        this.setState({ retrievedExec })
        console.log(this.state);
    }


    render() {
        return (<div>Scraping summaries</div>);
    }
}

export default ScrapingSummaries;