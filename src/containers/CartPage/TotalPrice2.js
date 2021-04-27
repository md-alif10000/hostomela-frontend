import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { validateCoupon } from "../../actions/user.action";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import "./style2.css";

export default function TotalPrice(props) {
	const [couponInput, setCouponInput] = useState(true);
	const [couponName, setCouponName] = useState("");
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const delivery_charge = parseInt(
		JSON.parse(localStorage.getItem("deliveryCharge"))
	); ;

	const [deliveryArea, setDeliveryArea] = useState(
		delivery_charge == 80 ? "in-dhaka" : "out-dhaka"
	);
	const handleChange = (event) => {
		setDeliveryArea(event.target.value);
	};
	const deliveryCharge = deliveryArea == "out-dhaka" ? 150 : 80;

	const coupon = JSON.parse(localStorage.getItem("coupon"));

	const couponValidation = (e) => {
		e.preventDefault();
		dispatch(validateCoupon({ couponName }));
		setCouponInput(false);
	};

	const afterDeliveryCharge = Object.keys(cart.cartItems).reduce(
		(totalPrice, key) => {
			const { price, qty } = cart.cartItems[key];
			return totalPrice + price * qty;
		},
		0
	);

	const couponDiscont = coupon
		? afterDeliveryCharge * (coupon.amount * (1 / 100))
		: null;
	const afterDiscount = coupon
		? afterDeliveryCharge - couponDiscont + deliveryCharge
		: null;
	return (
		<div>
			<div className='totals'>
				<div className='totals-item'>
					<label>Subtotal</label>
					<div className='totals-value' id='cart-subtotal'>
						{Object.keys(cart.cartItems).reduce((totalPrice, key) => {
							const { price, qty } = cart.cartItems[key];
							return totalPrice + price * qty;
						}, 0)}{" "}
					</div>
				</div>
				{/* <div className='totals-item'>
					<label>Tax (5%)</label>
					<div className='totals-value' id='cart-tax'>
						3.60
					</div>
				</div> */}
				{!props.noButton && (
					<FormControl component='fieldset' style={{ padding: "20px" }}>
						<FormLabel component='legend'>
							<h3>Delivery Area</h3>
						</FormLabel>
						<FormLabel component='legend'>
							<h5>
								<LocalShippingIcon /> Cash on delivery available
							</h5>
						</FormLabel>
						<RadioGroup
							aria-label='gender'
							name='gender1'
							value={deliveryArea}
							onChange={handleChange}>
							<div>
								{" "}
								<FormControlLabel
									value='in-dhaka'
									control={<Radio />}
									label={
										<h4>
											In Dhaka -80tk <AccessTimeIcon />
											48 hours
										</h4>
									}
								/>
							</div>
							<div>
								{" "}
								<FormControlLabel
									value='out-dhaka'
									control={<Radio />}
									label={
										<h4>
											Out of Dhaka -150tk <AccessTimeIcon />
											72 hours
										</h4>
									}
								/>
							</div>
						</RadioGroup>
					</FormControl>
				)}

				{coupon ? (
					<>
						<div className='totals-item'>
							<label className='font-16'>
								Coupon-({coupon.name}) <span>Discount{"->"} </span>
							</label>
							<div className='totals-value' id='cart-shipping'>
								{couponDiscont}
							</div>
						</div>
						<div className='totals-item'>
							<label>Shipping</label>
							<div className='totals-value' id='cart-shipping'>
								{deliveryCharge}
							</div>
						</div>

						<div className='totals-item totals-item-total'>
							<label>Grand Total</label>
							<div className='totals-value' id='cart-total'>
								{afterDiscount}
							</div>
						</div>
					</>
				) : (
					<>
						<div className='totals-item'>
							<label>Shipping</label>
							<div className='totals-value' id='cart-shipping'>
								{deliveryCharge}
							</div>
						</div>
						<div className='totals-item totals-item-total'>
							<label>Grand Total</label>
							<div className='totals-value' id='cart-total'>
								{Object.keys(cart.cartItems).reduce((totalPrice, key) => {
									const { price, qty } = cart.cartItems[key];
									return totalPrice + price * qty;
								}, deliveryCharge)}{" "}
							</div>
						</div>
					</>
				)}

				<div
					className=' d-flex px-1 mr-0'
					style={{ justifyContent: "flex-end" }}>
					<div className='mr-0' style={{ float: "right" }}>
						{couponInput ? null : (
							<button
								className='btn btn-success btn-lg m-3'
								onClick={(e) => setCouponInput(true)}>
								Add Coupon
							</button>
						)}

						{couponInput ? (
							<div className='d-flex'>
								<input
									className='m-3 coupon-input d'
									maxLength='15'
									type='txt'
									placeholder='Enter your coupon code'
									onChange={(e) => setCouponName(e.target.value)}
								/>
								<button
									className='btn c-primary t-primary btn-lg m-2'
									onClick={(e) => couponValidation(e)}>
									Submit
								</button>
								{couponInput ? (
									<button
										className='btn btn-danger btn-lg m-2'
										onClick={(e) => setCouponInput(false)}>
										Cancel
									</button>
								) : null}
							</div>
						) : null}
					</div>
				</div>
			</div>
			{!props.noButton && (
				<Link
					to={`/checkout:${deliveryCharge}`}
					// className='checkout-btn'
					onClick={() =>
						localStorage.setItem(
							"deliveryCharge",
							JSON.stringify(deliveryCharge)
						)
					}>
					<button className='checkout '>Proceed To Checkout</button>
				</Link>
			)}
		</div>
	);
}
