import React from 'react'

export const Contract = () => {
  //ทดลองแสดงข้อมูลฟอร์ม
  const [data,setData] = useState([])

  useEffect(()=>{
      loadData()
  })

  const loadData =async () =>{
      await axios
      .get('http://localhost:8080/api/house-hold/lists')
      //(res)=> setData(res.data)
      .then((res)=> console.log(res))
      .catch((err)=> console.log(err))
      
      
  }
  
  return (
    <div>Contract</div>
  )
}
