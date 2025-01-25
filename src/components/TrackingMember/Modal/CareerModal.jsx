import React, { useState } from "react";
import Modal from "../../Modal";
import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../../config";

const CareerModal = ({ show, onClose, carrer , loadData }) => {
  const { id } = useParams();

  const [CareerData, setCareerData] = useState([]); //main []

  const [CareerLoop, setCareerLoop] = useState([
    //for input loop
    {
      career_type: "",
      member_house_id: id,
    },
  ]);

  //อาชีพทั้งหมด
  const Career = [
    "พืชเกษตร",
    "ประมง",
    "ปศุสัตว์",
    "รับจ้างภาคการเกษตร",
    "รับจ้างทั่วไปนอกภาคการเกษตร(รายวัน)",
    "ลูกจ้างทั่วไป บ.เอกชน",
    "ลูกจ้างหน่วยงานภาครัฐ/รัฐวิสาหกิจ",
    "รับราชการ/พนักงาหน่วยงานภาครัฐ/รัฐวิสาหกิจ",
    "ธุรกิจส่วนตัว/งานบริการ",
  ];

  //กรองอาชีพที่ทำอยู่แล้วมาเก็บ
  const hasCareer = carrer.map((item) => item.career_type);

  //กรองที่มีอยู่แล่วออกไป
  const avaliableCareer = Career.filter((data) => !hasCareer.includes(data));

  //check box
  const handleCareerChange = (value, check) => {
    let updateData = [...CareerData];

    if (check) {
      const isChecked = updateData.some((data) => data.career_type === value);

      if (!isChecked) {
        updateData.push({ career_type: value, member_house_id: id });
      }
    } else {
      //del
      updateData = updateData.filter((e) => e.career_type !== value);
    }

    setCareerData(updateData);
  };

  //input txt
  const handleCareerLoop = (index, value) => {
    const updateDataLoop = [...CareerLoop];
    updateDataLoop[index].career_type = value;
    setCareerLoop(updateDataLoop);
  };

  //เพิ่ม input txt
  const addCareer = () => {
    setCareerLoop([
      ...CareerLoop,
      {
        career_type: "",
        member_house_id: id,
      },
    ]);
  };

  const delCareer = (index) => {
    //เหลือไว้อย่างน้อย 1 ช่อง input
    if (CareerLoop.length > 1) {
      const updateDataLoop = [...CareerLoop];
      updateDataLoop.splice(index, 1);
      setCareerLoop(updateDataLoop);
    }else{
      return;
    }
  };

  //clear ค่าเมื่อปิด modal
  const handleClose = () => {
    // เคลียร์ State
    setCareerData([]);
    setCareerLoop([
      {
        career_type: "",
        member_house_id: id,
      },
    ]);
  
    // แล้วค่อยปิด Modal
    onClose();
  };
  

  const handleSubmit = async(e) => {
    e.preventDefault();

    //กรองเอาค่าใน input txt ที่กรอกมาเก็บ
    const fillCareerLoop = CareerLoop.filter(
      (item) => item.career_type.trim() !== ""
    );

    //หากไม่มีค่าใน input txt ส่ง CareerData ไปสร้างอย่างเดียว ถ้ามีให้รวม 2 state
    const finalData =
      fillCareerLoop.length > 0
        ? [...CareerData, ...fillCareerLoop]
        : [...CareerData];

    const resSwal = await Swal.fire({
      title:'บันทึกข้อมูล',
      text:'ตรวจสอบข้อมูลถูกต้องแล้วใช่หรือไม่',
      icon:'question',
      showCancelButton:true,
      showConfirmButton:true
    })

    if(resSwal.isConfirmed){
      const resApi = await axios.post(config.api_path + '/career/create',finalData,config.headers())

      if(resApi.data.message === 'success'){
        Swal.fire({
          title:'บันทึกข้อมูล',
          text:'บันทึกข้อมูลเสร็จสิ้น',
          icon:'success',
          timer:1500
        })
        loadData();
        handleClose(); 
      }
    }

  };

  return (
    <>
      <Modal
        title="เพิ่มทักษะอาชีพ"
        show={show}
        icon="material-symbols:psychiatry-rounded"
        onClose={handleClose}
        size="6xl"
      >
        <div className="p-2">
          <h2 className="text-lg font-semibold mb-4">
            โปรดเลือกทักษะอาชีพเพิ่มเติม
          </h2>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="grid grid-cols-3 gap-2">
              {avaliableCareer.map((data, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    checked={CareerData.some(
                      (item) => item.career_type === data
                    )}
                    onChange={(e) => handleCareerChange(data, e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                  />
                  <label
                    for="default-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {data}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-base font-semibold my-4">
            อาชีพอื่นๆ
            <span className="pl-4 text-sm font-medium my-4">
              (กดเครื่องหมาย + เพื่อเพิ่มอาชีพ)
            </span>
          </h2>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-start gap-2">
              <div className="flex-grow">
                {CareerLoop.map((data, index) => (
                  <>
                    <label className=" mt-2 block mb-2 text-sm font-medium text-gray-900">
                      อาชีพ ({index + 1})
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={data.career_type}
                        onChange={(e) =>
                          handleCareerLoop(index, e.target.value)
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block flex-1 p-2.5"
                        placeholder="ระบุอาชีพ"
                        required
                      />
                      <button
                        onClick={(e) => delCareer(index)}
                        className="px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
                      >
                        <Icon
                          icon="material-symbols:delete-forever-rounded"
                          className=" mt-0.5 text-lg"
                        />
                      </button>

                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          {/**SUBMIT BTN */}
          <div className="flex justify-end gap-4 mt-7">

            <button
              type="button"
              className="flex items-center px-4 py-2 text-sm font-medium text-white  border bg-green-500 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200"
              onClick={(e) => addCareer()}
            >
              <Icon
                width={20}
                height={20}
                className="mr-2"
                icon="material-symbols:add-circle-outline-rounded"
              />
              เพิ่มอาชีพ
            </button>

            <button
              type="button"
              onClick={(e) => handleSubmit(e)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
            >
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CareerModal;
