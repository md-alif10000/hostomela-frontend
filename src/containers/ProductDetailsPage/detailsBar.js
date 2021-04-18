import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById, addReview } from "../../actions";
import Layout from "../../components/Layout";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import "./style2.css";
import { generatePublicUrl } from "../../urlconfig.js";
import { addToCart } from "../../actions/cart.action";
import { Redirect } from "react-router";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import Review from "./review";
import SliderImage from "react-zoom-slider";
import Loader from "../../components/Loader";
import ProductBar from "../../components/ProductBar";
import { Link } from "react-router-dom";
import Social from "../../components/Social";



function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
}));



export default function DetailsBar({onSubmitReview}) {


    	const [value, setValue] = React.useState(0);
			var [stitch, setStitch] = useState("regular");

			const handleChange = (event, newValue) => {
				setValue(newValue);
			};
			const [review, setReview] = useState("");
			const [rating, setRating] = useState(null);

			const classes = useStyles();
			const dispatch = useDispatch();
			const product = useSelector((state) => state.product);
			const cart = useSelector((state) => state.cart);


            	const { reviews } = product.productDetails;






	return (
		<div className=' text-lg' style={{ fontSize: "20px" }}>
			<div className={classes.root}>
				<AppBar
					position='static'
					style={{
						backgroundImage: "linear-gradient(315deg, #bc52d1 0%, #5f0a87 74%)",

						backgroundColor: "#bc52d1",
						boxShadow: " -2px 1px 2px 2px #ec96fd",
						fontSize: "14px",
					}}>
					<Tabs
						className='bold-600'
						style={{ fontSize: "14px" }}
						value={value}
						onChange={handleChange}
						aria-label='simple tabs example'>
						<Tab
							className='bold-600'
							style={{ fontSize: "14px" }}
							label='Details'
							{...a11yProps(0)}
						/>
						<Tab
							className='bold-600'
							style={{ fontSize: "14px" }}
							label='Delivery'
							{...a11yProps(1)}
						/>
						<Tab
							className='bold-600'
							style={{ fontSize: "14px" }}
							label='Polocy'
							{...a11yProps(2)}
						/>
						{/* <Tab
							className='bold-600'
							style={{ fontSize: "14px" }}
							label='Delivery'
							{...a11yProps(2)}
						/>
						<Tab
							className='bold-600'
							style={{ fontSize: "14px" }}
							label='Policy'
							{...a11yProps(2)}
						/> */}
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					<p style={{ fontSize: "16px" }}>{product.productDetails.desc}</p>
				</TabPanel>

				{/* <TabPanel value={value} index={1}>
					{reviews.map((review, index) => {
						let Picture = review.userId.profilePicture;

						let userImage =
							Picture.slice(0, 4) == "http"
								? Picture
								: generatePublicUrl(Picture);

						return (
							<Review
								name={review.userId.name}
								review={review.review}
								rating={review.rating}
								date={review.date ? review.date : null}
								userPicture={userImage}
							/>
						);
					})}
				</TabPanel> */}
				{/* <TabPanel value={value} index={2}>
					<div>
						<TextField
							id='outlined-multiline-static'
							label='Write Your Review'
							multiline
							rows={4}
							value={review}
							onChange={(e) => setReview(e.target.value)}
							// defaultValue='Default Value'
							variant='outlined'
							fullWidth
						/>
					</div>

					<div>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor='age-native-simple'>
								Select Rating..
							</InputLabel>
							<Select
								native
								value={rating}
								onChange={(e) => setRating(e.target.value)}
								style={{ width: "300px" }}
								inputProps={{
									name: "age",
									id: "age-native-simple",
								}}>
								<option aria-label='None' value='' />
								<option value={5}>⭐ ⭐ ⭐ ⭐ ⭐ (Excellent)</option>
								<option value={4}>⭐ ⭐ ⭐ ⭐ (Good)</option>
								<option value={3}>⭐ ⭐ ⭐ (Not Bad)</option>
								<option value={2}>⭐ ⭐ (Not good)</option>
								<option value={1}>⭐ (Bad)</option>
							</Select>
						</FormControl>
					</div>
					<div className='mt-4'>
						<Button
                        className='btn btn-xl'
							style={{ backgroundColor: "#fce00d", color: "black" }}
							onClick={(e) => onSubmitReview(e, review, rating)}>
							Submit your Review
						</Button>
					</div>
				</TabPanel> */}
				<TabPanel value={value} index={1}>
					<p style={{ fontSize: "16px" }}>{product.productDetails.desc}</p>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<p style={{ fontSize: "16px" }}>{product.productDetails.desc}</p>
				</TabPanel>
			</div>
		</div>
	);
}
