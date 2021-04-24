import { Link } from "@material-ui/core";
import React from "react";
import Fb from "./icons/facebook.png";
import Insta from "./icons/instagram.png";
import Whatsapp from "./icons/whatsapp.png";
import Youtube from "./icons/youtube.png";
import "./style.css";

export default function SocialShare({ title }) {
	return (
		<div className='text-center'>
			<h4 className='title'>{title}</h4>
			<div className='social-container'>
				<Link>
					<div className='social-share'>
						<img src={Fb} className='social-icon' /> <span>Facebook</span>
					</div>
				</Link>
				<Link>
					<div className='social-share'>
						<img src={Insta} className='social-icon' />
						<span>Insta</span>
					</div>
				</Link>
				<Link>
					<div className='social-share'>
						<img src={Whatsapp} className='social-icon' />
						<span>Whatsapp</span>
					</div>
				</Link>
				<Link>
					<div className='social-share'>
						<img src={Youtube} className='social-icon' />
						<span>Youtube</span>
					</div>
				</Link>
			</div>
		</div>
	);
}
