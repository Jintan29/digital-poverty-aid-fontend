import React, { useState } from "react";
import Modal from "../../Modal";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../../config";

const WelfareModal = ({ show, onClose, socialWelfare, loadData }) => {
  const { id } = useParams(); //member id

  const [welfareData, setWelfareData] = useState([
    //loop show input
    {
      welfare: "",
      amount: null,
      frequency: "",
      member_house_id: id,
    },
  ]);
  //สวัสดิการ
  const availableBenefits = [
    "ไม่ได้รับ",
    "เด็กแรกเกิด",
    "เบี้ยผู้สูงอายุ/คนชรา",
    "เบี้ยคนพิการ",
    "ประกันสังคม(นายจ้าง/ม.33)",
    "ประกันตนเอง(ม.40)",
    "บัตรสวัสดิการแห่งรัฐ",
    "การเยียวยาโควิดจากรัฐ",
    "ไม่ทราบ",
    "ทุนการศึกษา",
    "เบี้ยซ่อมแซมบ้าน",
    "อุปกรณ์ช่วยเหลือคนพิการ",
    "อื่นๆ",
  ];

  //ดึงชื่อ welfare ที่สมาชิกคนนี้ได้รับทั้งหมด
  const assginWelfare = socialWelfare.map((item) => item.welfare);

  //กรองสวัสดิการที่ยังไม่เคยได้รับ
  const unassignWelfare = availableBenefits.filter(
    (benefit) => !assginWelfare.includes(benefit)
  );

  const addWelfare = () => {
    setWelfareData([
      ...welfareData,
      {
        welfare: "",
        amount: null,
        frequency: "",
        member_house_id: id,
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updateData = [...welfareData];
    updateData[index][field] = value;
    setWelfareData(updateData);
  };

  const delWelfare = (index) => {
    //เหลือไว้ 1 input เสมอ
    if (welfareData.length > 1) {
      const updateData = [...welfareData];
      updateData.splice(index, 1);
      setWelfareData(updateData);
    } else {
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const swalRes = await Swal.fire({
        title: "บันทึกข้อมูล",
        text: "ตรวจสอบข้อมูลถูกต้องแล้วใช่หรือไม่",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
      });

      if (swalRes.isConfirmed) {
        const apiRes = await axios.post(
          config.api_path + `/social-welfare/create-arr`,
          welfareData,
          config.headers()
        );

        if (apiRes.data.message === "success") {
          Swal.fire({
            title: "บันทึกข้อมูล",
            text: "บันทึกข้อมูลเสร็จสิ้น",
            icon: "success",
            timer: 1500,
          });
          //Clear ค่าออก
          setWelfareData([
            {
              welfare: "",
              amount: null,
              frequency: "",
              member_house_id: id,
            },
          ]);
          onClose();
          loadData();
        }
      }
    } catch (err) {
      Swal.fire({
        title: "error",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  return (
    <>
      <Modal
        title="เพิ่มสวัสดิการ"
        show={show}
        icon="material-symbols:family-restroom-rounded"
        onClose={onClose}
        size="5xl"
      >
        <>
          <div className="p-2">
            <h2 className="text-lg font-semibold mb-4">
              ตัวอย่างสวัสดิการในระบบ
            </h2>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="grid  grid-cols-4 gap-x-4 gap-y-2">
                {unassignWelfare?.map((benefit, index) => (
                  <div
                    key={index}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors py-1"
                  >
                    • {benefit}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-2 bg-white p-6 pl-2 rounded-lg shadow-m ">
              <h3 className="text-base font-semibold mb-6 text-gray-800 e">
                เพิ่มสวัสดิการที่ได้รับ
              </h3>

              <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                {welfareData.map((data, index) => (
                  <div 
                  key={index}
                  className="grid grid-cols-3 gap-6 bg-slate-50 p-3 rounded-md">
                    {/* สวัสดิการ */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        สวัสดิการ ({index + 1})
                      </label>

                      <input
                        type="text"
                        name="welfare"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5"
                        placeholder="ระบุสวัสดิการที่ได้รับ"
                        value={data.welfare}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>

                    {/* จำนวน */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        จำนวน(บาท)
                      </label>

                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                          ฿
                        </span>
                        <input
                          type="number"
                          name="amount"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 p-2.5"
                          placeholder="0.00"
                          value={data.amount}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              e.target.name,
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>
                    </div>

                    {/* ความถี่ */}

                    <div className="flex items-end justify-between">
                      <div className="w-10/12">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          ความถี่
                        </label>
                        <select
                          name="frequency"
                          value={data.frequency}
                          required
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              e.target.name,
                              e.target.value
                            )
                          }
                          className="p-2.5 border border-gray-300 mb-5 focus:border-blue-500 bg-gray-50 rounded-lg w-full text-gray-900 text-sm focus:ring-0 focus:outline-none  focus:rounded-md"
                        >
                          <option value="">ระบุความถี่</option>
                          <option value="ทุกปี">ทุกปี</option>
                          <option value="ทุกเดือน">ทุกเดือน</option>
                          <option value="ครั้งเดียว">ครั้งเดียว</option>
                        </select>
                      </div>

                      <button
                        type="button"
                        onClick={() => delWelfare(index)}
                        className="flex items-center justify-end py-2 px-4  mb-6 ml-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none"
                      >
                        <Icon
                          icon="material-symbols:delete-rounded"
                          className=""
                        />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    className="flex items-center px-4 py-2 text-sm font-medium text-white  border bg-green-500 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200"
                    onClick={(e) => addWelfare()}
                  >
                    <Icon
                      width={20}
                      height={20}
                      className="mr-2"
                      icon="material-symbols:add-circle-outline-rounded"
                    />
                    เพิ่มสวัสดิการ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                  >
                    บันทึกข้อมูล
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default WelfareModal;
