import { userConstants } from "./constants.js";
import { cartConstants, couponConatants } from "./constants.js";
import axios from "../helpers/axios";
import Swal from 'sweetalert2'

export const getAddress = () => {
	return async (dispatch) => {
		try {
			const res = await axios.get("/user/getaddress");
			dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST });
			if (res.status === 200) {
				const {
					userAddress: { address },
				} = res.data;
				dispatch({
					type: userConstants.GET_USER_ADDRESS_SUCCESS,
					payload: { address },
				});
			} else {
				const { error } = res.data;
				dispatch({
					type: userConstants.GET_USER_ADDRESS_FAILURE,
					payload: { error },
				});
					Swal.fire("Opps..!", `${error}`, "error");
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const addAddress = (payload) => {
	return async (dispatch) => {
		try {
			const res = await axios.post("/user/address/create", { payload });
			dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST });

			if (res.status == 201) {
				console.log(res.data);

				var { address } = res.data;
				var address = address.address;
				console.log(address);

				dispatch({
					type: userConstants.ADD_USER_ADDRESS_SUCCESS,
					payload: { address },
				});
			} else {
				const { error } = res.data;
				dispatch({
					type: userConstants.ADD_USER_ADDRESS_FAILURE,
					payload: { error },
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const addOrder = (payload) => {
	return async (dispatch) => {
		try {
			const res = await axios.post(`/addOrder`, payload);
			dispatch({ type: userConstants.ADD_USER_ORDER_REQUEST });
			if (res.status === 201) {
				console.log(res);
				const { order } = res.data;
				dispatch({
					type: cartConstants.RESET_CART,
				});
				dispatch({
					type: userConstants.ADD_USER_ORDER_SUCCESS,
					payload: { order },
				});
				Swal.fire("Great.!", `Order placed successfully`, "success");
				const {
					address: { address },
				} = res.data;
				dispatch({
					type: userConstants.ADD_USER_ADDRESS_SUCCESS,
					payload: { address },
				});
			} else {
				const { error } = res.data;
				dispatch({
					type: userConstants.ADD_USER_ORDER_FAILURE,
					payload: { error },
				});
				Swal.fire("Opps..!", `Order Failed`, "error");
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const getOrders = () => {
	return async (dispatch) => {
		try {
			const res = await axios.get(`/getOrders`);
			dispatch({ type: userConstants.GET_USER_ORDER_REQUEST });
			if (res.status === 200) {
				console.log(res);
				const { orders } = res.data;
				dispatch({
					type: userConstants.GET_USER_ORDER_SUCCESS,
					payload: { orders },
				});
			} else {
				const { error } = res.data;
				dispatch({
					type: userConstants.GET_USER_ORDER_FAILURE,
					payload: { error },
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

// single order with complete info and delivery location
export const getOrder = (payload) => {
	return async (dispatch) => {
		try {
			const res = await axios.post(`/getOrder`, payload);
			dispatch({ type: userConstants.GET_USER_ORDER_DETAILS_REQUEST });
			if (res.status === 200) {
				console.log(res);
				const { order } = res.data;
				dispatch({
					type: userConstants.GET_USER_ORDER_DETAILS_SUCCESS,
					payload: { order },
				});
			} else {
				const { error } = res.data;
				dispatch({
					type: userConstants.GET_USER_ORDER_DETAILS_FAILURE,
					payload: { error },
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const validateCoupon = (data) => {
	return async (dispatch) => {
		try {
			const res = await axios.post(`/coupon/validateCoupon`, data);
			dispatch({ type: couponConatants.VALIDATE_COUPON_REQUEST });
			if (res.status === 200) {
				console.log(res);
				const { coupon } = res.data;
				localStorage.setItem('coupon',JSON.stringify(coupon))
				dispatch({
					type: couponConatants.VALIDATE_COUPON_SUCCESS,
					payload: { coupon },
				});
				Swal.fire("Wow.!", `Coupon successfully added`, "Success");
			} else {
				const { error,message } = res.data;
				if (res.status == 404) {
					dispatch({
						type: couponConatants.VALIDATE_COUPON_FAILURE,
						payload: { error },
					});
					Swal.fire("Opps..!", `Invalid Coupon`, "error");
				}
				

				if(res.status==400){
						dispatch({
							type: couponConatants.VALIDATE_COUPON_FAILURE,
							payload: { error },
						});
						Swal.fire("Opps..!", `${message}`, "error");
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
};
