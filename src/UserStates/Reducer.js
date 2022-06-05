import {FETCH_DATA_TOGGLE, MODAL_SHOW, TOGGLE_ALERT, UPDATE_USER_DATA} from "./ActionTypes";

export const initialState = {
	isLoggedIn: false,
	userData: null,
	isModalOpen: false,
	modalType: '',
	fetchingData: true,
	alertOpen: false,
	alertMessage: '',
	alertType: 'error',
};

export const rootReducer = (state, action) => {
	switch (action.type) {
		case UPDATE_USER_DATA:
			return {
				...state,
				isLoggedIn: action.payload.isLoggedIn,
				userData: action.payload.data,
				fetchingData: false,
			};
		case MODAL_SHOW:
			return {
				...state,
				...action.payload,
			};
		case FETCH_DATA_TOGGLE:
			return {
				...state,
				fetchingData: action.payload,
			};
		case TOGGLE_ALERT:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};
