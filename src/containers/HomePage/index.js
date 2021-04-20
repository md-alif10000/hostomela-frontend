import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Layout from '../../components/Layout'
import './style.css'
import GridCategory from './gridCategory'
import {renderCategories} from '../renderCategories'
import {getProducts} from '../../actions/product.action'
import NowPlaying from './slider'
import Footer from '../../components/Footer'
import TopSlider from './topSlider'
import Loader from '../../components/Loader'





export default function HomePage(props) {
const dispatch = useDispatch()

   const category = useSelector(state => state.category)
   const cart = useSelector(state => state.cart)



useEffect(() => {


	dispatch(getProducts())
	if (category.loading) {
		return <Loader />;
	}
	
}, [])


useEffect(() => {
	// dispatch(getProducts());
	if (category.loading) {
		return <Loader />;
	}
}, [category.loading]);


if (cart.updatingCart) {
	return <Loader />;
}

    
    return (
			<Layout>
				<div className='main'>
					<div className='mt-60' style={{ display: "flex" }}>
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
							<TopSlider />
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
