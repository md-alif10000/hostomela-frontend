import React from "react";
import './style.css'
import Header from '../../components/Header'
import Footer from "../../components/Footer";

export default function ContactUs() {
	return (
        <>
        <Header fixed/>
		<div className='contactContainer'>
			<form action='MAILTO:md.alif10000@gmail.com' method='post' encType='text/plain'>
				<div className='row'>
					<h1>contact us</h1>
				</div>
				<div className='row'>
					<h4 style={{ textAlign: "center" }}>We'd love to hear from you!</h4>
				</div>
				<div className='row input-container'>
					<div className='col-xs-12'>
						<div className='styled-input wide'>
							<input type='text' required name='name' />
							<label>Name</label>
						</div>
					</div>
					<div className='col-md-6 col-sm-12'>
						<div className='styled-input'>
							<input type='text' required name='email' />
							<label>Email</label>
						</div>
					</div>
					<div className='col-md-6 col-sm-12'>
						<div className='styled-input' style={{ float: "right" }}>
							<input type='text' required />
							<label>Phone Number</label>
						</div>
					</div>
					<div className='col-xs-12'>
						<div className='styled-input wide'>
							<textarea required></textarea>
							<label>Message</label>
						</div>
					</div>
					<div className='col-xs-12'>
						<input type='submit' className='btn-lrg submit-btn' value='Send Message' />
						{/* <button type='submit' className='btn-lrg submit-btn'>
							Send Message
						</button> */}
						{/* <div className='btn-lrg submit-btn'></div> */}
					</div>
				</div>
			</form>
		</div>
        <Footer/>
        </>
	);
}
