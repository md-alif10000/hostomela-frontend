import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header";
import { logout, updateProfile } from "../../actions/auth.action";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { getOrders } from "../../actions";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import "./style.css";
import { generatePublicUrl } from "../../urlconfig";
import { Fade } from "react-reveal";
import ReactDOM from "react-dom";
import Modal from "react-modal";

export default function Account(props) {
	const [updateModal, setupdateModal] = useState(false);

	const auth = useSelector((state) => state.auth);
	const user = useSelector((state) => state.user);
	const cart = useSelector((state) => state.cart);

	const [name, setName] = useState(auth.user.name);
	const [email, setEmail] = useState(auth.user.email);
	const [phone, setPhone] = useState(auth.user.phone);
	const [address, setAddress] = useState(auth.user.address);
	const [image, setImage] = useState('')
	const [profilePicture, setProfilePicture] = useState(
		auth.user.profilePicture
	);

	const dp = auth.user.profilePicture
		? auth.user.profilePicture.slice(0, 4) == "http"
			? auth.user.profilePicture
			: generatePublicUrl(auth.user.profilePicture)
		: " https://bootdey.com/img/Content/avatar/avatar7.png";
	const dispatch = useDispatch();

	const userLogout = () => {
		dispatch(logout());
	};

	useEffect(() => {
		dispatch(getOrders());
	}, []);

	if (!auth.authenticate) return <Redirect to='/login' />;

	const update_profile = (e) => {
		e.preventDefault();

		console.log('Updating..........')
	
	const form=new FormData()

	console.log(image)

	form.append("name",name)
	form.append("phone", phone);
	form.append("address", address);
	form.append("profilePicture",image)

	dispatch(updateProfile(form))

	setupdateModal(false)
	
	}


	const imageHandler=(e)=>{
		setImage(e.target.files[0])

	}

	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
			maxWidth: "600px",
		},
	};

	const profileUpdateModal = () => {
		return (
			<div style={{ maxWidth: "600px" }}>
				<Modal
					isOpen={updateModal}
					onAfterOpen={() => setupdateModal(true)}
					onRequestClose={() => setupdateModal(false)}
					style={customStyles}
					contentLabel='Edit your profile'>
					<button className='btn btn-lg btn-danger'>cancel</button>

					<div className='row text-center py-5'>
						<h2>Update Profile</h2>
						<div className='col-sm-12  text-center'>
							<img
								src={profilePicture}
								alt='Admin'
								className='rounded-circle m-3'
								width='150'
							/>
							<div>
								<input type='file' id='files' onChange={imageHandler} className='btn btn-primary' />
							</div>
						</div>

						<div className='col-sm-12'>
							<form>
								<div className='input-container'>
									<label className='label'>Your Full name</label>
									<br />
									<input
										value={name}
										onChange={(e) => setName(e.target.value)}
										className='input'
										type='text'
										placeholder='Your Full Name'
									/>
								</div>
								<div className='input-container'>
									<label className='label'>Your Email</label>
									<br />
									<input
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className='input'
										type='email'
										readOnly
										placeholder='Your email'
									/>
								</div>
								<div className='input-container'>
									<label className='label'>Phone Number</label>
									<br />
									<input
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										className='input'
										type='text'
										placeholder='Your phone'
									/>
								</div>
								<div className='input-container'>
									<label className='label'>Address</label>
									<br />
									<input
										value={address}
										onChange={(e) => setAddress(e.target.value)}
										className='input'
										type='text'
										placeholder='Your Address'
									/>
								</div>
								<div className='btn-container'>
									<button className='submit-btn' onClick={ update_profile}>
										Update Profile
									</button>
								</div>
							</form>
						</div>
					</div>
				</Modal>
			</div>
		);
	};

	return (
		<>
			<Header fixed></Header>
			{profileUpdateModal()}
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
												<button
													className='btn btn-primary mx-2'
													onClick={() => setupdateModal(true)}>
													Update
												</button>
												<button
													className='btn btn-outline-primary mx-2'
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
