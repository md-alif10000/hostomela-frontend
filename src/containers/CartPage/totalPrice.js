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
import "./style.css";

export default function TotalPrice(props) {
	const [couponInput, setCouponInput] = useState(false);
	const [couponName, setCouponName] = useState("");
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

      const [deliveryArea, setDeliveryArea] = useState('in-dhaka')
			const handleChange = (event) => {
				setDeliveryArea(event.target.value);
			};
 const deliveryCharge= deliveryArea == 'out-dhaka'?  150: 80

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
		<div className='total-price text-left'>
			<table className='total-price-table'>
				<tr>
					<td>Subtotal</td>
					<td>
						{Object.keys(cart.cartItems).reduce((totalPrice, key) => {
							const { price, qty } = cart.cartItems[key];
							return totalPrice + price * qty;
						}, 0)}{" "}
						<strong> ৳</strong>
					</td>
				</tr>

				<tr className='p-4'>
					<FormControl component='fieldset'>
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
				</tr>
				<tr>
					<td>Delivery Charge</td>
					<td>
						{deliveryCharge} <strong> ৳</strong>
					</td>
				</tr>
				<tr>
					<td>Total</td>
					<td>
						{Object.keys(cart.cartItems).reduce((totalPrice, key) => {
							const { price, qty } = cart.cartItems[key];
							return totalPrice + price * qty;
						}, deliveryCharge)}{" "}
						<strong> ৳</strong>
					</td>
				</tr>
				{coupon ? (
					<>
						<tr>
							<td>Coupon--{coupon.name}</td>
							<td>
								<span>Discount{" -->"} </span>{" "}
								<span>
									{couponDiscont}
									<strong> ৳</strong>
								</span>
							</td>
						</tr>
						<tr>
							<td>Total--</td>
							<td>
								{afterDiscount} <strong> ৳</strong>
							</td>
						</tr>
					</>
				) : null}
			</table>
			<div className='coupon-container'>
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

			{props.nextStep ? null : (
				<Link
					to={`/checkout:${deliveryCharge}`}
					className='checkout-btn'
					onClick={() => localStorage.setItem('deliveryCharge',JSON.stringify(deliveryCharge))}
				>
					<h4>Proceed To Checkout</h4>
				</Link>
			)}
		</div>
	);
}
