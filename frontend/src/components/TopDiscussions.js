import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// components
import { TopDiscussion } from '../components/index.js';

// action creators
import { getTopDiscussions, handleDiscussionVote } from '../store/actions/index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const TopDiscussionsViewWrapper = styled.div`

`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class TopDiscussions extends Component {
	state = {
		order: 'vote_count', // possible values: 'vote_count', 'post_count', 'created_at'
		orderType: '', // possible values: 'desc', 'asc'
	};
	handleDiscussionVote = (discussion_id, type) => {
		const { order, orderType } = this.state;
		const { getTopDiscussions, handleDiscussionVote } = this.props;
		return handleDiscussionVote(discussion_id, this.props.user_id, type)
			.then(() => getTopDiscussions( order, orderType));
	};
	handleSelectChange = e => this.setState({ [e.target.name]: e.target.value }, () => {
		return this.props.getTopDiscussions(this.state.order, this.state.orderType);
	});
	componentDidMount = () => this.props.getTopDiscussions(this.state.order, this.state.orderType);
	render() {
		const { topDiscussions } = this.props;
		const { order } = this.state;
		return (
			<TopDiscussionsViewWrapper>
				<span>Sort by: </span>
				<select onChange = { this.handleSelectChange } name = 'order'>
					<option value = 'vote_count'>votes</option>
					<option value = 'post_count'>number of posts</option>
					<option value = 'created_at'>date created</option>
				</select>
				<select onChange = { this.handleSelectChange } name = 'orderType'>
					<option value = 'desc'>
						{ order === 'created_at' ? 'most recent first' : 'most first' }
					</option>
					<option value = 'asc'>
						{ order === 'created_at' ? 'least recent first' : 'least first' }
					</option>
				</select>
				{
					topDiscussions.map((discussion, index) =>
						<TopDiscussion
							key = { index }
							discussion = { discussion }
							handleDiscussionVote = { this.handleDiscussionVote }
						/>
					)
				}
			</TopDiscussionsViewWrapper>
		);
	}
};

const mapStateToProps = state => ({
	topDiscussions: state.discussions.topDiscussions,
	user_id: state.users.user_id,
});

export default connect(mapStateToProps, { getTopDiscussions, handleDiscussionVote })(TopDiscussions);
