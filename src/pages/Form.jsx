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



export const Form = () => {
  const [currentPage, setCurrentPage] = useState(1); //เปลี่ยนหน้า

  //เก็บData
  const [mainFormData,setMainFormData] = useState({})

  useEffect(() => {
    console.log('now main data is : ',mainFormData);
    
  }, [mainFormData]);

  //submit form
  const handleSubmit = ()=>{
    try{
      Swal.fire({
        title:'บันทึกข้อมูล',
        text:'ทำการตรวสอบข้อมูลเสร็จเรียบร้อยแล้วใช่หรือไม่',
        icon:'question',
        showCancelButton:true,
        showConfirmButton:true
      }).then (async res=>{
        if(res.isConfirmed){
          await axios.post(import.meta.env.VITE_API_PATH+'/formInsertAll/create',mainFormData)
          .then(res=>{
            if(res.data.message==='success'){
              Swal.fire({
                title:'บันทึกข้อมูล',
                text:'บันทึกข้อมูลสำเร็จ',
                icon:'success',
                timer:1500
              })
            }
          }).catch(err=>{
            throw err.response.data
          })
        }
      })
    }catch(e){
      Swal.fire({
        title:'error',
        text:e.message,
        icon:'error'
      })
    }
  }

  return (
    <>
      <div className="mx-5 my-5">
        <div className="flex flex-col  justify-center font-bold text-2xl">
          <div className="block text-center">
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
        <button
              type="button"
              onClick={e=>handleSubmit()}
              class="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              ทดสอบยิงAPI
              <Icon
                icon="material-symbols:order-approve-outline-rounded"
                width="25"
                height="25"
              />
            </button>

        <div className="">
          {currentPage === 1 && <FristPage setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData} />}
          {currentPage === 2 && <HumanCapital setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData} />}
          {currentPage === 3 && <PhysicalCapital setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/>}
          {/* กลับมาแก้เป็นเลข5ด้วย */}
          {/* {currentPage === 4 && <Naturalcapital setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/>}
          {currentPage === 5 && <Socialcapital setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/> }
          {currentPage === 6 && <Southern setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/>}
          {currentPage === 7 && <Suggestions setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/>}
          {currentPage === 8 && <Test1 setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/>} */}
        </div>

        {/* เสร็จ */}
        {/* <Naturalcapital/> */}
        {/* <FristPage setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/> */}
        


        {/* รอแก้ */}
        {/* <Naturalcapital2/> */}
        {/* <Financialcapital/> */}

        
      </div>



    </>
  );
};
