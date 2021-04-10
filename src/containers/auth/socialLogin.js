import React from 'react'
import {useDispatch} from 'react-redux'
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import {
	googleLogin,
	facebookLogin,

} from "../../actions/auth.action";

export default function SocialLogin(props) {


    const dispatch = useDispatch()





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


    return (
			<div>
				<h2>OR</h2>
				<p>Login With</p>
				<div className='loginicon-container'>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<div style={{ margin: "20px" }}>
							<GoogleLogin
								clientId='161216550543-5a1u9upt7odjarlg9j2cef9gbbbk9ict.apps.googleusercontent.com'
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
			</div>
		);
}
