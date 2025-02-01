import React, { useEffect, useState } from "react";
import { longdo, map, LongdoMap } from "../../longdo-map/LongdoMap.jsx"
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../config.js";

const MapHousehold = ({household}) => {
    const houseId = household.id
    const [location,setLocation] = useState({})

    useEffect(()=>{
        loadPinMap()
    },[])

    //ติดตาม props กันค่า null & undefind
    useEffect(() => {
        if (location && location.PhysicalCapital) {
            initMap();
        }
    }, [location])

    const loadPinMap = async() =>{
        try{
            const responseAPI = await axios.get(config.api_path+`/physical-capital/locationById/${houseId}`)
            const result = responseAPI.data.result;
        
        // ตรวจสอบความถูกต้องของข้อมูล
        if (result && result.PhysicalCapital && 
            result.PhysicalCapital.lon && 
            result.PhysicalCapital.lat) {
            setLocation(result)
        } else {
            Swal.fire({
                title: 'ข้อผิดพลาดตำแหน่ง',
                text: 'ไม่พบข้อมูลตำแหน่ง'
            })
        }
            
        }catch(err){
            Swal.fire({
                title:'error',
                text:err.response?.data?.message || err.message
            })
        }
    }

    const initMap=()=>{
        if(map &&longdo &&location && location.PhysicalCapital &&location.PhysicalCapital.lon !== undefined
        && location.PhysicalCapital.lat !== undefined&&household){
            map.Layers.setBase(longdo.Layers.GRAY);
            console.log('location is');
            
            console.log(location);
            
            //get location form API
            const lon = parseFloat(location.PhysicalCapital?.lon);
            const lat = parseFloat(location.PhysicalCapital?.lat);

            map.location({lon,lat})
            map.zoom(12,true)

            const marker = new longdo.Marker({lon,lat},
                {
                    title:'ที่อยู่สมาชิกครัวเรือน',
                    popup:{
                        title:'ที่อยู่สมาชิกครัวเรือน',
                        detail: `
                    <div >บ้านของ: ${location?.host_fname} ${location?.host_lname}</div> <br>
                  `,
                    }
                }
            )

            map.Overlays.add(marker)

        }
    }
    const mapKey = config.api_token_map;

    return (
    <div className="bg-white p-6 shadow-lg rounded-lg w-full mt-2">
      <h2 className="text-xl font-semibold mb-6 text-start text-gray-800">
        ตำแหน่งที่ตั้ง
      </h2>
      <div  style={{ width: "100%", height: "500px" }}>
      <LongdoMap id="longdo-map" mapKey={mapKey} callback={initMap} />
    </div>
    </div>
  );
};

export default MapHousehold;
