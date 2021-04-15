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
import Loader from '../../components/Loader'
import cartReducer from '../../reducers/cart.reducer'





export default function HomePage(props) {
const dispatch = useDispatch()

   const category = useSelector(state => state.category)
   const cart = useSelector(state => state.cart)



useEffect(() => {
	
	dispatch(getProducts())
}, [])


if(category.loading){
	return <Loader/>
}
// if (cart.updatingCart) {
// 	return <Loader />;
// }

    
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
					

						<GridCategory />
					</div>

					<NowPlaying />
				</div>
				<Footer />
			</Layout>
		);
}
