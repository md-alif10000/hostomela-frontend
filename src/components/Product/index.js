import React from 'react'
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import './style.css'

export default function Product(props) {
    const {name,rating,image,price,link,onClick}=props

    return (
			// <div className='arrival__center'>
				<a href={link}>
					<div className='product font-14 bold-400'>
						<div className='img__container'>
							<img
								src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8-d-b_nKnzVmD2H4qKlooalZX1Y2C4iiETw&usqp=CAU'
								alt=''
							/>
						</div>
						<div className='product__bottom'>
							{/* <div className='rating'>
								<span>⭐⭐⭐⭐⭐</span>
							</div> */}
							<div className='rating'>
								<span>
									<strong>৳</strong> {price}
								</span>
							</div>
							<h4>{name}</h4>
							{/* <a className='t-primary bold-600' onClick={onClick}> <ShoppingCartIcon/> Add To Cart</a> */}
						</div>
					</div>
				</a>
			// </div>
		);
}
