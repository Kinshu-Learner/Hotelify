import { Link } from 'react-router-dom';

const Header = ()=>{
    return (
        <div className="bg-indigo-800 py-6">
            <div className="px-10 sm:px-20 xl:container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="">Hotelify<span className='text-yellow-400'>.</span>com</Link>
                </span>
                <span className='flex space-x-2'>
                    <Link to="/sign-in" className='flex items-center rounded-sm bg-white text-indigo-600 px-3 font-bold hover:bg-gray-100 duration-100'>Sign In</Link>
                </span>
            </div>
        </div>
    )
}

export default Header;