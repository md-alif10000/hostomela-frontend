import React, { useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import "./style.css";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
		backgroundColor: "yellow",
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	search: {
		backgroundColor: "white",
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.6),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.7),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(3),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "#595643",
		width: "600px",
		overflow: "hidden",
		fontSize: "17px",
		[theme.breakpoints.up("sm")]: {
			width: "220px",
		},
	},
	inputInput: {
		padding: theme.spacing(0, 0, 0, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
		[theme.breakpoints.up("sm")]: {
			width: "220px",
		},
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},

	// Drawer.............

	root: {
		display: "flex",
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),

	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: "#a4508b",
		backgroundImage: "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)",
		fontWeight: "700",
		color: "white",
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
		backgroundImage: "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)",
		fontWeight: "700",
		color: "white",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}));

export default function Header(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const cart = useSelector((state) => state.cart);
	const cartCount = <h3>{Object.keys(cart.cartItems).length}</h3>; ;


	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	// Botton.menu
	const [value, setValue] = React.useState("recents");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}>
			<MenuItem>
				<IconButton aria-label='show 4 new mails' color='inherit'>
					<Badge badgeContent={4} color='secondary'>
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton aria-label='show 11 new notifications' color='inherit'>
					<Badge badgeContent={11} color='secondary'>
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='inherit'>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	const category = useSelector((state) => state.category);
	const auth = useSelector((state) => state.auth);
	const { categories } = category;


	const renderCategories = (categories) => {
		let myCategories = [];

		for (let category of categories) {
			myCategories.push(
				<a style={{fontSize:'14px'}} href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
					<ListItem key={category.name} className='listItem'>
						{category.parentId ? (
							<a
								className='sublistItem'
								href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
								<ListItemText primary={category.name} />
								<ArrowForwardIosIcon />
							</a>
						) : (
							<a
								className='sublistItem'
								href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
								<span>{category.name}</span>
								<ArrowForwardIosIcon style={{ marginLeft: "20px" }} />
							</a>
						)}

			
					</ListItem>
				</a>
			);
		}
		return myCategories;
	};

	const [search, setSearch] = useState();

	return (
		<>
			<div className={classes.grow}>
				<AppBar
					position={props.fixed ? "fixed" : "static"}
					className='appbar1'
					style={{
						backgroundColor: "#a4508b",
						backgroundImage: "linear-gradient(326deg, #bc52d1 0%, #a031b6 74%)",
						fontWeight: "700",
						color: "#fce00d",
					}}>
					<div className='headerContainer'>
						<Toolbar>
							{/* <div style={{ display: "flex", justifyContent: "space-betwwen" }}> */}
							{/* <div> */}
							<IconButton
								color='inherit'
								aria-label='open drawer'
								onClick={handleDrawerOpen}
								edge='start'
								className={clsx(classes.menuButton, open && classes.hide)}>
								<MenuIcon style={{ fontSize: "25" }} />
							</IconButton>
							{/* </div> */}
							{/* <div> */}
							<Typography className={classes.title} variant='h6' noWrap>
								Material-UI
							</Typography>

							<div
								style={{ width: "600px", display: "flex" }}
								className='searchbox'>
								<FormControl fullWidth className={classes.margin}>
									<Input
										fullWidth
										placeholder='Search here'
										id='input-with-icon-adornment'
										startAdornment={
											<InputAdornment position='start'>
												<SearchIcon />
											</InputAdornment>
										}
									/>
								</FormControl>
								<button
									style={{ backgroundColor: "#595643", borderRadius: "5px" }}>
									<SearchIcon />
								</button>
							</div>
							<div className={classes.grow} />
							<div className={classes.sectionDesktop}>
								<IconButton
									aria-label='show 17 new notifications'
									color='secondary'>
									<Badge
										badgeContent={auth.user.balance}
										color='secondary'
										style={{ fontSize: "18px" }}>
										<Link to='/account' style={{ color: "green" }}>
											<AccountBalanceWalletIcon style={{ fontSize: "30" }} />
											Wallet <span>{auth.user.balance}.00-৳</span>
										</Link>
									</Badge>
								</IconButton>

								<IconButton
									aria-label='show 17 new notifications'
									color='inherit'>
									<Badge
										badgeContent={cartCount}
										color='secondary'
										style={{ fontSize: "18px" }}>
										<Link to='/cart'>
											<ShoppingCartOutlinedIcon style={{ fontSize: "30" }} />
										</Link>
									</Badge>
								</IconButton>
								<IconButton
									edge='end'
									aria-label='account of current user'
									aria-controls={menuId}
									aria-haspopup='true'
									onClick={handleProfileMenuOpen}
									color='inherit'>
									<Link to='/account'>
										<AccountCircle style={{ fontSize: "30" }} />
									</Link>
								</IconButton>
							</div>
							<div className={classes.sectionMobile}>
								<IconButton
									aria-label='show 17 new notifications'
									color='inherit'>
									<Badge
										badgeContent={cartCount}
										color='secondary'
										style={{ fontSize: "18px" }}>
										<Link to='/cart'>
											<ShoppingCartOutlinedIcon style={{ fontSize: "30" }} />
										</Link>
									</Badge>
								</IconButton>
							</div>
							{/* </div> */}
						</Toolbar>
					</div>
				</AppBar>

				<Drawer
					className={classes.drawer}
					variant='persistent'
					anchor='left'
					open={open}
					classes={{
						paper: classes.drawerPaper,
					}}>
					<div className={classes.drawerHeader}>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === "ltr" ? (
								<ChevronLeftIcon />
							) : (
								<ChevronRightIcon />
							)}
						</IconButton>
					</div>
					<Divider />
					<List className='list'>
						<h3 className='categoryHeader'>Categories</h3>

						{category.categories.length > 0
							? renderCategories(category.categories)
							: null}
					</List>
					<Divider />
					<List>
						{["All mail", "Trash", "Spam"].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					</List>
				</Drawer>
				{/* <BottomNavigation
				value={value}
				onChange={handleChange}
				className={classes.root}>
				<BottomNavigationAction
					label='Recents'
					value='recents'
					icon={<RestoreIcon />}
				/>
				<BottomNavigationAction
					label='Favorites'
					value='favorites'
					icon={<FavoriteIcon />}
				/>
				<BottomNavigationAction
					label='Nearby'
					value='nearby'
					icon={<LocationOnIcon />}
				/>
				<BottomNavigationAction
					label='Folder'
					value='folder'
					icon={<FolderIcon />}
				/>
			</BottomNavigation> */}
				{renderMobileMenu}

				{renderMenu}
			</div>
		</>
	);
}
