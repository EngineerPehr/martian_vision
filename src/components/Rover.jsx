import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { getLatestPhotos, getPhotosByEarthDate, getPhotosBySol, getRoverData } from "../util/api"
import 'ldrs/grid'

export default function Rover() {
    const { rover_name } = useParams()
    const [roverData, setRoverData] = useState({})
    const [photos, setPhotos] = useState([])
    const [selectedPhoto, setSelectedPhoto] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedRadio, setSelectedRadio] = useState('')
    
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

    const isRadioSelected = (value) => value === selectedRadio

    const handleRadio = (event) => setSelectedRadio(event.currentTarget.value)

    const searchBySol = async () => {
        setIsLoading(true)
        const abortController = new AbortController()
        const sol = document.getElementById('sol_search').value
        try {
            const data = await getPhotosBySol(rover_name, sol, abortController.signal)
            setPhotos(data.photos)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
        return () => abortController.abort()
    }

    const searchByEarthDate = async () => {
        setIsLoading(true)
        const abortController = new AbortController()
        const earth_date = document.getElementById('earth_search').value
        try {
            const data = await getPhotosByEarthDate(rover_name, earth_date, abortController.signal)
            setPhotos(data.photos)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
        return () => abortController.abort()
    }

    const resetToLatest = async () => {
        setIsLoading(true)
        const abortController = new AbortController()
        try {
            const photoData = await getLatestPhotos(rover_name, abortController.signal)
            setPhotos(photoData.latest_photos)
        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
        return () => abortController.abort()
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
                    <h2 className="text-4xl text-center">Photos:</h2>
                    <hr className="my-3 mx-3" />
                    <h3 className="text-2xl text-center">Search By:</h3>
                    <div className="my-3">
                        <div className="flex flex-row justify-center my-2">
                            <div className="mx-5">
                                <input type="radio" name="filters" id="sol" value='sol' checked={isRadioSelected('sol')} onChange={handleRadio} />
                                <label htmlFor="sol" className="mx-1 text-xl">Sol</label>
                            </div>
                            <div className="mx-5">
                                <input type="radio" name="filters" id="earth_date" value='earth_date' checked={isRadioSelected('earth_date')} onChange={handleRadio} />
                                <label htmlFor="earth_date" className="mx-1 text-xl">Earth Date</label>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center">
                            {selectedRadio == 'sol' && (
                                <div className="flex flex-row p-1">
                                    <div>
                                        <label htmlFor="sol_search" className="mx-1 text-xl">Sol:</label>
                                        <input name="sol_search" id="sol_search" type="number" required min={0} max={roverData.max_sol} className="w-20 pl-2 mx-2 bg-stone-700 hover:bg-stone-500 hover:border rounded-md" />
                                    </div>
                                    <div className="pt-1">
                                        <button className="w-24 mx-2 border rounded-md bg-stone-700 hover:bg-stone-500 hover:shadow-black hover:shadow-md" onClick={searchBySol}>Search</button>
                                        <button className="w-24 mx-2 border rounded-md bg-stone-700 hover:bg-stone-500 hover:shadow-black hover:shadow-md" onClick={resetToLatest}>Latest</button>
                                    </div>
                                </div>
                            )}
                            {selectedRadio == 'earth_date' && (
                                <div className="flex flex-row p-1">
                                    <div>
                                        <label htmlFor="earth_search" className="mx-1 text-xl">Earth Date:</label>
                                        <input name="earth_search" id="earth_search" type="date" required min={roverData.landing_date} className="w-32 pl-2 mx-2 bg-stone-700 hover:bg-stone-500 hover:border rounded-md" />
                                    </div>
                                    <div className="pt-1">
                                        <button className="w-24 mx-2 my-1 border rounded-md bg-stone-700 hover:bg-stone-500 hover:shadow-black hover:shadow-md" onClick={searchByEarthDate}>Search</button>
                                        <button className="w-24 mx-2 border rounded-md bg-stone-700 hover:bg-stone-500 hover:shadow-black hover:shadow-md" onClick={resetToLatest}>Latest</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {photos.length < 1 && (
                        <div className="my-5">
                            <p className="text-center text-4xl text-red-500">No photos available.</p>
                        </div>
                    )}
                    {isModalOpen ? 
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 overflow-auto" onClick={closeModal}>
                            <div className="bg-white h-5/6 mx-4 p-4 rounded-lg shadow-lg">
                                <img src={selectedPhoto.img_src} alt={`Image ID: ${selectedPhoto.id}`} className='w-full h-full' />
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