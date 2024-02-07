import React, { useEffect, useState } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

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
                        )}&key=AIzaSyAaWLBIJ28YsfKzWHGcDGPOD9ZOgqrTOAM`
                    )
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
                    initialCenter={{ lat: 32.51356, lng: -84.94176 }}
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
    apiKey: 'AIzaSyAaWLBIJ28YsfKzWHGcDGPOD9ZOgqrTOAM',
})(JobSiteMap)

// import React, { useEffect, useState } from 'react'
// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

// const JobSiteMap = ({ address, google }) => {
//     const [coords, setCoords] = useState({ lat: null, lng: null })
//     const [loading, setLoading] = useState(false)

//     useEffect(() => {
//         let isMounted = true
//         const fetchGeocodingData = async () => {
//             setLoading(true)
//             try {
//                 const response = await fetch(
//                     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//                         address
//                     )}&key=AIzaSyAaWLBIJ28YsfKzWHGcDGPOD9ZOgqrTOAM`
//                 )
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch geocoding data')
//                 }
//                 const data = await response.json()
//                 if (data.results && data.results.length > 0) {
//                     const { lat, lng } = data.results[0].geometry.location
//                     if (isMounted) {
//                         setCoords({ lat, lng })
//                     }
//                 } else {
//                     throw new Error('No geocoding results found')
//                 }
//             } catch (error) {
//                 console.error('Error fetching geocoding data:', error)
//             } finally {
//                 setLoading(false)
//             }
//         }

//         if (address) {
//             fetchGeocodingData()
//         }

//         return () => {
//             isMounted = false
//         }
//     }, [address])

//     return (
//         <div style={{ height: '1px', width: '1px' }}>
//             {loading ? (
//                 <div>Loading...</div>
//             ) : (
//                 <Map
//                     google={google}
//                     zoom={13}
//                     initialCenter={
//                         coords.lat && coords.lng
//                             ? coords
//                             : { lat: 32.6, lng: -84.8 }
//                     }
//                 >
//                     {coords.lat && coords.lng && <Marker position={coords} />}
//                 </Map>
//             )}
//         </div>
//     )
// }

// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyAaWLBIJ28YsfKzWHGcDGPOD9ZOgqrTOAM',
// })(JobSiteMap)
