import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {phoneP, tabletP, } from '../globals/globals';

// components
import { DiscussionsByFollowedCats } from '../components/index.js';

// views
import { TopDiscussionsView, HotDiscussionsView } from './index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const LandingViewWrapper = styled.div`
  background-color: ${props => props.theme.landingViewWrapperBgColor};
  width: 740px;
  border-radius: 5px;
  margin-top: 100px;

  @media ${tabletP}{
    display: flex;
    flex-direction: column;
    width: 90%;
  }

  @media ${phoneP}{
    display: flex;
    flex-direction: column;
    width: 90%;
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const LandingView = ({ history }) => {
  return (
    <LandingViewWrapper>
      <DiscussionsByFollowedCats history = { history } />
    </LandingViewWrapper>
  );
};

// LandingView.propTypes = {
//   propertyName: PropTypes.string
// }

const mapStateToProps = state => {
  return {
    loggingInLoadingMessage: state.loggingInLoadingMessage
  };
};

export default connect(
  mapStateToProps,
  {}
)(LandingView);
