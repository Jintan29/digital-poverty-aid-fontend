import React, { useEffect, useState } from 'react'

//Impoort components
import HumanCapital from '../../components/OverviewCapital/HumanCapital'
import PhysicalCapital from '../../components/OverviewCapital/PhysicalCapital'
import FinancialCapital from '../../components/OverviewCapital/FinancialCapital'
import NaturalCapital from '../../components/OverviewCapital/NaturalCapital'
import SocialCapital from '../../components/OverviewCapital/SocialCapital'
import Swal from 'sweetalert2'
import axios from 'axios'
import config from '../../config'


const Capital = () => {
  // State สำหรับเก็บข้อมูลทุนทั้งหมดที่ได้จาก API
  const [allCapital, setAllCapital] = useState(null);

  // เรียกใช้งาน API เมื่อ component ถูก mount
  useEffect(() => {
    loadData();
  }, []);

  // ฟังก์ชันดึงข้อมูลจาก API
  const loadData = async () => {
    try {
      const response = await axios.get(config.api_path + '/form/sumCapital', config.headers());

      // ถ้ามีข้อมูล result ให้เก็บลง state, ถ้าไม่มีให้ใช้ {} เพื่อป้องกัน error
      setAllCapital(response.data?.result);

    } catch (err) {
      // แจ้งเตือนเมื่อเกิด error
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: err.response?.data?.message || 'ไม่สามารถโหลดข้อมูลได้',
        icon: 'error',
      });

      // กำหนดค่าเริ่มต้นให้เป็น {} เพื่อป้องกัน error ในกรณีที่ API ล้มเหลว
      // setAllCapital({});
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl text-center font-bold mb-4">ภาพรวมศักยภาพทุน 5 มิติ</h1>
      
      {allCapital &&( <HumanCapital humanCapital={allCapital?.HumenCapital} />)}
      {allCapital &&( <PhysicalCapital physicalCapital={allCapital?.PhysicalCapital}/>)}  
      {allCapital &&( <FinancialCapital financialCapital={allCapital?.FinancialCapital}/>)} 
      {allCapital &&( <NaturalCapital naturalCapital={allCapital?.NaturalCapital}/>)}
      {allCapital &&( <SocialCapital socialCapital={allCapital?.SocialCapital}/>)}
    </div>
  )
}

export default Capital
