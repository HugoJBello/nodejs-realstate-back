import React, { Component } from 'react';
import { getExecutions } from './services/executionService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './scrapingResults.css';
const ReactBsTable = require('react-bootstrap-table');
const BootstrapTable = ReactBsTable.BootstrapTable;
const TableHeaderColumn = ReactBsTable.TableHeaderColumn;

class ScrapingExecutions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dbName: "state-execution-fotocasa-scraping",
            //dbName: "state-execution-airbnb-scraping",
            limit: 100,
            skip: 0,
            order: -1,
            maxDateDiff: 1000 * 60 * 20,
            retrievedExec: []
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
        return (<div className="">
        <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">id</th>
                <th scope="col">date</th>
                <th scope="col">last city</th>
                <th scope="col">last piece</th>
                <th scope="col">state</th>
                </tr>
            </thead>
            <tbody>
                {this.state.retrievedExec.map((execution, index) => 
                    <tr key={index}>
                    <th scope="row"> {execution.scrapingId}</th>
                    <td className="big-cell">{execution.date}</td>
                    <td>{execution.lastNmun}</td>
                    <td>{execution.lastPart}</td>
                    <td>{this.getActiveIcon(execution)}</td>
                    </tr>
                )}
                
            </tbody>
        </table>
        </div>);
    }

    getDeviceId = (execution) =>{
        if (execution.config){
            return execution.config.deviceId;
        } else {
            return null;
        }
    }

    getActiveIcon = (execution) =>{
        const date = (new Date(execution.date)).getTime();
        const dateNow = (new Date()).getTime();
        const dateDiff = dateNow - date
        const isActive = dateDiff < this.state.maxDateDiff;
        return (<div>{isActive && <FontAwesomeIcon icon="stroopwafel"></FontAwesomeIcon>}</div>);
    }

}

export default ScrapingExecutions;