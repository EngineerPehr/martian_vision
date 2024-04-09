import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { getLatestPhotos, getRoverData } from "../util/api"
import 'ldrs/grid'

export default function Rover() {
    const { rover_name } = useParams()
    const [roverData, setRoverData] = useState({})
    const [photos, setPhotos] = useState([])
    const [selectedPhoto, setSelectedPhoto] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            const abortController = new AbortController()
            try {
                const rover_data = await getRoverData(rover_name, abortController.signal)
                const photoData = await getLatestPhotos(rover_name, abortController.signal)
                setRoverData(rover_data.photo_manifest)
                setPhotos(photoData.latest_photos)
            } catch (error) {
                console.log(error.message)
            } finally {
                setIsLoading(false)
            }
            return () => abortController.abort()
        }
        loadData()
    }, [rover_name])

    const openModal = (event) => {
        const photoIndex = event.target.id
        setSelectedPhoto(photos[photoIndex])
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedPhoto({})
    }

    const photoList = photos?.map((photo, i) => {
        const camera = `${photo.camera.name} - ${photo.camera.full_name}`
        return (
            <div key={i} id={i} className='col-span-2 xl:col-span-1 p-2 border-2 rounded-md bg-stone-700 hover:bg-stone-500 shadow-md shadow-black hover:shadow-stone-400' onClick={openModal}>
                <div id={i} className="flex flex-row justify-around">
                    <img id={i} src={photo.img_src} alt={`Image ID: ${photo.id}`} className='w-1/3 h-44 rounded-md border-2 border-black'/>
                    <div id={i} className='w-2/3 p-2 text-lg text-center'>
                        <p id={i}>{`${i + 1} of ${photos.length}`}</p>
                        <p id={i}>Photo ID: {photo.id}</p>
                        <p id={i}>Date Taken: {photo.earth_date}</p>
                        <p id={i}>Camera: {camera} </p>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <>
            <header className='w-full h-20 bg-stone-700 py-1'>
                <h1 className='text-center text-6xl'>{roverData.name}</h1>
            </header>
            <main className="w-full my-1">
                {isLoading && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-stone-800 bg-opacity-90 overflow-auto" onClick={closeModal}>
                        <l-grid color='white' size='85'></l-grid>
                    </div>
                )}
                <div className="py-2 px-3 text-center">
                    <h2 className="text-5xl">Misson Info:</h2>
                    <hr className="my-3" />
                    <p className="text-4xl my-2">Launch Date: {roverData.launch_date}</p>
                    <p className="text-4xl my-2">Landing Date: {roverData.landing_date}</p>
                    <p className="text-4xl my-2">Mission Status: {roverData.status}</p>
                    <p className="text-4xl my-2">Martian Days (Sols): {roverData.max_sol}</p>
                    <p className="text-4xl my-2">Photos Taken: {roverData.total_photos}</p>
                </div>
                <hr className="my-3 mx-3" />
                <div className="px-3">
                    <h2 className="text-4xl text-center">Latest Photos:</h2>
                    <hr className="my-3" />
                    {isModalOpen ? 
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 overflow-auto" onClick={closeModal}>
                            <div className="bg-white h-5/6-md mx-4 p-4 rounded-lg shadow-lg">
                                <img src={selectedPhoto.img_src} alt={`Image ID: ${selectedPhoto.id}`} className='w-full-md h-full-md' />
                            </div>
                        </div>
                    :
                        <div className="grid grid-cols-2 gap-2">
                            {photoList}
                        </div>
                    }
                </div>
            </main>
            <footer className='h-10 w-full bg-stone-700 py-2'>
                <p className='text-center'>&copy; 2024 Obelisk Coding</p>
            </footer>
        </>
    )
}