import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import { Redirect } from "react-router-dom";
import StepLabel from "@material-ui/core/StepLabel";
import { Link } from "react-router-dom";
import { Button, SwipeableDrawer } from "@material-ui/core";
import { passUpdateOtp, updatePassword } from "../../../actions/auth.action";
import "./style.css";
import Swal from 'sweetalert2'

import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Header from "../../../components/Header/index";

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

export default function () {
	const steps = ["Phone Number", "Submit OTP", "Change Password"];
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const dispatch = useDispatch();
	const [userOtp, setUserOtp] = useState("");
	const [userPhone, setUserPhone] = useState("");
	const [userPassword, setUserPassword] = useState("");

	const auth = useSelector((state) => state.auth);

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	//Change Pass form

	function getStepContent(activeStep) {
		switch (activeStep) {
			case 0:
				return <Phone />;
			case 1:
				return <Otp />;
			case 2:
				return <ChangePass />;
			default:
				throw new Error("Unknown step");
		}
	}
	function Phone(props) {
		const [phone, setPhone] = useState("");

		const otpRequest = (e) => {
			e.preventDefault();
            if(phone=='')return Swal.fire("Oops...", "Phone number required..", "error");
			setActiveStep(activeStep + 1);
			setUserPhone(phone);

			dispatch(passUpdateOtp(phone));
		};

		return (
			<>
				<div>
					<div className='login-container'>
						<div className='icon-container'></div>
						<form>
							<h2>Phone Number</h2>

							<div className='input-container'>
								<label className='label'>Enter Your Phone Number</label>

								<br />
								<input
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									className='input'
									type='number'
									placeholder='Enter your phone'
                                    required
								/>
							</div>

							<div className='btn-container'>
								<button className='submit-btn' onClick={otpRequest}>
									SENT OTP
								</button>
							</div>
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
            if(otp=='') return
			console.log(otp);

			setUserOtp(otp);
			setActiveStep(activeStep + 1);
			console.log(userOtp);
		};

		return (
			<div className='login-container'>
				<div className='icon-container'></div>
				<form>
					<h2>Submit OTP</h2>

					<div className='input-container'>
						<label className='label'>
							We have sent an OTP to {userPhone}
						</label>

						<br />
						<input
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							className='input'
							type='number'
							placeholder='Enter your OTP'
                            required
						/>
					</div>

					<div className='btn-container'>
						<button className='submit-btn' onClick={onSubmitOtp}>
							Submit OTP
						</button>
					</div>
				</form>
			</div>
		);
	};

	const ChangePass = (props) => {
		const [password, setPassword] = useState("");
		const [confirmPassword, setConfirmPassword] = useState("");
		const onSubmitNewPass = (e) => {
			e.preventDefault();
            if(password!==confirmPassword){
                setConfirmPassword('')
                return Swal.fire("Oops...", "Confirm password again..", "error");}
            if(password.length < 6) return Swal.fire("Oops...", "Password mustbe 6 character long..", "error");

            console.log(password)

			setUserPassword(password);

			const userInfo = { userPhone, password, userOtp };
			console.log(userInfo);
			dispatch(updatePassword(userInfo));
		};
		return (
			<>
				<div className='input-container'>
					<label className='label'>New Password</label>
					<br />
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='input'
						type='password'
						placeholder='New password'
                        required
					/>
				</div>
				<div className='input-container'>
					<label className='label'>Confirm New Password</label>
					<br />
					<input
						onChange={(e) => setConfirmPassword(e.target.value)}
						value={confirmPassword}
						className='input'
						type='password'
						placeholder='Confirm New password'
                        required
					/>
				</div>

				<div className='btn-container'>
					<button className='submit-btn' onClick={onSubmitNewPass}>
						Change Password
					</button>
				</div>
			</>
		);
	};

	// if (auth.authenticate) return <Redirect to='/' />;

	return (
		<React.Fragment>
			<Header fixed />
			<div className='stepper-container'>
				{/* <Header fixed /> */}
				<main className={classes.layout}>
					<Paper className={classes.paper}>
						<Typography component='h1' variant='h4' align='center'>
							<h3>Change Password</h3>
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
