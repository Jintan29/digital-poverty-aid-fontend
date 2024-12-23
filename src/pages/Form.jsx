import axios from "axios";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { FristPage } from "../components/Form/FristPage";
import { HumanCapital } from "../components/Form/HumanCapital";
import PhysicalCapital from "../components/Form/PhysicalCapital";
import {Test1} from "../components/Form/Test1";
import GroupSamForm from "../components/Form/GroupSamForm";
import Financialcapital from "../components/Form/Financialcapital";
import Socialcapital from "../components/Form/Socialcapital";
import Naturalcapital from "../components/Form/Naturalcapital";
import Southern from "../components/Form/Southern";
import Suggestions from "../components/Form/Suggestions";
import Naturalcapital2 from "../components/Form/Naturalcapital2";
import Swal from "sweetalert2";
import config from "../config";



export const Form = () => {
  const [currentPage, setCurrentPage] = useState(1); //เปลี่ยนหน้า

  //เก็บData
  const [mainFormData,setMainFormData] = useState({})

  useEffect(() => {
    console.log('now main data is : ',mainFormData);
    
  }, [mainFormData]);

  //submit form
  const handleSubmitMain = async(data)=>{
    try{
      const resConfirm = await Swal.fire({
        title: 'บันทึกข้อมูล',
        text: 'ทำการตรวสอบข้อมูลเสร็จเรียบร้อยแล้วใช่หรือไม่',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true
      });
  
      
      if (resConfirm.isConfirmed) {
        const res = await axios.post(config.api_path + '/formInsertAll/create', data);
        if (res.data.message === 'success') {
          await Swal.fire({
            title: 'บันทึกข้อมูล',
            text: 'บันทึกข้อมูลสำเร็จ',
            icon: 'success',
            showConfirmButton: true
          });
        }
      }
    }catch(e){
      Swal.fire({
        title:'error',
        text:e.response && e.response.data ? e.response.data.message : e.message,
        icon:'error'
      })
    }
  }

  return (
    <>
      <div className="mx-5 mt-20">
        <div className="flex flex-col  justify-center font-bold text-2xl">
          <div className="block text-center mt-5">
            <h1>แบบสอบถาม</h1>
          </div>
          <div className="block text-center">
            <h1>
              ระบบข้อมูลครัวเรือนยากจนระดับพื้นที่
              หน่วยบริหารและจัดการทุนด้านการพัฒนาระดับพื้นที่(บพท.)
              ข้อมูลพื้นฐานครัวเรือน
            </h1>
          </div>
          
        </div>

        <div className="">
          {currentPage === 1 && <FristPage setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData} />}
          {currentPage === 2 && <HumanCapital setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData} />}
          {currentPage === 3 && <PhysicalCapital setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/>}
          {currentPage === 4 && <Financialcapital setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/>}
          {currentPage === 5 && <Naturalcapital setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/>}
          {currentPage === 6 && <Naturalcapital2 setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/>}
          {currentPage === 7 && <Socialcapital setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/>}
          {currentPage === 8 && <Southern setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/>}
          {currentPage === 9 && <Suggestions setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData} handleSubmitMain={handleSubmitMain} />}

          {/* <HumanCapital/> */}

          {/* {currentPage === 5 && <Socialcapital setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/> }

          {currentPage === 6 && <Southern setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/>}
          {currentPage === 7 && <Suggestions setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/>}
          {currentPage === 8 && <Test1 setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/>} */}
        </div>

        {/* {currentPage === 1 && <Southern setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/>}
        {currentPage === 2 && <Suggestions setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/>} */}
        

        
        
      </div>



    </>
  );
};
