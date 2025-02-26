import React from "react";
import Minimap from "../components/Map/Minimap";

export const Map = () => {
    return (
        <>
            <div>
                {/* จังหวัด */}
                <h1 className="mt-18 ml-6 text-[30px]">
                    <span className="font-bold text-shadow-custom">
                        จังหวัด:
                    </span>
                    <span className="text-customBlue font-bold text-shadow-custom">
                        พิษณุโลก
                    </span>
                </h1>

                {/* ข้อมูล */}
                <h1 className="mt-4 ml-auto mr-auto text-[30px] w-fit">
                    <span className="font-bold">
                        ข้อมูลครัวเรือนยากจน จังหวัดพิษณุโลก
                    </span>
                </h1>
            </div>
            <Minimap/>

        </>
    );
};
