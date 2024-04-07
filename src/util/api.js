// const API_KEY = 'bucr0eH79VR1imTL6qsiBWUT0gr6cipwZXiLJUqL'
const API_BASE_URL = 'https://mars-photos.herokuapp.com/api/v1'
const headers = new Headers()
headers.append('Content-Type', 'application/json')

export async function getRoverData(rover_name, signal) {
    const url = new URL(`${API_BASE_URL}/manifests/${rover_name}/`)
    const response = await fetch(url, {headers, signal})
    const data = await response.json()
    return data
}

export async function getRoverPhotos(rover_name, signal) {
    const url = new URL(`${API_BASE_URL}/rovers/${rover_name}/latest_photos?page=1`)
    const response = await fetch(url, {headers, signal})
    const data = await response.json()
    return data
}

