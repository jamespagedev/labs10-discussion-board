import React from 'react';
import styled from 'styled-components';

// components
import { Post } from '../components/index.js';


const PostsViewWrapper = styled.div`
`;

const PostsView = ({
	posts,
	historyPush,
	showEditPostForm,
	updateEditPostForm,
	handleRemovePost,
	toggleAddReplyForm,
	order,
	orderType,
}) => {
	return(
		<PostsViewWrapper>
			{ posts.map((post, index) =>
				<Post
					key = { index }
					post = { post }
					historyPush = { historyPush }
					showEditPostForm = { showEditPostForm }
					updateEditPostForm = { updateEditPostForm }
					handleRemovePost = { handleRemovePost }
					toggleAddReplyForm = { toggleAddReplyForm }
					order = { order }
					orderType = { orderType }
				/>)
			}
		</PostsViewWrapper>
	)
};

export default PostsView;
