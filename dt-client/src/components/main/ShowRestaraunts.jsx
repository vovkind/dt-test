import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Input, FormGroup, Form, Table, FormFeedback } from 'reactstrap';
import restCallWrapper from '../common/RestCallWrapper';
import { loadRestarauntsAction } from '../../actions';
import './ShowRestaraunts.css';

class ShowRestaraunts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalDelete: false,
            modalEdit: false,
            chosenRest: {},
            validatedFields: {
                name: true,
                phone: true
            }
        }
    }

    retrieveChosenRestaraunt(id) {
        var restaraunt = this.props.restarauntsData.find(restaraunt => {
            return restaraunt.id === id;
        });

        return <tr><th scope="row">1</th>
            <td>{restaraunt.name}</td>
            <td>{restaraunt.type}</td>
            <td>{restaraunt.phone}</td>
            <td>{restaraunt.addr}</td>
        </tr>
    }

    clickRestaraunt = restId => ev => {
        var self = this;

        self.setState({ chosenRest: this.props.restarauntsData.find(element => element.id === restId) });
    }

    confirmDelete = () => {
        var inputEvent = {
            successCalback: this
                ._handleDeleteRestSuccess
                .bind(this),
            errorCallback: this
                ._handleRestError
                .bind(this)
        };
        var input = this.state.chosenRest.id;

        this
            .props
            .invokePost('/delete-restaraunt', input, inputEvent);
    }

    confirmEdit = () => {
        var inputEvent = {
            successCalback: this
                ._handleEditRestSuccess
                .bind(this),
            errorCallback: this
                ._handleRestError
                .bind(this)
        };

        var restData = this.state.chosenRest;
        var input = {
            'id': restData.id,
            'name': restData.name,
            'phone': restData.phone,
            'type': restData.type,
            'addressLng': restData.addressLng,
            'addressLat': restData.addressLat,
        };

        this
            .props
            .invokePost('/update-restaraunt', input, inputEvent);
    }

    _handleEditRestSuccess(response) {
        if (response.body) {
            var initRestData = this.props.restarauntsData;
            var restDataToUpdate = Object.assign([], initRestData);
            var dataToBeUpdated = restDataToUpdate.find(element => element.id === this.state.chosenRest.id);

            //Update main obj with state data
            dataToBeUpdated.name = this.state.chosenRest.name;
            dataToBeUpdated.phone = this.state.chosenRest.phone;

            //Update store and close popup
            this.props.loadRestarauntsAction(restDataToUpdate);
            this.setState({ modalEdit: !response.body })
        }
    }

    toggleDelete = () => {
        this.setState({ modalDelete: !this.state.modalDelete });
    }

    _handleDeleteRestSuccess(response) {
        if (response.body) {
            var filteredData = this.props.restarauntsData.filter(element => element.id !== this.state.chosenRest.id);

            //Update store and close popup
            this.props.loadRestarauntsAction(filteredData);
            this.setState({ modalDelete: !response.body });
        }
    }

    _handleRestError(err, inputEvent) {
        this.setState({ errorMsg: 'Action is failed. Check logs :)' })
        //Representation to user - next release
    }

    toggleEdit = () => {
        this.setState({ modalEdit: !this.state.modalEdit });
    }

    retrieveFieldValue = fieldName => {
        return this.state.chosenRest[fieldName];
    }

    updateFieldValue = name => event => {
        var restDataToUpdate = this.state.chosenRest;
        var value = event.target.value;
        var isInputValid = this.validateInput(value);
        var validatedFields = this.state.validatedFields;

        validatedFields[name] = isInputValid;
        restDataToUpdate[name] = value;
        this.setState({ restDataToUpdate: restDataToUpdate, validatedFields: validatedFields });
    }

    validateInput(value) {
        //Demo mode - max 30 chars allowed for all editable fields, any kind of input
        return value && value.length > 0 && value.length < 30;
    }

    render() {
        const restData = this.props.restToShowId ?
            [this.props.restarauntsData.find(restaraunt => { return restaraunt.id === this.props.restToShowId; })]
            : this.props.restarauntsData;
        const chosenRestId = this.state.chosenRest.id;

        return (
            <Table className="rests-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Phone</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        restData ?
                            restData.map((restaraunt, index) => {
                                var isRestChosen = chosenRestId === restaraunt.id;
                                return <tr key={restaraunt.id}
                                    onClick={this.clickRestaraunt(restaraunt.id)}
                                    style={{ backgroundColor: isRestChosen ? '#ececf3' : 'white' }}>
                                    <th scope="row">
                                        <div className="rest-edit-controls" style={{ visibility: isRestChosen ? 'visible' : 'hidden' }}>
                                            <MdEdit onClick={this.toggleEdit} />
                                            <MdDeleteForever onClick={this.toggleDelete} />
                                            <Modal isOpen={this.state.modalEdit} toggle={this.toggleEdit} className={this.props.className}>
                                                <ModalHeader toggle={this.toggleEdit}>Edit restaraunt details</ModalHeader>
                                                <ModalBody>
                                                    <Form>
                                                        <FormGroup>
                                                            <Label for="name">Name</Label>
                                                            <Input
                                                                invalid={!this.state.validatedFields.name}
                                                                type="text"
                                                                name="name"
                                                                value={this.retrieveFieldValue('name')}
                                                                onChange={this.updateFieldValue('name')}
                                                            />
                                                            <FormFeedback>Too long string. Example of validation!</FormFeedback>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label for="phone">Phone</Label>
                                                            <Input
                                                                invalid={!this.state.validatedFields.phone}
                                                                type="text"
                                                                name="phone"
                                                                value={this.retrieveFieldValue('phone')}
                                                                onChange={this.updateFieldValue('phone')}
                                                            />
                                                            <FormFeedback>Too long string. Example of validation!</FormFeedback>
                                                        </FormGroup>
                                                    </Form>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="primary"
                                                        disabled={!this.state.validatedFields.name || !this.state.validatedFields.phone}
                                                        onClick={this.confirmEdit}>Yes</Button>{' '}
                                                    <Button color="secondary" onClick={this.toggleEdit}>Cancel</Button>
                                                </ModalFooter>
                                            </Modal>
                                            <Modal isOpen={this.state.modalDelete} toggle={this.toggleDelete} className={this.props.className}>
                                                <ModalHeader toggle={this.toggleDelete}>Delete restaraunt</ModalHeader>
                                                <ModalBody>
                                                    Are you sure?
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="primary" onClick={this.confirmDelete}>Yes</Button>{' '}
                                                    <Button color="secondary" onClick={this.toggleDelete}>Cancel</Button>
                                                </ModalFooter>
                                            </Modal>
                                        </div>
                                        {index + 1}</th>
                                    <td>{restaraunt.name}</td>
                                    <td>{restaraunt.type}</td>
                                    <td>{restaraunt.phone}</td>
                                    <td>{restaraunt.addr}</td>
                                </tr>
                            })
                            :
                            ''
                    }
                </tbody>
            </Table>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadRestarauntsAction: (data) => dispatch(loadRestarauntsAction(data)),
    }
}

const mapStateToProps = state => {
    var restarauntsData = state.restarauntsData;

    return {
        restarauntsData: restarauntsData && restarauntsData.length > 0 ? restarauntsData : undefined
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(restCallWrapper(ShowRestaraunts));