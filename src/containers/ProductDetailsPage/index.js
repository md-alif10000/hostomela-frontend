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
import DetailsBar from "./detailsBar";
import Swal from "sweetalert2";

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

export default function ProductDetails2(props) {
	const [value, setValue] = React.useState(0);
	var [stitch, setStitch] = useState("regular");
	var stitching = stitch == "regular" ? false : true;

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	// const [review, setReview] = useState("");
	// const [rating, setRating] = useState(null);

	const classes = useStyles();
	const dispatch = useDispatch();
	const product = useSelector((state) => state.product);
	const cart = useSelector((state) => state.cart);

	let Price =
		stitch == "regular"
			? product.productDetails.price
			: product.productDetails.price + 500;

	const { reviews } = product.productDetails;
	useEffect(() => {
		let { productId } = props.match.params;
		console.log(props);
		const payload = {
			params: {
				productId,
			},
		};
		dispatch(getProductDetailsById(payload));
	}, []);
	let { productId } = props.match.params;

	const onSubmitReview = (e, review, rating) => {
		e.preventDefault();
		console.log({ productId, review, rating });
		if (review == "")
			return Swal.fire("Opps", "Review can not be empty", "warning");
		if (rating == null)
			return Swal.fire("Opps", "Please give a rating", "warning");
		dispatch(addReview({ productId, review, rating }));
	};

	const data = [];

	const Imagedata =
		product.productDetails.productPictures == undefined
			? null
			: product.productDetails.productPictures.map((img) => {
					var { _id, image } = img;
					var image = generatePublicUrl(image);
					let imageInfo = { _id, image };
					data.push(imageInfo);
			  });

	console.log(data);

	const demoData = [
		{
			image:
				"https://i0.wp.com/www.hostomela.com/wp-content/uploads/2020/10/wp-1604165165596.jpg?fit=960%2C1280&ssl=1",
		},
		{
			image:
				"https://i1.wp.com/www.hostomela.com/wp-content/uploads/2020/10/wp-1604165165781.jpg?fit=960%2C1280&ssl=1",
		},
		,
		{
			image:
				"https://i0.wp.com/www.hostomela.com/wp-content/uploads/2020/10/wp-1604165165735.jpg?fit=736%2C1280&ssl=1",
		},
	];

	if (Object.keys(product.productDetails).length === 0) {
		return null;
	}

	if (product.loading) {
		return <Loader />;
	}
	if (cart.updatingCart) {
		return <Loader />;
	}

	return (
		<Layout>
			<div className='product-details-container '>
				<section className='section product-detail  p-1 '>
					<div className=' row bg-white p-3 '>
						<div className='col-lg-4 col-sm-12 text-center '>
							<span className='t-secondary'>
								Home/Product Details/ {product.productDetails.name}
							</span>
							<SliderImage
								data={demoData}
								width='100%'
								showDescription={true}
								direction='right'
							/>
						</div>
						<div className='col-lg-4 col-sm-12 p-5  flexCol sb'>
							<div className='pt-5'>
								<h3>{product.productDetails.name}</h3>
								<div className=''>
									<span className='bolder'>৳ </span>
									{Price}
								</div>

								<div className='color'>
									<h3>color</h3>
									<ul>
										<li>
											<a href='#!' className='colors color-bdot1 active'></a>
										</li>
										<li>
											<a href='#!' className='colors color-bdot2' style={{backgroundColor:'red',  boxShadow:'0 0 0 3px white, 0 0 0 5px red' }}></a>
										</li>
										<li>
											<a href='#!' className='colors color-bdot3'></a>
										</li>
										<li>
											<a href='#!' className='colors color-bdot4'></a>
										</li>
										<li>
											<a href='#!' className='colors color-bdot5'></a>
										</li>
									</ul>
								</div>

								<div
									className='text-left font-16'
									style={{ textAlign: "left", textDecoration: "none" }}>
									<h3 className='m-4'>Details</h3>
									<ul>
										<li>⦿ Banarasi Pure Silk Saree in Navy Blue</li>
										<li>⦿ Beautifully woven with Zari in Floral Motifs</li>
										<li>
											⦿ Available with an Unstitched Pure Banarasi Silk Blouse
											in Black
										</li>
										<li>⦿ Free Services: Fall and Edging (Pico)</li>
										<li>
											⦿ Do Note: Accessories worn by model is for presentation
											purpose
										</li>
									</ul>
								</div>

								<div className='m-3 p-3' style={{ fontSize: "16px" }}>
									<FormControl component='fieldset'>
										<FormLabel></FormLabel>
										<RadioGroup
											aria-label='gender'
											name='gender1'
											selected
											value={stitch}
											onChange={(e) => setStitch(e.target.value)}>
											<FormControlLabel
												style={stitch == "regular" ? { display: "none" } : null}
												value='regular'
												control={<Radio />}
												label={<h4 className='t-dark'>Regular</h4>}
											/>
											<FormControlLabel
												value='stitch'
												control={<Radio />}
												label={
													<h4 className='t-dark'>
														Stitch (Ready to wear)+500 tk
													</h4>
												}
											/>
										</RadioGroup>
									</FormControl>
								</div>

								<a
									onClick={() => {
										console.log(Price);
										const { _id, name } = product.productDetails;
										const image =
											product.productDetails.productPictures[0].image;
										dispatch(
											addToCart({
												_id,
												name,
												price: Price,
												image,
												stitch: stitching,
											})
										);
										// <Redirect to='/cart' />;
										props.history.push("/cart");
									}}
									className='addToCart btn bold-700 '>
									{console.log(stitching)}
									<ShoppingCartIcon /> Add To Shopping Bag
								</a>
							</div>
						</div>

						<div className='col-lg-4 col-sm-12 text-center policy-div'>
							<p>
								Know our{" "}
								<Link>
									<span className='t-secondary'>shipping</span>{" "}
								</Link>{" "}
								&{" "}
								<Link>
									<span className='t-secondary'>return policy</span>{" "}
								</Link>
							</p>
							<hr />
							<p>
								Any Question ? Just{" "}
								<Link>
									<span className='t-secondary'>Ask</span>{" "}
								</Link>
							</p>
							<hr />
							<div style={{ width: "200px" }}>
								<Social title='Share this' />
							</div>
						</div>
					</div>
				</section>

				<div className='row'>
					<div className='col-lg-6 col-md-6 col-sm-12'></div>
					<div className='col-lg-6 col-md-6 col-sm-12'></div>
				</div>

				{/* <DetailsBar onSubmitReview={onSubmitReview} /> */}

				<ProductBar
					price={Price}
					onClick={(e) => {
						e.preventDefault();
						console.log(Price);
						const { _id, name } = product.productDetails;
						const image = product.productDetails.productPictures[0].image;
						dispatch(addToCart({ _id, name, price: Price, image }));
						// <Redirect to='/cart' />;
						props.history.push("/cart");
					}}
				/>
			</div>
		</Layout>
	);
}
