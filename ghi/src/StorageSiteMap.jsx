import { useEffect, useState } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

const VITE_GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY


const StorageSiteMap = ({ storageSites, google }) => {
    const [markers, setMarkers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let isMounted = true
        const fetchGeocodingData = async () => {
            setLoading(true)
            try {
                const promises = storageSites.map(async (storageSite) => {
                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                            storageSite.formatted_address
                        )}&key=${VITE_GOOGLE_API_KEY}`
                    )

                    if (!response.ok) {
                        throw new Error('Failed to fetch geocoding data')
                    }
                    const data = await response.json()
                    if (data.results && data.results.length > 0) {
                        const { lat, lng } = data.results[0].geometry.location
                        return { id: storageSite.id, lat, lng }
                    } else {
                        throw new Error('No geocoding results found')
                    }
                })
                const resolvedMarkers = await Promise.all(promises)
                if (isMounted) {
                    setMarkers(resolvedMarkers)
                }
            } catch (error) {
                console.error('Error fetching geocoding data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchGeocodingData()

        return () => {
            isMounted = false
        }
    }, [storageSites])

    return (
        <div style={{ height: '400px', width: '100%' }}>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Map
                    google={google}
                    zoom={4.5}
                    initialCenter={{
                        lat: 39.829575,
                        lng: -99.861435,
                    }}
                    style={{ height: '50rem', width: '50%' }}
                >
                    {markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            label={marker.id.toString()}
                        />
                    ))}
                </Map>
            )}
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: VITE_GOOGLE_API_KEY,
})(StorageSiteMap)
