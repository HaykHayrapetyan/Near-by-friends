import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


const style = {
  position: 'relative',
  width: '50%',
  height: '40%',
  // display: 'inline-block',
  // overflow: 'hidden'
}

class MapContainer extends Component {


  render() {
    console.log("propsutyun", this.props)
    if(this.props.google !== undefined){
      return (
        <Map style={style} id="map" google={this.props.google} zoom={14} centerAroundCurrentLocation={true}>

          <Marker onClick={this.onMarkerClick}
            name={'Current location'} position={{lat: this.props.users[0], lng: this.props.users[1]}}/>  
          

          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>inchvor ban</h1>
            </div>
          </InfoWindow>
        </Map>
      ) 
    }
    else 
      return(null);
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAkU9FYvmhW7KJubJX9tBc_6U68cZS3H70')
})(MapContainer)