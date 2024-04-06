import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { getRoverData } from "../util/api"

export default function Rover() {
    const { rover_name } = useParams()
    const [roverData, setRoverData] = useState({})
    useEffect(() => {
        const loadData = async () => {
            const abortController = new AbortController()
            try {
                const data = await getRoverData(rover_name, abortController.signal)
                setRoverData(data.photo_manifest)
                console.log(roverData)
            } catch (error) {
                console.log(error.message)
            }
            return () => abortController.abort()
        }
        loadData()
    }, [rover_name, roverData])

    return (
        <div>
            <h1>{roverData.name}</h1>
            <p>Launch Date: {roverData.launch_date}</p>
            <p>Landing Date: {roverData.landing_date}</p>
            <p>Status: {roverData.status}</p>
            <p>Days on Mars: {roverData.max_sol}</p>
            <p>Number of Photos Taken: {roverData.total_photos}</p>
        </div>
    )
}