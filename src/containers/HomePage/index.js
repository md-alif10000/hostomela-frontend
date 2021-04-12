import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import MenuHeader from '../../components/MenuHeader'
import {Carousel as Caro} from 'react-responsive-carousel'
import  Carousel from "react-elastic-carousel"
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

import './style.css'
import Item from './item.js'
import GridCategory from './gridCategory'

import {renderCategories} from '../renderCategories'
import {getProducts} from '../../actions/product.action'
import { List } from '@material-ui/core'
import NowPlaying from './slider'
import Footer from '../../components/Footer'
import TopSlider from './topSlider'





export default function HomePage(props) {
const dispatch = useDispatch()

   const category = useSelector(state => state.category)



useEffect(() => {
	
	dispatch(getProducts())
}, [])

    
    return (
			<Layout>
				<div className=' main'>
					<div className='' style={{ display: "flex" }}>
						<div className='col-md-12 col-sm-12 col-lg-2 category'>
							<h3>Our Categories</h3>
							<hr className='hr' />

							<ul>
								{category.categories.length > 0
									? renderCategories(category.categories)
									: null}
							</ul>
						</div>
						<div className='col-md-12 col-sm-12 col-lg-9 m-1 slider-container m-3'>
						<TopSlider/>
						</div>
					</div>

					<div className='gridCategoryContainer'>
						{/* <img style={{width:'100%',height:'100%'}} src={generatePublicUrl(category.img)} /> */}
						{/* <Paper className={classes.paper}> */}
						<div style={{ textAlign: "center" }}>
							<Link
								to='/digital_zone'
								style={{
									textDecoration: "none",
									margin: "auto",
									textAlign: "center",
								}}>
								<div
									className='categorybox'
									style={{
										display: "inline-block",
										// flexDirection: "column",
									}}>
									<img
										style={{
											width: "100px",
											height: "80px",
											borderRadius: "10px",
										}}
										src='https://cdn.jagonews24.com/media/imgAllNew/BG/2018September/b-20181010173052.jpg'
									/>
									<h4 style={{ margin: "auto" }}>Digital Zone</h4>
								</div>
							</Link>
						</div>

						{/* </Paper> */}

						<GridCategory />
					</div>

					<NowPlaying />
				</div>
				<Footer />
			</Layout>
		);
}
