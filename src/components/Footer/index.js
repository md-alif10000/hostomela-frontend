import React,{useState} from 'react'
import './style.css'
import {Link} from 'react-router-dom'
import Social from '../Social'
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

export default function Footer() {
	const [link1, setLink1] = useState(false)
		const [link2, setLink2] = useState(false);
			const [link3, setLink3] = useState(false);

	const handleFooterLink1=()=>{
		if(link1) setLink1(false)
		else{
        setLink1(true);
		}
		
	}
		const handleFooterLink2 = () => {
			if(link2) setLink2(false);
			else{
              setLink2(true);
			}
			
		};

			const handleFooterLink3 = () => {
				if (link3) setLink3(false);
				else{
                   setLink3(true);
				}
				
			};




    return (
			<footer id='footer' className='section footer bg-dark'>
				<div className='container my-0 '>
					<div className='footer-container'>
						<div className='footer-center'>
							<div className='link-header'>
								<h3>EXTRAS</h3>
								<span className='footer-arrow' onClick={handleFooterLink1}>
									<KeyboardArrowDownIcon style={{ fontSize: "26px" }} />
								</span>
							</div>

							<div className={link1 ? null : "footer-link-container"}>
								<Link to='#'>Brands</Link>
								<Link to='/about-us'>About Us</Link>
								<Link to='/contact-us'>Contact Us</Link>
							</div>
						</div>
						<div className='footer-center'>
							<div className='link-header'>
								{" "}
								<h3>INFORMATION</h3>
								<span className='footer-arrow' onClick={handleFooterLink2}>
									<KeyboardArrowDownIcon style={{ fontSize: "26px" }} />
								</span>
							</div>

							<div className={link2 ? null : "footer-link-container"}>
								<Link to='/privacy-policy'>Privacy Policy</Link>
								<Link to='/terms&conditions'>Terms & Conditions</Link>
								<Link to='/return-policy'>Return Policy</Link>
							</div>
						</div>
						<div className='footer-center'>
							<div className='link-header'>
								<h3>MY ACCOUNT</h3>
								<span className='footer-arrow' onClick={handleFooterLink3}>
									<KeyboardArrowDownIcon style={{ fontSize: "26px" }} />
								</span>
							</div>
							<div className={link3 ? null : "footer-link-container"}>
								<Link to='/account'>My Account</Link>
								<Link to='/account/orders'>Order History</Link>
								<Link to='#'>Wish List</Link>
							</div>
						</div>
						<div className='footer-center'>
							<h3>CONTACT US</h3>
							<div>
								<span>
									<i className='fas fa-map-marker-alt'></i>
								</span>
								Address: House 36, Road 2/A, Block E, Sector 15, Uttara, Dhaka
								1230. Bangladesh.
							</div>
							<div>
								<span>
									<i className='far fa-envelope'></i>
								</span>
								📩 E-mail: hostomela@gmail.com
							</div>
							<div>
								<span>
									<i className='fas fa-phone'></i>
								</span>
								📞 Phone: (+88)01400691122 .
							</div>
							<div className='payment-methods'>
								<img src='./images/payment.png' alt='' />
							</div>
							{/* <div className='m-3 p-3'> */}{" "}
							{/* <Social title='Follow us on' /> */}
							{/* </div> */}
						</div>
					</div>
				</div>
			</footer>
		);
}
