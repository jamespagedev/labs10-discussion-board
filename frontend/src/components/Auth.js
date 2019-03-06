import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginDropdown from './LoginDropdown.js';
import chevron from '../assets/img/chevron.png';
// import PropTypes from 'prop-types';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const LogInContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: ${props => props.theme.authColor};
  font-size: 18px;
  width: 100%;
`;

const DivAuthRegLog = styled.div`
  margin-top: -5px;
  display: flex;
  align-items: center;

  @media (max-width: 750px){
    margin-top: 5px;
  }
    @media (max-width: 458px){
      margin-top: 5px;
      display: flex;
      flex-direction: column;
    }
`;

const DivLogin = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
`;

const LinkRegister = styled(Link)`
  text-decoration: none;
  margin-right: 0px;
  user-select: none;
  cursor: pointer;
  color: black;
  font-size: 18px;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.authLinkRegColorHov};
    text-decoration: underline;
  }
`;

const Login = styled.a`
  margin-left: 5px;
  user-select: none;
  cursor: pointer;
  color: black;
  font-size: 18px;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.authLoginColorHov};
    text-decoration: underline;
  }

  img {
    transform: ${props => props.isLoginDropdownClicked && 'rotate(180deg)'};
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginDropdownClicked: false
    };
  };

  toggleLoginDropdown = ev => {
    ev.preventDefault();
    this.setIsLoginDropdownClicked(!this.state.isLoginDropdownClicked);
  };

  setIsLoginDropdownClicked = isClicked => {
    this.setState({ isLoginDropdownClicked: isClicked });
    return Promise.resolve();
  };

  render() {
    return (
      <LogInContainer>
        <DivAuthRegLog>
          <LinkRegister to='/register'>Register</LinkRegister>
          &nbsp;|&nbsp;
          <DivLogin>
            <Login onClick = {ev => {this.toggleLoginDropdown(ev);}}
              isLoginDropdownClicked={this.state.isLoginDropdownClicked}
            >
              Login
            </Login>
            <LoginDropdown
              {...this.props}
              isLoginDropdownClicked={this.state.isLoginDropdownClicked}
              setIsLoginDropdownClicked={this.setIsLoginDropdownClicked}
            />
          </DivLogin>
        </DivAuthRegLog>
      </LogInContainer>
    );
  }
}

// Auth.propTypes = {
//   propertyName: PropTypes.string
// }

export default connect(null, {})(Auth);
