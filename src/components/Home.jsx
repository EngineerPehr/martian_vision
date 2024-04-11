import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <header className='w-full h-20 bg-stone-700 py-1'>
                <h1 className='text-center text-6xl'>Martian Vision</h1>
            </header>
            <main className="w-full my-1">
                <div className="py-2 px-3 text-center">
                    <h2 className="text-5xl">Select a Rover:</h2>
                </div>
                <hr className="my-3 mx-3" />
                <div className="flex flex-col items-center px-3">
                    <Link to={'/curiosity'}>
                        <div className='size-96 mx-auto border-2 rounded-md my-2 bg-stone-700 hover:bg-stone-500 shadow-md shadow-black hover:shadow-stone-500'>
                            <h3 className='text-center text-3xl mb-2'>Curiosity</h3>
                            <img src='/curiosity.jpg' alt='Curiosity' className='size-80 mx-auto' />
                        </div>
                    </Link>
                    <Link to={'/opportunity'}>
                        <div className='size-96 border-2 rounded-md my-2 bg-stone-700 hover:bg-stone-500 shadow-md shadow-black hover:shadow-stone-500'>
                            <h3 className='text-center text-3xl mb-2'>Opportunity</h3>  
                            <img src='/opportunity.jpg' alt='Opportunity' className='size-80 mx-auto' />
                        </div>
                    </Link>
                    <Link to={'/perseverance'}>
                        <div className='size-96 mx-auto border-2 rounded-md my-2 bg-stone-700 hover:bg-stone-500 shadow-md shadow-black hover:shadow-stone-500'>
                            <h3 className='text-center text-3xl mb-2'>Perseverance</h3>
                            <img src='/perseverance.gif' alt='Perseverance' className='size-80 mx-auto' />
                        </div>
                    </Link>
                    <Link to={'/spirit'}>
                        <div className='size-96 border-2 rounded-md my-2 bg-stone-700 hover:bg-stone-500 shadow-md shadow-black hover:shadow-stone-500'>
                            <h3 className='text-center text-3xl mb-2'>Spirit</h3>
                            <img src='/spirit.jpg' alt='Spirit' className='size-80 mx-auto' />
                        </div>
                    </Link>
                </div>
            </main>
            <footer className='h-10 w-full bg-stone-700 py-2'>
                <p className='text-center'>&copy; 2024 Obelisk Coding</p>
            </footer>
        </>
    )
}