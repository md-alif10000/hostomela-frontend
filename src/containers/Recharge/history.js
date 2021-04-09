import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getRecharges } from "../../actions/recharge.action";
import Header from "../../components/Header";

const useStyles = makeStyles({
	table: {
		minWidth: 300,
	},
});

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
	createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
	createData("Eclair", 262, 16.0, 24, 6.0),
	createData("Cupcake", 305, 3.7, 67, 4.3),
	createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
	const classes = useStyles();
	const dispatch = useDispatch();
		useEffect(() => {
			dispatch(getRecharges());
		}, []);


	const recharge = useSelector((state) => state.recharge);
	// const { recharges } = user.recharge.recharges && user.recharge;


	return (
		<>
			<Header fixed />
			<div className='container mt-5 pt-5 text-lg'>
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell align='left'>Serial</TableCell>
								<TableCell align='right'>Phone Number</TableCell>
								<TableCell align='right'>Amount</TableCell>
								<TableCell align='right'>Operator</TableCell>
								<TableCell align='right'>Status</TableCell>
							</TableRow>
						</TableHead>

						{recharge.recharges && recharge.recharges.length > 0 ? (
							<TableBody>
								{recharge.recharges.map((recharge, index) => (
									<TableRow key={recharge.number}>
										<TableCell align='right'>{index}</TableCell>
										<TableCell component='th' scope='row'>
											{recharge.number}
										</TableCell>
										<TableCell align='right'>{recharge.amount}</TableCell>
										<TableCell align='right'>{recharge.provider}</TableCell>
										<TableCell align='right'>{recharge.status}</TableCell>
									</TableRow>
								))}
							</TableBody>
						) : null}
					</Table>
				</TableContainer>
			</div>
		</>
	);
}
