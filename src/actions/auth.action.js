import { Redirect } from "react-router-dom";
import axios from "../helpers/axios";
import { authConstants, cartConstants } from "./constants";
import Swal from "sweetalert2";

export const login = (user) => {
	return async (dispatch) => {
		dispatch({ type: authConstants.LOGIN_REQUEST });
		const res = await axios.post("/login", {
			...user,
		});

		if (res.status === 200) {
			const { token, user } = res.data;
			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(user));
			dispatch({
				type: authConstants.LOGIN_SUCCESS,
				payload: {
					token,
					user,
				},
			});
			Swal.fire("Wow..", "Login Successful..!", "success");
		} else {
			if (res.status === 400) {
				dispatch({
					type: authConstants.LOGIN_FAILURE,
					payload: { error: res.data.error },
				});
				Swal.fire("Oops...", "Something went wrong!", "error");
			}
		}
	};
};

export const registerOtp = (phone) => {
	return async (dispatch) => {
		console.log(phone);
		dispatch({ type: authConstants.REGISTER_OTP_REQUEST });
		const res = await axios.post("/register_verify", { phone });
		if (res.status == 403) {
			dispatch({
				type: authConstants.REGISTER_OTP_FAILURE,
			});
			Swal.fire("Oops...", "User already registered.!", "error");
		}

		if (res.status == 200) {
			dispatch({
				type: authConstants.REGISTER_OTP_SUCCESS,
			});
			Swal.fire("Wow.", "Otp sent successful.!", "success");
		} else if (res.status == 400) {
			dispatch({
				type: authConstants.REGISTER_OTP_FAILURE,
				payload: { error: res.data.error },
			});
			Swal.fire("Oops...", "Something went wrong!", "error");
		} else {
			if (res.status === 400) {
				dispatch({
					type: authConstants.REGISTER_OTP_FAILURE,
					payload: { error: res.data.error },
				});
				Swal.fire("Oops...", "Something went wrong!", "error");
			}
		}
	};
};

export const register = (user) => {
	return async (dispatch) => {
		dispatch({ type: authConstants.REGISTER_REQUEST });
		const res = await axios.post("/register", user);

		if (res.status === 201) {
			const { token, user } = res.data;
			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(user));
			dispatch({
				type: authConstants.REGISTER_SUCCESS,
				payload: {
					token,
					user,
				},
			});
			Swal.fire("Wow.", "Register Successful.!", "success");
		} else {
			if (res.status === 400) {
				dispatch({
					type: authConstants.REGISTER_FAILURE,
					payload: { error: res.data.error },
				});
				Swal.fire("Oops...", "Something went wrong!", "error");
			}
		}
	};
};

export const isUserLoggedIn = () => {
	return async (dispatch) => {
		const token = localStorage.getItem("token");
		if (token) {
			const user = JSON.parse(localStorage.getItem("user"));
			dispatch({
				type: authConstants.REGISTER_SUCCESS,
				payload: {
					token,
					user,
				},
			});
		} else {
			dispatch({
				type: authConstants.LOGIN_FAILURE,
				payload: { error: "Failed to Login" },
			});
		}
	};
};

export const logout = () => {
	return async (dispatch) => {
		dispatch({
			type: authConstants.LOGOUT_REQUEST,
		});
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		dispatch({
			type: authConstants.LOGOUT_SUCCESS,
		});

		<Redirect to='/' />;
		Swal.fire("Great..", "Logout Successful..!", "success");
		dispatch({
			type: cartConstants.RESET_CART,
		});

		// const res = await axios.post("/logout");
		// if (res.status === 200) {
		// 	localStorage.clear();
		// 	dispatch({
		// 		type: authConstants.LOGOUT_SUCCESS,
		// 	});
		// } else {
		// 	dispatch({
		// 		type: authConstants.LOGOUT_FAILURE,
		// 		payload: { error: res.data.error },
		// 	});
		// }
	};
};

export const passUpdateOtp = (phone) => {
	return async (dispatch) => {
		dispatch({ type: authConstants.CHANGE_PASSWORD_OTP_REQUEST });
		const res = await axios.post("/pass_update_otp", { phone });

		if (res.status === 200) {
			dispatch({
				type: authConstants.CHANGE_PASSWORD_OTP_SUCCESS,
			});
			Swal.fire("Wow.", "Otp sent successfully.!", "success");
		} else {
			if (res.status === 404) {
				dispatch({
					type: authConstants.CHANGE_PASSWORD_OTP_FAILURE,
					payload: { error: res.data.error },
				});
				Swal.fire("Oops...", "User not found", "error");
			}

			if (res.status === 400) {
				dispatch({
					type: authConstants.CHANGE_PASSWORD_OTP_FAILURE,
					payload: { error: res.data.error },
				});
				Swal.fire("Oops...", "Something went wrong..", "error");
			}
		}
	};
};

export const updatePassword = (user) => {
	return async (dispatch) => {
		dispatch({ type: authConstants.CHANGE_PASSWORD_OTP_REQUEST });
		const res = await axios.post("/change_password", user);

		if (res.status === 201) {
			dispatch({
				type: authConstants.CHANGE_PASSWORD_SUCCESS,
			});
			Swal.fire("Wow.", "Password changed successfully.!", "success");
		} else {
			if (res.status === 400) {
				dispatch({
					type: authConstants.CHANGE_PASSWORD_FAILURE,
					payload: { error: res.data.error },
				});
				Swal.fire("Oops...", "Something went wrong..", "error");
			}

			if (res.status === 401) {
				dispatch({
					type: authConstants.CHANGE_PASSWORD_FAILURE,
					payload: { error: res.data.error },
				});
				Swal.fire("Oops...", "Invalid OTP..", "error");
			}
		}
	};
};

export const googleLogin = (user) => {
	return async (dispatch) => {
		dispatch({ type: authConstants.REGISTER_REQUEST });
		const res = await axios.post("/google_login", user);

		console.log("Google login res", res);

		if (res.status === 201) {
			const { token, user } = res.data;
			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(user));

			console.log("User token", { token, user });
			dispatch({
				type: authConstants.REGISTER_SUCCESS,
				payload: {
					token,
					user,
				},
			});
			Swal.fire("Wow.", "Register Successful.!", "success");
		}
		if (res.status === 200) {
			const { token, user } = res.data;
			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(user));
			console.log("User token", { token, user });
			dispatch({
				type: authConstants.LOGIN_SUCCESS,
				payload: {
					token,
					user,
				},
			});
			Swal.fire("Wow.", "Register Successful.!", "success");
		} else {
			if (res.status === 400) {
				dispatch({
					type: authConstants.REGISTER_FAILURE,
					payload: { error: res.data.error },
				});
				Swal.fire("Oops...", "Something went wrong!", "error");
			}
		}
	};
};

export const facebookLogin = (user) => {
	return async (dispatch) => {
		dispatch({ type: authConstants.LOGIN_REQUEST });
		const res = await axios.post("/facebook_login", user);

		if (res.status === 201) {
			const { token, user } = res.data;
			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(user));
			dispatch({
				type: authConstants.LOGIN_SUCCESS,
				payload: {
					token,
					user,
				},
			});
			Swal.fire("Wow.", "Register Successful.!", "success");
		}
		if (res.status === 200) {
			const { token, user } = res.data;
			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(user));
			dispatch({
				type: authConstants.LOGIN_SUCCESS,
				payload: {
					token,
					user,
				},
			});
			Swal.fire("Wow.", "Register Successful.!", "success");
		} else {
			if (res.status === 400) {
				dispatch({
					type: authConstants.LOGIN_FAILURE,
					payload: { error: res.data.error },
				});
				Swal.fire("Oops...", "Something went wrong!", "error");
			}
		}
	};
};

export const updateProfile = (form) => {
	return async (dispatch) => {
		console.log(form);
		dispatch({ type: authConstants.UPDATE_PROFILE_REQUEST });

		try {
			const res = await axios.post("/update-profile", form);

			if (res.status == 201) {
				localStorage.setItem("user", JSON.stringify(res.data.updatedUser));
				dispatch({
					type: authConstants.UPDATE_PROFILE_SUCCESS,
					payload: res.data,
				});
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: authConstants.UPDATE_PROFILE_FAILURE });
		}
	};
};
