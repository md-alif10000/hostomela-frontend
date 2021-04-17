import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import './style.css'

const useStyles = makeStyles((theme) => ({
	text: {
		padding: theme.spacing(2, 2, 0),
	},
	paper: {
		paddingBottom: 50,
	},
	list: {
		marginBottom: theme.spacing(2),
	},
	subheader: {
		backgroundColor: theme.palette.background.paper,
	},
	appBar: {
		top: "auto",
		bottom: 0,
		backgroundColor: "#a4508b",
		backgroundImage: "linear-gradient(326deg, #bc52d1 0%, #a031b6 74%)",
	},
	grow: {
		flexGrow: 1,
	},
	fabButton: {
		position: "absolute",
		zIndex: 1,
		top: -30,
		left: 0,
		right: 0,
		margin: "0 auto",
	},
}));

export default function ProductBar({price,onClick}) {
	const classes = useStyles();

	return (

			<div className='product-bar-container'>
				<AppBar position='fixed' className={classes.appBar}>
					<Toolbar>
					
						<button className=' fixed-cart-button btn btn-primary '
                        onClick={onClick}>
							<ShoppingCartIcon /> Add To Shopping Bag
						</button>
						<span>
							you pay <strong>৳</strong>{price}
						</span>
					</Toolbar>
				</AppBar>
			</div>

	);
}
