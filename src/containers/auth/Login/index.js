import React, { useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect ,useHistory} from "react-router-dom";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import {
	
	login,
} from "../../../actions/auth.action";
import SocialLogin from "../socialLogin";
import Loader from "../../../components/Loader";
import { Fade } from "react-reveal";




export default function Register(props) {
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const history=useHistory()

	const auth = useSelector((state) => state.auth);

	const userLogin = (e) => {
		e.preventDefault();
		  
		if(phone==''){
			return Swal.fire("Oops...", "Phone number is required..", "error");
		}
				
		if (password=='') {
		return Swal.fire("Oops...", "Password can not be empty..", "error");
		}
		dispatch(login({ phone, password }));


	};




	

	if (auth.authenticate) return <Redirect to='/' />;
	
	if(auth.authenticating) return <Loader/>

	return (
		<div>
			<Header />
			<div className='login-container'>
				<div className='icon-container'></div>
				<Fade right cascade>
					<form>
						<h2>Login</h2>

						<div className='input-container'>
							<label className='label'>Enter Your Phone number</label>
							<br />
							<input
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								className='input'
								type='text'
								placeholder='Enter your phone'
							/>
						</div>
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

						<div className='btn-container'>
							<button className='submit-btn' onClick={userLogin}>
								Login
							</button>
						</div>
						<p>
							Don't have an account?
							<Link style={{ color: "#b8892c" }} to='/register'>
								Register here
							</Link>
						</p>
						<p>
							Forget password?
							<Link style={{ color: "#b8892c" }} to='/change_password'>
								reset here
							</Link>
						</p>
						<SocialLogin />
					</form>
				</Fade>
			</div>
		</div>
	);
}
