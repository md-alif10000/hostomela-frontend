import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { logout } from "../../actions/auth.action";
import AccountCircle from "@material-ui/icons/AccountCircle";
import "./style2.css";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import{generatePublicUrl} from '../../urlconfig'
import Logo from "../Logo";
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	logoContainer: {
		display: "block",
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},
	toolbar:{
		display:'flex',
		justifyContent:'space-between',
		alignItems:'center'
	}
}));

export default function Header3() {
	const classes = useStyles();

	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();


		const dp = auth.user.profilePicture
			? auth.user.profilePicture.slice(0, 4) == "http"
				? auth.user.profilePicture
				: generatePublicUrl(auth.user.profilePicture)
			: " https://bootdey.com/img/Content/avatar/avatar7.png";

	const userLogout = () => {
		dispatch(logout());
		<Redirect to='/' />;
	};

	const toLogin = () => {
		return <Redirect to='/login' />;
	};
	return (
		<div className={classes.root}>
			<AppBar position='staic' style={{ backgroundColor: "#595643" }}>
				<div className='headerContainer'>
					<Toolbar className={classes.toolbar}>
						<div className={classes.toolbar}>
							<IconButton
								edge='end'
								aria-label='account of current user'
								aria-haspopup='true'
								color='inherit'>
								<Link to='/account'>
									<AccountCircle style={{ fontSize: "25" }} />
								</Link>
							</IconButton>

							<Typography variant='h6' className={classes.title,'account-text'}>
								<Link to='/account'>Account</Link>
							</Typography>
						</div>

						<div className={classes.logoContainer}>
							<Logo width='120px' height="30px"/>
						</div>

						{auth.user.name ? (
							<div className={classes.toolbar}>
								<Link to='/account' className='d-flex'>
									<h4>Hi,{auth.user.name}</h4>
									<img
										src={dp}
										alt='Admin'
										className='rounded-circle m-2 border border-danger'
										width='40'
										style={{ cursor: "pointer" }}
									/>
								</Link>

								<Button onClick={userLogout} color='inherit'>
									<Link to='/'>
										<Button
											style={{
												fontSize: "11px",
												backgroundColor: "red",
												color: "white",
												fontWeight: "bold",
											}}>
											Logout
										</Button>
									</Link>
								</Button>
							</div>
						) : (
							<Button onClick={toLogin} color='inherit'>
								<Link to='/login'>
									<Button
										style={{
											fontSize: "11px",
											backgroundColor: "green",
											color: "white",
											fontWeight: "bold",
										}}>
										Login
									</Button>
								</Link>
							</Button>
						)}
					</Toolbar>
				</div>
			</AppBar>
		</div>
	);
}
