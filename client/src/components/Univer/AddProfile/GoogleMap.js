import React from 'react'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'

const GoogleMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={18}
    defaultCenter={{ lat: 43.238949, lng: 76.889709 }}
  >
    {props.isMarkerShown && <Marker onDrag={(e) => props.onMap(e.latLng)} draggable={true} position={{ lat: 43.238949, lng: 76.889709 }} />}
  </GoogleMap>
))

export default GoogleMapComponent
