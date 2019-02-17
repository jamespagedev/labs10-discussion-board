import axios	from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_URL;

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
export const TOP_DISCUSSIONS_LOADING = 'TOP_DISCUSSIONS_LOADING';
export const TOP_DISCUSSIONS_SUCCESS = 'TOP_DISCUSSIONS_SUCCESS';
export const TOP_DISCUSSIONS_FAILURE = 'TOP_DISCUSSIONS_FAILURE';

export const GET_DISCUSSION_BY_ID_LOADING = 'GET_DISCUSSION_BY_ID_LOADING';
export const GET_DISCUSSION_BY_ID_SUCCESS = 'GET_DISCUSSION_BY_ID_SUCCESS';
export const GET_DISCUSSION_BY_ID_FAILURE = 'GET_DISCUSSION_BY_ID_FAILURE';

/***************************************************************************************************
 ********************************************** Actions ********************************************
 **************************************************************************************************/
export const getTopDiscussions = () => dispatch => {
	dispatch({ type: TOP_DISCUSSIONS_LOADING });
	return axios.get(`${ backendURL }/discussions/top-daily`)
		.then(res => dispatch({ type: TOP_DISCUSSIONS_SUCCESS, payload: res.data }))
		.catch(err => console.log(err));
};

export const getDiscussionById = id => dispatch => {
	dispatch({ type: GET_DISCUSSION_BY_ID_LOADING });
	return axios.get(`${ backendURL }/discussions/${ id }`)
		.then(res => dispatch({ type: GET_DISCUSSION_BY_ID_SUCCESS, payload: res.data[0] }))
		.catch(err => dispatch({ type: GET_DISCUSSION_BY_ID_FAILURE, payload: err }));
};
