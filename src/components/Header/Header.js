import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import TokenService from '../../services/token-service';
import IdleService from '../../services/idle-service';
import './Header.css';

export default class Header extends Component{
	handleLogoutClick=()=>{
		TokenService.clearAuthToken();
	    /* when logging out, clear the callbacks to the refresh api and idle auto logout */
	    TokenService.clearCallbackBeforeExpiry()
	    IdleService.unRegisterIdleResets()
	}

	renderLogoutLink(){
		return(
			<div className='Header__logged-in'>
				<Link onClick={this.handleLogoutClick} to='/'>Logout</Link>
			</div>
		);
	}

	renderLoginLink(){
		return(
			<div className='Header__not-logged-in'>
				<Link to='/login'>Log in</Link>
				<Link to='/register'>Register</Link>
			</div>
		);
	}

	render(){
		return(
			<header className='App__header'>
				<nav className='Header'>
					<h1><Link to='/'><FontAwesomeIcon className='blue' icon='gift' />{' '}Thingful</Link></h1>
					<span className='Header__tagline--wide'>Rate all the things.</span>
					{TokenService.hasAuthToken()
						? this.renderLogoutLink()
						: this.renderLoginLink()}
				</nav>
				<span className='Header__tagline--narrow'>Rate all the things.</span>
			</header>
		);
	}
}
