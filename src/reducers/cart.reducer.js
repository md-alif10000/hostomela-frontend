import { cartConstants,couponConatants } from "../actions/constants";

const initState = {
	cartItems: {
		// 123:{
		//     _id:123,
		//     name:'',
		//     img:'',
		//     price:'',
		//     qty:''
		// }
	},
	updatingCart: false,
	error: null,
	coupon:{}
};

export default (state = initState, action) => {
	switch (action.type) {
		case cartConstants.ADD_TO_CART_REQUEST:
			state = {
				...state,
				updatingCart: true,
			};
			break;
		case cartConstants.ADD_TO_CART_SUCCESS:
			state = {
				...state,
				cartItems: action.payload.cartItems,
				updatingCart: false,
			};
			break;
		case cartConstants.ADD_TO_CART_FAILURE:
			state = {
				...state,
				error: action.payload.error,
				updatingCart: false,
			};
			break;
		case cartConstants.RESET_CART:
			state = {
				...initState,
			};
			break;
			case couponConatants.VALIDATE_COUPON_SUCCESS:
				state={
					...state,
					coupon:action.payload.coupon
				}
	}
	return state;
};
