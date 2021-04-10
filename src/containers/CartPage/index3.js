import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import {
	addToCart,
	getCartItems,
	removeCartItem,
} from "../../actions/cart.action";
import { validateCoupon } from "../../actions/user.action";
import "./style2.css";
import CartItem2 from "./CartItem/index2";
import { Link } from "react-router-dom";
import Header from "../../components/Header/index";

export const TotalPrice = (props) => {
	const [couponInput, setCouponInput] = useState(false);
	const [couponName, setCouponName] = useState("");
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const coupon = JSON.parse(localStorage.getItem("coupon"));

	const couponValidation = (e) => {
		e.preventDefault();
		dispatch(validateCoupon({ couponName }));
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
		? afterDeliveryCharge - couponDiscont + 50
		: null;

	return (
		<div className='total-price text-left'>
			<table>
				<tr>
					<td>Subtotal</td>
					<td>
						{Object.keys(cart.cartItems).reduce((totalPrice, key) => {
							const { price, qty } = cart.cartItems[key];
							return totalPrice + price * qty;
						}, 0)}
					</td>
				</tr>
				<tr>
					<td>Delivery Charge</td>
					<td>50</td>
				</tr>
				<tr>
					<td>Total</td>
					<td>
						{Object.keys(cart.cartItems).reduce((totalPrice, key) => {
							const { price, qty } = cart.cartItems[key];
							return totalPrice + price * qty;
						}, 50)}
					</td>
				</tr>
				{coupon ? (
					<>
						<tr>
							<td>Coupon--{coupon.name}</td>
							<td>{couponDiscont}</td>
						</tr>
						<tr>
							<td>Total--</td>
							<td>{afterDiscount}</td>
						</tr>
					</>
				) : null}
			</table>

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
						className='m-3 input d'
						maxLength='15'
						type='txt'
						placeholder='Enter your coupon code'
						onChange={(e) => setCouponName(e.target.value)}
					/>
					<button
						className='btn btn-danger btn-lg m-2'
						onClick={(e) => couponValidation(e)}>
						Submit
					</button>
				</div>
			) : null}
			{props.nextStep ? null : (
				<Link
					to='/checkout'
					className='checkout-btn'
					// onClick={() => <Redirect to='/checkout' />}
				>
					<h4>Proceed To Checkout</h4>
				</Link>
			)}
		</div>
	);
};

export default function CartPage3(props) {
	const cart = useSelector((state) => state.cart);
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	// const cartItems = cart.cartItems;
	const [cartItems, setCartItems] = useState(cart.cartItems);

	useEffect(() => {
		setCartItems(cart.cartItems);
	}, [cart.cartItems]);

	useEffect(() => {
		if (auth.authenticate) {
			dispatch(getCartItems());
		}
	}, [auth.authenticate]);

	const onQuantityIncrement = (_id, qty) => {
		const { name, price, img } = cartItems[_id];

		dispatch(addToCart({ _id, name, price, img }, 1));
	};

	const onQuantityDecrement = (_id, qty) => {
		const { name, price, img } = cartItems[_id];

		dispatch(addToCart({ _id, name, price, img }, -1));
	};

	const onRemoveCartItem = (_id) => {
		dispatch(removeCartItem({ productId: _id }));
	};

	if (props.onlyCartItems) {
		return (
			<>
				{Object.keys(cartItems).map((key, index) => (
					<CartItem2
						key={index}
						cartItem={cartItems[key]}
						onQuantityInc={onQuantityIncrement}
						onQuantityDec={onQuantityDecrement}
					/>
				))}
				<TotalPrice nextStep />
			</>
		);
	}

	console.log(cart.cartItems);

	if (cart.cartItems.length < 0) {
		return (
			<>
				<Header fixed />
				<div class='container-fluid mt-100'>
					<div class='row'>
						<div class='col-md-12'>
							<div class='card'>
								<div class='card-body cart'>
									<div class='col-sm-12 empty-cart-cls text-center'>
										<img
											src='https://i.imgur.com/dCdflKN.png'
											width='170'
											height='170'
											class='img-fluid mb-3 mr-3'
										/>
										<h3>
											<strong>Your Cart is Empty</strong>
										</h3>
										<h4>Add something to make me happy :)</h4>{" "}
										<a
											href='/'
											class='btn btn-primary cart-btn-transform m-3'
											data-abc='true'>
											<h2> Continue shopping</h2>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	} else {
		return (
			<Layout>
				<div className='container mt-1 pt-1 cart'>
					<table>
						<tr>
							<th>Product</th>
							<th>Quantity</th>
							<th>Subtotal</th>
						</tr>
						{Object.keys(cartItems).map((key, index) => (
							<CartItem2
								key={index}
								cartItem={cartItems[key]}
								onQuantityInc={onQuantityIncrement}
								onQuantityDec={onQuantityDecrement}
								onRemoveCartItem={onRemoveCartItem}
							/>
						))}
					</table>

					<TotalPrice />
				</div>
			</Layout>
		);
	}
}
