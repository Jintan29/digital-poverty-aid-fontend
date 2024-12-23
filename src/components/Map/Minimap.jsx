
import React, { useState, useEffect } from "react";
import axios from "axios";

import Map2 from "./Map2"
import Map from "./Map";



function Minimap() {

    const [householdCount, setHouseholdCount] = useState(0);

    useEffect(() => {
        const fetchHouseholdCount = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/house-hold/count");
                setHouseholdCount(response.data.count);
            } catch (error) {
                console.error("Error fetching household count:", error);
            }
        };

        fetchHouseholdCount();
    }, []);


    // const [showMap, setShowMap] = useState(true);

    // // ฟังก์ชันสำหรับการสลับแผนที่
    // const handleClick = (isMap) => {
    //     setShowMap(isMap); // true สำหรับแผนที่แรก, false สำหรับแผนที่ที่สอง
    // };


    // อ่านสถานะจาก localStorage ถ้ามี
    const storedMap = localStorage.getItem('showMap');

    //เงื่อนไข (condition): storedMap คือค่าที่ดึงมาจาก localStorage. ถ้า storedMap มีค่า (เช่นไม่เป็น null หรือ undefined), เงื่อนไขจะเป็น true.
    const initialMapState = storedMap ? JSON.parse(storedMap) : true;

    const [showMap, setShowMap] = useState(initialMapState);

    // ฟังก์ชันสำหรับการสลับแผนที่
    const handleClick = (isMap) => {
        setShowMap(isMap); // true สำหรับแผนที่แรก, false สำหรับแผนที่ที่สอง
        // เก็บสถานะการเลือกแผนที่ใน localStorage
        localStorage.setItem('showMap', JSON.stringify(isMap));
    };

    return (
        <div className="flex justify-between">
            <div className="w-1/2 p-24 mt-[20px]">
                {/* ส่วนแรก */}
                <div className="p-2">
                    <h3 className="text-center ml-14 text-[24px] font-bold text-shadow-custom">
                        จำนวนครัวเรือนฯ
                    </h3>
                    <p className=" text-center ml-14 text-[18px]">
                        จำนวนครัวเรือนฯ ที่ได้จากการสำรวจ
                    </p>
                    <p className="text-center ml-16 text-[22px] font-bold text-red-500">
                    {householdCount.toLocaleString()} <span className="text-black font-normal text-shadow-custom">ครัวเรือน</span>
                    </p>
                </div>
                {/* ส่วนสอง */}
                <div className="p-2 mt-6">
                    <h3 className="text-center ml-16 text-[24px] font-bold text-shadow-custom">
                        จำนวนสมาชิกฯ
                    </h3>
                    <p className="text-center ml-14 text-[18px]">
                        จำนวนสมาชิกที่ได้จากการสำรวจ
                    </p>
                    <p className="text-center ml-20 text-[22px] font-bold text-red-500">
                        58,560  <span className="text-black font-normal text-shadow-custom">คน</span>
                    </p>
                </div>
            </div>

            {/* ซ้าย */}
            <div className="w-1/2 p-4 mt-6">
                <div className="flex justify-center items-center">
                    <div
                        className="bg-blue-500 text-white px-2 py-1 rounded-l-full font-medium text-sm cursor-pointer"
                        onClick={() => handleClick(true)} // กดแสดง Map
                    >
                        จำนวนครัวเรือนยากจน
                    </div>
                    <div
                        className="bg-yellow-400 text-white px-2 py-1 rounded-r-full font-medium text-sm cursor-pointer"
                        onClick={() => handleClick(false)} // กดแสดง Map2
                    >
                        จำนวนสมาชิกครัวเรือนยากจน
                    </div>
                </div>

                {/* แสดงแผนที่ตามการเลือก */}
                <div>
                    {showMap ? <Map /> : <Map2 />}
                </div>
            </div>

        </div >
    );
}

export default Minimap;
