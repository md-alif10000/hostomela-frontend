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
import Product from "../../components/Product";

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
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		speed: 6000,
		autoplaySpeed: 6000,
		pauseOnHover: true,
		className: "center",
		centerMode: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 3,
				},
			},
			{
				breakpoint: 380,
				settings: {
					slidesToShow: 1,
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
									<Product
										name={product.name.slice(0, 20)}
										rating={product.rating}
										price={product.price}
										link={`/${product.slug}/${product._id}/p`}
										image={generatePublicUrl(
											product.productPictures[0]
												? product.productPictures[0].image
												: null
										)}
									/>
								);
							})}

							{product.products.map(function (product, index) {
								return (
									<Product
										name={product.name.slice(0, 20)}
										rating={product.rating}
										price={product.price}
										link={`/${product.slug}/${product._id}/p`}
										image={generatePublicUrl(
											product.productPictures[0]
												? product.productPictures[0].image
												: null
										)}
									/>
								);
							})}
				
					</Slider>
					{/* // </Container> */}
				</Card.Body>
			</Card>

			{/* <Card className='mt-5'> */}
			<div>
				{/* <Slider {...settings}> */}
				{product.products.map(function (product, index) {
					return (
						<Product
							name={product.name.slice(0, 20)}
							rating={product.rating}
							price={product.price}
							image={generatePublicUrl(
								product.productPictures[0]
									? product.productPictures[0].image
									: null
							)}
							link={`/${product.slug}/${product._id}/p`}
						/>
					);
				})}
				{/* </Slider> */}
			</div>
			{/* </Card> */}
		</>
	);
}
