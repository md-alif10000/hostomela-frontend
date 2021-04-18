import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style2.css";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
}));



export default function DetailsBar({onSubmitReview}) {


    	const [value, setValue] = React.useState(0);
			var [stitch, setStitch] = useState("regular");

			const handleChange = (event, newValue) => {
				setValue(newValue);
			};
			

			const classes = useStyles();
			const dispatch = useDispatch();
			const product = useSelector((state) => state.product);
			const cart = useSelector((state) => state.cart);


	return (
		<div className=' text-lg' style={{ fontSize: "20px" }}>
			<div className={classes.root}>
				<AppBar
					position='static'
					style={{
						backgroundImage: "linear-gradient(315deg, #bc52d1 0%, #5f0a87 74%)",

						backgroundColor: "#bc52d1",
						boxShadow: " -2px 1px 2px 2px #ec96fd",
						fontSize: "14px",
					}}>
					<Tabs
						className='flexCol sb bold-600'
						
						style={{ fontSize: "14px",justifyContent:'space-between' }}
						value={value}
						onChange={handleChange}
						aria-label='simple tabs example'>
						<Tab
							className='bold-600'
							style={{ fontSize: "14px" }}
							label='Details'
							{...a11yProps(0)}
						/>
						<Tab
							className='bold-600'
							style={{ fontSize: "14px" }}
							label='Delivery'
							{...a11yProps(1)}
						/>
						<Tab
							className='bold-600 flex-end'
							style={{ fontSize: "14px" }}
							label='Polocy'
							{...a11yProps(2)}
						/>
					
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					<p style={{ fontSize: "16px" }}>{product.productDetails.desc}</p>
				</TabPanel>

				
				<TabPanel value={value} index={1}>
					<p style={{ fontSize: "16px" }}>{product.productDetails.desc}</p>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<p style={{ fontSize: "16px" }}>{product.productDetails.desc}</p>
				</TabPanel>
			</div>
		</div>
	);
}
