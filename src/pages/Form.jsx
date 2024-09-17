import axios from "axios";
import React, { useEffect, useState } from "react";
import { FristPage } from "../components/Form/FristPage";

export const Form = () => {
  //ทดลองแสดงข้อมูลฟอร์ม
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  });

  const loadData = async () => {
    await axios
      .get("http://localhost:8080/api/house-hold/lists")
      //(res)=> setData(res.data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

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
      
      <FristPage/>
      
    </div>
  );
};
