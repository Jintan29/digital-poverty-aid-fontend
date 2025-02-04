import React, { useEffect, useState } from "react";
import { longdo, map, LongdoMap } from "../../../longdo-map/LongdoMap.jsx";
import config from "../../../config.js";
import Swal from "sweetalert2";
import axios from "axios";

const GisHousehold = () => {
  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    loadData();
  }, []);
  
  //หากมีค่าแล้วไป init map
  useEffect(()=>{
    if(locationList && locationList!== undefined &&locationList.length>0){
      initMap()
    }
  },[locationList])

  const loadData = async () => {
    try {
      const resAPI = await axios.get(
        config.api_path + "/physical-capital/location"
      );
      setLocationList(resAPI.data.results);
    } catch (err) {
      Swal.fire({
        title: "error",
        text: err.response?.data?.message || err.message,
        icon: "error",
      });
    }
  };

  // ใช้ CSS ในการตกแต่งปุ่ม
  const style = document.createElement("style");
  style.innerHTML = `
  .my-custom-button {
    background-color: #1e40af;
    color: white;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 11px;
    border: none;
    cursor: pointer;
    margin-top: 5px;
  }
  .my-custom-button:hover {
    background-color: #1e3a8a;
  }
    .popup-text {
    line-height: 1; /* ปรับระยะห่างบรรทัดเพื่อให้ข้อความไม่ติดกัน */
  }
`;
  document.head.appendChild(style);

  const initMap = () => {
    if (map && longdo && locationList && locationList.length > 0) {
      map.Layers.setBase(longdo.Layers.GRAY);
      map.location({ lon: 100.2634423, lat: 16.8157611 }, true);
      map.zoom(9, true);

      map.Tags.add(function (zoom) {
        locationList.forEach((item) => {
          // เพิ่มการตรวจสอบข้อมูลก่อนสร้าง Marker
          if (item.lon && item.lat && 
              !isNaN(parseFloat(item.lon)) && 
              !isNaN(parseFloat(item.lat))) {
            const lon = parseFloat(item.lon);
            const lat = parseFloat(item.lat);

            const markerSize = zoom < 12 ? 20 : zoom < 16 ? 30 : 40;

            const marker = new longdo.Marker(
              { lon, lat },
              {
                visibleRange: { min: 7, max: 20 },
                size: { width: markerSize, height: markerSize },
                popup: {
                  title: "รายละเอียดครัวเรือน",
                  size: { width: 250, height: 80 },
                  detail: `
                    <div class="popup-text">
                      บ้านของ: ${item.Household?.host_fname || 'ไม่ระบุ'} ${item.Household?.host_lname || 'ไม่ระบุ'}
                    </div> <br>
                    <a href="/admin/track-household/${item.Household?.id || ''}">
                      <button class="my-custom-button">
                        ดูข้อมูลครัวเรือน
                      </button>
                    </a>
                  `,
                },
              }
            );
            map.Overlays.add(marker);
          }
        });
      });
    }
  };

  const mapKey = config.api_token_map;

  return (
    <>
      <h2 className="text-2xl font-semibold pt-4 px-4 pb-2 mt-7">
        ระบบแสดงแผนที่อยู่ครัวเรือนยากจนในพิษณุโลก
      </h2>
      <div className="w-full bg-white my-2 mx-3 rounded-lg">
        <div className="pb-10 pt-3 px-4">
          <h4 class="text-xl font-bold mt-3">ข้อมูลที่พบตำแหน่ง GIS</h4>
          <h5 className="text-lg font-bold text-red-500">
            {locationList.length} ครัวเรือน
          </h5>
        </div>

        <div className="p-4 pt-2" style={{ width: "100%", height: "500px" }}>
          <LongdoMap id="longdo-map" mapKey={mapKey} callback={initMap} />
        </div>
      </div>
    </>
  );
};

export default GisHousehold;
