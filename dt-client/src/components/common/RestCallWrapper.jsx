import React from 'react';
import superagent from 'superagent';

export default function restCallWrapper(ComposedComponent) {
  class RestCallComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isError: false,
        isLoading: false,
        errorMessage: '',
        inlineErrorMessage: false
      }
    };

    invokeGetRest = (url, inputEvent) => {
      const self = this;

      self.setState({ isLoading: true, inlineErrorMessage: inputEvent.inlineErrorMsg });
      superagent
        .get(url)
        .set('Content-Type', 'application/json')
        .set("X-Autorization", this.props.auth_token)
        .end((err, response) => {
          self.handleResponse(err, response, inputEvent);
        });
    }

    invokePostRest = (url, input, inputEvent) => {
      const self = this;

      self.setState({ isLoading: true, inlineErrorMessage: inputEvent.inlineErrorMsg });
      superagent
        .post(url)
        .set('Content-Type', 'application/json')
        .set("X-Autorization", this.props.auth_token)
        .send(input)
        .end((err, response) => {
          self.handleResponse(err, response, inputEvent);
        });
    }

    handleResponse = (err, response, inputEvent) => {
      this.setState({ isLoading: false });
      if (err) {
        this.handleResponseError(err, inputEvent);
      } else if (response.ok) {
        if (inputEvent.successCalback) {
          inputEvent.successCalback(response);
        }
      }
    }

    handleResponseError(err, inputEvent) {
      // show informative message to user
      var errorMessage;

      switch (err.status) {
        case 500:
          errorMessage = 'error REST call 500';
          break;

        case 404:
          errorMessage = 'error REST call 404';
          break;

        default:
          errorMessage = 'error REST call';
      }

      if (inputEvent.errorCallback) {
        inputEvent.errorMessage = errorMessage;
        inputEvent.errorCallback(err, inputEvent);
      }
    }

    render() {
      return (
        <div>
          <ComposedComponent
            {...this.props}
            restInProgress={this.state.isLoading}
            invokePost={this.invokePostRest}
            invokeGet={this.invokeGetRest} />
        </div>
      )
    }
  }

  return RestCallComponent;
}