import React from 'react';
import PropTypes from 'prop-types'

import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { updateExecutionId, getExecutionId } from '../redux/actions';

class AppNavbar extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">App</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/scraping-executions">Executions</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/scraping-summaries">Scraping summaries</Link>
                        </li>
                    </ul>
                    {this.props.executionId != "" &&
                        <div className="nav-item my-sm-0">
                            <div className="nav-link" >{this.getSelectedScrapingId()}</div>
                        </div>
                    }
                </div>
            </nav>
        )
    }
    getSelectedScrapingId = () => {
        if(this.props.executionId){
            return this.props.executionId.scrapingId
        } else {
            return ""
        }
    }
}

AppNavbar.propTypes = {
    executionId: PropTypes.string.isRequired
}


const mapStateToProps = (state, ownProps) => ({
    executionId: state.executionId
});

const mapActionsToProps = {
    onUpdateExecutionId: updateExecutionId,
    onGetExecutionId: getExecutionId,
};

export default connect(mapStateToProps, mapActionsToProps)(AppNavbar);
