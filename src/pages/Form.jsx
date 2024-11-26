import axios from "axios";
import React, { useEffect, useState } from "react";
//import { FristPage } from "../components/Form/FristPage";
//import { HumanCapital } from "../components/Form/HumanCapital";
import Southern from "../components/Form/southern";
//import GroupSamForm from "../components/Form/GroupSamForm";
import Suggestions from "../components/Form/Suggestions";
//import Naturalcapital from "../components/Form/Naturalcapital";



export const Form = () => {
  //ทดลองแสดงข้อมูลฟอร์ม
  const [data, setData] = useState([]);

  useEffect(() => {
    // loadData();
  });

  // const loadData = async () => {
  //   await axios
  //     .get("http://localhost:8080/api/house-hold/lists")
  //     //(res)=> setData(res.data)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  return (
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
      
      {/* หน้าแรกผูกค่าเก็บลงตัวแปรได้แล้วเหลือยิง API */}
      {/* <FristPage/> */}

      {/* กำลังสร้างการ loop */}
      {/*<HumanCapital/>*/}
      <Southern/>
      <Suggestions/>
      {/* <Naturalcapital/> */}
    

      {/* <GroupSamForm/> */}
      
      


    </div>
  );
};
