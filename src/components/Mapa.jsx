import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

function GoogleMapSection() {
  const position = { lat: 6.2442, lng: -75.5715 }; 

  return (
    <APIProvider apiKey="AIzaSyB4Zcp4EPclbVSwDDh5_SI1UzIXD8DvKpI">
      <div style={{ width: '70%', height: '400px', borderRadius: '16px', overflow: 'hidden', margin: '0 auto' }}>
        <Map
          defaultCenter={position}
          defaultZoom={12}
          mapId="DEMO_MAP_ID"
        >
          <Marker position={position} />
        </Map>
      </div>
    </APIProvider>
  );
}

export default GoogleMapSection;