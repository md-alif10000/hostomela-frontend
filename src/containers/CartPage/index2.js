import React, { useState, useEffect } from "react";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import "./style2.css";
import CartItem from "./CartItem.js";
import TotalPrice from "./TotalPrice2";

import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import {
	addToCart,
	getCartItems,
	removeCartItem,
} from "../../actions/cart.action";
import { validateCoupon } from "../../actions/user.action";

import { Link } from "react-router-dom";
import Header from "../../components/Header/index";
import Loader from "../../components/Loader";
import EmptyCart from "./EmptyCart";
import { deliveryCharge } from "../../utils/getParams";
import { Fade } from "react-reveal";

export default function CartPage2(props) {
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
		const { name, price, image,size,color,stitch } = cartItems[_id];

		dispatch(addToCart({ _id, name, price, image, size, color, stitch }, 1));
	};

	const onQuantityDecrement = (_id, qty) => {
		const { name, price, image, size, color, stitch } = cartItems[_id];

		dispatch(addToCart({ _id, name, price, image, size, color, stitch }, -1));
	};

	const onRemoveCartItem = (_id) => {
		dispatch(removeCartItem({ productId: _id }));
	dispatch(getCartItems());
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
				<TotalPrice nextStep noButton/>
			</>
		);
	}

	// if (cart.updatingCart) {
	// 	return <Loader />;
	// }
	const itemsArray = [];
	Object.keys(cart.cartItems).map((item) => {
		itemsArray.push(item);
	});

	if (itemsArray.length == 0) {
		return <EmptyCart />;
	}
	if(props.onlyCartItems) return (
		<div>
		

					{Object.keys(cartItems).map((key, index) => (
						<CartItem
							key={index}
							cartItem={cartItems[key]}
							onQuantityInc={onQuantityIncrement}
							onQuantityDec={onQuantityDecrement}
							onRemoveCartItem={onRemoveCartItem}
						/>
					))}

		
		</div>
	);

	return (
		<Layout>
			<div className='mt-60 bold-600 bolder'>
				<h1>Shopping Cart</h1>

				<div className='shopping-cart'>
					<div className='column-labels mt-5'>
						<label className='product-image'>Image</label>
						<label className='product-details'>Product</label>
						<label className='product-price'>Price</label>
						<label className='product-quantity'>Quantity</label>
						<label className='product-removal'>Remove</label>
						<label className='product-line-price'>Total</label>
					</div>

					{Object.keys(cartItems).map((key, index) => (
						<CartItem
							key={index}
							cartItem={cartItems[key]}
							onQuantityInc={onQuantityIncrement}
							onQuantityDec={onQuantityDecrement}
							onRemoveCartItem={onRemoveCartItem}
						/>
					))}
				</div>
			</div>
			<TotalPrice />
		</Layout>
	);
}
