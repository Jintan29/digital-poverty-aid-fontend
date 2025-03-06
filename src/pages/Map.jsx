import React from "react";
import Minimap from "../components/Map/Minimap";

export const Map = () => {
    return (
        <>
            <div>
                {/* จังหวัด */}
                <h1 className="mt-18 ml-6 text-[28px] text-center md:text-[29px] lg:text-left lg:text-[30px]">
                    <span className="font-bold text-shadow-custom">
                        จังหวัด:
                    </span>
                    <span className="text-customBlue font-bold text-shadow-custom">
                        พิษณุโลก
                    </span>
                </h1>

                {/* ข้อมูล */}
                <h1 className="mt-4 ml-auto mr-auto text-[28px] md:text-[29px] w-fit text-center lg:text-[30px]">
                    {/* สำหรับจอเล็ก (Mobile) → แยกบรรทัด */}
                    <span className="font-bold block lg:hidden">ข้อมูลครัวเรือนยากจน</span>
                    <span className="font-bold block lg:hidden">จังหวัด พิษณุโลก</span>

                    {/* สำหรับจอ Desktop → แสดงปกติ บรรทัดเดียว */}
                    <span className="font-bold hidden lg:inline">ข้อมูลครัวเรือนยากจน จังหวัดพิษณุโลก</span>
                </h1>

            </div>
            <Minimap />

        </>
    );
};
