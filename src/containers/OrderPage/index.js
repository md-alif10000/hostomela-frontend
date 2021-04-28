import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../actions";
import Header from "../../components/Header/index";
	import { Redirect } from "react-router-dom";

import { generatePublicUrl } from "../../urlconfig";
import "./style.css";

export default function OrderPage(props) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const auth = useSelector(state => state.auth)

	useEffect(() => {
		dispatch(getOrders());
	}, []);



 
	const getStatus = (status) => {
		let result = status.filter((obj) => {
			return obj.isCompleted === true;
		});
		let type = result[result.length - 1].type;
		let Class =
			type == "delivered"
				? "btn btn-success"
				: type == "ordered"
				? "btn btn-danger"
				: type == "packed"
				? "btn btn-warning"
				: type == "shipped"
				? "btn btn-info"
				: null;

		return <span className={Class}> {result[result.length - 1].type}</span>;
	};
	if (!auth.authenticate) return <Redirect to='/' />;
	return (
		<>
			<Header fixed />
			<div className=' tableContainer mt-70'>
				<table class='table table-striped table-dark'>
					<thead>
						<tr>
							<th scope='col'>No</th>
							<th scope='col'>Product Name</th>
							<th scope='col'>Status</th>
							<th scope='col'>Total Amount</th>
						</tr>
					</thead>
					<tbody>
						{user.orders.map((order, index) => {
							return (
								<tr>
									<td>{index+1}</td>

									{/* <th scope='row'>1</th> */}

									<td>
										{order.items.map((item, index) => {
											return (
												<Link
													to={`/order_details/${order._id}`}
													style={{ textDecoration: "none" }}>
													<div style={{ display: "flex" }}>
														<span>({index + 1})-</span>
														<img
															className='orderImg'
															src={generatePublicUrl(
																item.productId.productPictures[0].image
															)}
														/>
														{item.productId.name} <br />
													</div>
												</Link>
											);
										})}
									</td>
									<td>{getStatus(order.orderStatus)}</td>
									{/* <td>{getStatus(order)}</td> */}

									{console.log(order)}
									<td>
										{order.items.map((item, index) => {
											return (
												<p>
													{item.payablePrice} x {item.purchasedQty} pcs
												</p>
											);
										})}
										{/* Total Price=
										{Object.keys(order.items).reduce((totalPrice, key) => {
											const { payablePrice } = order.items[key];
											const { purchasedQty } = order.items[key];
											return totalPrice + payablePrice * purchasedQty;
										}, 0)} */}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}
