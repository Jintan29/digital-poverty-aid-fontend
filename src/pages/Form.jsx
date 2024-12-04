import axios from "axios";
import React, { useEffect, useState } from "react";
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



export const Form = () => {
  const [currentPage, setCurrentPage] = useState(1); //เปลี่ยนหน้า
  const totalPage = 3;

  //เก็บData
  const [mainFormData,setMainFormData] = useState({})

  useEffect(() => {
    console.log('now main data is : ',mainFormData);
    
  }, [mainFormData]);

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

        <div className="">
          {currentPage === 1 && <FristPage setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData} />}
          {currentPage === 2 && <HumanCapital setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData} />}
          {currentPage === 3 && <PhysicalCapital setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/>}
          {/* กลับมาแก้เป็นเลข5ด้วย */}
          {currentPage === 4 && <Socialcapital setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/> }
          {currentPage === 5 && <Southern setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/>}
          {currentPage === 6 && <Suggestions setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/>}
          {currentPage === 7 && <Test1 setCurrentPage={setCurrentPage} setMainFormData={setMainFormData} mainFormData={mainFormData}/>}
        </div>
        
      </div>



    </>
  );
};
