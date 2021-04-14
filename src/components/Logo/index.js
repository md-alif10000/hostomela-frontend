import React from "react";
import logo from '../../images/logo/hostomelaLogo.png'

export default function Logo(props) {
	const width = props.width ? props.width : "200px";
	const height = props.height ? props.height : "50px";
	return (
		<div>
			<img
				src={logo}
				className='logo'
				width={width}
				height={height}
			/>
		</div>
	);
}
