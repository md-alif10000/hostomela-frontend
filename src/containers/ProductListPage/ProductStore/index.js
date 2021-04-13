import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllCategory,
	getProductsBySlug,
	getSubCategory,
} from "../../../actions";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { addToCart } from "../../../actions/cart.action";
import "./style.css";
import { api, generatePublicUrl, domain } from "../../../urlconfig";
import Loader from "../../../components/Loader";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		height: 200,
		width: 150,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		boxSizing: "border-box",
		padding: "5px",
	},
	control: {
		padding: theme.spacing(2),
	},
}));

export default function ProductStore(props) {
	const search = props.location.search;
	const parentId = search.slice(5, 29);

	const [spacing, setSpacing] = React.useState(2);
	const classes = useStyles();

	const handleChange = (event) => {
		setSpacing(Number(event.target.value));
	};

	const dispatch = useDispatch();
	const product = useSelector((state) => state.product);

	const [priceRange, setPriceRange] = useState({
		under5k: "5000",
		under10k: "10000",
		under15k: "15000",
		under20k: "20000",
		under30k: "30000",
	});
	const { match } = props;
	console.log(match.params.slug);
	const category = useSelector((state) => state.category);
	const subCategories = category.subCategories;
	const categories = category.categories;
	const categoriesArray = [];

	// Object.keys(categories).map((cat,index)=>{
	// 	categoriesArray.push(cat)
	// })
	// console.log(categoriesArray)
	// const selectedCategory = categories.filter((category) => {
	// 	return category.slug == match.params.slug;
	// });

	// console.log(selectedCategory);

	useEffect(() => {
		const { match } = props;
		console.log(match);

		dispatch(getAllCategory());
		dispatch(getProductsBySlug(match.params.slug));
		dispatch(getSubCategory(parentId));
	}, []);



	if(product.loading) return <Loader/>
	

	return (
		<>
			<div className='productPageContainer'>
				{subCategories.length > 0 ? (
					<Grid container className={classes.root} spacing={2}>
						<h3 className='productCategoryHeader'>
							<span className='p-3 rounded t-primary c-primary-gradiant'>
								Categories
							</span>{" "}
						</h3>
						<hr />
						<Grid item xs={12}>
							<Grid container justify='center' spacing={spacing}>
								{subCategories.map((category) => (
									<div className='mx-sm-1 mx-lg-4'>
										<a
											className='categoryLink'
											href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
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
													src={domain + `${category.categoryImage}`}
												/>
												<h4 style={{ margin: "auto" }}>{category.name}</h4>
											</div>
										</a>
									</div>
								))}
							</Grid>
						</Grid>
					</Grid>
				) : null}

				<Grid container className={classes.root} spacing={2}>
					<h3 className='productCategoryHeader'>
						<span className='p-3 rounded t-primary c-primary-gradiant'>
							Products
						</span>
					</h3>
					<Grid item xs={12}>
						<Grid container justify='center' spacing={spacing}>
							{product.products.map((product, index) => (
								<Grid key={index} item>
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
																dispatch(addToCart({ _id, name, price, img }));
																props.history.push("/cart");
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
							))}
						</Grid>
					</Grid>
				</Grid>
			</div>
		</>
	);
}
