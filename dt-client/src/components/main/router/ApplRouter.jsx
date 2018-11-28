import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import loadable from 'loadable-components';

const RestarauntsManagement = loadable(() => import('../RestarauntsManagement'))

class ApplRouter extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={RestarauntsManagement} />
                    <Redirect to='/' />
                </Switch>
            </div>
        )
    }
};

export default withRouter(ApplRouter)