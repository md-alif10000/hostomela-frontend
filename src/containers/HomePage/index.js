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
import  Fade  from 'react-reveal/Fade'
import giftbox from "../../images/giftbox.png"
import Spinner from '../../components/Loader'
import Product from '../../components/Product'
import { generatePublicUrl } from '../../urlconfig'






export default function HomePage(props) {
const dispatch = useDispatch()

   const category = useSelector(state => state.category)
   const cart = useSelector(state => state.cart)
   const {products} = useSelector(state => state.product)
   const _products=products.slice(0,16)



useEffect(() => {


	dispatch(getProducts())
	if (category.loading) {
		return <Spinner/>;
	}
	
}, [])


useEffect(() => {
	// dispatch(getProducts());
	if (category.loading) {
		return <Spinner/>;
	}
}, [category.loading]);


// if (cart.updatingCart) {
// 	return <Spinner/>;
// }




    
    return (
			<Layout>
				<div className='main'>
					<div className='mt-60' style={{ display: "flex" }}>
						<Fade bottom cascade>
							<div className='col-md-12 col-sm-12 col-lg-2 category'>
								<h3>Our Categories</h3>
								<hr className='hr' />

								<ul>
									{category.categories.length > 0
										? renderCategories(category.categories)
										: null}
								</ul>
							</div>
						</Fade>
						<div className='col-md-12 col-sm-12 col-lg-9 m-1 slider-container m-3'>
							<TopSlider />
						</div>
					</div>

					<div className='gridCategoryContainer'>
						<GridCategory />
					</div>
					<span className="giftbox-container">
						<img src={giftbox} className="giftbox" />
					</span>

					<NowPlaying />

					{
						_products.map(product=>
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
							
							/>)
					}


					
				</div>
			</Layout>
		);
}
