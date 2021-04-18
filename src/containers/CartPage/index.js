import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import {
	addToCart,
	getCartItems,
	removeCartItem,
} from "../../actions/cart.action";
import { validateCoupon } from "../../actions/user.action";
import TotalPrice from './totalPrice'
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import Header from "../../components/Header/index";
import Loader from "../../components/Loader";
import EmptyCart from "./EmptyCart";
import {deliveryCharge} from '../../utils/getParams'
import './style.css'



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


	if (itemsArray.length == 0) {
		return <EmptyCart />;
	} 



		return (
			<Layout>
				<div className='cartpage-container  pt-1 cart mt-60'>
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
