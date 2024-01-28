import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
const MapComponent = ({ props }) => {
  const { position, setPosition } = props;

  const handleClick = (e) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
  };

  const ClickEvents = () => {
    useMapEvents({
      click: handleClick,
    });
    return null;
  };

  return (
    <MapContainer center={position} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          Your location = {position[0]}==={position[1]}
        </Popup>
      </Marker>
      <ClickEvents />
    </MapContainer>
  );
};

export default MapComponent;
