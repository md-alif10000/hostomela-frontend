import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import {
	addToCart,
	getCartItems,
	removeCartItem,
} from "../../actions/cart.action";
import { validateCoupon } from "../../actions/user.action";
import "./style.css";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import Header from "../../components/Header/index";
import Loader from "../../components/Loader";
import EmptyCart from "./EmptyCart";

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
		const { name, price, image } = cartItems[_id];

		dispatch(addToCart({ _id, name, price, image }, 1));
	};

	const onQuantityDecrement = (_id, qty) => {
		const { name, price, image } = cartItems[_id];

		dispatch(addToCart({ _id, name, price, image }, -1));
	};

	const onRemoveCartItem = (_id) => {
		dispatch(removeCartItem({ productId: _id }));
	};

	if (props.onlyCartItems) {
		return (
			<>
				{Object.keys(cartItems).map((key, index) => (
					<CartItem
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


	
if (cart.updatingCart) {
	return <Loader />;
}
const itemsArray=[]
Object.keys(cart.cartItems).map((item)=>{
	itemsArray.push(item)

})
console.log(itemsArray)
	
 console.log(cart.cartItems)
	if (itemsArray.length == 0) {
		return <EmptyCart />;
	} 



		return (
			<Layout>
				<div className='cartpage-container mt-1 pt-1 cart'>
					<table>
						<tr>
							<th>Product</th>
							<th>Quantity</th>
							<th>Subtotal</th>
						</tr>
						{Object.keys(cartItems).map((key, index) => (
							<CartItem
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
