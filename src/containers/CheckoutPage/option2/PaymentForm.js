// import React,{useState} from "react";
// import Typography from "@material-ui/core/Typography";
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";

// export default function PaymentForm() {
// 	const [paymentType, setPaymentType] = useState('')
// 	return (
// 		<React.Fragment>
// 			<Typography variant='h6' gutterBottom>
// 				Payment method
// 			</Typography>
// 			<Grid container spacing={3}>
// 				<FormControl component='fieldset'>
// 					<FormLabel component='legend'>Gender</FormLabel>
// 					<RadioGroup
// 						aria-label='gender'
// 						name='gender1'
// 						value={paymentType}
// 						onChange={(e) => setPaymentType(e.target.value)}>
// 						<FormControlLabel
// 							value='female'
// 							control={<Radio />}
// 							label='Female'
// 						/>
// 						<FormControlLabel value='male' control={<Radio />} label='Male' />
// 						<FormControlLabel value='other' control={<Radio />} label='Other' />
// 						<FormControlLabel
// 							value='disabled'
// 							disabled
// 							control={<Radio />}
// 							label='(Disabled option)'
// 						/>
// 					</RadioGroup>
// 				</FormControl>
// 			</Grid>
// 		</React.Fragment>
// 	);
// }
