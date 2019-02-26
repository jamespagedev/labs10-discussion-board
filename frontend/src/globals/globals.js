// Variables
const auth0ClientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN;
const auth0RedirectUri = process.env.REACT_APP_REDIRECT_URI;
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const stripePayFormat = [99, 199, 299]; // matching subscriptionPrices
const stripeToken = process.env.REACT_APP_STRIPE_TOKEN;
const subscriptionPlans = ['free', 'bronze', 'silver', 'gold']; // same order as subscriptionPrices
const subscriptionPrices = ['$0.00', '$0.99/yr', '$1.99/yr', '$2.99/yr']; // same order as subscriptionPlans
const searchCharLimit = 64; // limits the max number of characters to return in a search

// mixins (Max Size)
const phoneP = '480px'; // portrait
const phoneL = '599px'; // landscape
const tabletP = '768px'; // portrait
const tabletL = '1024px'; // landscape

// Copy from backend globals (can't import from out of src folder)
const accountStatusTypes = ['inactive', 'active', 'banned']; // be careful when adding new things or changing order

const dayTheme = {
  appBgColor: '#54bdff',
  authBgColor: 'gray',
  authColor: 'white',
  authLinkRegColor: 'white',
  authLinkRegColorHov: 'black',
  authLoginColor: 'white',
  authLoginColorHov: 'black',
  catNameColor: 'black',
  catDiscussionCountColor: 'black',
  catBgColorHov: 'rgba(255, 255, 255, 0.6)',
  catTimestampColor: 'black',
  catTitleColor: 'black',
  catNameDateColor: 'black',
  discussionUsernameColor: 'black',
  discussionByCatWrapperBgColor: '#e8e3e0',
  discussionByCatWrapperBgColorHov: 'rgba(255, 255, 255, 0.195)',
  discussionByCatWrapperBxShdw: '2px 3px 2px 2px #610b07',
  discussionByCatTitleColor: 'black',
  discussionByCatTitleBgColorHov: 'rgba(255, 255, 255, 0.13)',
  discussionByCatTitleColorHov: 'white',
  discussionByCatCategoryColor: 'black',
  discussionByCatCategoryBgColorHov: 'rgba(255, 255, 255, 0.13)',
  discussionByCatCategoryColorHov: 'white',
  discussionByCatNameDateColor: 'black',
  discussionByCatNameDateBgColorHov: 'rgba(255, 255, 255, 0.13)',
  discussionByCatNameDateColorHov: 'white',
  errorWrapperBgColor: 'rgba(0, 0, 0, 0.5)',
  errorBoxBgColor: '#C9C19F',
  errorBoxPColor: '#b30000',
  headerLinkColor: 'white',
  headerLinkColorHov: 'black',
  headerTitleColor: 'white',
  headerTitleAColor: '#f7f5f3',
  headerTitleAColorHov: 'black',
  headerTitleSubheaderColor: '#f7f5f3',
  highlightWrapperColor: 'white',
  messageWrapperBgColor: 'rgba(0, 0, 0, 0.5)',
  messageBoxBgColor: '#657ED4',
  messageBoxBorder: '1px solid black',
  messageBoxPColor: 'black',
  navWelcomeUsername: 'black',
  navWelcomeUsernameHov: 'white',
  postWrapperBorder: '1px solid black',
  postPostedByUsernameColor: 'black',
  postCountWrapperBorder: '1px solid black',
  profilesWrapperBorder: '1px solid gray',
  profilesWrapperBgColor: '#e8e3e0',
  profilesWrapperBxShdw: '#610b07 2px 1px 2px 2px;',
  profilesWrapperBgColorHov: 'rgba(255, 255, 255, 0.40)',
  profilesTitleColor: 'black',
  profileBgColor: '#976DFF',
  profileBxShdw: '#10355C 2px 1px 2px 2px',
  profileTitleColor: 'black',
  profileTitleContentColor: 'black',
  profileTitleContentDColor: 'black',
  profileTitleSubContentDColor: 'black',
  searchWrapperBgColor: 'rgba(0, 0, 0, 0.5)',
  searchBoxBgColor: '#C9C19F',
  searchBoxBorder: '1px solid black',
  searchBoxCloseBtnBgColor: 'red',
  searchCatResultWrapperTypeBgColor: 'blue',
  searchCatResultWrapperTypeColor: 'white',
  searchCatResultWrapperUsernameBgColorHov: '#444',
  searchCatResultWrapperUsernameColorHov: 'white',
  searchDisResultWrapperTypeBgColor: 'red',
  searchDisResultWrapperTypeColor: 'white',
  searchDisResultWrapperUsernameBgColorHov: '#444',
  searchDisResultWrapperUsernameColorHov: 'white',
  searchPostResultWrapperTypeBgColor: 'green',
  searchPostResultWrapperTypeColor: 'white',
  searchPostResultWrapperUsernameBgColorHov: '#444',
  searchPostResultWrapperUsernameColorHov: 'white',
  settingsBgColor: '#e8e3e0',
  settingsBxShdw: '4px 6px 4px 4px #4ca0e0',
  settingsButtonHov: '#4ca0e0',
  settingsDeleteButtonBg: 'red',
  settingsDeleteButtonColor: 'white',
  settingsEditAvatarButtonBgHov: '#4ca0e0',
  tooltipWrapperBgColor: 'black',
  tooltipWrapperColor: 'fff',
  topDiscussionWrapperBxShdw: '2px 3px 2px 2px gray',
  topDiscussionWrapperBgHov: 'rgba(255, 255, 255, 0.6)',
  topDiscussionTitleColor: 'black',
  topDiscussionCatColor: 'black',
  topDiscussionCatBgColorHov: 'rgba(255, 255, 255, 0.13)',
  topDiscussionNameDateColor: 'black',
  topDiscussionNameDateBgColor: 'rgba(255, 255, 255, 0.13)',
  skyColor: '#37d8e6',
  symposiumBorderColor: '#f1c40f',

};

const nightTheme = {
  appBgColor: '#330136',
  authBgColor: 'black',
  authColor: 'gray',
  authLinkRegColor: 'black',
  authLinkRegColorHov: 'white',
  authLoginColor: 'black',
  authLoginColorHov: 'white',
  catNameColor: 'red',
  catDiscussionCountColor: 'red',
  catBgColorHov: 'rgba(100, 200, 200, 0.9)',
  catTimestampColor: 'red',
  catTitleColor: 'red',
  catNameDateColor: 'red',
  discussionUsernameColor: 'white',
  discussionByCatWrapperBgColor: 'red',
  discussionByCatWrapperBgColorHov: 'rgba(100, 200, 255, 0.33)',
  discussionByCatWrapperBxShdw: '2px 3px 2px 2px pink',
  discussionByCatTitleColor: 'white',
  discussionByCatTitleBgColorHov: 'rgba(100, 200, 255, 0.33)',
  discussionByCatTitleColorHov: 'black',
  discussionByCatCategoryColor: 'white',
  discussionByCatCategoryBgColorHov: 'rgba(100, 200, 255, 0.33)',
  discussionByCatCategoryColorHov: 'black',
  discussionByCatNameDateColor: 'white',
  discussionByCatNameDateBgColorHov: 'rgba(100, 200, 255, 0.33)',
  discussionByCatNameDateColorHov: 'black',
  errorWrapperBgColor: 'rgba(0, 0, 0, 0.8)',
  errorBoxBgColor: 'red',
  errorBoxPColor: 'purple',
  headerLinkColor: 'black',
  headerLinkColorHov: 'white',
  headerTitleColor: 'black',
  headerTitleAColor: 'green',
  headerTitleAColorHov: 'white',
  headerTitleSubheaderColor: 'yellow',
  highlightWrapperColor: 'black',
  messageWrapperBgColor: 'rgba(0, 0, 0, 0.8)',
  messageBoxBgColor: 'pink',
  messageBoxBorder: '1px solid white',
  messageBoxPColor: 'white',
  navWelcomeUsername: 'white',
  navWelcomeUsernameHov: 'black',
  postWrapperBorder: '1px solid white',
  postPostedByUsernameColor: 'white',
  postCountWrapperBorder: '1px solid white',
  profilesWrapperBorder: '1px solid #330136',
  profilesWrapperBgColor: 'green',
  profilesWrapperBxShdw: '#330136 2px 1px 2px 2px',
  profilesWrapperBgColorHov: 'rgba(100, 200, 255, 0.80)',
  profilesTitleColor: 'white',
  profileBgColor: '#122042',
  profileBxShdw: '#2A3240 2px 1px 2px 2px',
  profileTitleColor: 'white',
  profileTitleContentColor: 'white',
  profileTitleContentDColor: 'white',
  profileTitleSubContentDColor: 'white',
  searchWrapperBgColor: 'rgba(0, 0, 0, 0.8)',
  searchBoxBgColor: 'green',
  searchBoxBorder: '1px solid white',
  searchBoxCloseBtnBgColor: 'white',
  searchCatResultWrapperTypeBgColor: 'green',
  searchCatResultWrapperTypeColor: 'black',
  searchCatResultWrapperUsernameBgColorHov: 'green',
  searchCatResultWrapperUsernameColorHov: 'black',
  searchDisResultWrapperTypeBgColor: 'pink',
  searchDisResultWrapperTypeColor: 'black',
  searchDisResultWrapperUsernameBgColorHov: 'green',
  searchDisResultWrapperUsernameColorHov: 'black',
  searchPostResultWrapperTypeBgColor: 'yellow',
  searchPostResultWrapperTypeColor: 'black',
  searchPostResultWrapperUsernameBgColorHov: 'green',
  searchPostResultWrapperUsernameColorHov: 'black',
  settingsBgColor: 'green',
  settingsBxShdw: '4px 6px 4px 4px #yellow',
  settingsButtonHov: 'pink',
  settingsDeleteButtonBg: 'purple',
  settingsDeleteButtonBgColor: 'black',
  settingsEditAvatarButtonBgHov: 'red',
  tooltipWrapperBgColor: 'white',
  tooltipWrapperColor: 'black',
  topDiscussionWrapperBxShdw: '2px 3px 2px 2px pink',
  topDiscussionWrapperBgHov: 'rgba(100, 2500, 255, 0.8)',
  topDiscussionTitleColor: 'white',
  topDiscussionCatColor: 'white',
  topDiscussionCatBgColorHov: 'green',
  topDiscussionNameDateColor: 'white',
  topDiscussionNameDateBgColorHov: 'rgba(100, 220055, 255, 0.33)',
  skyColor: '#2c3e50',
  symposiumBorderColor: '#eaeff2',
}

module.exports = {
  accountStatusTypes,
  auth0ClientID,
  auth0Domain,
  auth0RedirectUri,
  backendUrl,
  phoneP,
  phoneL,
  stripePayFormat,
  stripeToken,
  subscriptionPlans,
  subscriptionPrices,
  searchCharLimit,
  tabletP,
  tabletL,
  dayTheme,
  nightTheme,
};
