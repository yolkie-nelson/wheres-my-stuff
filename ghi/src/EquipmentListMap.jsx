import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const VITE_GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const EquipmentListMap = ({ equipmentList, google }) => {
    return (
        <div style={{ height: '400px', width: '100%' }}>
            <Map
                google={google}
                zoom={4.5}
                initialCenter={{
                    lat: 39.829575,
                    lng: -99.861435
                }}
                style={{ height: '50rem', width: '50%' }}
            >
                {equipmentList.map(equipment => (
                    <Marker
                        key={equipment.id}
                        position={{ lat: equipment.latitude, lng: equipment.longitude }}
                        label={equipment.model_name}
                    />
                ))}
            </Map>
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: VITE_GOOGLE_API_KEY
})(EquipmentListMap);
