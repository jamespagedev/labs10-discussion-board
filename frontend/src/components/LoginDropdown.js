import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import auth0 from 'auth0-js';
import { Auth0Lock } from 'auth0-lock';
import { login, auth0Login, displayError } from '../store/actions/index.js';

// globals
import {
  auth0Domain,
  auth0ClientID,
  auth0RedirectUri
} from '../globals/globals.js';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
  visibility: ${props => (props.isLoginDropdownClicked ? 'show' : 'hidden')};
  z-index: 9999;
  position: absolute;
  top: 30px;
  right: 0;
  width: 270px;
  border: 2px solid ${props => props.theme.borderColor};
  background-color: white;
  border-radius: 10px;
  padding: 20px;

  input {
    height: 22px;
    font-size: 14px;
    margin-bottom: 5px;
    background-color: ${props => props.theme.borderColor};
    color: black;
    
    &:focus {
    	outline: none;
  	}
  }

  button {
    font-size: 14px;
    height: 25px;
    border-radius: 10px;
    &:hover {
      cursor: pointer;
      background-color: ${props => props.theme.borderColor}
    }
    &:focus {
    	outline: none;
  	}
  }
`;

const LinkForgotUserPass = styled(Link)`
  margin: 20px 0px;
  text-align: center;
  color: black;
  font-size: 16px;
  text-decoration: none;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class LoginDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.webAuth.parseHash((err, authResult) => {
      if (authResult) {
        const { accessToken, expiresIn } = authResult;
        const expiresAt = JSON.stringify(
          expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem('symposium_auth0_access_token', accessToken);
        localStorage.setItem('symposium_auth0_expires_at', expiresAt);
        return this.props.auth0Login(accessToken);
      } else if (err) this.props.displayError(err);
    });
  }

  authLockOptions = {
    rememberLastLogin: false
  };

  lock = new Auth0Lock(auth0ClientID, auth0Domain, this.authLockOptions);

  webAuth = new auth0.WebAuth({
    domain: auth0Domain,
    clientID: auth0ClientID,
    redirectUri: auth0RedirectUri
  });

  //---------------- Form Methods --------------

  handleInputChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  normalLogin = ev => {
    ev.preventDefault();
    const pathname = this.props.history.location.pathname;
    const creds = { ...this.state };
    this.setState(
      {
        username: '',
        password: ''
      },
      () => this.props.setIsLoginDropdownClicked(false).then(() =>
        this.props
          .login(creds)
          .then(() =>
            pathname === '/'
              ? this.props.history.push('/home')
              : this.props.history.push(pathname)
          ))
    );
  };

  handleAuth0Login = () => {
    if (this.props.history.location.pathname !== '/') {
      this.props.history.push('/');
      this.authLockOptions = {
        rememberLastLogin: false
      };
      this.lock = new Auth0Lock(auth0ClientID, auth0Domain, this.authLockOptions);
      this.webAuth = new auth0.WebAuth({
        domain: auth0Domain,
        clientID: auth0ClientID,
        redirectUri: auth0RedirectUri
      });
    };
    this.lock.show();
  };

  render() {
    return (
      <FormLogin isLoginDropdownClicked={this.props.isLoginDropdownClicked}>
        <input
          onChange={this.handleInputChange}
          placeholder='Username'
          value={this.state.username}
          name='username'
          autoComplete='off'
        />
        <input
          type='password'
          onChange={this.handleInputChange}
          placeholder='Password'
          value={this.state.password}
          name='password'
          autoComplete='off'
        />
        <button
          type='submit'
          onClick={ev => this.normalLogin(ev)}
        >
          Login
        </button>
        <LinkForgotUserPass to='/request-reset-pw'>Forgot your username/password?</LinkForgotUserPass>
        <button type='button' onClick={() => this.handleAuth0Login()}>Login via Auth0</button>
      </FormLogin>
    );
  }
};

const mapStateToProps = state => {
  return {
    loggingInLoadingMessage: state.users.loggingInLoadingMessage
  };
};

export default connect(
  mapStateToProps,
  { auth0Login, login, displayError }
)(LoginDropdown);