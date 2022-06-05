import {
	FETCH_DATA_TOGGLE,
	MODAL_SHOW, UPDATE_USER_DATA,
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

export function UpdateFetchingDataState(isOpen) {
	return {
		type: FETCH_DATA_TOGGLE,
		payload: isOpen,
	};
}
