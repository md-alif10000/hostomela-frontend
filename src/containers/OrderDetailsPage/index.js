import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../actions";
import Card from "../../components/UI/Card";
import Price from "../../components/UI/Price/Price";
import { generatePublicUrl } from "../../urlconfig";
import {Redirect} from 'react-router-dom'
import "./style2.css";
import './style.css'
import Header from "../../components/Header/index";
import Loader from "../../components/Loader";

export default function OrderDetailsPage(props) {
	const dispatch = useDispatch();
	const orderDetails = useSelector((state) => state.user.orderDetails);
	const auth = useSelector(state => state.auth)
	const orderId = props.match.params.orderId;
	const user = useSelector(state => state.user)

	useEffect(() => {
		// console.log({ props });
		const payload = {
			orderId: orderId,
		};
		dispatch(getOrder(payload));
	}, []);

	const formatDate = (date) => {
		if (date) {
			const d = new Date(date);
			return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
		}
		return "";
	};

	const formatDate2 = (date) => {
		const month = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"June",
			"July",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		if (date) {
			const d = new Date(date);
			return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
		}
	};

	if (!(orderDetails && orderDetails.address)) {
		return null;
	}
	if (!auth.authenticate) return <Redirect to='/' />;


	

	return (
		<>
			<Header fixed />
			<div className='container p-0 text-center mt-70 font-14'>
				<article className='card'>
					<header className='card-header'> My Orders / Tracking </header>
					<div className='card-body'>
						<h6>Order ID:{orderDetails._id} </h6>
						<article className='card'>
							<div className='card-body row'>
								<div className='col'>
									{" "}
									<strong>Estimated Delivery time:</strong> <bd />
									29 nov 2019{" "}
								</div>
								<div className='col'>
									{" "}
									<strong>Address:</strong> <bd />
									{orderDetails.address.address},{" "}
									{orderDetails.address.cityDistrict}
									{/* | <i className='fa fa-phone'></i>{" "}+1598675986{" "} */}
								</div>
								<div className='col'>
									{" "}
									<strong>Status:</strong> <bd /> Picked by the courier{" "}
								</div>
								<div className='col'>
									{" "}
									<strong>Delivery Charge:</strong> <bd />
									{orderDetails.deliveryCharge}
								</div>
								<div className='col'>
									{" "}
									<strong>Total:</strong> <bd /> {orderDetails.totalAmount} Tk
								</div>
							</div>
						</article>

						<ul className='row'>
							{orderDetails.items.map((item, index) => (
								<Card
									style={{
										display: "flex",
										padding: "20px 0",
										margin: "10px 0",
									}}>
									<div className='flexRow'>
										<div className='delItemImgContainer'>
											<img
												src={generatePublicUrl(
													item.productId.productPictures[0].image
												)}
												alt=''
											/>
										</div>
										<div style={{ width: "250px" }}>
											<div className='delItemName'>{item.productId.name}</div>
											<Price
												value={`${item.payablePrice} x ${item.purchasedQty} = ${
													item.payablePrice * item.purchasedQty
												}`}
											/>
										</div>
										<div style={{ width: "250px" }}>
											{item.color ? (
												<h4>
													Color :
													<span style={{ color: `${item.color}` }}>
														{item.color}
													</span>
												</h4>
											) : null}
											{item.size ? <h4>Size :{item.size}</h4> : null}
										</div>
									</div>
									<div
										style={{ padding: "25px 50px" }}
										className='orderTrackMain'>
										<div className='orderTrack'>
											{orderDetails.orderStatus.map((status) => (
												<div
													className={`orderStatus ${
														status.isCompleted ? "active" : ""
													}`}>
													<div
														className={`point ${
															status.isCompleted ? "active" : ""
														}`}></div>
													<div className='orderInfo'>
														<div className='status'>{status.type}</div>
														<div className='date'>
															{formatDate(status.date)}
														</div>
													</div>
												</div>
											))}
										</div>
									</div>
									<div style={{ fontWeight: "500", fontSize: 14 }}>
										{orderDetails.orderStatus[3].isCompleted &&
											`Delivered on ${formatDate2(
												orderDetails.orderStatus[3].date
											)}`}
									</div>
								</Card>
							))}
						</ul>
						<hr />
						<a
							href='/account/orders'
							className='btn btn-warning'
							data-abc='true'>
							{" "}
							<i className='fa fa-chevron-left'></i> Back to orders
						</a>
					</div>
				</article>
			</div>
		</>
	);
}
