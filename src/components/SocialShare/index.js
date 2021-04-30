import { Link } from "@material-ui/core";
import React from "react";
import Fb from "./icons/facebook.png";
import Insta from "./icons/instagram.png";
import Whatsapp from "./icons/whatsapp.png";
import Youtube from "./icons/youtube.png";
import {
	FacebookShareButton,
	InstapaperShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	FacebookMessengerShareButton,
	FacebookMessengerIcon,
	TwitterIcon
	
} from "react-share";

 
import "./style.css";

export default function SocialShare({ title,url}) {


	return (
		<div className='text-center'>
			<h4 className='title'>{title}</h4>
			<div className='social-container'>
				<FacebookShareButton url={url} quote='Buy from us' hashtag='#Hostomela'>
					<Link>
						<div className='social-share'>
							<img src={Fb} className='social-icon' /> <span>Facebook</span>
						</div>
					</Link>
				</FacebookShareButton>
				<FacebookMessengerShareButton
					url={url}
					appId='142413274468639'
					quote='Buy from us'
					hashtag='#Hostomela'>
					<Link>
						<div className='social-share'>
							<FacebookMessengerIcon className='social-icon' />
							<span>Messenger</span>
						</div>
					</Link>
				</FacebookMessengerShareButton>

				<WhatsappShareButton url={url} quote='Buy from us' hashtag='#Hostomela'>
					<Link>
						<div className='social-share'>
							<img src={Whatsapp} className='social-icon' />
							<span>Whatsapp</span>
						</div>
					</Link>
				</WhatsappShareButton>
				<TwitterShareButton url={url} quote='Buy from us' hashtag='#Hostomela'>
					<Link>
						<div className='social-share'>
							<TwitterIcon className='social-icon' />
							<span>Twitter</span>
						</div>
					</Link>
				</TwitterShareButton>
			</div>
		</div>
	);
}


