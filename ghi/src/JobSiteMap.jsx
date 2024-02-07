import React, { useEffect, useState } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

const VITE_GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
console.log('api', VITE_GOOGLE_API_KEY)

const JobSiteMap = ({ jobSites, google }) => {
    const [markers, setMarkers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let isMounted = true
        const fetchGeocodingData = async () => {
            setLoading(true)
            try {
                const promises = jobSites.map(async (jobSite) => {
                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                            jobSite.formatted_address
                        )}&key=${VITE_GOOGLE_API_KEY}`
                    )
                    console.log('reponse', response)
                    if (!response.ok) {
                        throw new Error('Failed to fetch geocoding data')
                    }
                    const data = await response.json()
                    if (data.results && data.results.length > 0) {
                        const { lat, lng } = data.results[0].geometry.location
                        return { id: jobSite.id, lat, lng }
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
    }, [jobSites])

    return (
        <div style={{ height: '400px', width: '100%' }}>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Map
                    google={google}
                    zoom={10}
                    initialCenter={{
                        lat: 32.51800490638247,
                        lng: -84.93937291055167,
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
})(JobSiteMap)
