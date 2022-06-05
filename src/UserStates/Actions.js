import {
	MODAL_SHOW, TOGGLE_ALERT, UPDATE_USER_DATA,
} from './ActionTypes';

export function UpdateUserData(data) {
	return {
		type: UPDATE_USER_DATA,
		payload: data,
	};
}

export function ModalToggle(open, type) {
	return {
		type: MODAL_SHOW,
		payload: {
			isModalOpen: open,
			modalType: type,
		},
	};
}

export function AlertToggle(open, message, type = 'error') {
	return {
		type: TOGGLE_ALERT,
		payload: {
			alertOpen: open,
			alertMessage: message,
			alertType: type,
		},
	};
}
