import axios from "../helpers/axios";
import store from "../store";
import { cartContants,ticketConstants } from "./constants";

export const getSearchedTicket = (info) => {
	return async (dispatch) => {
		try {
			console.log('data',info)
			dispatch({ type: ticketConstants.GET_SEARCHED_TICKET_REQUEST });
			const res = await axios.post("/ticket/getTicketByLocation", info);

			console.log(res.getSearchedTicketdata);
			if (res.status === 200) {
				const { tickets } = res.data;
			
					dispatch({
						type: ticketConstants.GET_SEARCHED_TICKET_SUCCESS,
						payload: { tickets },
					});
				}else{
					dispatch({type:ticketConstants.GET_SEARCHED_TICKET_FAILURE})
				}
			
		} catch (error) {
			console.log(error);
		}
	};
};

