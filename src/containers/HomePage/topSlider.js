import React, { Component } from "react";


export default function TopSlider() {
	
	return (
		<div>
			<div
				id='carouselExampleDark'
				className='carousel carousel-dark slide'
				data-bs-ride='carousel'>
				<div className='carousel-indicators'>
					<button
						type='button'
						data-bs-target='#carouselExampleDark'
						data-bs-slide-to='0'
						className='active'
						aria-current='true'
						aria-label='Slide 1'></button>
					<button
						type='button'
						data-bs-target='#carouselExampleDark'
						data-bs-slide-to='1'
						aria-label='Slide 2'></button>
					<button
						type='button'
						data-bs-target='#carouselExampleDark'
						data-bs-slide-to='2'
						aria-label='Slide 3'></button>
				</div>
				<div className='carousel-inner'>
					<div className='carousel-item active' data-bs-interval='10000'>
						<img
							src='https://ak.picdn.net/shutterstock/videos/1036421099/thumb/4.jpg'
							className='d-block w-100 sliderImage'
							alt='...'
						/>
						<div className='carousel-caption d-none d-md-block'>
							<h5>First slide label</h5>
							<p>
								Some representative placeholder content for the first slide.
							</p>
						</div>
					</div>
					<div className='carousel-item' data-bs-interval='2000'>
						<img
							src='https://i.pinimg.com/originals/f7/f2/a2/f7f2a27aa9d45b73d6b52a40eabb50ae.png'
							className='d-block w-100 sliderImage'
							alt='...'
						/>
						<div className='carousel-caption d-none d-md-block'>
							<h5>Second slide label</h5>
							<p>
								Some representative placeholder content for the second slide.
							</p>
						</div>
					</div>
					<div className='carousel-item'>
						<img
							src='https://www.intelligencenode.com/blog/wp-content/uploads/2019/02/electronics.jpg'
							className='d-block w-100 sliderImage'
							alt='...'
						/>
						<div className='carousel-caption d-none d-md-block'>
							<h5>Third slide label</h5>
							<p>
								Some representative placeholder content for the third slide.
							</p>
						</div>
					</div>
				</div>
				<button
					className='carousel-control-prev'
					type='button'
					data-bs-target='#carouselExampleDark'
					data-bs-slide='prev'>
					<span
						className='carousel-control-prev-icon'
						aria-hidden='true'></span>
					<span className='visually-hidden'>Previous</span>
				</button>
				<button
					className='carousel-control-next'
					type='button'
					data-bs-target='#carouselExampleDark'
					data-bs-slide='next'>
					<span
						className='carousel-control-next-icon'
						aria-hidden='true'></span>
					<span className='visually-hidden'>Next</span>
				</button>
			</div>
		</div>
	);
}
