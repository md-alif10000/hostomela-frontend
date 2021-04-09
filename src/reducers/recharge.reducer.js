import { rechargeConstants } from "../actions/constants";

const initState = {
	recharges: [],
};

export default (state = initState, action) => {
	switch (action.type) {
		case rechargeConstants.GET_RECHARGES_REQUEST:
			state = {
				...state,
			};
			break;
		case rechargeConstants.GET_RECHARGES_SUCCESS:
			state = {
				...state,
				recharges: action.payload.recharges,
			};
			break;
		case rechargeConstants.GET_RECHARGES_FAILURE:
			state = {
				...state,
			};
			break;
	}
	return state;
};
