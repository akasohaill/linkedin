import { Input } from './ui/input'
import React from 'react'

const SearchInput = () => {
  return (
    <div>
      <Input 
      type="text"
       placeholder="Search..."
       className='w-80 rounded-lg border-none bg-[#EDF3D8]' />
    </div>
  )
}

export default SearchInput
