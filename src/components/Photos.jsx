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
                console.log(data.latest_photos)
            } catch (error) {
                console.log(error.message)
            }
            return () => abortController.abort()
        }
        loadData()
    }, [rover_name])

    const photoList = photos.map((photo, i) => {
        const camera = `${photo.camera.name} - ${photo.camera.full_name}`

        return (
            <li key={i}>
                <div>
                    <p>Photo ID: {photo.id}</p>
                    <p>Date Taken: {photo.earth_date}</p>
                    <p>Camera: {camera} </p>
                    <img src={photo.img_src} alt={`Image ID: ${photo.id}`}/>
                </div>
            </li>
        )
    })

    return (
        <main>
            <p>{rover_name} Photos:</p>
            <ul>{photoList}</ul>
        </main>
    )
}
