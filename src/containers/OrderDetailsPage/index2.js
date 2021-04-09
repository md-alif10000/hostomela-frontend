import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../actions";
import Card from "../../components/UI/Card";
import Price from "../../components/UI/Price/Price";
import { generatePublicUrl } from "../../urlconfig";
import {Redirect} from 'react-router-dom'
import item from "../HomePage/item";
import "./style2.css";
import './style.css'
import Header3 from "../../components/Header/index2";

export default function OrderDetailsPage(props) {
	const dispatch = useDispatch();
	const orderDetails = useSelector((state) => state.user.orderDetails);
	const auth = useSelector(state => state.auth)
	const orderId = props.match.params.orderId;

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
			<Header3 />
			<div className='container m-auto p-0 text-center'>
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
									<strong>Total:</strong> <bd /> {orderDetails.totalAmount} Tk
								</div>
								<div className='col'>
									{" "}
									<strong>Tracking #:</strong> <bd /> BD045903594059{" "}
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
													item.productId.productPictures[0].img
												)}
												alt=''
											/>
										</div>
										<div style={{ width: "250px" }}>
											<div className='delItemName'>{item.productId.name}</div>
											<Price value={item.payablePrice} />
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
						<a href='/account/orders' className='btn btn-warning' data-abc='true'>
							{" "}
							<i className='fa fa-chevron-left'></i> Back to orders
						</a>
					</div>
				</article>
			</div>
		</>
	);
}
