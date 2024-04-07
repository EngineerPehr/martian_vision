import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <main>
            <p>Welcome to Martian Vision.</p>
            <p>This site will let you explore the Martian surface through the eyes of the various rovers.</p>
            <p>Use the list below to choose one of the 4 rovers:</p>
            <ul>
                <li><Link to={`/perseverance`}>Perserverance</Link></li>
                <li><Link to={`/curiosity`}>Curiosity</Link></li>
                <li><Link to={`/opportunity`}>Opportunity</Link></li>
                <li><Link to={`/spirit`}>Spirit</Link></li>
            </ul>
        </main>
    )
}