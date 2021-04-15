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
import ViewListTwoToneIcon from "@material-ui/icons/ViewListTwoTone";
import AssignmentTwoToneIcon from "@material-ui/icons/AssignmentTwoTone";
import Badge from "@material-ui/core/Badge";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Logo from '../Logo/index'
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import "./style.css";
import { Link } from "react-router-dom";
import Social from "../Social";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
		backgroundColor: "yellow",
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	logoContainer: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
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
							<IconButton
								color='inherit'
								aria-label='open drawer'
								onClick={handleDrawerOpen}
								edge='start'
								className={clsx(classes.menuButton, open && classes.hide)}>
								<MenuIcon style={{ fontSize: "25" }} />
							</IconButton>

							<div className='logoContainer' className={classes.logoContainer}>
								<Logo width='200px' height='50px' />
							</div>

							<div className='searchContainer d-flex'>
								<input className='searchInput' maxLength='40' type='text' />
								<SearchIcon className='searchIcon' style={{ fontSize: "26" }} />
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
						<div className=''>
							<Logo width="130px" height="30px"/>
						</div>
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
					<List className='font-18 t-primary'>
						<Link to='/account' className='font-18 t-primary'>
							<ListItem button>
								<ListItemIcon>
									<AccountCircle />
								</ListItemIcon>
								<ListItemText
									primary={"My Account"}
									className='font-18 t-primary'
								/>
							</ListItem>
						</Link>
						{auth.authenticate ? (
							<span>
								<Link to='/account/orders' className='font-18 t-primary'>
									<ListItem button>
										<ListItemIcon>
											<ViewListTwoToneIcon />
										</ListItemIcon>
										<ListItemText
											primary={"My Orders"}
											className='font-18 t-primary'
										/>
									</ListItem>
								</Link>
							</span>
						) : null}

						<Link to='/about-us' className='font-18 t-primary'>
							<ListItem button>
								<ListItemIcon>
									<AccountCircle />
								</ListItemIcon>
								<ListItemText
									primary={"About Us"}
									className='font-18 t-primary'
								/>
							</ListItem>
						</Link>
						<Link to='/contact-us' className='font-18 t-primary'>
							<ListItem button>
								<ListItemIcon>
									<AssignmentTwoToneIcon />
								</ListItemIcon>
								<ListItemText
									primary={"Contact Us"}
									className='font-18 t-primary'
								/>
							</ListItem>
						</Link>
						<Link to='/terms&conditions' className='font-18 t-primary'>
							<ListItem button>
								<ListItemIcon>
									<AssignmentTwoToneIcon />
								</ListItemIcon>
								<ListItemText
									primary={"Terms & Conditions"}
									className='font-18 t-primary'
								/>
							</ListItem>
						</Link>
						<Link to='/privacy-policy' className='font-18 t-primary'>
							<ListItem button>
								<ListItemIcon>
									<AssignmentTwoToneIcon />
								</ListItemIcon>
								<ListItemText
									primary={"Privacy Policy"}
									className='font-18 t-primary'
								/>
							</ListItem>
						</Link>
						<Link to='/return-policy' className='font-18 t-primary'>
							<ListItem button>
								<ListItemIcon>
									{" "}
									<AssignmentTwoToneIcon />
								</ListItemIcon>
								<ListItemText
									primary={"Return Pilicy"}
									className='font-18 t-primary'
								/>
							</ListItem>
						</Link>
						<div className='m-3 p-3'>
							<Social title='Follow us on' />
						</div>
					</List>
				</Drawer>

				{renderMobileMenu}

				{renderMenu}
			</div>
		</>
	);
}
