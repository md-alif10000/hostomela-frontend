import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import {
	
	googleLogin,
	facebookLogin,
	login,
} from "../../../actions/auth.action";


import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

export default function Register(props) {
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

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





		const responseSuccessGoogle = (response) => {
			console.log("Token Id", response.tokenId);

			dispatch(googleLogin({ tokenId: response.tokenId }));
			console.log(response);
		};
		const responseFailureGoogle = (err) => {
			console.log(err);
		};

		const responseFacebook = (response) => {
			console.log(response);
			dispatch(
				facebookLogin({
					accessToken: response.accessToken,
					userID: response.userID,
					picture: response.picture,
				})
			);
		};

	

	if (auth.authenticate) return <Redirect to='/' />;
	return (
		<div>
			<Header />
			<div className='login-container'>
				<div className='icon-container'></div>
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
					<h2>OR</h2>
					<p>Login With</p>
					<div className='loginicon-container'>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<div style={{ margin: "20px" }}>
								<GoogleLogin
									clientId='657189057409-g02l0tmglfd02pq1dcd4ns4dgv1465b5.apps.googleusercontent.com'
									buttonText=''
									onSuccess={responseSuccessGoogle}
									onFailure={responseFailureGoogle}
									cookiePolicy={"single_host_origin"}
									style={{ width: "250px" }}
								/>
							</div>

							<div style={{ margin: "20px" }}>
								<FacebookLogin
									appId='142413274468639'
									autoLoad={false}
									fields='name,email,picture'
									callback={responseFacebook}
									// cssClass='kep-login-facebook-[80]'
									icon='fa-facebook'
									style={{ width: "80px" }}
									size='small'
									textButton=''
								/>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
