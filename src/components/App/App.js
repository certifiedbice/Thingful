import React,{Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import Header from '../Header/Header';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import ThingListPage from '../../routes/ThingListPage/ThingListPage';
import ThingPage from '../../routes/ThingPage/ThingPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import './App.css';

class App extends Component{
	state={hasError:false};
	static getDerivedStateFromError(error){
		console.error(error);
		return {hasError:true};
	}
	render(){
		return(
			<div className='App'>
				<Header />
				<main className='App__main'>
					{this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
					<Switch>
						<Route exact path={'/'}	component={ThingListPage}/>
						<PublicOnlyRoute path={'/login'} component={LoginPage}/>
						<PublicOnlyRoute path={'/register'} component={RegistrationPage}/>
						<PrivateRoute path={'/thing/:thingId'} component={ThingPage}/>
						<Route component={NotFoundPage}/>
					</Switch>
				</main>
			</div>
		);
	}
}

export default App;
