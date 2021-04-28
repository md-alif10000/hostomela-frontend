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
import { generatePublicUrl } from "../../urlconfig";
import { Fade } from "react-reveal";


export default function Account(props) {
	const auth = useSelector((state) => state.auth);
	const user = useSelector((state) => state.user);
	const cart = useSelector((state) => state.cart);
	
	const dp = auth.user.profilePicture
		? auth.user.profilePicture.slice(0, 4) == "http"
			? auth.user.profilePicture
			: generatePublicUrl(auth.user.profilePicture)
		: " https://bootdey.com/img/Content/avatar/avatar7.png";
	const dispatch = useDispatch()

	const userLogout=()=>{
		dispatch(logout())
	}

		useEffect(() => {
			dispatch(getOrders());
	
		}, []);



	if (!auth.authenticate) return <Redirect to='/login' />;

	return (
		<>
			<Header fixed></Header>
			<div className='account-container mt-5'>
				<div className='main-body  pt-3'>
					<Fade bottom cascade>
						<div className='row gutters-sm mt-5'>
							<div className='col-md-4 mb-3'>
								<div className='card rounded-3'>
									<div className='card-body'>
										<div className='d-flex flex-column align-items-center text-center rounded-3'>
											<img
												src={dp}
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
							</div>
							<div className='col-md-8 rounded-3'>
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

												<br />
											</div>
											{/* <div className='card-body ' style={{ display: "flex" }}>
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
										</div> */}
										</div>
									</div>
									<div className='col-sm-6 mb-3'>
										<div className='card h-100'>
											<div className='card-body' style={{ display: "flex" }}>
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
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Fade>
				</div>
			</div>
		</>
	);
}
