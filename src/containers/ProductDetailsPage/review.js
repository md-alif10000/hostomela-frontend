import React from 'react'
import './reviewStyle.css'

export default function Review(props) {
    console.log(props)
    const {name,review,rating}=props
    return (
			<div className='reviews'>
				<div className='row blockquote review-item'>
					<div className='col-md-3 text-center'>
						<img
							className='rounded-circle reviewer'
							src='http://standaloneinstaller.com/upload/avatar.png'
						/>
						<div className='caption'>
							<small>
								by <span >{name}</span>
							</small>
						</div>
					</div>
					<div className='col-md-9'>
						<h4>My awesome review</h4>
						<div
							className='ratebox text-center'
							data-id='0'
							data-rating='5'></div>
						<p className='review-text'>{review} </p>

						<small className='review-date'>March 26, 2017</small>
					</div>
				</div>
			</div>
		);
}
