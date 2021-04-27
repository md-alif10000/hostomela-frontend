import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./containers/HomePage";
import ProductListPage from "./containers/ProductListPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { isUserLoggedIn } from "./actions/auth.action";
import ProductDetailsPage from "./containers/ProductDetailsPage";
import Login from "./containers/auth/Login/index";
import Register from "./containers/auth/Register";
import ChangePassword from "./containers/auth/RESET_PASS";
import CheckoutPage from "./containers/CheckoutPage/option2/Checkout";
import { updateCart } from "./actions/cart.action";
import OrderPage from "./containers/OrderPage/index";
import OrderDetailsPage from "./containers/OrderDetailsPage/index";
import CartPage2 from "./containers/CartPage/index2";
import Account from "../src/containers/account";
import AboutUs from "./containers/AboutUs";
import ContactUs from "./containers/Contact";
import Terms from "./containers/Terms";
import Return from "./containers/Return";
import Privacy from "./containers/Privacy";
import { getAllCategory } from "./actions";

function App() {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		if (!auth.authenticate) {
			dispatch(isUserLoggedIn());
		}
	}, [auth.authenticate]);

	useEffect(() => {
		dispatch(updateCart());
	}, [auth.authenticate]);
	useEffect(() => {
		dispatch(getAllCategory());
	}, []);

	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route path='/' exact component={HomePage} />
					<Route path='/cart' component={CartPage2} />
					<Route path='/checkout:deliveryCharge' component={CheckoutPage} />

					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
					<Route path='/change_password' component={ChangePassword} />
					<Route path='/account/orders' component={OrderPage} />
					<Route path='/account' component={Account} />
					<Route path='/about-us' component={AboutUs} />
					<Route path='/contact-us' component={ContactUs} />
					<Route path='/terms&conditions' component={Terms} />
					<Route path='/privacy-policy' component={Privacy} />
					<Route path='/return-policy' component={Return} />
					<Route path='/order_details/:orderId' component={OrderDetailsPage} />

					<Route
						path='/:productSlug/:productId/p'
						component={ProductDetailsPage}
					/>
					<Route path='/:slug' component={ProductListPage} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
