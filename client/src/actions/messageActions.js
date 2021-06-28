import messageApi from '../api/messageApi';
import * as MESSAGECONSTANTS from '../constants/messageConstants';

export const getAllMessages = () => async (dispatch) => {
	try {
		dispatch({
			type: MESSAGECONSTANTS.MESSAGE_GET_ALL_REQUEST,
		});

		let result = await messageApi.getAll();

		dispatch({
			type: MESSAGECONSTANTS.MESSAGE_GET_ALL_SUCCESS,
			payload: result,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: MESSAGECONSTANTS.MESSAGE_GET_ALL_FAIL,
		});
	}
};

export const getMessage =
	(partnerID, onMessagePage = 0) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: MESSAGECONSTANTS.MESSAGE_GET_ONE_REQUEST,
			});

			let result = await messageApi.getOne(partnerID);

			let payload = {};
			if (onMessagePage !== 1) {
				let newActiveMessageArray = getState().message?.activeBubbleMessages;

				let index = newActiveMessageArray.findIndex(
					(item) => item?._id === result?._id || item?.id === result?._id
				);

				if (index === -1) newActiveMessageArray.unshift(result);
				else newActiveMessageArray[index] = result;

				if (newActiveMessageArray.length > 2) newActiveMessageArray.pop();

				payload = {
					message: getState().message?.message,
					activeBubbleMessages: newActiveMessageArray,
				};
			} else {
				payload = {
					message: result,
					activeBubbleMessages: getState().message?.activeBubbleMessages,
				};
			}

			dispatch({
				type: MESSAGECONSTANTS.MESSAGE_GET_ONE_SUCCESS,
				payload,
			});
		} catch (error) {
			console.log(error);
			dispatch({
				type: MESSAGECONSTANTS.MESSAGE_GET_ONE_FAIL,
			});
		}
	};

export const sendMessage =
	(partnerID, message) => async (dispatch, getState) => {
		try {
			dispatch({
				type: MESSAGECONSTANTS.MESSAGE_SEND_ONE_REQUEST,
			});

			let newActiveMessageArray = [...getState().message?.activeBubbleMessages];
			let messageOnPage = getState().message?.message;

			let result = await messageApi.send(partnerID, message);

			let index = newActiveMessageArray.findIndex(
				(item) =>
					(item?.partnerID === result?.userID_2 &&
						getState().auth?.user?.id === result?.userID_1) ||
					(item?.partnerID === result?.userID_1 &&
						getState().auth?.user?.id === result?.userID_2)
			);
			if (index !== -1) newActiveMessageArray[index] = result;

			let payload = {};
			payload.activeBubbleMessages = newActiveMessageArray;
			if (messageOnPage && messageOnPage._id === result?._id)
				payload.message = result;
			else payload.message = messageOnPage;

			dispatch({
				type: MESSAGECONSTANTS.MESSAGE_SEND_ONE_SUCCESS,
				payload,
			});
		} catch (error) {
			console.log(error);
			dispatch({
				type: MESSAGECONSTANTS.MESSAGE_SEND_ONE_FAIL,
			});
		}
	};

export const deleteMessage =
	(partnerID, msgID, onMessagePage = 0) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: MESSAGECONSTANTS.MESSAGE_DELETE_ONE_REQUEST,
			});

			let result = await messageApi.delete(partnerID, msgID);

			let payload = {};
			if (onMessagePage === 0) {
				let newActiveMessageArray = [
					...getState().message?.activeBubbleMessages,
				];
				let index = newActiveMessageArray.findIndex(
					(item) =>
						(item?.partnerID === result?.userID_2 &&
							getState().auth?.user?.id === result?.userID_1) ||
						(item?.partnerID === result?.userID_1 &&
							getState().auth?.user?.id === result?.userID_2)
				);
				if (index !== -1) newActiveMessageArray[index] = result;
				payload.activeBubbleMessages = newActiveMessageArray;

				if (getState().message?.message?._id === result._id)
					payload.message = result;
				else payload.message = { ...getState().message?.message };
			} else {
				// on message page delete msg
				const newActiveBubbles = getState().message?.activeBubbleMessages;
				const index = newActiveBubbles.findIndex(
					(message) => message._id === result._id
				);
				if (index !== -1) {
					newActiveBubbles[index] = result;
					payload.activeBubbleMessages = newActiveBubbles;
				} else
					payload.activeBubbleMessages =
						getState().message?.activeBubbleMessages;
				payload.message = result;
			}

			dispatch({
				type: MESSAGECONSTANTS.MESSAGE_DELETE_ONE_SUCCESS,
				payload,
			});
		} catch (error) {
			console.log(error);
			dispatch({
				type: MESSAGECONSTANTS.MESSAGE_DELETE_ONE_FAIL,
			});
		}
	};

export const deleteConversation = (partnerID) => async (dispatch) => {
	try {
		dispatch({
			type: MESSAGECONSTANTS.MESSAGE_DELETE_CONVERSATION_REQUEST,
		});

		let result = await messageApi.deleteConversation(partnerID);

		dispatch({
			type: MESSAGECONSTANTS.MESSAGE_DELETE_CONVERSATION_SUCCESS,
			payload: result,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: MESSAGECONSTANTS.MESSAGE_DELETE_CONVERSATION_FAIL,
		});
	}
};

export const closeActiveBubbleMessage = (partnerID) => (dispatch, getState) => {
	let newActiveMessageArray = [...getState().message?.activeBubbleMessages];
	newActiveMessageArray = newActiveMessageArray.filter(
		(item) => item.partnerID !== partnerID
	);

	dispatch({
		type: MESSAGECONSTANTS.MESSAGE_CLOSE_ACTIVE_BUBBLE,
		payload: newActiveMessageArray,
	});
};
