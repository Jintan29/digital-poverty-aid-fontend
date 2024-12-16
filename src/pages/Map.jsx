import React from "react";
import Minimap from "../components/Map/Minimap";

export const Map = () => {
    return (
        <>
            <div>
                {/* จังหวัด */}
                <h1 className="mt-4 ml-6 text-[24px]">
                    <span className="font-bold text-shadow-custom">
                        จังหวัด:
                    </span>
                    <span className="text-customBlue font-bold text-shadow-custom">
                        พิษณุโลก
                    </span>
                </h1>

                {/* ข้อมูล */}
                <h2 className="mt-4 ml-auto mr-auto text-[22px] w-fit">
                    <span className="font-bold">
                        ข้อมูลครัวเรือนยากจน จังหวัดพิษณุโลก
                    </span>
                </h2>
            </div>
            <Minimap/>

        </>
    );
};
