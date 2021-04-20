import React,{useState} from "react";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import "./style2.css";
import { generatePublicUrl } from "../../urlconfig";
import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

export default function CartItem(props) {
	const { _id, name, price, image } = props.cartItem;
	console.log(props.cartItem);
	const [qty, setQty] = useState(props.cartItem.qty);

	const onQuantityIncrement = () => {
		setQty(qty + 1);
		props.onQuantityInc(_id, qty + 1);
	};

	const onQuantityDecrement = () => {
		if (qty <= 1) return;
		setQty(qty - 1);
		props.onQuantityDec(_id, qty - 1);
	};

	return (
		<div className='productItem'>
			<div className='product-image'>
				<img src='https://s.cdpn.io/3/large-NutroNaturalChoiceAdultLambMealandRiceDryDogFood.png' />
			</div>
			<div className='product-details'>
				<div className='product-title'>{name}</div>
				{/* <p className='product-description'>Who hi it's your dog's turn!</p> */}
			</div>
			<div className='product-price m-1'>{price}</div>
			<div className='product-quantity d-flex'>
				<IndeterminateCheckBoxIcon
					style={{ fontSize: "35px" }}
					onClick={onQuantityDecrement}></IndeterminateCheckBoxIcon>

				<input type='number' value={qty} min='1' />
				<AddBoxIcon
					style={{ fontSize: "35px" }}
					onClick={onQuantityIncrement}
				/>
			</div>
			<div className='product-removal'>
				<a href='/cart'>
					<button className='remove-product'>
						<DeleteForeverIcon
							style={{ fontSize: "25px" }}
							onClick={() => props.onRemoveCartItem(_id)}
						/>
					</button>
				</a>
			</div>
			<div className='product-line-price'>{qty * price}</div>
		</div>
	);
}
