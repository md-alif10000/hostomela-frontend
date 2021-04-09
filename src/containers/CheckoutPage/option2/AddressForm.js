// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import { addAddress } from "../../../actions/user.action";
// import "./style.css";
// import Swal from "sweetalert2";
// import { Button, SwipeableDrawer } from "@material-ui/core";

// export default function AddressForm(props) {
// 	const { initialData, onCancel } = props;
// 	const [name, setName] = useState(initialData ? initialData.name : "");
// 	const [mobileNumber, setMobileNumber] = useState(
// 		initialData ? initialData.mobileNumber : ""
// 	);
// 	const [zipCode, setZipCode] = useState(
// 		initialData ? initialData.pinCode : ""
// 	);
// 	const [locality, setLocality] = useState(
// 		initialData ? initialData.locality : ""
// 	);
// 	const [address, setAddress] = useState(
// 		initialData ? initialData.address : ""
// 	);
// 	const [cityDistrict, setCityDistrict] = useState(
// 		initialData ? initialData.cityDistrictTown : ""
// 	);
// 	const [state, setState] = useState(initialData ? initialData.state : "");
// 	const [landmark, setLandmark] = useState(
// 		initialData ? initialData.landmark : ""
// 	);
// 	const [alternatePhone, setAlternatePhone] = useState(
// 		initialData ? initialData.alternatePhone : ""
// 	);
// 	const [addressType, setAddressType] = useState(
// 		initialData ? initialData.addressType : ""
// 	);
// 	const dispatch = useDispatch();
// 	const user = useSelector((state) => state.user);

// 	const [submitFlag, setSubmitFlag] = useState(false);
// 	const [id, setId] = useState(initialData ? initialData._id : "");

// 	const onAddressSubmit = (e) => {
// 		const payload = {
// 			address: {
// 				name,
// 				mobileNumber,
// 				zipCode,
// 				address,
// 				cityDistrict,
// 				alternatePhone,
// 			},
// 		};
// 		console.log(payload);
// 		if (id) {
// 			payload.address._id = id;
// 		}
// 		if (name || mobileNumber || zipCode || address || cityDistrict == "") {
// 			return Swal.fire({
// 				icon: "error",
// 				title: "Oops...",
// 				text: "Submit form correctly..!",
// 			});
// 		}
// 		dispatch(addAddress(payload));
// 		setSubmitFlag(true);
// 	};

// 	return (
// 		<React.Fragment>
// 			<div className='mainContainer' style={{ fontSize: "1.8rem" }}>
// 				<Typography variant='h6' gutterBottom>
// 					<h4>Shipping address</h4>
// 				</Typography>
// 				<Grid container spacing={3}>
// 					<Grid item xs={12} sm={6}>
// 						<TextField
// 							required
// 							id='firstName'
// 							name='Full Name'
// 							label='Full name'
// 							onChange={(e) => setName(e.target.value)}
// 							fullWidth
// 							autoComplete='given-name'
// 						/>
// 					</Grid>
// 					{/* <Grid item xs={12} sm={6}>
// 						<TextField
// 							required
// 							id='lastName'
// 							name='lastName'
// 							label='Last name'
// 							fullWidth
// 							autoComplete='family-name'
// 						/>
// 					</Grid> */}
// 					<Grid item xs={12}>
// 						<TextField
// 							required
// 							id='address1'
// 							name='address1'
// 							label='Address line 1'
// 							fullWidth
// 							onChange={(e) => setAddress(e.target.value)}
// 							autoComplete='shipping address-line1'
// 						/>
// 					</Grid>
// 					<Grid item xs={12}>
// 						<TextField
// 							id='address2'
// 							name='address2'
// 							label='Address line 2 (optiona)'
// 							fullWidth
// 							autoComplete='shipping address-line2'
// 						/>
// 					</Grid>
// 					<Grid item xs={12} sm={6}>
// 						<TextField
// 							required
// 							id='mobileNumber'
// 							name='mobileNumber'
// 							label='Mobile Number'
// 							onChange={(e) => setMobileNumber(e.target.value)}
// 							fullWidth
// 							autoComplete='mobileNumber'
// 						/>
// 					</Grid>
// 					<Grid item xs={12} sm={6}>
// 						<TextField
// 							id='state'
// 							name='state'
// 							label='City/District'
// 							onChange={(e) => setCityDistrict(e.target.value)}
// 							fullWidth
// 						/>
// 					</Grid>
// 					<Grid item xs={12} sm={6}>
// 						<TextField
// 							required
// 							id='zip'
// 							name='zip'
// 							label='Zip / Postal code'
// 							onChange={(e) => setZipCode(e.target.value)}
// 							fullWidth
// 							autoComplete='shipping postal-code'
// 						/>
// 					</Grid>
// 					<Grid item xs={12} sm={6}>
// 						<TextField
// 							required
// 							id='alternatePhone'
// 							name='alternatePhone'
// 							label='Secondery Phone'
// 							onChange={(e) => setAlternatePhone(e.target.value)}
// 							fullWidth
// 						/>
// 					</Grid>
// 					<Grid item xs={12}>
// 						<FormControlLabel
// 							control={
// 								<Checkbox color='secondary' name='saveAddress' value='yes' />
// 							}
// 							label='Use this address for payment details'
// 						/>
// 					</Grid>
// 				</Grid>
// 				<Button
// 					fullWidth
// 					style={{ backgroundColor: "yellow", color: "gray" }}
// 					onClick={onAddressSubmit}>
// 					<h5>Submit Address</h5>
// 				</Button>
// 			</div>
// 		</React.Fragment>
// 	);
// }
