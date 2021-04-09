import React,{useState} from "react";
import { generatePublicUrl } from "../../../urlconfig";
import "./style.css";
export default function CartItem(props) {
	const { _id, name, price,  img } = props.cartItem;
	const [qty, setQty] = useState(props.cartItem.qty);

	const onQuantityIncrement = () => {
        setQty(qty+1)
		props.onQuantityInc(_id,qty+1);
	};

    const onQuantityDecrement=()=>{
        if(qty <= 1)return
        setQty(qty-1)
        props.onQuantityDec(_id,qty-1)
         
    }
	console.log(img);
	return (
		<div className='cartItemContainer'>
			<div key={_id} className='flexRow'>
				<div className='cartProductImgContainer'>
					<img src={generatePublicUrl(img)} alt='' />
				</div>

				<div className='cartItemDetails'>
					<div>
						<p>{name}</p>
						<p>BDT {price}</p>
					</div>
					<div>Delivery in 3-5 days</div>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					margin: "5px 0",
				}}>
				<div>
					<button onClick={onQuantityDecrement} >-</button>
					<input value={qty} readOnly />
					<button onClick={onQuantityIncrement}>+</button>
				</div>
				<button className='cartActionBtn'>Save for later</button>
				<button className='cartActionBtn'>Remove</button>
			</div>

			{/* <div class='total-price'>
					<table>
						<tr>
							<td>Subtotal</td>
							<td>$200</td>
						</tr>
						<tr>
							<td>Tax</td>
							<td>$50</td>
						</tr>
						<tr>
							<td>Total</td>
							<td>$250</td>
						</tr>
					</table>
					<a href='#' class='checkout btn'>
						Proceed To Checkout
					</a>
				</div> */}
		</div>
	);
}
