
import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import MapLeaflet from "./MapLeaflet";
import AmChartsMap from "./AmChartsMap";

function Minimap() {
    return (
        <div className="flex justify-between">
            <div className="w-1/2 p-24">
                {/* ส่วนแรก */}
                <div className="p-2">
                    <h3 className="text-center ml-14 text-[24px] font-bold text-shadow-custom">
                        จำนวนครัวเรือนฯ
                    </h3>
                    <p className=" text-center ml-14 text-[18px]">
                        จำนวนครัวเรือนฯ ที่ได้จากการสำรวจ
                    </p>
                    <p className="text-center ml-16 text-[22px] font-bold text-red-500">
                        15,477 <span className="text-black font-normal text-shadow-custom">ครัวเรือน</span>
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
                    <div className="bg-blue-500 text-white px-2 py-1 rounded-l-full font-medium text-sm">
                        จำนวนครัวเรือนยากจน
                    </div>
                    <div className="bg-yellow-400 text-white px-2 py-1 rounded-r-full font-medium text-sm">
                        จำนวนสมาชิกครัวเรือนยากจน
                    </div>
                </div>

                {/* แผนที่ */}
                <div>
                    {/* <MapLeaflet /> */}
                    <AmChartsMap />
                </div>

            </div>
        </div >
    );
}

export default Minimap;
