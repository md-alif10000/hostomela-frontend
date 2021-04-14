import { Link } from '@material-ui/core';
import React from 'react'
import Fb from './icons/facebook.png'
import Insta from "./icons/instagram.png";
import Whatsapp from "./icons/whatsapp.png";
import Youtube from "./icons/youtube.png";
import './style.css'

export default function Social({title}) {
    return (
			<div className='text-center'>
				<h3 className='font-18 m-3'>{title}</h3>
				<div className='social-container'>
					<Link>
			
						<img src={Fb} className='social-icon' />{" "}
					</Link>
					<Link>
						<img src={Insta} className='social-icon' />
					</Link>
					<Link>
						<img src={Whatsapp} className='social-icon' />
					</Link>
					<Link>
						<img src={Youtube} className='social-icon' />
					</Link>
				
				</div>
			</div>
		);
}
