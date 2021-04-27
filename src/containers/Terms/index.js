import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import Product from "../../components/Product";
import Social from "../../components/Social";
import Fade from "react-reveal/Fade";

export default function Terms() {
	return (
		<Layout>
			<div className='container'>
				<Fade right cascade>
					<div className='row'>
						<div className='col-sm-12 '>
							<img
								className='rounded-3'
								src='https://i2.wp.com/www.hostomela.com/wp-content/uploads/2020/10/wp-1604031438316.jpg?fit=896%2C960&ssl=1'
								width='100%'
								height='300px'
							/>
						</div>

						<div className='col p-5'>
							<p className='text-center'>
								হস্ত মেলা ⊙ সুপার শপ is the largest one-stop shopping
								destination in Bangladesh. Launched in 2016, the online store
								offers the widest range of products in categories ranging from
								Women Dress, Baby Dress, Cosmetics, Bag ETC.
							</p>
						</div>
					</div>
				</Fade>
				<hr />
				<hr />

				<div className='row'>
					<div className='col-sm-12'>
						<Fade left cascade>
							<p className=''>
								<ul className='about-list'>
									<li>
										<span>🌟</span>
										<strong>হস্ত মেলা ⊙ সুপার শপ</strong> believes in
										“Delivering Happiness” with an excellent customer experience
										thus provides the most efficient delivery service through
										own logistics so that customers get a hassle-free product
										delivery at their doorstep.
									</li>
									<li>
										<span>🌟</span>
										We help our local and international vendors as well as 50
										brands serving thousands of consumers from all over
										Bangladesh.
									</li>
									<li>
										<span className='text-lg m-3'>🌟</span>
										We also offer free returns and various payment methods
										including Cash on delivery, Online Payments, Card on
										delivery and bKash with all of our products.
									</li>
									<li>
										<span>🌟</span>
										<strong>হস্ত মেলা ⊙ সুপার শপ</strong> has this unique
										ability to capture our customer’s heart through our
										communication, presentation and unearthly beautiful
										collections.
									</li>
									<li>
										<span>🌟</span>
										We always put our customer’s choice first while choosing our
										products.
									</li>
									<li>
										<span>🌟</span>
										We bring items focusing on our customer’s preferences rather
										attracting customers for our products that is why we have
										become our customers first choice in case of online
										purchasing from Facebook in Bangladesh. And we have such
										good people working in our team who are more like a family
										to us than employees so that we are able to provide the best
										to our customers.
									</li>
									<li>
										<span>🌟</span>
										Make the right choice Indulge in Genuine and quality
										products <strong>হস্ত মেলা ⊙ সুপার শপ</strong> lets you
										discover and experience the best of every product. Our team
										works with a variety of brands and vendors from all over the
										world to bring in new products everyday.
									</li>
									<li>
										<span>🌟</span>
										Ultimate one-stop shopping experience in Bangladesh Most
										trusted online shopping platform Wide selection of the best
										local and foreign brands Fastest Delivery service Easy
										Return Genuine and authentic products Warranty/Service
										Facility 0% interest EMI schemes We not only sell women
										cloths here we also made a big community here where our
										customers come and enjoy.
									</li>
									<li>
										<span>🌟</span>
										As we post regular updates of our collections on our page
										about our collections, our customers are comment on our
										posts and lives, give reactions to the feedback who
										purchased from our post.
									</li>
								</ul>
							</p>
						</Fade>
					</div>
					<hr />
					<hr />

					<div className='col-sm-12 p-3'>
						<Fade cascade left>
							<p className='text-center'>
								<h1 className='bold-700 bolder'>
									Why should you have to wait for days to receive your product?{" "}
								</h1>
								We offer various delivery methods for all products for the most
								convenient and safe product delivery. Click & Collect Services
								Office Pickup/Collection Fast Pick & Same day delivery Sundarban
								Courier Service Secure Checkout We take no chance with your
								security <strong>হস্ত মেলা ⊙ সুপার শপ</strong> is a licensed,
								authorized, and fully protected website which offers safe and
								secure checkout for all our customers. We take special care in
								securing all your personal information through various security
								checks. Our business is licensed and regulated with the sole
								purpose of our customer’s security and convenience.{" "}
								<strong>হস্ত মেলা ⊙ সুপার শপ</strong> is not only a cloth
								selling page its a community of women in Bangladesh who love to
								wear Saree, Salwar Kamiz, Lehenga, Salwor, Baby Dress see new
								collections, have ideas how to style and wear them, give
								feedback, see others feedback and interact with other people who
								buy from us. <strong>হস্ত মেলা ⊙ সুপার শপ</strong> is most
								trustworthy, because we are giving our customers services that
								require no advance payment. We deliver our goods first then
								customers pay the prices. So that our customer doesn’t have to
								worry about paying in advance or getting a false product
								afterwards, that is why our services got huge popularity in our
								community. Contact Us Experience the best Customer Care
								Customer’s happiness is our highest priority. We have
								round-the-clock Customer Care service. Customer Service hotline
								+880 1912-69 44 00 & 01400 69 11 22 available from 9:00 am to
								5:00 pm Mail us at hostomela@gmail.com & info@hostomela.com
								Facebook chat or through Live Chat on{" "}
								<strong>হস্ত মেলা ⊙ সুপার শপ</strong> website hostomela.com.
								Feedback call:
								<br />
								Instagram:
								<a href='https://www.instagram.com/hostomelabd'>
									{" "}
									www.instagram.com/hostomelabd
								</a>
								<br />
								Twitter:
								<a href='https://www.twitter.com/hostomelabd'>
									www.twitter.com/hostomelabd
								</a>
							</p>
						</Fade>
						<div className='m-5 p-5' style={{ maxWidth: "400px" }}>
							<Social width='40px' height='40px' title='Follow us on:' />
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
