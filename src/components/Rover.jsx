import { useEffect, useState } from "react"
import { useParams, Link } from 'react-router-dom'
import { getLatestPhotos, getRoverData } from "../util/api"

export default function Rover() {
    const defaultFilters = {
        sol: 0,
        earth_date: '',
        camera: ''
    }
    const { rover_name } = useParams()
    const [roverData, setRoverData] = useState({})
    const [photos, setPhotos] = useState([])
    const [cameras, setCameras] = useState([])
    const [lastDate, setLastDate] = useState('')
    const [filters, setFilters] = useState(defaultFilters)
    
    useEffect(() => {
        const loadData = async () => {
            const cameraSet = new Set()
            const abortController = new AbortController()
            try {
                const rover_data = await getRoverData(rover_name, abortController.signal)
                const photoData = await getLatestPhotos(rover_name, abortController.signal)
                setRoverData(rover_data.photo_manifest)
                setPhotos(photoData.latest_photos)
                setLastDate(photos[0].earth_date)
                roverData.photos.forEach((photo) => {
                    photo.cameras.forEach((camera) => {
                        cameraSet.add(camera)
                    })
                })
                setCameras(Array.from(cameraSet))
            } catch (error) {
                console.log(error.message)
            }
            return () => abortController.abort()
        }
        loadData()
    }, [rover_name, roverData, photos])

    function changeHandler(event) {
        setFilters({...filters, [event.target.name]: event.target.value})
    }

    const photoList = photos?.map((photo, i) => {
        const camera = `${photo.camera.name} - ${photo.camera.full_name}`
        return (
            <div key={i} className='my-3 mx-auto w-2/3 rounded-md shadow-md shadow-black group bg-stone-300 text-black'>
                <div className='p-2'>
                    <p>Photo ID: {photo.id}</p>
                    <p>Date Taken: {photo.earth_date}</p>
                    <p>Camera: {camera} </p>
                </div>
                <img src={photo.img_src} alt={`Image ID: ${photo.id}`} className='p-1 mx-auto h-5/6 w-5/6'/>
            </div>
        )
    })

    const cameraList = cameras?.map((camera, i) => {
        return (
            <option key={i} value={camera}>{camera}</option>
        )
    })

    return (
        <>
            <header className='w-full h-20 bg-stone-700'>
                <h1 className='text-center text-6xl'>Rover - {roverData.name}</h1>
            </header>
            <main className="w-full">
                <div className="py-2 px-3 text-center">
                    <h2 className="text-5xl">Misson Info:</h2>
                    <hr className="my-3" />
                    <p className="text-4xl my-2">- Launch Date: {roverData.launch_date}</p>
                    <p className="text-4xl my-2">- Landing Date: {roverData.landing_date}</p>
                    <p className="text-4xl my-2">- Mission Status: {roverData.status}</p>
                    <p className="text-4xl my-2">- Days on Mars (Sols): {roverData.max_sol}</p>
                    <p className="text-4xl my-2">- Photos Taken: {roverData.total_photos}</p>
                </div>
                <hr className="my-3 mx-3 border-double" />
                <div className="py-2 px-3">
                    <h2 className="text-4xl text-center">Photos: </h2>
                    <div className="mt-3">
                        <form>
                            <div className="flex flex-row justify-around">
                                <div className="">
                                    <label htmlFor="sol">Sol:</label>
                                    <input name="sol" type="number" max={roverData.max_sol} value={filters.sol} className="bg-slate-800 rounded-md shadow-md shadow-black  px-2 py-1"/>
                                </div>
                                <div>
                                    <label htmlFor="earth_date">Earth Date:</label>
                                    <input name="earth_date" type="date" max={lastDate} min={roverData.landing_date} value={filters.earth_date} className="bg-slate-800 rounded-md shadow-md shadow-black  px-2 py-1"/>
                                </div>
                                <div>
                                    <label htmlFor="camera">Camera:</label>
                                    <select name="camera" className="bg-slate-800 rounded-md shadow-md shadow-black px-2 py-1">
                                        <option value='all'>-- ALL --</option>
                                        {cameraList}
                                    </select>
                                </div>
                                <div>
                                    <button>Apply</button>
                                    <button>Clear</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <hr className="my-3" />
                    <div>
                        {photoList}
                    </div>
                </div>
            </main>
            <footer className='h-10 w-full bg-stone-700 py-2'>
                <p className='text-center'>&copy; 2024 Obelisk Coding</p>
            </footer>
        </>
    )
}