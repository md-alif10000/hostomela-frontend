import React from "react";
import { Link } from "react-router-dom";
import logo from '../../images/logo/hostomelaLogo.png'

export default function Logo(props) {
	const width = props.width ? props.width : "200px";
	const height = props.height ? props.height : "50px";
	return (
		<div>
			<Link to='/'>
			
				<img src={logo} className='logo' width={width} height={height} />
			</Link>
		</div>
	);
}
