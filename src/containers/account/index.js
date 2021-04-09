import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header";
import {logout} from '../../actions/auth.action'
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { getOrders } from "../../actions";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import "./style.css";
import { getRecharges } from "../../actions/recharge.action";

export default function Account(props) {
	const auth = useSelector((state) => state.auth);
	const user = useSelector((state) => state.user);
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch()

	const userLogout=()=>{
		dispatch(logout())
	}

		useEffect(() => {
			dispatch(getOrders());
			dispatch(getRecharges())
		}, []);

	// useEffect(() => {
	// 	if (!auth.authenticate) return <Redirect to='/' />;
	// }, [auth.authenticate]);

	if (!auth.authenticate) return <Redirect to='/login' />;

	return (
		<>
			<Header fixed></Header>
			<div className='conatiner mt-5'>
				<div className='main-body container pt-3'>
					<div className='row gutters-sm mt-5'>
						<div className='col-md-4 mb-3'>
							<div className='card'>
								<div className='card-body'>
									<div className='d-flex flex-column align-items-center text-center'>
										<img
											src='https://bootdey.com/img/Content/avatar/avatar7.png'
											alt='Admin'
											className='rounded-circle'
											width='150'
										/>
										<div className='mt-3'>
											<h4>{auth.user.name}</h4>
											{/* <p className='text-secondary mb-1'>
												Full Stack Developer
											</p> */}
											<p className='text-muted font-size-sm'>
												{auth.user.address}
											</p>
											<button className='btn btn-primary'>Follow</button>
											<button
												className='btn btn-outline-primary'
												onClick={userLogout}>
												Logout
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className='card mt-3'>
								<ul className='list-group list-group-flush'>
									<li className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
										<h6 className='mb-0'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='24'
												height='24'
												viewBox='0 0 24 24'
												fill='none'
												stroke='currentColor'
												stroke-width='2'
												stroke-linecap='round'
												stroke-linejoin='round'
												className='feather feather-globe mr-2 icon-inline'>
												<circle cx='12' cy='12' r='10'></circle>
												<line x1='2' y1='12' x2='22' y2='12'></line>
												<path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'></path>
											</svg>
											Website
										</h6>
										<span className='text-secondary'>https://bootdey.com</span>
									</li>
									<li className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
										<h6 className='mb-0'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='24'
												height='24'
												viewBox='0 0 24 24'
												fill='none'
												stroke='currentColor'
												stroke-width='2'
												stroke-linecap='round'
												stroke-linejoin='round'
												className='feather feather-github mr-2 icon-inline'>
												<path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'></path>
											</svg>
											Github
										</h6>
										<span className='text-secondary'>bootdey</span>
									</li>
									<li className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
										<h6 className='mb-0'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='24'
												height='24'
												viewBox='0 0 24 24'
												fill='none'
												stroke='currentColor'
												stroke-width='2'
												stroke-linecap='round'
												stroke-linejoin='round'
												className='feather feather-twitter mr-2 icon-inline text-info'>
												<path d='M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z'></path>
											</svg>
											Twitter
										</h6>
										<span className='text-secondary'>@bootdey</span>
									</li>
									<li className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
										<h6 className='mb-0'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='24'
												height='24'
												viewBox='0 0 24 24'
												fill='none'
												stroke='currentColor'
												stroke-width='2'
												stroke-linecap='round'
												stroke-linejoin='round'
												className='feather feather-instagram mr-2 icon-inline text-danger'>
												<rect
													x='2'
													y='2'
													width='20'
													height='20'
													rx='5'
													ry='5'></rect>
												<path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'></path>
												<line x1='17.5' y1='6.5' x2='17.51' y2='6.5'></line>
											</svg>
											Instagram
										</h6>
										<span className='text-secondary'>bootdey</span>
									</li>
									<li className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
										<h6 className='mb-0'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='24'
												height='24'
												viewBox='0 0 24 24'
												fill='none'
												stroke='currentColor'
												stroke-width='2'
												stroke-linecap='round'
												stroke-linejoin='round'
												className='feather feather-facebook mr-2 icon-inline text-primary'>
												<path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'></path>
											</svg>
											Facebook
										</h6>
										<span className='text-secondary'>bootdey</span>
									</li>
								</ul>
							</div>
						</div>
						<div className='col-md-8'>
							<div className='card mb-3'>
								<div className='card-body'>
									<div className='row'>
										<div className='col-sm-3'>
											<h6 className='mb-0'>Full Name</h6>
										</div>
										<div className='col-sm-9 text-secondary'>
											{auth.user.name}
										</div>
									</div>
									<hr />
									<div className='row'>
										<div className='col-sm-3'>
											<h6 className='mb-0'>Email</h6>
										</div>
										<div className='col-sm-9 text-secondary'>
											{auth.user.email}
										</div>
									</div>
									<hr />
									<div className='row'>
										<div className='col-sm-3'>
											<h6 className='mb-0'>Phone</h6>
										</div>
										<div className='col-sm-9 text-secondary'>
											{auth.user.phone}
										</div>
									</div>
									<hr />
									<div className='row'>
										<div className='col-sm-3'>
											<h6 className='mb-0'>Mobile</h6>
										</div>
										<div className='col-sm-9 text-secondary'>
											{auth.user.phone}
										</div>
									</div>
									<hr />
									<div className='row'>
										<div className='col-sm-3'>
											<h6 className='mb-0'>Address</h6>
										</div>
										<div className='col-sm-9 text-secondary'>
											Bay Area, San Francisco, CA
										</div>
									</div>
								</div>
							</div>
							<div className='row gutters-sm'>
								<div className='col-sm-6 mb-3'>
									<div className='card h-100'>
										<div className='card-body ' style={{ display: "flex" }}>
											<Link to='/account/orders' style={{ width: "100%" }}>
												<div className=' smallDiv'>
													Total Orders -
													{user.orders.length ? user.orders.length : 0}
												</div>
											</Link>
											<Link to='/cart' style={{ width: "100%" }}>
												<div className='smallDiv'>
													<LocalGroceryStoreIcon
														style={{ fontSize: "25px", margin: "5px" }}
													/>{" "}
													In Cart -
													{cart.cartItems.length ? cart.cartItems.length : 0}
													(items)
												</div>
											</Link>
											<br />
										</div>
										<div className='card-body ' style={{ display: "flex" }}>
											<Link to='/wallet' style={{ width: "100%" }}>
												<div className='smallDiv'>
													<AccountBalanceWalletIcon
														style={{ fontSize: "25px", margin: "5px" }}
													/>{" "}
													Wallet-
													<br />
													{auth.user.balance}
													BDT
												</div>
											</Link>
										</div>
									</div>
								</div>
								<div className='col-sm-6 mb-3'>
									<div className='card h-100'>
										<div className='card-body' style={{ display: "flex" }}>
											<Link to='/account/recharge' style={{ width: "100%" }}>
												<div className=' smallDiv'>Mobile Recharge</div>
											</Link>
										</div>
										<div className='card-body' style={{ display: "flex" }}>
											<Link to='/account/recharge/history' style={{ width: "100%" }}>
												<div className='smallDiv'>Recharge History</div>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
