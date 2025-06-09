import React from 'react'
import { FaSearch } from 'react-icons/fa'

function Searchbar() {
  return (
    <div className='flex items-center mr-4'>
      <input className='bg-springBeige text-[black] px-4 py-1 rounded-xl' type="text" placeholder='search' />
      <button className='-ml-8 text-[black]/70'><FaSearch/></button>
    </div>
  )
}

export default Searchbar
