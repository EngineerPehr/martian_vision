export default function capitalize (string='') {
    const firstLetter = string[0].toUpperCase()
    const substring = string.slice(1).toLowerCase()
    const word = firstLetter + substring
    return word
}