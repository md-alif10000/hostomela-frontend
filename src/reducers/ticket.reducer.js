import { ticketConstants } from "../actions/constants";

const initState = {
	tickets: [],

};

export default (state = initState, action) => {
	switch (action.type) {
		case ticketConstants.GET_SEARCHED_TICKET_REQUEST:
			state = {
				...state,
				
			};
			break;
		case ticketConstants.GET_SEARCHED_TICKET_SUCCESS:
			state = {
				...state,
				tickets: action.payload.tickets,
			};
			break;
		case ticketConstants.GET_SEARCHED_TICKET_FAILURE:
			state = {
				...state,
				
			};
			break;
		
	}
	return state;
};
