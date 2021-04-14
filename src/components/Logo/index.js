import React from "react";

export default function Logo(props) {
	const width = props.width ? props.width : "200px";
	const height = props.height ? props.height : "50px";
	return (
		<div>
			<img
				src='./hostomelaLogo.png'
				className='logo'
				width={width}
				height={height}
			/>
		</div>
	);
}
