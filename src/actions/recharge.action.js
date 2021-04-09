import { rechargeConstants } from "./constants.js";
import axios from "../helpers/axios";

export const addRecharge=(details)=>{
  return  async (dispatch)=>{

        	const res = await axios.post("/addRecharge",details);
					dispatch({ type: rechargeConstants.RECHARGE_REQUEST });
					if (res.status === 201) {
                        const {data}=res
						dispatch({
							type: rechargeConstants.RECHARGE_SUCCESS,
							payload: { data },
						});
					} else {
						const { error } = res.data;
						dispatch({
							type: rechargeConstants.RECHARGE_FAILURE,
							payload: { error },
						});
					}
    }
}


export const getRecharges=()=>{
	return async (dispatch)=>{
		const res=await axios.get('/getRecharges')
		dispatch({ type: rechargeConstants.GET_RECHARGES_REQUEST });
		if (res.status === 200) {
			const { data } = res;
			console.log(data)
			dispatch({
				type: rechargeConstants.GET_RECHARGES_SUCCESS,
				payload: { recharges:data.recharges },
			});
		} else {
			const { error } = res.data;
			dispatch({
				type: rechargeConstants.GET_RECHARGES_FAILURE,
				payload: { error },
			});
		}


	}
}

