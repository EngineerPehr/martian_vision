const API_BASE_URL = 'https://mars-photos.herokuapp.com/api/v1'
const headers = new Headers()
headers.append('Content-Type', 'application/json')

export async function getRoverData (rover_name, signal) {
    const url = new URL(`${API_BASE_URL}/manifests/${rover_name}/`)
    const response = await fetch(url, {headers, signal})
    const data = await response.json()
    return data
}

export async function getLatestPhotos (rover_name, signal) {
    const url = new URL(`${API_BASE_URL}/rovers/${rover_name}/latest_photos`)
    const response = await fetch(url, {headers, signal})
    const data = await response.json()
    return data
}

export async function getPhotosBySol (rover_name, sol, signal) {
    const url = new URL(`${API_BASE_URL}/rovers/${rover_name}/photos?sol=${sol}`)
    const response = await fetch(url, {headers, signal})
    const data = await response.json()
    return data
}

export async function getPhotosByEarthDate (rover_name, earth_date, signal) {
    const url = new URL(`${API_BASE_URL}/rovers/${rover_name}/photos?earth_date=${earth_date}`)
    const response = await fetch(url, {headers, signal})
    const data = await response.json()
    return data
}