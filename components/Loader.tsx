import React from 'react'
import Image from 'next/image'

const Loader = () => {
  return (
    <div className='items-center flex'>
        <Image 
            src={'assets/icons/loader.svg'}
            alt='loader'
            height={24}
            width={24}
            className='animate-spin'
        />
    </div>
  )
}

export default Loader