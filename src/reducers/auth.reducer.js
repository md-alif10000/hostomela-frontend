import {authConstants} from "../actions/constants";


const initState = {
	token: null,
	user: {
		name: "",
		email: "",
		picture: "",
	},
	authenticate: false,
	authenticating: false,
	loading: false,
	error: null,
	message: "",
};

export default (state = initState, action) => {
	console.log(action.payload)
	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			state = {
				...state,
				...action.payload,
			};
			break;
		case authConstants.LOGIN_SUCCESS:
			state = {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				authenticate: true,
				authenticating: false,
			};
			break;

		case authConstants.LOGOUT_REQUEST:
			state = {
				...initState,
				loading: true,
			};
			break;
		case authConstants.LOGOUT_SUCCESS:
			state = {
				...initState,
			};
			break;
		case authConstants.LOGOUT_FAILURE:
			state = {
				...state,
				error: action.payload.error,
			};
			break;
		case authConstants.REGISTER_REQUEST:
			state = {
				...state,
				...action.payload,
			};
			break;
		case authConstants.REGISTER_SUCCESS:
			state = {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				authenticate: true,
				authenticating: false,
			};
			break;
			case authConstants.UPDATE_PROFILE_REQUEST:
				return state={
					...state,
					loading:true,
				}
				break


				case authConstants.UPDATE_PROFILE_SUCCESS:
					return state={
						...state,
						loading:false,
						user:action.payload.updatedUser
					}
	}

	return state;
};
