import axios from "../helpers/axios.js";
import { productConstants } from "./constants";
import Swal from 'sweetalert2'

export const getProductsBySlug = (slug) => {
	return async (dispatch) => {
		const res = await axios.get(`/products/${slug}`);
		console.log(res);
		if (res.status === 200) {
			dispatch({
				type: productConstants.GET_PRODUCTS_BY_SLUG,
				payload: res.data,
			});
		} else {
			// dispatch({
			//     type
			// })
		}
	};
};

export const getProductPage = (payload) => {
	return async (dispatch) => {
		try {
			const { params } = payload;
			const { cid, type } = params;

			console.log(cid);
            console.log(type)
			const res = await axios.get(`/page/${cid}/${type}`);
			console.log(res);
			dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });
			if (res.status === 200) {
				const { page } = res.data;
				dispatch({
					type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
					payload: { page },
				});
			} else {
				const { error } = res.data;
				dispatch({
					type: productConstants.GET_PRODUCT_PAGE_FAILURE,
					payload: { error },
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};




export const getProductDetailsById=(payload)=>{
	return async dispatch=>{
		dispatch({type:productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST})
		let res
		try{
			const {productId}=payload.params;
			res=await axios.get(`/product/${productId}`)
			console.log(res)
			

			dispatch({type:productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
			payload:{productDetails:res.data.product}})
		}catch(error){
			console.log(error)
			dispatch({type:productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
			payload:{error}})
		}
	}
}




export const getProducts = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
			const res = await axios.get(`/getAllProducts`);
			if (res.status === 200) {
				const { products } = res.data;
				dispatch({
					type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
					payload: { products },
				});
			} else {
				dispatch({ type: productConstants.GET_ALL_PRODUCTS_FAILURE });
			}
		} catch (error) {
			console.log(error);
		}
	};
};


export const addReview=(details)=>{
	return async (dispatch)=>{
		dispatch({type:productConstants.ADD_REVIEW_REQUEST})
		const res=await axios.post('/product/addReview',details)
		if(res.status==201){
			dispatch({
				type: productConstants.ADD_REVIEW_SUCCESS,
				payload: res.data,
			});
			Swal.fire('Great.!','Successfully added review','success')

			console.log(details);
			let params = details;
			let payload = { params };
			dispatch(getProductDetailsById(payload));
		}
		if(res.status==400) {
			dispatch({type:productConstants.ADD_REVIEW_FAILURE})
			Swal.fire("Great.!", "Something went wrong", "error");

		}
	}
}