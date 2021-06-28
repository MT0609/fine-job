import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessageBubble from './messageBubble';
import MessageList from './messageList';
import {
	getMessage,
	getAllMessages,
	closeActiveBubbleMessage,
} from '../../../actions/messageActions';
import styles from './index.module.scss';

function MessageBubbleContainer(props) {
	const messageState = useSelector((state) => state.message);
	const activeBubbleMessages = messageState?.activeBubbleMessages;

	const myInfo = useSelector((state) => state.auth.user);

	const dispatch = useDispatch();

	const { partnerId } = props;

	useEffect(() => {
		handleGetMessage(partnerId.partnerId);
	}, [partnerId]);

	const handleGetMessage = (partnerID) => {
		dispatch(getMessage(partnerID));
	};

	useEffect(() => {
		dispatch(getAllMessages());
	}, [dispatch, activeBubbleMessages]);

	const onCloseActiveBubbleMessage = (partnerID) => {
		dispatch(closeActiveBubbleMessage(partnerID));
	};

	return (
		<div className={styles.messageListContainer}>
			{activeBubbleMessages?.length
				? activeBubbleMessages.map((activeMessage) => (
						<MessageBubble
							{...props}
							message={activeMessage}
							onClose={onCloseActiveBubbleMessage}
						/>
				  ))
				: ''}

			<MessageList
				isLoading={messageState.isMessagesLoading}
				messages={messageState.messages}
				myInfo={myInfo}
				onMessageClick={handleGetMessage}
			/>
		</div>
	);
}

export default MessageBubbleContainer;
