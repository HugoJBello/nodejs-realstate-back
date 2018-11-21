import React, { Component } from 'react';
import { getExecutions } from './services/executionService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ReactBsTable = require('react-bootstrap-table');
const BootstrapTable = ReactBsTable.BootstrapTable;
const TableHeaderColumn = ReactBsTable.TableHeaderColumn;

class ScrapingExecutions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //dbName: "state-execution-fotocasa-scraping",
            dbName: "state-execution-airbnb-scraping",
            limit: 100,
            skip: 0,
            order: -1,
            maxDateDiff: 1000 * 60 * 20,
            retrievedExec: null
        }
    }

    async componentDidMount() {
        const self = this;
        setInterval(async () => {
            const retrievedExec = await getExecutions(self.state.dbName, self.state.limit, self.state.skip, self.state.order);
            this.setState({ retrievedExec })
            console.log(self.state);
        }, 1000);

    }

    render() {
        return (<div>Scraping executions
            {this.executionTable()}
        </div>);
    }

    priceFormatter = (cell, row, enumObject, index) => {
        const date = (new Date(cell)).getTime();
        const dateNow = (new Date()).getTime();
        const dateDiff = dateNow - date
        const isActive = dateDiff < this.state.maxDateDiff;
        return (<div>{isActive && <FontAwesomeIcon icon="stroopwafel"></FontAwesomeIcon>}</div>);
    }
    executionTable = () => {
        return (<BootstrapTable data={this.state.retrievedExec} version='4'>
            <TableHeaderColumn isKey dataField='scrapingId'>scrapingId</TableHeaderColumn>
            <TableHeaderColumn dataField='date'>date</TableHeaderColumn>
            <TableHeaderColumn dataField='date' dataFormat={this.priceFormatter.bind(this)} width='150' >isActive</TableHeaderColumn>
            <TableHeaderColumn dataField='lastNmun' width='150'>lastNmun</TableHeaderColumn>
        </BootstrapTable>);
    }

}

export default ScrapingExecutions;