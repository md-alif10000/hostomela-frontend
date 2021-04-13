import React,{useState,useEffect} from "react";
import{useSelector,useDispatch} from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";



import {getAllCategory} from '../../actions/category.action'
import { domain, generatePublicUrl,api } from "../../urlconfig";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './gridCategory.css'


const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		height: 80,
		width: 100,
	},
	control: {
		padding: theme.spacing(2),
	},
}));

export default function GridCategory() {
	const [spacing, setSpacing] = React.useState(2);
	const classes = useStyles();

	const handleChange = (event) => {
		setSpacing(Number(event.target.value));

	};


    	const category = useSelector((state) => state.category);
        const {categories}=category
			const dispatch = useDispatch();

			useEffect(() => {
				dispatch(getAllCategory());
			}, []);



			var settings = {
				dots: false,
				infinite: true,
				speed: 500,
				slidesToShow: 8,
				slidesToScroll: 2,
				autoplay: true,
				speed: 6000,
				autoplaySpeed: 6000,
				pauseOnHover: true,
		
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
							slidesToShow: 4,
							slidesToScroll: 1,
							initialSlide: 3,
						},
					},
					{
						breakpoint: 580,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
						},
					},
				],
			};
	

		
            const myCategories = [];
            categories.map((category,index)=>{

             category.children.map((child,index)=>{
                 myCategories.push(child)
             })
              
            })


            

	return (
		// <Grid container className={classes.root} spacing={2}>
		// 	<Grid item xs={12}>
		<div className='card'>
			<Slider {...settings}>
				{/* <Grid container justify='center' spacing={spacing}> */}
				{myCategories.map((category) => (
					<Link
						to={`/${category.slug}?cid=${category._id}&type=${category.type}`}
						style={{ textDecoration: "none" }}>
						<div
							className='categorybox'
							style={{
								display: "flex",
								flexDirection: "column",
							}}>
							<img
								style={{
									width: "100px",
									height: "80px",
									borderRadius: "10px",
								}}
								src={`${domain}${category.image}`}
							/>
							<h4 style={{ margin: "auto" }}>{category.name}</h4>
						</div>
					</Link>
				))}
				{/* </Grid> */}
			</Slider>
		</div>
		// 	</Grid>
		// </Grid>
	);
}
