// const API_KEY = 'bucr0eH79VR1imTL6qsiBWUT0gr6cipwZXiLJUqL'
const API_BASE_URL = 'https://mars-photos.herokuapp.com/api/v1'
const headers = new Headers()
headers.append('Content-Type', 'application/json')

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
// async function fetchJson(url, options, onCancel) {
//     try {
//         const response = await fetch(url, options)
//         const payload = await response.json()
//         if (payload.error) return Promise.reject({ message: payload.error })
//         return payload.data
//     } catch (error) {
//         if (error.name !== 'AbortError') {
//             console.error(error.stack)
//             throw error
//         }
//         return Promise.resolve(onCancel)
//     }
// }

export async function getRoverData(rover_name, signal) {
    const url = new URL(`${API_BASE_URL}/manifests/${rover_name}/`)
    const response = await fetch(url, {headers, signal})
    const data = await response.json()
    return data
}

