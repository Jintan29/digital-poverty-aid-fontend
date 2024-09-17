import React from 'react'

export const Nav = () => {
  return (
    <nav className='bg-blue-500 p-4'>
      <div className="flex items-center justify-between">
        <div className='text-white text-2xl font-bold'>ReactTailwind</div>
        {/* สำหรับหน้าจอขนาดเล็ก รายการเมนูจะถูกซ่อน */}
        <ul className='hidden md:flex space-x-4'>
          <li><a href='#' className='text-white'>Home</a></li>
          <li><a href='#' className='text-white'>About</a></li>
          <li><a href='#' className='text-white'>Service</a></li>
          <li><a href='#' className='text-white'>Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}
