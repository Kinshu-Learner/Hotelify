const Footer = ()=>{
    return (
        <div className="bg-indigo-800 py-10">
            <div className="px-10 sm:px-20 xl:container mx-auto flex justify-between items-center">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <span>Hotelify<span className='text-yellow-400'>.</span>com</span>
                </span>
                <span className='text-white font-bold tracking-tight flex flex-col gap-4'>
                    <p className="cursor-pointer">Privacy Policy</p>
                    <p className="cursor-pointer">Terms of Service</p>
                </span>
            </div>
        </div>
    )
}

export default Footer;