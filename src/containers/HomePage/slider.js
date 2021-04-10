import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Container, Card, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { addToCart } from "../../actions/cart.action";
import "./style.css";
import { api, generatePublicUrl } from "../../urlconfig";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		height: 240,
		width: 180,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		boxSizing: "border-box",
		padding: "5px",
		margin: "10px",
	},
	control: {
		padding: theme.spacing(2),
	},
}));

export default function NowPlaying(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const product = useSelector((state) => state.product);
	var settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		speed: 6000,
		autoplaySpeed: 6000,
		pauseOnHover: true,
		// nextArrow: <ArrowForwardIcon style={{color:'blue',fontSize:'30px'}} />,
		// prevArrow: <ArrowBackIcon />,
		className: "center",
		centerMode: true,
		// rows: 2,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					initialSlide: 3,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<>
			<Card>
				<Card.Body>
					<Card.Title>
						<h2 className='m-2 p-2 text-center'>LATEST PRODUCT</h2>
					</Card.Title>
					<Slider {...settings}>
						{product.products.map(function (product, index) {
							return (
								<div className='col-sm-6 col-lg-3 m-2'>
									<Grid key={index} item className='col-sm-6 col-lg-3 m-2'>
										<div className='paperContainer'>
											<Link to={`/${product.slug}/${product._id}/p`}>
												<Paper
													className={classes.paper}
													style={{ display: "flex", flexDirection: "column" }}>
													<div style={{ backgroundColor: "#dbdbdb" }}>
														<img
															className='productImg'
															src={generatePublicUrl(
																product.productPictures[0]
																	? product.productPictures[0].img
																	: null
															)}
														/>
														<p style={{ color: "#cf9415", fontWeight: "bold" }}>
															<span>৳</span> {product.price}
														</p>
														<p style={{ fontSize: "13px" }}>
															{product.name.slice(0, 20)}
														</p>
													</div>

													<div>
														<span className='cartIconContainer'>
															<ShoppingCartIcon
																onClick={() => {
																	const { _id, name, price } = product;
																	const img = product.productPictures[0].img;
																	dispatch(
																		addToCart({ _id, name, price, img })
																	);
																	// props.history.push("/cart");
																}}
																style={{ fontSize: "30" }}
																className='cartIcon'
															/>
														</span>
													</div>
												</Paper>
											</Link>
										</div>
									</Grid>
								</div>
							);
						})}
					</Slider>
					{/* // </Container> */}
				</Card.Body>
			</Card>

			<Card className='mt-5'>
				<Card.Body>
					<Card.Title>
						<h2 className='m-2 p-2 text-center'>LATEST PRODUCT</h2>
					</Card.Title>
					<Slider {...settings}>
						{product.products.map(function (product, index) {
							return (
					

								<div className='col-sm-6 col-lg-3 m-2'>
									<Grid key={index} item className='col-sm-6 col-lg-3 m-2'>
										<div className='paperContainer'>
											<Link to={`/${product.slug}/${product._id}/p`}>
												<Paper
													className={classes.paper}
													style={{ display: "flex", flexDirection: "column" }}>
													<div style={{ backgroundColor: "#dbdbdb" }}>
														<img
															className='productImg'
															src={generatePublicUrl(
																product.productPictures[0]
																	? product.productPictures[0].img
																	: null
															)}
														/>
														<p style={{ color: "#cf9415", fontWeight: "bold" }}>
															<span>৳</span> {product.price}
														</p>
														<p style={{ fontSize: "13px" }}>
															{product.name.slice(0, 20)}
														</p>
													</div>

													<div>
														<span className='cartIconContainer'>
															<ShoppingCartIcon
																onClick={() => {
																	const { _id, name, price } = product;
																	const img = product.productPictures[0].img;
																	dispatch(
																		addToCart({ _id, name, price, img })
																	);
																	// props.history.push("/cart");
																}}
																style={{ fontSize: "30" }}
																className='cartIcon'
															/>
														</span>
													</div>
												</Paper>
											</Link>
										</div>
									</Grid>
								</div>
							);
						})}
					</Slider>
				</Card.Body>
			</Card>
		</>
	);
}
