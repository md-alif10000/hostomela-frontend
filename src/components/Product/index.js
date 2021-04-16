import React from 'react'
import './style.css'

export default function Product(props) {
    const {name,rating,image,price,link}=props
    return (
			<div className='arrival__center'>
				<a href={link}>
					<div className='product font-14 bold-400'>
						<div className='img__container'>
							<img
								src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8-d-b_nKnzVmD2H4qKlooalZX1Y2C4iiETw&usqp=CAU'
								alt=''
							/>
						</div>
						<div className='product__bottom'>
							<div className='rating'>
								<span>⭐⭐⭐⭐⭐</span>
							</div>
							<div className='rating'>
								<span>
									<strong>৳</strong> {price}
								</span>
							</div>
							<h3>{name}</h3>
							<a href={link}>Add To Cart</a>
						</div>
					</div>
				</a>
			</div>
		);
}
