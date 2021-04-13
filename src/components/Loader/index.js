import React from 'react'
import Loader from "react-loader-spinner";

export default function Spinner() {
    return (
			<div className='container loader'>
				<Loader type='Hearts' color='#00BFFF' height={80} width={80} />
			</div>
		);
}
