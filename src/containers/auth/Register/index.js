import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import { Redirect } from "react-router-dom";
import StepLabel from "@material-ui/core/StepLabel";
import { Link } from "react-router-dom";
import { Button, SwipeableDrawer } from "@material-ui/core";
import { register,registerOtp,googleLogin, facebookLogin } from "../../../actions/auth.action";
import "./style.css";

import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Header from "../../../components/Header/index";
import Swal from "sweetalert2";
import SocialLogin from "../socialLogin";
import Loader from "../../../components/Loader";

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: "relative",
	},
	layout: {
		width: "auto",
		fontSize: "1.8 rem",
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(400 + theme.spacing(2) * 2)]: {
			width: 400,
			marginLeft: "auto",
			marginRight: "auto",
		},
	},
	paper: {
		backgroundColor: '#d4418e',
backgroundImage: 'linear-gradient(315deg, #d4418e 0%, #0652c5 74%)',
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(0),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
	stepper: {
		borderRadius:'20px',
		fontSize:'18px',
		color:'#ffff',
		 backgroundImage: 'linear-gradient(315deg, #bc52d1 0%, #871d9c 74%)',
  
  backgroundColor:'#bc52d1',
  boxShadow: '-2px 2px 3px 2px #ec96fd',
  margin:'20px 0'
		
		// padding: theme.spacing(3, 0, 5),
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

export default function () {
	const steps = ["Register info", "OTP verification"];
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const dispatch = useDispatch();
	const [userDetails, setUserDetails] = useState({});
	const userInfo=userDetails


	const auth = useSelector((state) => state.auth);
	const cart = useSelector((state) => state.cart);

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};



	//Register Form

	function getStepContent(activeStep) {
		switch (activeStep) {
			case 0:
				return <Register />;
			case 1:
				return <Otp />;
			// case 2:
			// 	return <PaymentForm />;
			default:
				throw new Error("Unknown step");
		}
	}
	function Register(props) {
		const [name, setName] = useState("");
		const [email, setEmail] = useState("");
		const [phone, setPhone] = useState("");
		const [password, setPassword] = useState("");
		const [confirmPassword, setConfirmPassword] = useState("");
		const [profilePicture, setProfilePicture] = useState('')


		const otpRequest=(e)=>{
			e.preventDefault()
			if(name=='')return Swal.fire("Opps !", "Name is required", "warning");
			if(phone=='')return Swal.fire('Opps !','Phone number is required','warning')
			if(phone.length != 11)return Swal.fire("Opps !", "Wrong phone number", "warning");
			if(password.length <=5)return Swal.fire("Opps !", "Password must be 6 Character long", "warning");
			if (confirmPassword == "")return Swal.fire("Opps !", "Please confirm your password", "warning");
			if(password!==confirmPassword)return Swal.fire("Opps !", "Password didn't match", "warning");


	 console.log(profilePicture)
				setActiveStep(activeStep + 1);
			dispatch(registerOtp(phone))
			setUserDetails({ name, email, phone, password,profilePicture });
			console.log('otp sending')
		}




		const responseSuccessGoogle=(response)=>{

			dispatch(googleLogin({tokenId:response.tokenId}))

		}
		const responseFailureGoogle=(err)=>{
			console.log(err)

		}


		const responseFacebook=(response)=>{
			console.log(response)
			dispatch(facebookLogin({accessToken:response.accessToken,userID:response.userID,picture:response.picture}))

		}

		return (
			<>
				<div>
					<div className='login-container'>
						<div className='icon-container'></div>
						<form>
							<h2>Register</h2>
							<div className='input-container'>
								<label className='label'>Enter Your Full name</label>
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
								<label className='label'>Enter Your Email</label>
								<br />
								<input
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='input'
									type='email'
									placeholder='Enter your email'
								/>
							</div>
							<div className='input-container'>
								<label className='label'>Enter Your Phone Number</label>

								<br />
								<input
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									className='input'
									type='text'
									placeholder='Enter your phone'
								/>
							</div>
							{/* <div>
								<input
									type='file'
									className='btn btn-success'
									placeholder='Choose Picture'
									onChange={(e) => setProfilePicture(e.target.value)}
								/>
							</div> */}
							<div className='input-container'>
								<label className='label'>Password</label>
								<br />
								<input
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className='input'
									type='password'
									placeholder='Your password'
								/>
							</div>
							<div className='input-container'>
								<label className='label'>Confirm Password</label>
								<br />
								<input
									onChange={(e) => setConfirmPassword(e.target.value)}
									value={confirmPassword}
									className='input'
									type='password'
									placeholder='Confirm password'
								/>
							</div>

							<div className='btn-container'>
								<button className='submit-btn' onClick={otpRequest}>
									Register
								</button>
							</div>
							<p>
								Already have an account?{" "}
								<Link style={{ color: "#b8892c" }} to='/login'>
									Login here
								</Link>
							</p>
							<SocialLogin />
						</form>
					</div>
				</div>
			</>
		);
	} 

	const Otp = (props) => {
		const [otp, setOtp] = useState("");

		const onSubmitOtp = (e) => {
			e.preventDefault();
			console.log(otp);

			userInfo.otp = otp;
			console.log(userInfo);
			dispatch(register(userInfo));
		};

		return (
			<div className='login-container'>
				<div className='icon-container'></div>
				<form>
					<h2>Submit OTP</h2>

					<div className='input-container'>
						<label className='label'>We have sent an OTP to {userInfo.phone}</label>

						<br />
						<input
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							className='input'
							type='text'
							placeholder='Enter your OTP'
						/>
					</div>

					<div className='btn-container'>
						<button className='submit-btn' onClick={onSubmitOtp}>
							Submit & Register
						</button>
					</div>
					<p>
						Already have an account?{" "}
						<Link style={{ color: "#b8892c" }} to='/login'>
							Login here
						</Link>
					</p>
				</form>
			</div>
		);
	};

	if (auth.authenticate) return <Redirect to='/' />;
	
	if(auth.authenticating) return <Loader/>

	return (
		<React.Fragment>
			<Header fixed />
			<div className='stepper-container'>
				{/* <Header fixed /> */}
				<main className={classes.layout}>
					<Paper className={classes.paper}>
						<Typography component='h1' variant='h4' align='center'>
							<h3 className='t-primary'>Register</h3>
						</Typography>
						<Stepper activeStep={activeStep} className={classes.stepper}>
							{steps.map((label) => (
								<Step key={label}>
									<StepLabel>
										<span className='font-14 t-primary'>{label}</span>{" "}
									</StepLabel>
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
										{/* {activeStep == 1 ? (
											<Button
												variant='contained'
												color='primary'
												onClick={handleNext}
												className={classes.button}>
												{activeStep === steps.length - 1
													? "Place order"
													: "Next"}
											</Button>
										) : null} */}
									</div>
								</React.Fragment>
							)}
						</React.Fragment>
					</Paper>
				</main>
			</div>
		</React.Fragment>
	);
}
