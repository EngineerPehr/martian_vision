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

export async function getLatestPhotos(rover_name, signal) {
    const url = new URL(`${API_BASE_URL}/rovers/${rover_name}/latest_photos`)
    const response = await fetch(url, {headers, signal})
    const data = await response.json()
    return data
}

export async function getFilteredPhotos(rover_name, filters, signal) {
    const earth_date = filters.earth_date ? `&earth_date=${filters.earth_date}` : ``
    const sol = filters.sol ? `&sol=${filters.sol}` : ``
    const camera = filters.camera && filters.camera != 'all' ? `&camera=${filters.camera}` : ``
    const url = new URL(`${API_BASE_URL}/rovers/${rover_name}/photos?${earth_date}${sol}${camera}`)
    const response = await fetch(url, {headers, signal})
    const data = await response.json()
    return data
}