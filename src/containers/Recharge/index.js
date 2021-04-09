import React, { useState ,useEffect} from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { addRecharge, getRecharges } from "../../actions/recharge.action";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function Recharge() {
	const [number, setNumber] = useState("");
	const [amount, setAmount] = useState(null);
	const [type, setType] = useState("");
	const [provider, setProvider] = useState("");
	const dispatch = useDispatch();

	const userRecharge = (e) => {
		e.preventDefault()
		console.log('Submit button clicked')
		dispatch(addRecharge({ number, amount, type, provider }));
		console.log({ number, amount, type, provider });
		dispatch(getRecharges())
	};

	useEffect(() => {
		
	dispatch(getRecharges())
	}, [])


	return (
		<>
		<Header fixed/>
			<div className='login-container mt-5 pt-3'>
				<div className='icon-container'></div>
				<form>
					<h2>Recharge</h2>

					<div className='input-container'>
						<label className='label'>Enter Your Phone number</label>
						<br />
						<input
							className='input'
							type='text'
							value={number}
							placeholder='Enter your phone'
							onChange={(e) => setNumber(e.target.value)}
						/>
					</div>

					<div className='input-container'>
						<label className='label'>Enter recharge Amount</label>
						<br />
						<input
							className='input'
							type='text'
							style={{ width: "80px" }}
							placeholder='BDT'
							onChange={(e) => setAmount(e.target.value)}
						/>
					</div>
					<div>
						<FormControl component='fieldset'>
							<FormLabel component='legend'>
								<h4>Sim type</h4>
							</FormLabel>
							<RadioGroup
								aria-label='gender'
								name='gender1'
								value={type}
								onChange={(e) => setType(e.target.value)}>
								<FormControlLabel
									value='prepaid'
									control={<Radio />}
									label='Prepaid'
								/>
								<FormControlLabel
									value='postpaid'
									control={<Radio />}
									label='Postpaid'
								/>
							</RadioGroup>
						</FormControl>
					</div>

					<FormControl component='fieldset'>
						<FormLabel component='legend'>
							<h4> Provider</h4>
						</FormLabel>
						<RadioGroup
							aria-label='provider'
							name='gender1'
							value={provider}
							onChange={(e) => setProvider(e.target.value)}>
							<div style={{ display: "flex" }}>
								<img
									style={{ width: "60px", height: "60px" }}
									src='https://img.utdstc.com/icon/0a7/a25/0a7a257a5f5ce669a0a9c3f79a2b950e7956fa7974a83052dabcfe771b668211:200'
								/>
								<FormControlLabel
									value='grameenphone'
									control={<Radio />}
									label='Grameen Phone'
								/>
							</div>
							<div style={{ display: "flex" }}>
								<img
									style={{ width: "60px", height: "60px" }}
									src='https://upload.wikimedia.org/wikipedia/en/6/66/Banglalink_logo.png'
								/>
								<FormControlLabel
									value='banglalink'
									control={<Radio />}
									label='Banglalink'
								/>
							</div>
							<div style={{ display: "flex" }}>
								<img
									style={{ width: "60px", height: "60px" }}
									src='https://api.bd.airtel.com/uploads/2018/10/f9865bf3-d0c7-4574-91ce-3834835ba3ff.png'
								/>
								<FormControlLabel
									value='airtel'
									control={<Radio />}
									label='Airtel'
								/>
							</div>
							<div style={{ display: "flex" }}>
								<img
									style={{ width: "60px", height: "60px" }}
									src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB5hn4TsqUnrRbGHeMEK4uiPDG1oB7chrvu9PMcy8erbf6ZcbfhjYg1Cjv0uW4LtSETFA&usqp=CAU'
								/>
								<FormControlLabel
									value='robi'
									control={<Radio />}
									label='Robi'
								/>
							</div>

							{/* <div tyle={{ display: "flex" }}>
								<img
									style={{ width: "60px", height: "60px" }}
									src='https://img5.androidappsapk.co/zoG1yxESRxwjFWXALzGqVGLrwbY4xXOqg9lROrQPn8eZd6XUKjRD5xK8Y_-TogDPName=s300'
								/>
								<FormControlLabel
									value='teletalk'
									control={<Radio />}
									label='TeleTalk'
								/>
							</div> */}
						</RadioGroup>
					</FormControl>

					<div className='btn-container'>
						<button className='submit-btn' onClick={userRecharge}>
							Submit
						</button>
					</div>
				</form>
			</div>
			<Footer />
		</>
	);
}
