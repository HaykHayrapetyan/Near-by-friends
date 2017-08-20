import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextField from 'material-ui/TextField';

import change from '../actions/test.action';

import MapContainer from './MapComponent/Map'
import { Button } from 'antd';
import '../../node_modules/antd/dist/antd.css'; 
import Modal from './Modal/Modal'
import Table from './Table/Table'

const mapStateToProps = ({ test }) => {
	return { test };
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		change
	}, dispatch);
}

class Layout extends PureComponent {

	constructor(){
		super()
		this.state = {
			users: null
		}
	}
	componentDidMount() {
    navigator.geolocation.getCurrentPosition((success, error, options) => {
      if(success){
        this.setState({ 
          users: [success.coords.latitude,  success.coords.longitude]      
        })
      }
    })
    
}
	render() {
		const {users} = this.state
		if(!users){
			return (null)
		}
		return (
			<div id="div">
				<div id="CheckinYourself">Check-in Yourself</div>
				<br/>
				<div id="map">
					<MapContainer users={this.state.users} />
				</div>
				<br/>
				 <div id="CheckInButton">
					 <Modal users={this.state.users}/>
				</div> 
				<br/>
				
				<div id="table"> 
					<Table users={this.state.users}/>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);