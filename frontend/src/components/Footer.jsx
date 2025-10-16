import React from 'react'

const Footer = () => {

  const year = new Date().getFullYear()

  return (
    <div className='flex justify-between border-t py-5 border-gray-500 mt-10'>
      <p className='text-gray-600'><span className='text-gray-800 font-semibold'>FOOD BLOG - </span>Food Recipies App</p>
      <p className='text-gray-800'>@{year} All rights reserved.</p>
    </div>
  )
}

export default Footer
