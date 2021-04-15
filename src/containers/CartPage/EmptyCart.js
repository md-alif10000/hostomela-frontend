import React from 'react'
import Header from "../../components/Header/index";

export default function EmptyCart() {
    return (
			<div>
				<Header fixed />
				<div className='p-0 empty-cart-container'>
					<div className='row'>
						<div className='col-md-12'>
							<div className='card'>
								<div className='card-body cart'>
									<div className='col-sm-12 empty-cart-cls text-center'>
										<img
											src='https://www.graphicsfuel.com/wp-content/uploads/2012/01/shopping-cart-icon-515.png'
											width='170px'
											height='170px'
											className='image-fluid mb-3 mr-3'
										/>
										<h3>
											<strong>Your Cart is Empty</strong>
										</h3>
										<h4>Add something to make me happy :)</h4>{" "}
										<a
											href='/'
											className='btn cart-btn-transform m-1 c-primary t-primary'
											data-abc='true'>
											<h2> Continue shopping</h2>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
}