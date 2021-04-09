import React from 'react'
import {Link} from 'react-router-dom'
import Header from '../../components/Header'

export default function DigitalZone(props) {
    return (
			<>
				<Header fixed />
				<div className='container text-center mt-5 pt-5'>
					<div className='flexRow sb mt-5 pt-5 '>
						<div style={{ textAlign: "center" }} style={{ width: "50%" }}>
							<Link
								to='/digital_zone/ticket'
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
											width: "200px",
											height: "120px",
											borderRadius: "10px",
										}}
										src='https://cdn-s3.nanorep.com/kbLabels/47F63FD4/5A6391A8/5BE3D2A4/3/I%20have%20a%20ticket.png'
									/>
									<h4 style={{ margin: "auto" }}>Ticket</h4>
								</div>
							</Link>
						</div>

						<div style={{ textAlign: "center" }} style={{ width: "50%" }}>
							<Link
								to='/account/recharge'
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
											width: "200px",
											height: "120px",
											borderRadius: "10px",
										}}
										src='https://1.bp.blogspot.com/-rEnYVG_OARE/WVVn-7QMULI/AAAAAAAA5PE/OYuXoBsJijsIv6UiElUkNIOkzeTjTd_ngCLcBGAs/s400/Internet%2BData%2BBonus%2BOffers%2BGrameenphone%2BBanglalink%2BRobi%2Bairtel%2BTeletalk.jpg'
									/>
									<h4 style={{ margin: "auto" }}>Mobile Recharge</h4>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</>
		);
}
