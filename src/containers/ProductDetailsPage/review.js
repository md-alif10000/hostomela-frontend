import React from 'react'
import './reviewStyle.css'

export default function Review(props) {
    console.log(props)
    const { name, review, rating, userPicture, date } = props;



		const formatDate = (date) => {
			if (date) {
				const d = new Date(date);
				return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
			}
			return "";
		};





				
    return (
			<div className='reviews'>
				<div className='row blockquote review-item'>
					<div className='col-md-3 text-center'>
						<img className='rounded-circle reviewer' src={userPicture} />
						<div className='caption'>
							<small>
								by <span>{name}</span>
							</small>
						</div>
					</div>
					<div className='col-md-9'>
						{/* <h4>My awesome review</h4> */}
						<div
							className='ratebox text-center'
							data-id='0'
							data-rating='5'></div>
						<p className='review-text'>{review} </p>

						<small className='review-date'>{date}</small>
					</div>
				</div>
			</div>
		);
}
