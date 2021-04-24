import axios from "../helpers/axios";
import cartReducer from "../reducers/cart.reducer";
import store from "../store";
import { cartConstants } from "./constants";

const getCartItems = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
			const res = await axios.get("/user/cart/getCartItems");

			if (res.status === 200) {
				const { cartItems } = res.data;

				if (cartItems) {
					dispatch({
						type: cartConstants.ADD_TO_CART_SUCCESS,
						payload: { cartItems },
					});
				}else{
						dispatch({
							type: cartConstants.ADD_TO_CART_SUCCESS,
							payload: { cartItems: {} },
						});

				}
			
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const addToCart = (product, newQty = 1) => {
	return async (dispatch) => {
		const {
			cart: { cartItems },
			auth,
		} = store.getState();

		const qty = cartItems[product._id]
			? parseInt(cartItems[product._id].qty + newQty)
			: 1;
		const price = cartItems[product._id]
			? parseInt(cartItems[product._id].price)
			: null;
		const color = cartItems[product._id]
					? (cartItems[product._id].color)
					: product.color;
		const size = cartItems[product._id]
						? (cartItems[product._id].size)
						: product.size;
	  const stitch = cartItems[product._id]
									? (cartItems[product._id].stitch)
									: product.stitch;


			console.log(price)

		cartItems[product._id] = {
			...product,
			qty,
			color,
			size,
			stitch

		
			
		};

		if (auth.authenticate) {
			
			dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
			const payload = {
				cartItems: [
					{
						product: product._id,
						quantity: qty,
						stitch:product.stitch,
						color:product.color,
						size:product.size,
						price:product.price,
					},
				],
			};

			console.log('payload',payload)

			const res = await axios.post(`/user/cart/addtocart`, payload);
		
			if (res.status === 201) {
				dispatch(getCartItems());
			}
		} else {
			console.log("Cart items",cartItems)
			localStorage.setItem("cart", JSON.stringify(cartItems));
		}



		dispatch({
			type: cartConstants.ADD_TO_CART_SUCCESS,
			payload: { cartItems },
		});
	};
};

export const decreaseCart = (product) => {
	return async (dispatch) => {
		const { cartItems } = store.getState().cart;
		// console.log("action::products", products);

		const qty = cartItems[product._id]
			? parseInt(cartItems[product._id].qty - 1)
			: 1;
		cartItems[product._id] = {
			...product,
			qty,
		};
		localStorage.setItem("cart", JSON.stringify(cartItems));
		dispatch({
			type: cartConstants.DECREASE_CART,
			payload: {
				cartItems,
			},
		});
	};
};

export const updateCart = () => {
	return async (dispatch) => {
		const { auth } = store.getState();
		let cartItems = localStorage.getItem("cart")
			? JSON.parse(localStorage.getItem("cart"))
			: null;

		if (auth.authenticate) {
			// localStorage.removeItem("cart");
			//dispatch(getCartItems());
			if (cartItems) {
				const payload = {
					cartItems: Object.keys(cartItems).map((key, index) => {
						console.log(cartItems[key]);
						return {
							
							quantity: cartItems[key].qty,
							product: cartItems[key]._id,
							price: cartItems[key].price,
							size: cartItems[key].size,
							color: cartItems[key].color,
						};
					}),
				};
				if (Object.keys(cartItems).length > 0) {
					const res = await axios.post(`/user/cart/addtocart`, payload);
					if (res.status === 201) {
						dispatch(getCartItems());
						localStorage.removeItem('cart')
					}
				}
			} else {
				dispatch(getCartItems());
			}
		} else {
			if (cartItems) {
				dispatch({
					type: cartConstants.ADD_TO_CART_SUCCESS,
					payload: { cartItems },
				});
				localStorage.removeItem("cart");
			}
		}
	};
};

export const removeCartItem = (payload) => {
	return async (dispatch) => {
		try {
			const { auth } = store.getState();
			if (auth.authenticate) {
				dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
				const res = await axios.post(`/user/cart/removeItem`, {
					payload,
				});
				if (res.status === 202) {
					dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
					dispatch(getCartItems());
				} else {
					const { error } = res.data;
					dispatch({
						type: cartConstants.REMOVE_CART_ITEM_FAILURE,
						payload: { error },
					});
				}
			} else {
				localStorage.removeItem("cart", payload.productId);
				dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
				dispatch(getCartItems());
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export { getCartItems };
