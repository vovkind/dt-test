import React, { Component } from 'react';
import ShowRestaraunts from './ShowRestaraunts';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { saveDuplicateRestarauntsAction } from './../../actions';
import Autocomplete from 'react-autocomplete';
import './Restaraunts.css';

class Restaraunts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            chosenRestId: '',
            filteredValues: []
        }
    }

    onRestNameChange = (e) => {
        const value = e.target.value;
        const valueLowerCase = value.toLowerCase();
        var self = this;


        var filteredValues = self.props.restarauntsData.filter(element =>
            element.name.toLowerCase().indexOf(valueLowerCase) > -1);
        self.setState({
            name: value,
            filteredValues: filteredValues,
            chosenRestId: value.length === 0 ? '' : this.state.chosenRestId
        })

        if (self.props.duplicateRestData) {
            //Reset alert once upon change event
            this.props.saveDuplicateRestarauntsAction(null);
        }
    }

    onRestNameChoose = (chosenRest, restItem) => {
        this.setState({ name: restItem.name, chosenRestId: restItem.id });
    }

    render() {
        var restData = this.props.restarauntsData;

        return (
            <Container>
                {restData ?
                    <div>
                        <Row className='my-4'>
                            <Col>
                                <Autocomplete
                                    wrapperStyle={{ display: 'block', textAlign: 'center' }}
                                    getItemValue={(item) => item.name}
                                    items={this.state.filteredValues.slice(0, 9)}
                                    renderItem={(item, highlighted) =>
                                        <div
                                            key={item.id}
                                            className={highlighted ?
                                                'rest-predict-item-highlighted mx-2 my-2' : 'rest-predict-item mx-2 my-2'}>
                                            <strong>{item.name}</strong>{' '}
                                        </div>}
                                    renderMenu={(items, value, style) => {
                                        return <div className="rest-predict-wrapper">
                                            <div className="rest-predict" children={items}></div>
                                        </div>
                                    }}
                                    renderInput={(props) =>
                                        <input {...props} style={{ width: "70%", fontSize: '1.5em' }} placeholder="Start type restaraunt's name..." />
                                    }
                                    value={this.state.name}
                                    onChange={this.onRestNameChange}
                                    onSelect={this.onRestNameChoose}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ShowRestaraunts restToShowId={this.state.chosenRestId} />
                            </Col>
                        </Row>
                    </div>
                    :
                    ''
                }
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveDuplicateRestarauntsAction: (data) => dispatch(saveDuplicateRestarauntsAction(data))
    }
}

const mapStateToProps = state => {
    var restarauntsData = state.restarauntsData;

    return {
        duplicateRestData: state.duplicateRestData,
        restarauntsData: restarauntsData && restarauntsData.length > 0 ? restarauntsData : undefined
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaraunts);