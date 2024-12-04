import React from 'react'

export const Test1 = ({setCurrentPage}) => {
  return (
    <div>
        <button onClick={e=>setCurrentPage(6)}>ย้อนกลับ</button>
    </div>
  )
}
