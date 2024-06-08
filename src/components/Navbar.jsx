import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-cyan-950 m-4 px-4 md:px-8 py-11 md:py-16 rounded-lg md:rounded-xl w-[90%] md:w-[70%] mx-auto'>

    <nav className="logo flex  justify-between items-center text-white "    >
        <div>
            <span className='font-bold text-3xl'>TaskTrove</span>
        </div>
        <ul className='flex gap-5'>
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your task</li>
        </ul>
    </nav>
    </div>
  )
}

export default Navbar
