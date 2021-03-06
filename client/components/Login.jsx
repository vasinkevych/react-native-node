import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import auth from '../services/Auth';

class Login extends React.Component {
  logout = () => {
    auth.logout();
    this.props.history.replace('/');
  };

  render() {
    return auth.isAuthenticated() ? (
      <Button variant="light" onClick={() => this.logout()}>
        Log out
      </Button>
    ) : (
      <Button variant="dark" onClick={() => auth.login()}>
        Log in
      </Button>
    );
  }
}

export default withRouter(Login);
