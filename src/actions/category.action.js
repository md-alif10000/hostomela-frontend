import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

 const getAllCategory = () => {
    return async dispatch => {

        dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
        const res = await axios.get(`category/getcategory`);
        console.log(res);
        if (res.status === 200) {

            const {categoryList}  = res.data;
  

            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList }
            });
        } else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            });
        }


    }
}

export const getSubCategory=(parentId)=>{
    return async dispatch=>{
         dispatch({ type: categoryConstants.GET_SUB_CATEGORY_REQUEST });
					const res = await axios.get(`subcategory/${parentId}`);
					console.log(res);
					if (res.status == 200) {
					
						dispatch({
							type: categoryConstants.GET_SUB_CATEGORY_SUCCESS,
							payload:  res.data,
						});
					} else {
						dispatch({
							type: categoryConstants.GET_SUB_CATEGORY_FAILURE,
							payload: { error: res.data.error },
						});
					}

    }

}






export {getAllCategory}