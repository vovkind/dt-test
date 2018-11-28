import React, { Component } from 'react';
import CSVReader from 'react-csv-reader';
import restCallWrapper from '../common/RestCallWrapper';
import { connect } from 'react-redux';
import { loadRestarauntsAction, saveDuplicateRestarauntsAction } from '../../actions';
import { FiLoader } from 'react-icons/fi';
import { Alert, Button } from 'reactstrap';
import './ManageRestaraunts.css'

class ManageRestaraunts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadInProgress: false
        }
    }

    componentDidMount() {
        this.setState({ loadInProgress: true })
        var inputEvent = {
            successCalback: this
                ._handleRestSuccess
                .bind(this),
            errorCallback: this
                ._handleRestError
                .bind(this)
        };

        this
            .props
            .invokeGet('/retrieve-restaraunts', inputEvent);
    }

    handleLoad = (dataArr) => {
        this.setState({ loadInProgress: true, duplicateRestaraunts: undefined })
        var inputEvent = {
            successCalback: this
                ._handleRestSuccess
                .bind(this),
            errorCallback: this
                ._handleRestError
                .bind(this)
        };

        var input = [];
        var address = [];
        //requires proper formatter
        dataArr.forEach((restaraunt) => {
            if (!isNaN(restaraunt[2])) {
                address = restaraunt[3].split('/');
                input.push(
                    {
                        'name': restaraunt[0],
                        'type': restaraunt[1],
                        'phone': restaraunt[2],
                        'addressLng': Number(address[0]),
                        'addressLat': Number(address[1])
                    }
                )
            }
        })

        this
            .props
            .invokePost('/upload-restaraunts', input, inputEvent);
    }

    handleDeleteAll = () => {
        this.setState({ loadInProgress: true, duplicateRestaraunts: undefined })
        var inputEvent = {
            successCalback: this
                ._handleDeleteAllRestSuccess
                .bind(this),
            errorCallback: this
                ._handleRestError
                .bind(this)
        };

        this
            .props
            .invokePost('/delete-restaraunts', {}, inputEvent);
    }

    _handleRestError(err, inputEvent) {
        this.setState({ loadInProgress: false })
        this.setState({ errorMsg: 'Action is failed. Check logs :)' })
        //Representation to user - next release
    }

    _handleRestSuccess(response) {
        this.setState({ loadInProgress: false })

        var responseData = response.body;
        if (responseData) {
            this.props.loadRestarauntsAction(responseData[0]);
            if (responseData[1]) {
                this.props.saveDuplicateRestarauntsAction(responseData[1]);
            }
        }
    }

    _handleDeleteAllRestSuccess(response){
        this.setState({ loadInProgress: false })
        this.props.loadRestarauntsAction(null);
        this.props.saveDuplicateRestarauntsAction(null);
    }

    handleDarkSideForce = () => {
        // show error messages, if any
    }

    render() {
        return (
            <div>
                <CSVReader
                    cssClass="upload-rest-wrapper"
                    label="Upload"
                    onFileLoaded={this.handleLoad}
                />
                <FiLoader className={this.state.loadInProgress ? "loader-sign" : "loader-sign invisible"} />
                <Alert color="danger" className={this.props.duplicateRestData ?'d-block mb-4' : 'd-none'}>
                    Some restaraunts already present in DB.
                </Alert>
                <Button color="secondary" className="float-left" onClick={this.handleDeleteAll}>Delete all</Button>{' '}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    var duplicateRestData = state.duplicateRestData;

    return {
        duplicateRestData: duplicateRestData && duplicateRestData.length > 0 ? duplicateRestData : undefined
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadRestarauntsAction: (data) => dispatch(loadRestarauntsAction(data)),
        saveDuplicateRestarauntsAction: (data) => dispatch(saveDuplicateRestarauntsAction(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(restCallWrapper(ManageRestaraunts));