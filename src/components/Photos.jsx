import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getRoverPhotos } from '../util/api'

export default function Photos() {
    const { rover_name } = useParams()
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const abortController = new AbortController()
            try {
                const data = await getRoverPhotos(rover_name, abortController.signal)
                setPhotos(data.latest_photos)
            } catch (error) {
                console.log(error.message)
            }
            return () => abortController.abort()
        }
        loadData()
    }, [rover_name])

    const photoList = photos.map((photo, i) => {
        return (
            <li key={i}>{photo.id}</li>
        )
    })

    return (
        <main>
            <p>Photos:</p>
            <ul>{photoList}</ul>
        </main>
    )
}
