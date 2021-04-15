import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import {Link} from 'react-router-dom'
import Review from "./Review";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import { addAddress, getAddress, addOrder } from "../../../actions/user.action";
import { getCartItems } from "../../../actions/cart.action";
import "./style.css";
import Swal from "sweetalert2";
import { Button, SwipeableDrawer } from "@material-ui/core";
import "./style.css";
import { Redirect } from "react-router";
import Header from "../../../components/Header/index";
import { deliveryCharge } from "../../../utils/getParams";

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{"Copyright © "}
			<Link color='inherit' href='https://material-ui.com/'>
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: "relative",
	},
	layout: {
		width: "auto",
		fontSize: "1.8 rem",
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
			marginLeft: "auto",
			marginRight: "auto",
		},
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
	stepper: {
		padding: theme.spacing(3, 0, 5),
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end",
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
}));

export default function Checkout(props) {
	const [paymentType, setPaymentType] = useState("");
	const [shippingMethod, setShippingMethod] = useState('')
	console.log(paymentType);
	const user = useSelector((state) => state.user);
	const selectedAddress = user.address.slice(user.address.length - 1)[0];

	const steps = ["Shipping address", "Review your order",'Select Shipping Method', " Payment details"];
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const dispatch = useDispatch();

	const auth = useSelector((state) => state.auth);
	const cart = useSelector((state) => state.cart);
	const coupon=JSON.parse(localStorage.getItem('coupon'))

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	const couponAmount= coupon ? coupon.type== 'percentage'? coupon.amount*(1/100) : coupon.amount :null
	console.log("Coupon Amount",couponAmount)

	//Address from Hooks............

	//Order confirm hooksssss............
	const [confirmOrder, setConfirmOrder] = useState("");
	const onConfirmOrder = () => {
		var TotalAmount = Object.keys(cart.cartItems).reduce(
			(totalPrice, key) => {
				const { price, qty } = cart.cartItems[key];
				return totalPrice + price * qty;
			},
			0
		);

		var totalAmount = coupon
			? coupon.type == "percentage"
				? TotalAmount * (1 - couponAmount)
				: totalAmount - couponAmount + deliveryCharge
			: (TotalAmount + deliveryCharge);

	console.log("latest total",totalAmount)



		const items = Object.keys(cart.cartItems).map((key) => ({
			productId: key,
			payablePrice: cart.cartItems[key].price,
			purchasedQty: cart.cartItems[key].qty,
		}));
		const payload = {
			addressId: selectedAddress._id,
			totalAmount,
			items,
			paymentStatus: "pending",
			paymentType,
			coupon:coupon ? coupon._id:null
		};

		console.log(payload);
		dispatch(addOrder(payload));
		setActiveStep(activeStep+1)
		localStorage.removeItem('coupon')
		setConfirmOrder(true);
	};

	// useEffect(() => {
	// 	dispatch(getAddress());
	// }, [user.address]);

	useEffect(() => {
		auth.authenticate && dispatch(getAddress());
		auth.authenticate && dispatch(getCartItems());
	}, [auth.authenticate]);

	function getStepContent(activeStep) {
		switch (activeStep) {
			case 0:
				return <AddressForm />;
			case 1:
				return <Review />;
			case 2:
				return <ShippingMethod/>
			case 3:
				return <PaymentForm />;
			default:
				throw new Error("Unknown step");
		}
	}

	//Address form............

	function AddressForm(props) {
		const previousAddress = user.address;
		const oldAddress = user.address.slice(user.address.length - 1)[0];
		console.log(oldAddress);
		// useEffect(() => {
		// 	dispatch(getAddress());
		// }, [user.address]);
		const [name, setName] = useState(oldAddress ? oldAddress.name : "");

		const [mobileNumber, setMobileNumber] = useState(
			oldAddress ? oldAddress.mobileNumber : ""
		);
		const [zipCode, setZipCode] = useState(
			oldAddress ? oldAddress.zipCode : ""
		);

		const [address, setAddress] = useState(
			oldAddress ? oldAddress.address : ""
		);
		const [cityDistrict, setCityDistrict] = useState(
			oldAddress ? oldAddress.cityDistrict : ""
		);

		const [alternatePhone, setAlternatePhone] = useState(
			oldAddress ? oldAddress.alternatePhone : ""
		);

		console.log(oldAddress);
		const [id, setId] = useState(oldAddress ? oldAddress._id : "");
		console.log(name);

		const onAddressSubmit = (e) => {
			const payload = {
				address: {
					name,
					mobileNumber,
					zipCode,
					address,
					cityDistrict,
					alternatePhone,
				},
			};
			console.log(payload);
			if (id) {
				payload.address._id = id;
			}
			if (name == "") {
				return Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Name is required...!",
				});
			}
			if (address == "") {
				return Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Address is required....!",
				});
			}

			if (mobileNumber == "") {
				return Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Mobile number is required..!",
				});
			}
			if (zipCode == "") {
				return Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Zipcode is required..!",
				});
			}
			if (cityDistrict == "") {
				return Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "City/district is required..!",
				});
			}

			dispatch(addAddress(payload));
			setActiveStep(activeStep + 1);
		};






		return (
			<React.Fragment>
				<div className='mainContainer' style={{ fontSize: "1.8rem" }}>
					<Typography variant='h6' gutterBottom>
						<h4>Shipping address</h4>
					</Typography>

					<div class='content'>
						<form action='#'>
							<div class='user-details'>
								<div class='input-box'>
									<span class='details'>Full Name</span>
									<input
										type='text'
										placeholder='Enter your name'
										required
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div class='input-box'>
									<span class='details'>Full Address</span>
									<input
										type='text'
										placeholder='Enter your address'
										required
										value={address}
										onChange={(e) => setAddress(e.target.value)}
									/>
								</div>
								<div class='input-box'>
									<span class='details'>City/District</span>
									<input
										type='text'
										placeholder='Enter your email'
										required
										value={cityDistrict}
										onChange={(e) => setCityDistrict(e.target.value)}
									/>
								</div>
								<div class='input-box'>
									<span class='details'>Zip Code</span>
									<input
										type='text'
										placeholder='Enter your number'
										required
										value={zipCode}
										onChange={(e) => setZipCode(e.target.value)}
									/>
								</div>
								<div class='input-box'>
									<span class='details'>Phone Number</span>
									<input
										value={mobileNumber}
										type='text'
										placeholder='Enter your Phone Number'
										required
										onChange={(e) => setMobileNumber(e.target.value)}
									/>
								</div>
								<div class='input-box'>
									<span class='details'>Secondary Phone (optional)</span>
									<input
										value={alternatePhone}
										type='text'
										placeholder='Enter Secondary Phone'
										required
										onChange={(e) => setAlternatePhone(e.target.value)}
									/>
								</div>
							</div>
					
							<div class='button'>
								<input
									type='submit'
									value='Submit Address'
									onClick={onAddressSubmit}
								/>
							</div>
						</form>
					</div>
					{/* <Button
						fullWidth
						style={{ backgroundColor: "yellow", color: "gray" }}
						
						<h5>Submit Address</h5>
					</Button> */}
				</div>
			</React.Fragment>
		);
	}

	const ShippingMethod = () => {

		const onSubmitShippingMethod=(e)=>{
			e.preventDefault()
			console.log(shippingMethod)
			setActiveStep(activeStep+1)
		}
		return (
			<React.Fragment>
				<Typography variant='h6' gutterBottom>
					Shipping Method
				</Typography>
				<Grid container spacing={3}>
					<FormControl component='fieldset'>
						{/* <FormLabel component='legend'>Payment Type</FormLabel> */}
						<RadioGroup
							aria-label='Payment Type'
							name='gender1'
							value={shippingMethod}
							onChange={(e) => setShippingMethod(e.target.value)}>
							<FormControlLabel
								value='comilla-1-4'
								control={<Radio />}
								label='Comill City (1-4 day)'
							/>
							<FormControlLabel
								value='dhaka-1-4'
								control={<Radio />}
								label='Dhaka (1-4 days)'
							/>
							<FormControlLabel
								value='outside-1-10'
								control={<Radio />}
								label='Outside (1-4 days)'
							/>
							<FormControlLabel
								value='grocery-comilla-1-3'
								control={<Radio />}
								label='Grocery in Comilla (1-3 days)'
							/>
							<FormControlLabel
								value='grocery-comilla-1'
								control={<Radio />}
								label='Grocery in Comilla (Titas,Homna,Meghna,Daudkandi--1 Day)'
							/>
						</RadioGroup>
					</FormControl>

				
					<Button
						fullWidth
						style={{ color: "black", backgroundColor: "#f0c800" }}
						onClick={(e) => onSubmitShippingMethod(e)}>
						<h5>Next Step</h5>
					</Button>
				</Grid>
			</React.Fragment>
		);
	};

	function PaymentForm() {
		return (
			<React.Fragment>
				<Typography variant='h6' gutterBottom>
					Payment method
				</Typography>
				<Grid container spacing={3}>
					<FormControl component='fieldset'>
						{/* <FormLabel component='legend'>Payment Type</FormLabel> */}
						<RadioGroup
							aria-label='Payment Type'
							name='gender1'
							value={paymentType}
							onChange={(e) => setPaymentType(e.target.value)}>
							<FormControlLabel
								value='bkash'
								control={<Radio />}
								label='Bkash'
							/>
							<FormControlLabel
								value='ssl'
								control={<Radio />}
								label='SSL Commerce'
							/>
							<FormControlLabel
								value='cod'
								control={<Radio />}
								label='Cash On Delivery'
							/>
						</RadioGroup>
					</FormControl>
					<Button
						fullWidth
						style={{ color: "black", backgroundColor: "#f0c800" }}
						onClick={paymentType == "" ? null : onConfirmOrder}>
						<h5>Confirm Order</h5>
					</Button>
				</Grid>
			</React.Fragment>
		);
	}

	if (!cart.cartItems) {
		return <Redirect to='/' />;
	
	}
		if (!auth.authenticate) return <Redirect to='/login'></Redirect>;
	return (
		<React.Fragment>
			<div className='mainContainer'>
				{/* <CssBaseline /> */}
				<Header fixed/>
				<main className={classes.layout}>
					<Paper className={classes.paper}>
						<Typography component='h1' variant='h4' align='center'>
							<h3>Checkout</h3>
						</Typography>
						<Stepper activeStep={activeStep} className={classes.stepper}>
							{steps.map((label) => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
						<React.Fragment>
							{activeStep === steps.length ? (
								<React.Fragment>
									<Typography variant='h5' gutterBottom>
										Thank you for your order.
									</Typography>
									<Typography variant='subtitle1'>
										Your order is Placed. We have emailed your order
										confirmation to <strong>{auth.user.email}</strong>, and will
										send you an update when your order has shipped.
									</Typography>
									<Link to='/account/orders'>
										<Button color='orange'>Go to order page</Button>
									</Link>
								</React.Fragment>
							) : (
								<React.Fragment>
									{getStepContent(activeStep)}
									<div className={classes.buttons}>
										{activeStep !== 0 && (
											<Button onClick={handleBack} className={classes.button}>
												Back
											</Button>
										)}
										{activeStep == 1 ? (
											<Button
												variant='contained'
												color='primary'
												onClick={handleNext}
												className={classes.button}>
												{activeStep === steps.length - 1
													? "Place order"
													: "Next"}
											</Button>
										) : null}
									</div>
								</React.Fragment>
							)}
						</React.Fragment>
					</Paper>
					<Copyright />
				</main>
			</div>
		</React.Fragment>
	);
}
