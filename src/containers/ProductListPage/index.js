import React from "react";
import Layout from "../../components/Layout";
import ProductStore from "./ProductStore";
import getParams from "../../utils/getParams";
import "./style.css";

import Footer from "../../components/Footer";


export default function ProductListPage(props) {
	// const renderProduct = () => {
	// 	const params = getParams(props.location.search);
	// 	let content = null;
	// 	switch (params.type) {
	// 		case undefined:
	// 			content = <ProductStore {...props} />;
	// 		case "store":
	// 			content = <ProductStore {...props} />;
	// 			break;
	// 		case "page":
	// 			content = <ProductPage {...props} />;
	// 			break;
	// 		case undefined:
	// 			content = <ProductStore {...props} />;
	// 			break;
	// 		default:
	// 			content = null;
	// 	}
	// 	return content;
	// };
	console.log('Alifffffff')

	return <Layout><ProductStore {...props}/>
	
	</Layout>;
}
