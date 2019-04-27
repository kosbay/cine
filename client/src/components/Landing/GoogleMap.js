import React from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

const GoogleMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: 43.22936302, lng: 76.95092692 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 43.22936302, lng: 76.95092692 }} />}
  </GoogleMap>
));

export default GoogleMapComponent;
