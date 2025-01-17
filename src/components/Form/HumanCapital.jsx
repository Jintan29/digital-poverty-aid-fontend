import { Field } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import Swal from "sweetalert2";

export const HumanCapital = ({
  setCurrentPage,
  setMainFormData,
  mainFormData,
}) => {
  //สถานะเริ่มต้นฟอร์ม
  const [members, setMembers] = useState([
    {
      title: "นาย",
      fname: "",
      lname: "",
      age_yaer: 0,
      age_month: 0,
      sex: "ชาย",
      birthdate: "",
      national_id: "",
      phone: "",
      status_in_house: "มีชื่อและอาศัยอยู่",
      health: "ปกติ",
      SocialWelfare: [
        {
          welfare: "ไม่ได้รับ",
          amount: 0,
          frequency: "ครั้งเดียว",
        },
      ],
      can_speak_TH: "พูดไทยได้",
      can_read_TH: "อ่านไทยได้",
      can_write_TH: "เขียนไทยได้",
      max_education: "ไม่ได้เรียน",
      edu_status: "ไปเรียนสม่ำเสมอ",
      current_edu_level: "ต่ำกว่าประถม",
      edu_description: "",
      work_status: "ไม่ทำงาน",
      Career: [],
      work_can_made_income: [],
      agv_income: 0,
      inflation: 0,
    },
  ]);

  const prefix = "อื่นๆ ";

  //load data from main
  useEffect(() => {
    if (mainFormData.MemberHousehold) {
      //ดูว่าหน้หลักมีข้อมูลหรือยัง
      setMembers(mainFormData.MemberHousehold);
    }
  }, [mainFormData]);

  //ฟังก์ชันเพิ่มสมาชิกใหม่
  const addMember = () => {
    setMembers([
      ...members,
      {
        title: "นาย",
        fname: "",
        lname: "",
        age_yaer: 0,
        age_month: 0,
        sex: "ชาย",
        birthdate: "",
        national_id: "",
        status_in_house: "มีชื่อและอาศัยอยู่",
        health: "ปกติ",
        SocialWelfare: [
          {
            welfare: "ไม่ได้รับ",
            amount: 0,
            frequency: "ครั้งเดียว",
          },
        ],
        can_speak_TH: "พูดไทยได้",
        can_read_TH: "อ่านไทยได้",
        can_write_TH: "เขียนไทยได้",
        max_education: "ไม่ได้เรียน",
        edu_status: "ไปเรียนสม่ำเสมอ",
        current_edu_level: "ต่ำกว่าประถม",
        edu_description: "",
        work_status: "ไม่ทำงาน",
        Career: [],
        work_can_made_income: [],
        agv_income: 0,
        inflation: 0,
      },
    ]);
  };

  //ลบสมาชิคอ่างอิงจาก index
  const delMember = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  //เพิ่มสวัสดิการ
  const addSocialWelfare = (index) => {
    const updatedMembers = [...members]; //clone ค่าเดิม
    updatedMembers[index].SocialWelfare.push({
      welfare: "ไม่ได้รับ",
      amount: 0,
      frequency: "ครั้งเดียว",
    });
    setMembers(updatedMembers);
  };

  const delSocialWelfare = (index) => {
    const updatedMembers = [...members]; //clone ค่าเดิม
    updatedMembers[index].SocialWelfare.splice(index, 1);
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

  // insert {} into Career:[]
  const handleCarrerChange = (index, value, check) => {
    const updateData = [...members];

    if (check) {
      const isChecked = updateData[index].Career.some(
        (e) => e.career_type === value
      );

      if (!isChecked) {
        updateData[index].Career.push({ career_type: value });
      }
    } else {
      //del
      updateData[index].Career = updateData[index].Career.filter(
        (e) => e.career_type !== value
      );
    }

    setMembers(updateData);
  };


  const handleOtherChange = (index, field, value) => {
    setMembers((prevMembers) => {
      const updatedMembers = [...prevMembers];
      const member = { ...updatedMembers[index] };
      const fieldArray = [...member[field]];

      const otherIndex = fieldArray.findIndex((item) =>
        item.startsWith(prefix)
      );

      if (value.trim() === "") {
        // หากผู้ใช้ลบค่าใน input ให้ลบรายการ "อื่นๆ " ออก
        if (otherIndex !== -1) {
          fieldArray.splice(otherIndex, 1);
        }
      } else {
        if (otherIndex !== -1) {
          // อัปเดตรายการ "อื่นๆ " ที่มีอยู่แล้ว
          fieldArray[otherIndex] = prefix + value;
        } else {
          // เพิ่มรายการ "อื่นๆ " ใหม่
          fieldArray.push(prefix + value);
        }
      }

      member[field] = fieldArray;
      updatedMembers[index] = member;
      return updatedMembers;
    });
  };

  const handleOtherChange2 = (index, field, newValue) => {
    setMembers((prevMembers) => {
      const updatedMembers = [...prevMembers];
      const member = { ...updatedMembers[index] };
      const fieldArray = [...member[field]];
  
      // หา index ที่ career_type เริ่มต้นด้วย prefix (เช่น "อื่นๆ ")
      const otherIndex = fieldArray.findIndex((obj) =>
        obj.career_type.startsWith(prefix)
      );
  
      if (newValue.trim() === "") {
        // ถ้าช่อง input เป็นค่าว่าง ลบ item "อื่นๆ "
        if (otherIndex !== -1) {
          fieldArray.splice(otherIndex, 1);
        }
      } else {
        // มีการพิมพ์อาชีพในช่อง
        if (otherIndex !== -1) {
          // อัปเดตค่า
          fieldArray[otherIndex].career_type = prefix + newValue;
        } else {
          // ถ้ายังไม่มี "อื่นๆ " ก็สร้างใหม่
          fieldArray.push({ career_type: prefix + newValue });
        }
      }
  
      member[field] = fieldArray;
      updatedMembers[index] = member;
      return updatedMembers;
    });
  };

  //อาชีพที่สร้างรายได้
  const handleCareerMadeIncomeChange = (index, value, checked) => {
    const updatedMembers = [...members];

    if (value === prefix && !checked) {
      updatedMembers[index].work_can_made_income = updatedMembers[
        index
      ].work_can_made_income.filter((e) => !e.startsWith(prefix));
    } else {
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
    }
    setMembers(updatedMembers);
  };

  // Social welfare
  const handleWelfareInputChange = (
    memberIndex,
    welfareIndex,
    field,
    value
  ) => {
    const updatedMembers = [...members];
    updatedMembers[memberIndex].SocialWelfare[welfareIndex][field] = value; // สมาชิคคนที่ , สวัสดิการลำดับที่ , ฟิลด์ไหน
    setMembers(updatedMembers);
  };

  useEffect(() => {}, [selectedCareer, selectedCareerMadeIncome, members]); // ฟังทุกครั้งที่ selectedCareer เปลี่ยนแปลง

  const validateInput = () => {
    const errors = [];
    for (let index = 0; index < members.length; index++) {
      const member = members[index];

      // ตรวจสอบหมายเลขบัตรประชาชน
      if (!member.national_id || (member.national_id !== '-'  && !/^\d{13}$/.test(member.national_id))) {
        errors.push(
          `กรุณากรอกเลขบัตรประชาชนของสมาชิคคนที่ ${index + 1} ให้ครบ 13 หลัก หรือกรอก '-' หากไม่มี`
        );
      }

      if (member.Career.length <= 0) {
        errors.push(`กรุณากรอกข้อมูล "อาชีพ" ของสมาชิคคนที่ ${index + 1} `);
      }

      if (member.work_can_made_income.length <= 0) {
        errors.push(
          `กรุณากรอกข้อมูล "อาชีพที่สร้างรายได้" ของสมาชิคคนที่ ${index + 1} `
        );
      }
    }

    if (errors.length > 0) {
      Swal.fire({
        title: "มีข้อผิดพลาดในการกรอกข้อมูล",
        html: errors.join("<br/>"),
        icon: "warning",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    //กรองก่อนเปลี่ยนหน้า
    if (!validateInput()) {
      return;
    }

    setMainFormData((prevData) => ({
      //นำค่าใหม่ไปต่อท้าย
      ...prevData,
      MemberHousehold: members,
    }));

    setCurrentPage(3);
  };

  //ย้อนกลับแบบไม่ validate
  const handlePrevPage = () => {
    setMainFormData((prevData) => ({
      ...prevData,
      MemberHousehold: members,
    }));
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="ml-10">
        <h2 className="text-black text-2xl font-bold  py-5">
          ส่วนที่ 1 ทุนมนุษย์
        </h2>
      </div>
      {/* ทำการloop */}
      <form onSubmit={(e) => handleSubmit(e)}>
        {members.map((member, index) => (
          <div className="mb-6 mx-10 mt-5 py-5 bg-blue-200 rounded-md">
            <div className="Container">
              <h3 className="text-black text-lg font-bold px-5 py-5">
                ข้อมูลสมาชิกครัวเรือนคนที่ {index + 1}
              </h3>
            </div>
            {/* Input */}
            <div className="grid gap-6 mb-6 mt-6 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1  mx-10">
              <div className="relative  rounded-md shadow-sm">
                <label
                  for="visitors"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  ชื่อ
                </label>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-7">
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
                  required
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
                  type="number"
                  id="age_yaer"
                  value={member.age_yaer}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "age_yaer",
                      parseInt(e.target.value)
                    )
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
                  type="number"
                  id="age_month"
                  value={member.age_month}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "age_month",
                      parseInt(e.target.value)
                    )
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
                  วันเกิด ตัวอย่าง (2546-04-13)
                </label>
                <input
                  type="text"
                  id="birthdate"
                  pattern="\d{4}-\d{2}-\d{2}"
                  placeholder="พ.ศ.-เดือน-วัน"
                  value={member.birthdate}
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "กรุณากรอกวันเกิดในรูปแบบ (ปี-เดือน-วัน) เช่น 2546-04-13"
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")} // เคลียร์ข้อความเมื่อผู้ใช้แก้ข้อมูล
                  onChange={(e) =>
                    handleInputChange(index, "birthdate", e.target.value)
                  }
                  class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div className="">
                <label
                  for="national_id"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  หมายเลขบัตรประจำตัวประชาชน (หากไม่มีกรอก "-")
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
                  for=""
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  เบอร์โทรศัพท์ (หากไม่มีให้กรอก "-")
                </label>
                <input
                  type="text"
                  id="phone"
                  value={member.phone}
                  onChange={(e) =>
                    handleInputChange(index, "phone", e.target.value)
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
            {/* แสดงรายการสวัสดิการ */}
            {member.SocialWelfare.map((welfare, welfareIndex) => (
              <div
                className="grid gap-6 mb-6 mt-0 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 mx-10"
                key={welfareIndex}
              >
                <div className="">
                  <label
                    htmlFor={`welfare_${index}_${welfareIndex}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    ระบุสวัสดิการ ({welfareIndex + 1})
                  </label>
                  <select
                    id={`welfare_${index}_${welfareIndex}`}
                    name={`welfare_${index}_${welfareIndex}`}
                    value={welfare.welfare}
                    onChange={(e) =>
                      handleWelfareInputChange(
                        index,
                        welfareIndex,
                        "welfare",
                        e.target.value
                      )
                    }
                    className="border border-transparent mb-5 bg-gray-50 rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none focus:border-gray-500 focus:rounded-md"
                  >
                    {/* ... รายการตัวเลือก ... */}
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
                    htmlFor={`amount_${index}_${welfareIndex}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    จำนวน (บาท)
                  </label>
                  <input
                    type="number"
                    id={`amount_${index}_${welfareIndex}`}
                    value={welfare.amount}
                    onChange={(e) =>
                      handleWelfareInputChange(
                        index,
                        welfareIndex,
                        "amount",
                        e.target.value
                      )
                    }
                    className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder=""
                    required
                  />
                </div>

                <div className="flex items-end justify-between">
                  <div className="w-10/12">
                    <label
                      htmlFor={`frequency_${index}_${welfareIndex}`}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      ความถี่
                    </label>
                    <select
                      id={`frequency_${index}_${welfareIndex}`}
                      name={`frequency_${index}_${welfareIndex}`}
                      value={welfare.frequency}
                      onChange={(e) =>
                        handleWelfareInputChange(
                          index,
                          welfareIndex,
                          "frequency",
                          e.target.value
                        )
                      }
                      className="border border-transparent mb-5 bg-gray-50 rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none focus:border-gray-500 focus:rounded-md"
                    >
                      <option value="ทุกเดือน">ทุกเดือน</option>
                      <option value="ครั้งเดียว">ครั้งเดียว</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => delSocialWelfare(index)}
                    className="flex items-center justify-end py-2 px-4 mb-6 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-900 focus:outline-none"
                  >
                    <Icon icon="material-symbols:delete-rounded" className="" />
                  </button>
                </div>
              </div>
            ))}
            {/* ปุ่มเพิ่มสวัสดิการ อยู่ภายนอก loop ของ SocialWelfare */}
            <div className="mx-10 mb-6">
              <button
                type="button"
                onClick={() => addSocialWelfare(index)}
                className="flex items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-400 hover:bg-emerald-600 focus:outline-none"
              >
                <Icon
                  icon="material-symbols:add-circle-outline-rounded"
                  className="mr-2"
                />
                เพิ่มสวัสดิการที่ได้รับ
              </button>
            </div>
            {/* Part3 */} {/* พูดภษาไทยได้ */}
            <div className="grid gap-6 mb-6 mt-6 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 mx-10">
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
                    handleInputChange(
                      index,
                      "current_edu_level",
                      e.target.value
                    )
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
                  value={member.edu_description}
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
            {/* ประกอบอาชีพ */}
            <div className="grid gap-4 mb-6 mt-6 mx-10 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
              {/* CheckBox */}

              <div>
                <input
                  id={`career-1-${index}`}
                  type="checkbox"
                  onChange={(e) =>
                    handleCarrerChange(index, "พืชเกษตร", e.target.checked)
                  }
                  checked={member.Career.some(e => e.career_type === 'พืชเกษตร')}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  พืชเกษตร
                </label>
              </div>
              <div>
                <input
                  id={`career-2-${index}`}
                  type="checkbox"
                  onChange={(e) =>
                    handleCarrerChange(index, "ประมง", e.target.checked)
                  }
                  checked={member.Career.some(e => e.career_type === 'ประมง')}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  ประมง
                </label>
              </div>
              <div>
                <input
                  id={`career-3-${index}`}
                  type="checkbox"
                  onChange={(e) =>
                    handleCarrerChange(index, "ปศุสัตว์", e.target.checked)
                  }
                  checked={member.Career.some(e => e.career_type === 'ปศุสัตว์')}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  ปศุสัตว์
                </label>
              </div>
              <div>
                <input
                  id={`career-4-${index}`}
                  type="checkbox"
                  onChange={(e) =>
                    handleCarrerChange(index, "รับจ้างภาคการเกษตร", e.target.checked)
                  }
                  checked={member.Career.some(e => e.career_type === 'รับจ้างภาคการเกษตร')}
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

              <div>
                <input
                  id={`career-5-${index}`}
                  type="checkbox"
                  onChange={(e) =>
                    handleCarrerChange(index, "รับจ้างทั่วไปนอกภาคการเกษตร(รายวัน)", e.target.checked)
                  }
                  checked={member.Career.some(e => e.career_type === 'รับจ้างทั่วไปนอกภาคการเกษตร(รายวัน)')}
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
              <div>
                <input
                  id={`career-6-${index}`}
                  type="checkbox"
                  onChange={(e) =>
                    handleCarrerChange(index, "ลูกจ้างทั่วไป บ.เอกชน โรงงาน โรงแรม ห้างร้าน", e.target.checked)
                  }
                  checked={member.Career.some(e => e.career_type === 'ลูกจ้างทั่วไป บ.เอกชน โรงงาน โรงแรม ห้างร้าน')}
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

              <div>
                <input
                  id={`career-6-${index}`}
                  type="checkbox"
                  onChange={(e) =>
                    handleCarrerChange(index, "ลูกจ้างหน่วยงานภาครัฐ/รัฐวิสาหกิจ", e.target.checked)
                  }
                  checked={member.Career.some(e => e.career_type === 'ลูกจ้างหน่วยงานภาครัฐ/รัฐวิสาหกิจ')}
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

              <div>
                <input
                  id={`career-7-${index}`}
                  type="checkbox"
                  onChange={(e) =>
                    handleCarrerChange(index, "รับราชการ/พนักงาหน่วยงานภาครัฐ/รัฐวิสาหกิจ", e.target.checked)
                  }
                  checked={member.Career.some(e => e.career_type === 'รับราชการ/พนักงาหน่วยงานภาครัฐ/รัฐวิสาหกิจ')}
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

              <div>
                <input
                  id={`career-8-${index}`}
                  type="checkbox"
                  onChange={(e) =>
                    handleCarrerChange(index, "ธุรกิจส่วนตัว/งานบริการ", e.target.checked)
                  }
                  checked={member.Career.some(e => e.career_type === 'ธุรกิจส่วนตัว/งานบริการ')}
                  value="ธุรกิจส่วนตัว/งานบริการ"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 "
                >
                  ธุรกิจส่วนตัว/งานบริการ (เช่น ร้านขายของชำร้านซ่อมมอเตอร์ไซค์
                  ค้าขาย/หาบแร่/แผงลอยร้านเสริมสวย รับจ้างซักรีด ขับสามล้อ
                  มอเตอร์ไซค์รับจ้างเป็นต้น)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id={`career-9-${index}`}
                  type="checkbox"
                  onChange={(e) => handleCarrerChange(index, prefix, e.target.checked)}
                  checked={member.Career.some(e => e.career_type.startsWith(prefix))}
                  value="อื่นๆ"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  อื่นๆ
                </label>
                {member.Career.some((e) =>
                  e.career_type.startsWith(prefix)
                ) && (
                  <input
                    type="text"
                    value={
                      member.Career
                        .find((item) => item.career_type.startsWith(prefix))
                        ?.career_type.substring(prefix.length) || ""
                    }
                    onChange={(e) =>
                      handleOtherChange2(
                        index,
                        "Career",
                        e.target.value
                      )
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/2 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="ระบุอาชีพ"
                  />
                )}
                
              </div>
            </div>
            <div className="Container ml-5 ">
              <h3 className="text-black text-sm font-bold px-5 ">
                ทักษะอาชีพที่สามารถสร้างรายได้(ตอบได้มากกว่า1)
              </h3>
            </div>
            {/* ทักษะอาชีพ */}
            <div className="grid gap-4 mb-6 mt-6 mx-10 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4  md:grid-cols-1 sm:grid-cols-1 ">
              {/* CheckBox */}

              <div>
                <input
                  id={`income-career-${index}`}
                  type="checkbox"
                  onChange={(e) =>
                    handleCareerMadeIncomeChange(
                      index,
                      "ไม่มี",
                      e.target.checked
                    )
                  }
                  value="ไม่มี"
                  checked={member.work_can_made_income.includes("ไม่มี")}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  ไม่มี
                </label>
              </div>

              <div>
                <input
                  id={`income-career-${index}`}
                  type="checkbox"
                  onChange={(e) =>
                    handleCareerMadeIncomeChange(
                      index,
                      "พืชเกษตร",
                      e.target.checked
                    )
                  }
                  checked={member.work_can_made_income.includes("พืชเกษตร")}
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
              <div>
                <input
                  id={`income-career-${index}`}
                  type="checkbox"
                  onChange={(e) =>
                    handleCareerMadeIncomeChange(
                      index,
                      "ประมง",
                      e.target.checked
                    )
                  }
                  value="ประมง"
                  checked={member.work_can_made_income.includes("ประมง")}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  ประมง
                </label>
              </div>
              <div>
                <input
                  id={`income-career-${index}`}
                  type="checkbox"
                  onChange={(e) =>
                    handleCareerMadeIncomeChange(
                      index,
                      "ปศุสัตว์",
                      e.target.checked
                    )
                  }
                  checked={member.work_can_made_income.includes("ปศุสัตว์")}
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
              <div>
                <input
                  id={`income-career-${index}`}
                  type="checkbox"
                  onChange={(e) =>
                    handleCareerMadeIncomeChange(
                      index,
                      "รับจ้างภาคการเกษตร",
                      e.target.checked
                    )
                  }
                  value="รับจ้างภาคการเกษตร"
                  checked={member.work_can_made_income.includes(
                    "รับจ้างภาคการเกษตร"
                  )}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  รับจ้างภาคการเกษตร
                </label>
              </div>

              <div>
                <input
                  id={`income-career-${index}`}
                  type="checkbox"
                  onChange={(e) =>
                    handleCareerMadeIncomeChange(
                      index,
                      "รับจ้างทั่วไปนอกภาคการเกษตร(รายวัน)",
                      e.target.checked
                    )
                  }
                  value="รับจ้างทั่วไปนอกภาคการเกษตร(รายวัน)"
                  checked={member.work_can_made_income.includes(
                    "รับจ้างทั่วไปนอกภาคการเกษตร(รายวัน)"
                  )}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  รับจ้างทั่วไปนอกภาคการเกษตร(รายวัน)
                </label>
              </div>
              <div>
                <input
                  id={`income-career-${index}`}
                  type="checkbox"
                  onChange={(e) =>
                    handleCareerMadeIncomeChange(
                      index,
                      "ลูกจ้างทั่วไป บ.เอกชน โรงงาน โรงแรม ห้างร้าน",
                      e.target.checked
                    )
                  }
                  value="ลูกจ้างทั่วไป บ.เอกชน โรงงาน โรงแรม ห้างร้าน"
                  checked={member.work_can_made_income.includes(
                    "ลูกจ้างทั่วไป บ.เอกชน โรงงาน โรงแรม ห้างร้าน"
                  )}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  ลูกจ้างทั่วไป บ.เอกชน โรงงาน โรงแรม ห้างร้าน
                </label>
              </div>
              <div>
                <input
                  id={`income-career-${index}`}
                  type="checkbox"
                  onChange={(e) =>
                    handleCareerMadeIncomeChange(
                      index,
                      "ลูกจ้างหน่วยงานภาครัฐ/รัฐวิสาหกิจ",
                      e.target.checked
                    )
                  }
                  checked={member.work_can_made_income.includes(
                    "ลูกจ้างหน่วยงานภาครัฐ/รัฐวิสาหกิจ"
                  )}
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

              <div>
                <input
                  id={`income-career-${index}`}
                  type="checkbox"
                  onChange={(e) =>
                    handleCareerMadeIncomeChange(
                      index,
                      "รับราชการ/พนักงาหน่วยงานภาครัฐ/รัฐวิสาหกิจ",
                      e.target.checked
                    )
                  }
                  checked={member.work_can_made_income.includes(
                    "รับราชการ/พนักงาหน่วยงานภาครัฐ/รัฐวิสาหกิจ"
                  )}
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

              <div>
                <input
                  id={`income-career-${index}`}
                  type="checkbox"
                  onChange={(e) =>
                    handleCareerMadeIncomeChange(
                      index,
                      "ธุรกิจส่วนตัว/งานบริการ",
                      e.target.checked
                    )
                  }
                  checked={member.work_can_made_income.includes(
                    "ธุรกิจส่วนตัว/งานบริการ"
                  )}
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

              <div className="flex items-center space-x-2">
                <input
                  id={`income-career-${index}`}
                  type="checkbox"
                  onChange={(e) =>
                    handleCareerMadeIncomeChange(
                      index,
                      prefix,
                      e.target.checked
                    )
                  }
                  checked={member.work_can_made_income.some((e) =>
                    e.startsWith(prefix)
                  )}
                  value="อื่นๆ"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  อื่นๆ
                </label>

                {member.work_can_made_income.some((e) =>
                  e.startsWith(prefix)
                ) && (
                  <input
                    type="text"
                    id="first_name"
                    value={
                      member.work_can_made_income
                        .find((item) => item.startsWith(prefix))
                        ?.substring(prefix.length) || ""
                    }
                    onChange={(e) =>
                      handleOtherChange(
                        index,
                        "work_can_made_income",
                        e.target.value
                      )
                    }
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/2 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="ระบุอาชีพ"
                  />
                )}
              </div>
            </div>
            <div className="mx-6 py-2 grid grid-cols-4 gap-6 ">
              <div className="">
                <label
                  for="agv_income"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  รายได้เฉลี่ย (บาท/เดือน) save
                </label>
                <input
                  type="number"
                  id="agv_income"
                  value={member.agv_income}
                  onChange={(e) =>
                    handleInputChange(index, "agv_income", e.target.value)
                  }
                  class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
              </div>

              <div className="">
                <label
                  for="lname"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  อัตราเงินเฟ้อปีที่บันทึก (ตัวอย่าง 2568 = 1.1)
                </label>
                <input
                  type="number"
                  value={member.inflation}
                  onChange={(e) =>
                    handleInputChange(index, "inflation", e.target.value)
                  }
                  class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => delMember(index)}
              class="flex justify-center focus:outline-none mb-3 px-8 mx-6 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm  py-2.5 me-2  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              <Icon
                icon="material-symbols:account-circle-off-rounded"
                className="mr-2 mt-0.5 text-lg"
              />
              ลบสมาชิคคนที่ {index + 1}
            </button>
          </div>
        ))}

        <div className="flex  gap-4 mt-4 ml-12">
          <button
            type="button"
            onClick={addMember}
            className="flex justify-center bg-emerald-500 text-white px-4 py-2 rounded-lg "
          >
            <Icon
              icon="material-symbols:person-add-rounded"
              className="mr-2 mt-0.5 text-lg"
            />
            เพิ่มสมาชิคคนถัดไป
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => handlePrevPage()}
            className="flex justify-center bg-blue-500 text-white px-4 py-2 rounded-lg mr-3"
          >
            <Icon
              icon="material-symbols:arrow-left-rounded"
              width="25"
              height="25"
            />
            ย้อนกลับ
          </button>

          <button
            type="submit"
            className="flex justify-center bg-blue-500 text-white px-4 py-2 rounded-lg mr-10"
          >
            หน้าถัดไป
            <Icon
              icon="material-symbols:arrow-right-rounded"
              width="25"
              height="25"
            />
          </button>
        </div>
      </form>
    </div>
  );
};
