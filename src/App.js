import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./containers/HomePage";
import ProductListPage from "./containers/ProductListPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { isUserLoggedIn } from "./actions/auth.action";
import ProductDetailsPage2 from "./containers/ProductDetailsPage/index2";
import Login from "./containers/auth/Login/index";
import Register from "./containers/auth/Register/index4";
import ChangePassword from "./containers/auth/RESET_PASS";
import CheckoutPage2 from "./containers/CheckoutPage/option2/Checkout";
import { updateCart } from "./actions/cart.action";
import OrderPage from "./containers/OrderPage/index2";
import OrderDetailsPage from "./containers/OrderDetailsPage/index2";
import CartPage3 from "./containers/CartPage/index3";
import Account from "../src/containers/account";
import AboutUs from "./containers/AboutUs";
import ContactUs from "./containers/ContactUs";
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
					<Route path='/cart' component={CartPage3} />
					<Route path='/checkout' component={CheckoutPage2} />

					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
					<Route path='/change_password' component={ChangePassword} />
					<Route path='/account/orders' component={OrderPage} />
					<Route path='/account' component={Account} />
					<Route path='/about-us' component={AboutUs} />
					<Route path='/contact-us' component={ContactUs} />
					<Route path='/order_details/:orderId' component={OrderDetailsPage} />

					<Route
						path='/:productSlug/:productId/p'
						component={ProductDetailsPage2}
					/>
					<Route path='/:slug' component={ProductListPage} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
