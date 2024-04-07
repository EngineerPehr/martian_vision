import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
    const error = useRouteError()
    console.error(error)

    return (
        <main>
            <h1>Error</h1>
            <p>An error has occured</p>
            <p><i>{error.statusText || error.message}</i></p>
        </main>
    )
}