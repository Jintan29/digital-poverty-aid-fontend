import React from 'react'

export const Test1 = ({setCurrentPage}) => {
  return (
    <div>
        <button onClick={e=>setCurrentPage(3)}>ย้อนกลับ</button>
    </div>
  )
}
