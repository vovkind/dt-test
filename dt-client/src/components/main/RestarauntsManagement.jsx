import React, { Component } from 'react';
import ManageRestaraunts from '../manage/ManageRestaraunts';
import Restaraunts from './Restaraunts';
import { Container, Row, Jumbotron } from 'reactstrap';

class RestarauntsManagement extends Component {

    render() {
        return (
            <Container>
                <Row>
                    <Jumbotron className="w-100 py-2 text-center">
                        <h2 className="display-3">Restaraunts</h2>
                        <p className="lead">Load, manage restaraunts from the list.</p>
                        <hr className="my-2" />
                        <p>Choose any restaraunt and edit/delete it!</p>
                    </Jumbotron>
                </Row>
                <Row>
                    <ManageRestaraunts />
                </Row>
                <Row>
                    <Restaraunts />
                </Row>
            </Container>
        );
    }
}

export default RestarauntsManagement;