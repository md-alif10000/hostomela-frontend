import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./style.css";
import Header from "../../../components/Header";
import { login, logout } from "../../../actions/auth.action";
import {
	Grid,
	Paper,
	Avatar,
	TextField,
	Button,
	Typography,
	Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
const Login = () => {

	const paperStyle = {
		padding: 20,
		height: "70vh",
		width: 280,
		fontSize: "25px",
		margin: "20px auto",
	};
	const avatarStyle = { backgroundColor: "#1bbd7e" };
	const btnstyle = {
		margin: "8px 0",
		color: "black",
		fontSize: "16px",
		backgroundColor: "yellow",
	};

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const auth = useSelector((state) => state.auth);

	const userLogin = () => {
		dispatch(login({ email, password }));
	};

	useEffect(() => {
		if (auth.authenticate) {
			if (auth.authenticate) return <Redirect to='/' />;
		}
	}, [auth.authenticate]);

	if (auth.authenticate) return <Redirect to='/' />;

	return (
		<Grid style={{ fontSize: "22px" }}>
			<Paper elevation={15} style={paperStyle}>
				<Grid align='center'>
					<Avatar style={avatarStyle}>
						<LockOutlinedIcon />
					</Avatar>
					<h2>Login </h2>
				</Grid>
				<TextField
				style={{fontSize:'22px'}}
					onChange={(e) => setEmail(e.target.value)}
					label='Email'
					placeholder='Enter email'
					value={email}
					fullWidth
					required
				/>
				<TextField
					onChange={(e) => setPassword(e.target.value)}
					label='Password'
					placeholder='Enter password'
					type='password'
					value={password}
					fullWidth
					required
					large
				/>
				<FormControlLabel
					control={<Checkbox name='checkedB' color='primary' />}
					label='Remember me'
				/>
				<Button
					type='submit'
					color='primary'
					onClick={userLogin}
					variant='contained'
					style={btnstyle}
					fullWidth>
					Sign in
				</Button>
				<Typography>
					<Link to='/reset_password'>
						<h3>Forgot password ?</h3>
					</Link>
				</Typography>
				<Typography>
					{" "}
					<h5>
						Do you have an account ?<Link href='#'>Sign Up</Link>
					</h5>
				</Typography>
			</Paper>
		</Grid>
	);
};

export default Login;
