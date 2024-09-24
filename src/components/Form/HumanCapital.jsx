import { Field } from "@headlessui/react";
import React, { useState, useEffect } from "react";

export const HumanCapital = () => {
  //สถานะเริ่มต้นฟอร์ม
  const [members, setMembers] = useState([
    {
      id: Date.now(),
      title: "",
      fname: "",
      lname: "",
      age_yaer: 0,
      age_month: 0,
      sex: "",
      birthdate: "",
      national_id: "",
      status_in_house: "",
      health: "",
      welfare_1: "",
      amount_1: 0,
      frequency_1: "",
      welfare_2: "",
      amount_2: 0,
      frequency_2: "",
      welfare_3: "",
      amount_3: 0,
      frequency_3: "",
      can_speak_TH: "",
      can_read_TH: "",
      can_write_TH: "",
      max_education: "",
      edu_status: "",
      current_edu_level: "",
      edu_description: "",
      work_status: "",
      career: [],
      work_can_made_income: [],
      agv_income: 0,
    },
  ]);

  const [isProcessing, setIsProcessing] = useState(false);

  const createMembers = async ()=>{
    setIsProcessing(true);
    try{
      console.log('ข้อมูลทั้งหมดที่ส่ง:',members);

      alert('ส่งข้อมูลสำเร็จ!');
      setIsProcessing(false);

    }catch(error){
      console.error('เกิดข้อผิดพลาดในการสร้าง สมาชิคครัวเรือน:', error);
      alert('เกิดข้อผิดพลาดในการสร้าง สมาชิคครัวเรือน');
      setIsProcessing(false);
    }
  }

  //ฟังก์ชันเพิ่มสมาชิกใหม่
  const addMember = () => {
    setMembers([
      ...members,
      {
        id: Date.now(),
        title: "",
        fname: "",
        lname: "",
        age_yaer: 0,
        age_month: 0,
        sex: "",
        birthdate: "",
        national_id: "",
        status_in_house: "",
        health: "",
        welfare_1: "",
        amount_1: 0,
        frequency_1: "",
        welfare_2: "",
        amount_2: 0,
        frequency_2: "",
        welfare_3: "",
        amount_3: 0,
        frequency_3: "",
        can_speak_TH: "",
        can_read_TH: "",
        can_write_TH: "",
        max_education: "",
        edu_status: "",
        current_edu_level: "",
        edu_description: "",
        work_status: "",
        career: [],
        work_can_made_income: [],
        agv_income: 0,
      },
    ]);
  };

  //ลบสมาชิคอ่างอิงจาก index
  const delMember = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  //ฟัวก์ชันจัดการเปลี่ยนค่าข้อมูลใน input
  const handleInputChange = (index, field, value) => {
    const updatedMembers = [...members]; //clone ค่าเดิม
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  //เก็บอาชีพ
  const [selectedCareer, setSelectedCareer] = useState([]);
  const [selectedCareerMadeIncome, setSelectedCareerMadeIncome] = useState([]);

  // ฟังก์ชันจัดการการเลือกอาชีพด้วย checkbox สำหรับกลุ่มอาชีพ (รับ index มาด้วยว่าแก้ใครของใครอยู่ !)
  const handleCareerChange = (index,value,checked) => {
    const updatedMembers = [...members]; //colne ค่า

    if (checked) {
      console.log('กำลังทำงานอยู่');
      
      updatedMembers[index].career = [...updatedMembers[index].career, value];
    } else{
      //ลูปกรองข้อมูลออก
      updatedMembers[index].career = updatedMembers[index].career.filter(
        (career) => career !== value
      );
    }
    //update ค่า 
    setMembers(updatedMembers);
  };

  //อาชีพที่สร้างรายได้
  const handleCareerMadeIncomeChange = (index, value, checked) => {
    const updatedMembers = [...members];
    if (checked) {
      updatedMembers[index].work_can_made_income = [
        ...updatedMembers[index].work_can_made_income,
        value,
      ];
    } else {
      updatedMembers[index].work_can_made_income = updatedMembers[
        index
      ].work_can_made_income.filter((incomeCareer) => incomeCareer !== value);
    }
    setMembers(updatedMembers);
  };

  useEffect(() => {
    // console.log("อาชีพ: "+selectedCareer);
    // console.log("อาชีพที่สร้างรายได้: "+selectedCareerMadeIncome);
  }, [selectedCareer, selectedCareerMadeIncome]); // ฟังทุกครั้งที่ selectedCareer เปลี่ยนแปลง

  return (
    <div>
      {/* ทำการloop */}
      {members.map((member, index) => (
        <div className="mb-6 mx-10 mt-0 bg-blue-200 rounded-md">
          <div className="Container">
            <h3 className="text-black text-lg font-bold px-5 py-5">
              ข้อมูลสมาชิคครัวเรือนคนที่ {index + 1}
            </h3>
          </div>
          {/* Input */}
          <div className="grid gap-6 mb-6 mt-6 md:grid-cols-4  mx-10">
            <div className="relative  rounded-md shadow-sm">
              <label
                for="visitors"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ชื่อ
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-7">
                <label htmlFor="currency" className="sr-only">
                  Currency
                </label>
                <select
                  id="title"
                  name="title"
                  value={member.title}
                  onChange={(e) =>
                    handleInputChange(index, "title", e.target.value)
                  }
                  className="border border-transparent mb-5 bg-transparent text-gray-500 text-sm focus:ring-0 focus:outline-none w-20 focus:border-gray-500 focus:rounded-md"
                >
                  <option>นาย</option>
                  <option>นาง</option>
                  <option>นางสาว</option>
                  <option>เด็กชาย</option>
                  <option>เด็กหญิง</option>
                </select>
              </div>
              <input
                id="fname"
                name="fname"
                type="text"
                value={member.fname}
                onChange={(e) =>
                  handleInputChange(index, "fname", e.target.value)
                }
                placeholder=""
                className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-24 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="">
              <label
                for="lname"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                นามสกุล
              </label>
              <input
                type="text"
                id="lname"
                value={member.lname}
                onChange={(e) =>
                  handleInputChange(index, "lname", e.target.value)
                }
                class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>

            <div className="">
              <label
                for="age_yaer"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                อายุ(ปี)
              </label>
              <input
                type="text"
                id="age_yaer"
                value={member.age_yaer}
                onChange={(e) =>
                  handleInputChange(index, "age_yaer", e.target.value)
                }
                class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>

            <div className="">
              <label
                for="age_month"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                อายุ(เดือน)
              </label>
              <input
                type="text"
                id="age_month"
                value={member.age_month}
                onChange={(e) =>
                  handleInputChange(index, "age_month", e.target.value)
                }
                class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>

            <div className="">
              <label
                for="sex"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                เพศ
              </label>
              <select
                id="sex"
                name="sex"
                value={member.sex}
                onChange={(e) =>
                  handleInputChange(index, "sex", e.target.value)
                }
                className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
              >
                <option>ชาย</option>
                <option>หญิง</option>
              </select>
            </div>

            <div className="">
              <label
                for="birthdate"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                วันเกิด(1/12/2546)
              </label>
              <input
                type="text"
                id="birthdate"
                value={member.birthdate}
                onChange={(e) =>
                  handleInputChange(index, "birthdate", e.target.value)
                }
                class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>

            <div className="">
              <label
                for="national_id"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                หมายเลขบัตรประจำตัวประชาชน
              </label>
              <input
                type="text"
                id="national_id"
                value={member.national_id}
                onChange={(e) =>
                  handleInputChange(index, "national_id", e.target.value)
                }
                class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>

            <div className="">
              <label
                for="status_in_house"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                สถานะตามทะเบียนบ้าน
              </label>
              <select
                id="status_in_house"
                name="status_in_house"
                value={member.status_in_house}
                onChange={(e) =>
                  handleInputChange(index, "status_in_house", e.target.value)
                }
                className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
              >
                <option>มีชื่อและอาศัยอยู่</option>
                <option>มีชื่อแต่ไม่อาศัย</option>
                <option>ไม่มีชื่อแต่อาศัยอยู่</option>
              </select>
            </div>

            <div className="">
              <label
                for="health"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                สุขภาพ
              </label>
              <select
                id="health"
                name="health"
                value={member.health}
                onChange={(e) =>
                  handleInputChange(index, "health", e.target.value)
                }
                className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
              >
                <option>ปกติ</option>
                <option>ป่วยเรื้อรังไม่ติดเตียง(เช่น หัวใจ เบาหวาน)</option>
                <option>พึ่งพาตนเองได้</option>
                <option>ผู้ป่วยติดเตียง/พิการพึ่งพาตัวเองไม่ได้</option>
              </select>
            </div>
          </div>

          <div className="Container ml-5">
            <h3 className="text-black text-sm font-bold px-5 pb-5">
              สวัสดิการที่ได้รับในปัจจุบัน
            </h3>
          </div>

          {/* Input */}
          <div className="grid gap-6 mb-6 mt-0 md:grid-cols-3  mx-10 ">
            <div className="">
              <label
                for="welfare_1"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ระบุสวัสดิการ(1)
              </label>
              <select
                id="welfare_1"
                name="welfare_1"
                value={member.welfare_1}
                onChange={(e) =>
                  handleInputChange(index, "welfare_1", e.target.value)
                }
                className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
              >
                <option>ไม่ได้รับ</option>
                <option>เด็กแรกเกิด</option>
                <option>เบี้ยสูงอายุ/คนชรา</option>
                <option>เบี้ยคนพิการ</option>
                <option>ประกันสังคม(นายจ้าง/ม.33)</option>
                <option>ประกันตนเอง(ม.40)</option>
                <option>บัตรสวัสดิการแห่งรัฐ</option>
                <option>การเยียวยาโควิดจากรัฐ</option>
                <option>ไม่ทราบ</option>
                <option>
                  อื่นๆ เช่น ทุนการศึกษา เบี้ยซ่อมแซมบ้าน
                  อุปกรณ์ช่วยเหลือคนพิการ
                </option>
              </select>
            </div>

            <div className="">
              <label
                for="amount_1"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                จำนวน(บาท)
              </label>
              <input
                type="number"
                id="amount_1"
                value={member.amount_1}
                onChange={(e) =>
                  handleInputChange(index, "amount_1", e.target.value)
                }
                class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>

            <div className="">
              <label
                for="frequency_1"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ความถี่
              </label>
              <select
                id="frequency_1"
                name="frequency_1"
                value={member.frequency_1}
                onChange={(e) =>
                  handleInputChange(index, "frequency_1", e.target.value)
                }
                className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
              >
                <option>ทุกเดือน</option>
                <option>ครั้งเดียว</option>
              </select>
            </div>
          </div>

          {/* Input2 */}
          <div className="grid gap-6 mb-6 mt-0 md:grid-cols-3  mx-10">
            <div className="">
              <label
                for="welfare_2"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ระบุสวัสดิการ(2)
              </label>
              <select
                id="welfare_2"
                name="welfare_2"
                value={member.welfare_2}
                onChange={(e) =>
                  handleInputChange(index, "welfare_2", e.target.value)
                }
                className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
              >
                <option>ไม่ได้รับ</option>
                <option>เด็กแรกเกิด</option>
                <option>เบี้ยสูงอายุ/คนชรา</option>
                <option>เบี้ยคนพิการ</option>
                <option>ประกันสังคม(นายจ้าง/ม.33)</option>
                <option>ประกันตนเอง(ม.40)</option>
                <option>บัตรสวัสดิการแห่งรัฐ</option>
                <option>การเยียวยาโควิดจากรัฐ</option>
                <option>ไม่ทราบ</option>
                <option>
                  อื่นๆ เช่น ทุนการศึกษา เบี้ยซ่อมแซมบ้าน
                  อุปกรณ์ช่วยเหลือคนพิการ
                </option>
              </select>
            </div>

            <div className="">
              <label
                for="amount_2"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                จำนวน(บาท)
              </label>
              <input
                type="number"
                id="amount_2"
                value={member.amount_2}
                onChange={(e) =>
                  handleInputChange(index, "amount_2", e.target.value)
                }
                class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>

            <div className="">
              <label
                for="frequency_2"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ความถี่
              </label>
              <select
                id="frequency_2"
                name="frequency_2"
                value={member.frequency_2}
                onChange={(e) =>
                  handleInputChange(index, "frequency_2", e.target.value)
                }
                className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
              >
                <option>ทุกเดือน</option>
                <option>ครั้งเดียว</option>
              </select>
            </div>
          </div>

          {/* Input3*/}
          <div className="grid gap-6 mb-6 mt-0 md:grid-cols-3  mx-10">
            <div className="">
              <label
                for="welfare_3"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ระบุสวัสดิการ(3)
              </label>
              <select
                id="welfare_3"
                name="welfare_3"
                value={member.welfare_3}
                onChange={(e) =>
                  handleInputChange(index, "welfare_3", e.target.value)
                }
                className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
              >
                <option>ไม่ได้รับ</option>
                <option>เด็กแรกเกิด</option>
                <option>เบี้ยสูงอายุ/คนชรา</option>
                <option>เบี้ยคนพิการ</option>
                <option>ประกันสังคม(นายจ้าง/ม.33)</option>
                <option>ประกันตนเอง(ม.40)</option>
                <option>บัตรสวัสดิการแห่งรัฐ</option>
                <option>การเยียวยาโควิดจากรัฐ</option>
                <option>ไม่ทราบ</option>
                <option>
                  อื่นๆ เช่น ทุนการศึกษา เบี้ยซ่อมแซมบ้าน
                  อุปกรณ์ช่วยเหลือคนพิการ
                </option>
              </select>
            </div>

            <div className="">
              <label
                for="amount_3"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                จำนวน(บาท)
              </label>
              <input
                type="text"
                id="amount_3"
                value={member.amount_3}
                onChange={(e) =>
                  handleInputChange(index, "amount_3", e.target.value)
                }
                class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>

            <div className="">
              <label
                for="frequency_3"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ความถี่
              </label>
              <select
                id="frequency_3"
                name="frequency_3"
                value={member.frequency_3}
                onChange={(e) =>
                  handleInputChange(index, "frequency_3", e.target.value)
                }
                className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
              >
                <option>ทุกเดือน</option>
                <option>ครั้งเดียว</option>
              </select>
            </div>
          </div>

          {/* Part3 */}
          <div className="grid gap-6 mb-6 mt-6 md:grid-cols-4  mx-10">
            <div className="">
              <label
                for="can_speak_TH"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                พูดภาษาไทย
              </label>
              <select
                id="can_speak_TH"
                name="can_speak_TH"
                value={member.can_speak_TH}
                onChange={(e) =>
                  handleInputChange(index, "can_speak_TH", e.target.value)
                }
                className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
              >
                <option>ได้</option>
                <option>ไม่ได้</option>
              </select>
            </div>

            <div className="">
              <label
                for="can_read_TH "
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                อ่านภาษาไทย
              </label>
              <select
                id="can_read_TH "
                name="can_read_TH "
                value={member.can_read_TH}
                onChange={(e) =>
                  handleInputChange(index, "can_read_TH", e.target.value)
                }
                className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
              >
                <option>ได้</option>
                <option>ไม่ได้</option>
              </select>
            </div>

            <div className="">
              <label
                for="can_write_TH"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                เขียนภาษาไทย
              </label>
              <select
                id="can_write_TH"
                name="can_write_TH"
                value={member.can_write_TH}
                onChange={(e) =>
                  handleInputChange(index, "can_write_TH", e.target.value)
                }
                className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
              >
                <option>ได้</option>
                <option>ไม่ได้</option>
              </select>
            </div>

            <div className="">
              <label
                for="max_education "
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                การศึกษาสูงสุด
              </label>
              <select
                id="max_education "
                name="max_education "
                value={member.max_education}
                onChange={(e) =>
                  handleInputChange(index, "max_education", e.target.value)
                }
                className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
              >
                <option>ไม่ได้เรียน</option>
                <option>ต่ำกว่าประถม</option>
                <option>ประถมศึกษา</option>
                <option>ม.ต้น หรือเทียบเท่า</option>
                <option>ม.ปลาย หรือเทียบเท่า</option>
                <option>ปวช./ประกาศนียบัตร</option>
                <option>ปวส./อนุปริญญา</option>
                <option>ป.ตรี หรือเทียบเท่า</option>
                <option>สูงกว่าปริญญาตรี</option>
                <option>เรียนสายศาสนา</option>
              </select>
            </div>

            <div className="">
              <label
                for="edu_status"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                สถานภาพการศึกษา
              </label>
              <select
                id="edu_status"
                name="edu_status"
                value={member.edu_status}
                onChange={(e) =>
                  handleInputChange(index, "edu_status", e.target.value)
                }
                className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
              >
                <option>ไปเรียนสม่ำเสมอ</option>
                <option>หยุดเรียนเป็นระยะ</option>
                <option>ออกกลางคัน(Dropout)</option>
              </select>
            </div>

            <div className="">
              <label
                for="current_edu_level"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                กำลังศึกษาระดับ
              </label>
              <select
                id="current_edu_level"
                name="current_edu_level"
                value={member.current_edu_level}
                onChange={(e) =>
                  handleInputChange(index, "current_edu_level", e.target.value)
                }
                className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
              >
                <option>ต่ำกว่าประถม</option>
                <option>ประถมศึกษา</option>
                <option>ม.ต้น หรือเทียบเท่า</option>
                <option>ม.ปลาย หรือเทียบเท่า</option>
                <option>ปวช./ประกาศนียบัตร</option>
                <option>ปวส./อนุปริญญา</option>
                <option>ป.ตรี หรือเทียบเท่า</option>
                <option>สูงกว่าปริญญาตรี</option>
                <option>เรียนสายศาสนา</option>
              </select>
            </div>

            <div className="">
              <label
                for="edu_description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                สาเหตุ(กรณีหยุดเรียน/ออกกลางคัน)
              </label>
              <input
                type="text"
                id="edu_description"
                value={member.current_edu_level}
                onChange={(e) =>
                  handleInputChange(index, "edu_description", e.target.value)
                }
                class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
              />
            </div>

            <div className="">
              <label
                for="work_status "
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                สถานะการทำงาน
              </label>
              <select
                id="work_status "
                name="work_status "
                value={member.work_status}
                onChange={(e) =>
                  handleInputChange(index, "work_status", e.target.value)
                }
                className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
              >
                <option>ไม่ทำงาน</option>
                <option>ว่างงาน</option>
                <option>ทำงาน</option>
              </select>
            </div>
          </div>

          <div className="Container ml-5">
            <h3 className="text-black text-sm font-bold px-5 ">
              ประกอบอาชีพ(ตอบได้มากกว่า 1 )
            </h3>
          </div>

          <div className="grid gap-2 mb-6 mt-6 md:grid-cols-6  mx-10 ">
            {/* CheckBox */}

            <div class="">
              <input
                id={`career-1-${index}`}
                type="checkbox"
                onChange={(e) =>
                  handleCareerChange(index, "พืชเกษตร", e.target.checked)
                }
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                พืชเกษตร
              </label>
            </div>
            <div class="">
              <input
                id={`career-2-${index}`}
                type="checkbox"
                onChange={(e) =>
                  handleCareerChange(index, "ประมง", e.target.checked)
                }
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                ประมง
              </label>
            </div>
            <div class="">
              <input
                id={`career-3-${index}`}
                type="checkbox"
                onChange={(e) =>
                  handleCareerChange(index, "ปศุสัตว์", e.target.checked)
                }
                value="ปศุสัตว์"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                ปศุสัตว์
              </label>
            </div>
            <div class="">
              <input
                id={`career-4-${index}`}
                type="checkbox"
                onChange={(e) =>
                  handleCareerChange(index, "รับจ้างภาคการเกษตร", e.target.checked)
                }
                value="รับจ้างภาคการเกษตร"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                รับจ้างภาคการเกษตร
              </label>
            </div>

            <div class="">
              <input
                id={`career-5-${index}`}
                type="checkbox"
                onChange={(e) =>
                  handleCareerChange(index, "รับจ้างทั่วไปนอกภาคการเกษตร(รายวัน)", e.target.checked)
                }
                value="รับจ้างทั่วไปนอกภาคการเกษตร(รายวัน)"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                รับจ้างทั่วไปนอกภาคการเกษตร(รายวัน)
              </label>
            </div>
            <div class="">
              <input
                id={`career-6-${index}`}
                type="checkbox"
                onChange={(e) =>
                  handleCareerChange(index, "ลูกจ้างทั่วไป บ.เอกชน โรงงาน โรงแรม ห้างร้าน", e.target.checked)
                }
                value="ลูกจ้างทั่วไป บ.เอกชน โรงงาน โรงแรม ห้างร้าน"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                ลูกจ้างทั่วไป บ.เอกชน โรงงาน โรงแรม ห้างร้าน
              </label>
            </div>

            <div class="">
              <input
                id={`career-6-${index}`}
                type="checkbox"
                onChange={(e) =>
                  handleCareerChange(index, "ลูกจ้างหน่วยงานภาครัฐ/รัฐวิสาหกิจ", e.target.checked)
                }
                value="ลูกจ้างหน่วยงานภาครัฐ/รัฐวิสาหกิจ"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                ลูกจ้างหน่วยงานภาครัฐ/รัฐวิสาหกิจ
              </label>
            </div>

            <div class="">
              <input
                id={`career-7-${index}`}
                type="checkbox"
               onChange={(e) =>
                  handleCareerChange(index, "รับราชการ/พนักงาหน่วยงานภาครัฐ/รัฐวิสาหกิจ", e.target.checked)
                }
                value="รับราชการ/พนักงาหน่วยงานภาครัฐ/รัฐวิสาหกิจ"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                รับราชการ/พนักงาหน่วยงานภาครัฐ/รัฐวิสาหกิจ
              </label>
            </div>

            <div class="col-span-4">
              <input
                id={`career-8-${index}`}
                type="checkbox"
                onChange={(e) =>
                  handleCareerChange(index, "ธุรกิจส่วนตัว/งานบริการ", e.target.checked)
                }
                value="ธุรกิจส่วนตัว/งานบริการ"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 "
              >
                ธุรกิจส่วนตัว/งานบริการ (เช่น ร้านขายของชำร้านซ่อมมอเตอร์ไซค์
                ค้าขาย/หาบแร่/แผงลอยร้านเสริมสวย รับจ้างซักรีด ขับสามล้อ
                มอเตอร์ไซรับจ้างเป็นต้น)
              </label>
            </div>

            <div class="">
              <input
                id={`career-9-${index}`}
                type="checkbox"
                onChange={(e) =>
                  handleCareerChange(index, "อื่นๆ", e.target.checked)
                }
                value="อื่นๆ"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                อื่นๆ
              </label>
            </div>

            {/* ส่วน Input ปกติเดี๋ยวกลับมาทำ */}

            <div className="">
              <input
                type="text"
                id="first_name"
                class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ระบุอาชีพ"
                required
              />
            </div>
          </div>

          <div className="Container ml-5 ">
            <h3 className="text-black text-sm font-bold px-5 ">
              ทักษะอาชีพที่สามารถสร้างรายได้(ตอบได้มากกว่า1)
            </h3>
          </div>

          <div className="grid gap-2 mb-6 mt-6 md:grid-cols-6  mx-10 ">
            {/* CheckBox */}

            <div class="">
              <input
                id={`income-career-${index}`}
                type="checkbox"
                onChange={(e) =>
                  handleCareerMadeIncomeChange(index, "ไม่มี", e.target.checked)
                }
                value="ไม่มี"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                ไม่มี
              </label>
            </div>

            <div class="">
              <input
                id={`income-career-${index}`}
                type="checkbox"
                onChange={(e) =>
                  handleCareerMadeIncomeChange(index, "พืชเกษตร", e.target.checked)
                }
                value="พืชเกษตร"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                พืชเกษตร
              </label>
            </div>
            <div class="">
              <input
                id={`income-career-${index}`}
                type="checkbox"
                onChange={(e) =>
                  handleCareerMadeIncomeChange(index, "ประมง", e.target.checked)
                }
                value="ประมง"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                ประมง
              </label>
            </div>
            <div class="">
              <input
                id={`income-career-${index}`}
                type="checkbox"
                onChange={(e) =>
                  handleCareerMadeIncomeChange(index, "ปศุสัตว์", e.target.checked)
                }
                value="ปศุสัตว์"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                ปศุสัตว์
              </label>
            </div>
            <div class="">
              <input
                id={`income-career-${index}`}
                type="checkbox"
                onChange={(e) =>
                  handleCareerMadeIncomeChange(index, "รับจ้างภาคการเกษตร", e.target.checked)
                }
                value="รับจ้างภาคการเกษตร"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                รับจ้างภาคการเกษตร
              </label>
            </div>

            <div class="">
              <input
                id={`income-career-${index}`}
                type="checkbox"
                onChange={(e) =>
                  handleCareerMadeIncomeChange(index, "รับจ้างทั่วไปนอกภาคการเกษตร(รายวัน)", e.target.checked)
                }
                value="รับจ้างทั่วไปนอกภาคการเกษตร(รายวัน)"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                รับจ้างทั่วไปนอกภาคการเกษตร(รายวัน)
              </label>
            </div>
            <div class="">
              <input
                id={`income-career-${index}`}
                type="checkbox"
                onChange={(e) =>
                  handleCareerMadeIncomeChange(index, "ลูกจ้างทั่วไป บ.เอกชน โรงงาน โรงแรม ห้างร้าน", e.target.checked)
                }
                value="ลูกจ้างทั่วไป บ.เอกชน โรงงาน โรงแรม ห้างร้าน"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                ลูกจ้างทั่วไป บ.เอกชน โรงงาน โรงแรม ห้างร้าน
              </label>
            </div>
            <div class="">
              <input
                id={`income-career-${index}`}
                type="checkbox"
                onChange={(e) =>
                  handleCareerMadeIncomeChange(index, "ลูกจ้างหน่วยงานภาครัฐ/รัฐวิสาหกิจ", e.target.checked)
                }

                value="ลูกจ้างหน่วยงานภาครัฐ/รัฐวิสาหกิจ"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                ลูกจ้างหน่วยงานภาครัฐ/รัฐวิสาหกิจ
              </label>
            </div>

            <div class="">
              <input
                id={`income-career-${index}`}
                type="checkbox"
                onChange={(e) =>
                  handleCareerMadeIncomeChange(index, "รับราชการ/พนักงาหน่วยงานภาครัฐ/รัฐวิสาหกิจ", e.target.checked)
                }
                value="รับราชการ/พนักงาหน่วยงานภาครัฐ/รัฐวิสาหกิจ"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                รับราชการ/พนักงาหน่วยงานภาครัฐ/รัฐวิสาหกิจ
              </label>
            </div>

            <div class="col-span-3">
              <input
                id={`income-career-${index}`}
                type="checkbox"
                onChange={(e) =>
                  handleCareerMadeIncomeChange(index, "ธุรกิจส่วนตัว/งานบริการ", e.target.checked)
                }
                value="ธุรกิจส่วนตัว/งานบริการ"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 "
              >
                ธุรกิจส่วนตัว/งานบริการ (เช่น ร้านขายของชำร้านซ่อมมอเตอร์ไซค์
                ค้าขาย/หาบแร่/แผงลอยร้านเสริมสวย รับจ้างซักรีด ขับสามล้อ
                มอเตอร์ไซรับจ้างเป็นต้น)
              </label>
            </div>

            <div class="">
              <input
                id={`income-career-${index}`}
                type="checkbox"
                onChange={(e) =>
                  handleCareerMadeIncomeChange(index, "อื่นๆ", e.target.checked)
                }
                value="อื่นๆ"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                อื่นๆ
              </label>
            </div>

            <div className="">
              <input
                type="text"
                id="first_name"
                class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ระบุอาชีพ"
                required
              />
            </div>
          </div>

          <div className="mx-6 py-2">
            <label
              for="agv_income"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              รายได้เฉลี่ย (บาท/เดือน)
            </label>
            <input
              type="number"
              id="agv_income"
              value={member.agv_income}
              onChange={(e) =>
                handleInputChange(index, "agv_income", e.target.value)
              }
              class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>
          <button
            type="button"
            onClick={() => delMember(index)}
            class="focus:outline-none px-6 mx-6 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm  py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            ลบสมาชิคคนที่ {index + 1}
          </button>
        </div>
      ))}

      <div className="flex gap-4 mt-4 mr-10">
        <button
          type="button"
          onClick={addMember}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-auto"
        >
          เพิ่มสมาชิคคนถัดไป
        </button>

        <button
          type="button"
          onClick={createMembers}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          บันทึกข้อมูลสมาชิค
        </button>
      </div>
    </div>
  );
};
