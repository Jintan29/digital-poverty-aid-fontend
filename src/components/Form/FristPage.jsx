import React, { useEffect, useState } from "react";
//จัดการวันที่
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";
import axios from "axios";



//ใช้งาน dayjs
dayjs.extend(utc);

export const FristPage = ({
  setCurrentPage,
  setMainFormData,
  mainFormData,
}) => {
  //เก็บข้อมูลจาก input
  const [formData, setFormData] = useState({

    recder_title: 'นาย',
    recder_fname: '',
    recder_lname: '',
    recder_phone: '',
    time_rec: null,

    Household: {
      house_code: "",
      has_greenBook: false,
      green_book_id: "",
      village: "",
      house_number: "",
      alley: "",
      road: "",
      subdistrict: "",
      district: "",
      province: "พิษณุโลก", // จังหวัด
      postcode: "",
      host_title: "นาย", // ค่า default เป็น นาย
      host_fname: "",
      host_lname: "",
      host_national_id: ""
      // total_house_member: 0, //ค่อยมาเปลี่ยนค่าทีหลัง
    },
    //ตารางผู้ให้ข้อมูล
    Informant: {
      fname: "",
      lname: "",
      title: "นาย",
      national_id: "",
      phone: "",
      fam_total_member: null,
      fam_total_live: null,
      live_but_has_no_name_in_fam: null,
      total_has_name_not_live: null,
    },
    TeamServey: [
      {
        title: "นาย",
        fname: "",
        lname: "",
        agency: "",
        phone: "",
      },
    ]
  });

  const handleLog = ()=>{
    console.log(formData);
    
  }

  //เก็บอำเภอและตำบล
  const districtSubdistrictMap = {
    "ชาติตระการ": ["ป่าแดง", "ชาติตระการ", "สวนเมี่ยง", "บ้านดง", "บ่อภาค", "ท่าสะแก"],
    "นครไทย": [
      "นครไทย",
      "หนองกะท้าว",
      "บ้านแยง",
      "เนินเพิ่ม",
      "นาบัว",
      "นครชุม",
      "น้ำกุ่ม",
      "ยางโกลน",
      "บ่อโพธิ์",
      "บ้านพร้าว",
      "ห้วยเฮี้ย",
    ],
    "อำเภอเมืองพิษณุโลก":[
      "ในเมือง","วังน้ำคู้","วัดจันทร์","วัดพริก",
      "ท่าทอง","ท่าโพธิ์","สมอแข","ดอนทอง",
      "บ้านป่า","ปากโทก","หัวรอ","จอมทอง",
      "บ้านกร่าง","บ้านคลอง","พลายชุมพล","มะขามสูง",
      "อรัญญิก","บึงพระ","ไผ่ขอดอน","งิ้วงาม",
    ],

    "เนินมะปราง": ["ชมพู", "บ้านมุง", "ไทรย้อย", "วังโพรง", "บ้านน้อยซุ้มขี้เหล็ก", "เนินมะปราง", "วังยาง"],
    "บางกระทุ่ม": [
      "บางกระทุ่ม",
      "บ้านไร่",
      "โคกสลุด",
      "สนามคลี",
      "ท่าตาล",
      "ไผ่ล้อม",
      "นครป่าหมาก",
      "เนินกุ่ม",
      "วัดตายม",
    ],
    "บางระกำ": [
      "บางระกำ",
      "ปลักแรด",
      "พันเสา",
      "วังอิทก",
      "บึงกอก",
      "หนองกุลา",
      "ชุมแสงสงคราม",
      "นิคมพัฒนา",
      "บ่อทอง",
      "ท่านางงาม",
      "คุยม่วง",
    ],
    "พรหมพิราม": [
      "พรหมพิราม",
      "ท่าช้าง",
      "วงฆ้อง",
      "มะตูม",
      "หอกลอง",
      "ศรีภิรมย์",
      "ตลุกเทียม",
      "วังวน",
      "หนองแขม",
      "มะต้อง",
      "ทับยายเชียง",
      "ดงประคำ",
    ],
    "วังทอง": [
      "วังทอง",
      "พันชาลี",
      "แม่ระกา",
      "บ้านกลาง",
      "วังพิกุล",
      "แก่งโสภา",
      "ท่าหมื่นราม",
      "วังนกแอ่น",
      "หนองพระ",
      "ชัยนาม",
      "ดินทอง",
    ],
    "วัดโบสถ์": ["วัดโบสถ์", "ท่างาม", "ทองแท้", "บ้านยาง", "หินลาด", "คันโช้ง"],
  };

  //เก็บอำเภอที่เลือก
  const [availableSubdistricts, setAvailableSubdistricts] = useState([]);

  const handleInputChange = (subject, field, value) => {
    const updateData = { ...formData };
    
    //str->int
    if (field === "fam_total_member" || field ==="fam_total_live" || field ==="fam_total_live" 
      || field === "live_but_has_no_name_in_fam"  || field === "total_has_name_not_live"
    ) {
      value = parseInt(value, 10);  // convert to base 10
    }

    updateData[subject][field] = value;
    setFormData(updateData);
  };

  const handleRecderInput = (field,value)=>{
    const updateData = {...formData}
    updateData[field] = value
    setFormData(updateData)
  }

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงวันที่
  const handleDateChange = (date) => {
    //format เวลาให้เป็น utc
    const formatDate =  dayjs(date).utc().format()

    setFormData((prevData) => ({
      ...prevData,
      time_rec: formatDate, 
    }));
  };

  const validateInput = ()=>{
    //เลขบัตรประชาชนเจ้าบ้าน
    if(formData.Household.host_national_id.length !== 13 ){
      Swal.fire({
        title:'หมายเลขบัตรประชาชนไม่ถูกต้อง',
        text:'กรุณากรอกเลขบัตรของ "เจ้าบ้าน" ให้ครบ 13 หลัก',
        icon:'error'
      })
      return false
    }

    if(formData.Informant.national_id.length !== 13 ){
      Swal.fire({
        title:'หมายเลขบัตรประชาชนไม่ถูกต้อง',
        text:'กรุณากรอกเลขบัตรของ "ผู้ให้ข้อมูล" ให้ครบ 13 หลัก',
        icon:'error',
      })
      return false
    }

    if(formData.Informant.phone.length !== 10 ){
      Swal.fire({
        title:'เบอร์โทรศัพท์ไม่ถูกต้อง',
        text:'กรุณากรอกเบอร์โทรศัพท์ "ผู้ให้ข้อมูล" ให้ถูกต้อง',
        icon:'error',
      })
      return false
    }

    //loop check team servey
    for(let i=0 ; i< formData.TeamServey.length;i++){
      const teamMember = formData.TeamServey[i]

      if(teamMember.phone.length !== 10){
        Swal.fire({
          title:'เบอร์โทรศัพท์ไม่ถูกต้อง',
          text:`กรุณากรอกเบอร์โทรศัพท์ของทีมสำรวจคนที่ ${i+1} ให้ถูกต้อง`,
          icon:'error'
        })
        return false
      }
    }

    if(formData.recder_phone.length !== 10){
      Swal.fire({
        title:'เบอร์โทรศัพท์ไม่ถูกต้อง',
        text:'กรุณากรอกเบอร์โทรศัพท์ "ผู้บันทึกข้อมูล" ให้ถูกต้อง',
        icon:'error',
      })
      return false
    }


    //หากผ่านหมดให้ return true
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //validate ไม่ผ่านไม่เปลี่ยนหน้า
    if(!validateInput()){
      return;
    }

    setMainFormData((prevData) => ({
      ...prevData,
      ...formData, //นำไปต่อท้ายค่าใน State เก่า
    }));
    setCurrentPage(2); //เปลี่ยนหน้า
  };

  //input of teamservey
  const handleTeamServeyChange = (index, field, value) => {

    const updatedTeamServey = [...formData.TeamServey];
    updatedTeamServey[index][field] = value;

    setFormData((prevData) => ({
      ...prevData,
      TeamServey: updatedTeamServey,
    }));
  };

  //Add new member Teamservey
  const handleAddTeamServey = () => {
    setFormData((prevData) => ({
      ...prevData,
      TeamServey: [
        ...prevData.TeamServey,
        {
          title: "นาย",
          fname: "",
          lname: "",
          agency: "",
          phone: "",
        },
      ],
    }));
  };

  //Delteam
  const handleDeleteTeamServey = (index) => {
    setFormData((prevData) => {
      const updatedTeamServey = [...prevData.TeamServey];
      updatedTeamServey.splice(index, 1);
      return {
        ...prevData,
        TeamServey: updatedTeamServey,
      };
    });
  };

  useEffect(() => {
    if (mainFormData && Object.keys(mainFormData).length > 0) {
      setFormData(mainFormData); // ข้อมูลที่เก็บไว้ใน mainFormData
      if (mainFormData.Household && mainFormData.Household.district) { 
        setAvailableSubdistricts(  //อำเภอ
          districtSubdistrictMap[mainFormData.Household.district] || []
        );
      }
    }
  }, [mainFormData]); //คอยดูว่าข้อมูลจากฟอร์มหลักเก็บข้อมูลที่ส่งไปหรือยัง

  // อัปเดตตำบลเมื่ออำเภอเปลี่ยนแปลง
  useEffect(() => {
    if (formData.Household.district) {
      setAvailableSubdistricts(
        districtSubdistrictMap[formData.Household.district] || [] //เอาค่าของตำบลที่เลือกไปใส่ไว้
      );

    }
  }, [formData.Household.district]);



  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div class="mb-6 mx-10 mt-10">
            <label
              for="house_code"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              รหัสบ้าน
            </label>
            <input
              type="text"
              name="Household"
              id="house_code"
              class="bg-gray-50 border my-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="HC-XXXXXXX"
              value={formData.Household.house_code}
              onChange={(e) =>
                handleInputChange(e.target.name, e.target.id, e.target.value)
              }
              required
            />
            <label
              for="greenBook"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              หมายเลขครัวเรือนเกษตรกร(สมุดเขียว)
            </label>

            <div className="flex flex-col  ml-3 ">
              <div className="">
                <input
                  name="has_greenBook"
                  type="radio"
                  checked={!formData.has_greenBook}
                  value="false"
                  onClick={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      Household: {
                        ...prev.Household,
                        has_greenBook: false,
                      },
                    }))
                  }
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label className="px-3 text-m font-medium leading-6 text-gray-900">
                  ไม่มี
                </label>
              </div>

              <div className="row">
                <input
                  name="has_greenBook"
                  type="radio"
                  checked={formData.Household.has_greenBook}
                  value="true"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      Household: {
                        ...prev.Household,
                        has_greenBook: true,
                      },
                    }))
                  }
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label className="px-3 text-m font-medium leading-6 text-gray-900">
                  มี หมายเลข
                </label>
                {formData.Household.has_greenBook && (
                  <input
                    type="text"
                    name="Household"
                    id="green_book_id"
                    value={formData.Household.green_book_id}
                    onChange={(e) =>
                      handleInputChange(
                        e.target.name,
                        e.target.id,
                        e.target.value
                      )
                    }
                    className="bg-gray-50 border my-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-1/2 p-2.5"
                    placeholder="หมายเลขครัวเรือนเกษตร"
                    required
                  />
                )}
              </div>
            </div>
          </div>

          <div class="grid gap-6 mb-6 mt-6 md:grid-cols-1 sm:grid-cols-1  lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 mx-10">
            <div className="">
              <label
                for="village"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ชื่อหมู่บ้าน
              </label>
              <input
                type="text"
                id="village"
                name="Household"
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.id, e.target.value)
                }
                value={formData.Household.village}
                required
              />
            </div>
            <div>
              <label
                for="house_number"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                บ้านเลขที่
              </label>
              <input
                type="text"
                name="Household"
                id="house_number"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.id, e.target.value)
                }
                value={formData.Household.house_number}
                required
              />
            </div>
            <div>
              <label
                for="alley"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ซอย
              </label>
              <input
                type="text"
                name="Household"
                id="alley"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.id, e.target.value)
                }
                value={formData.Household.alley}
              />
            </div>
            <div>
              <label
                for="road"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ถนน
              </label>
              <input
                type="text"
                name="Household"
                id="road"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.id, e.target.value)
                }
                value={formData.Household.road}
                required
              />
            </div>
            <div>
              <label
                for="province"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                จังหวัด
              </label>
              <input
                type="text"
                name="Household"
                id="province"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                disabled
                value={formData.Household.province}
                
              />
            </div>
            <div>
              <label
                for="district"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                อำเภอ
              </label>
              <select
                type="text"
                name="Household"
                id="district"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.id, e.target.value)
                }
                value={formData.Household.district}
                required
              >
                <option value="">เลือกอำเภอ</option>
                {Object.keys(districtSubdistrictMap).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}

              </select>
            </div>
            <div>
              <label
                for="subdistrict"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ตำบล
              </label>
              <select
                type="text"
                id="subdistrict"
                name="Household"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.id, e.target.value)
                }
                value={formData.Household.subdistrict}
                required
                disabled={!formData.Household.district}
              >
                <option value="">เลือกตำบล</option>
                {availableSubdistricts.map((subdistrict) => (
                  <option key={subdistrict} value={subdistrict}>
                    {subdistrict}
                  </option>
                ))}
              </select>
            </div>
            
            
            <div>
              <label
                for="postcode"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                รหัสไปรษณีย์
              </label>
              <input
                type="number"
                name="Household"
                id="postcode"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.id, e.target.value)
                }
                value={formData.Household.postcode}
                required
              />
            </div>
          </div>

          <div className="my-6 mx-10">
            <h3>
              <b>ข้อมูล เจ้าบ้าน</b>
            </h3>
          </div>

          <div className="mb-6 mx-10 grid gap-6  md:grid-cols-3">
            <div className="relative  rounded-md shadow-sm">
              <label
                for="host_title"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ชื่อ เจ้าบ้าน ตามทะเบียนบ้าน
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-7">
                <label htmlFor="houseOwnerTitle" className="sr-only">
                  Title
                </label>
                <select
                  id="host_title"
                  name="Household"
                  className="border border-transparent bg-transparent text-gray-500 text-sm focus:ring-0 focus:outline-none w-20 focus:border-gray-500 focus:rounded-md"
                  onChange={(e) =>
                    handleInputChange(
                      e.target.name,
                      e.target.id,
                      e.target.value
                    )
                  }
                  value={formData.Household.host_title}
                >
                  <option>นาย</option>
                  <option>นาง</option>
                  <option>นางสาว</option>
                </select>
              </div>
              <input
                id="host_fname"
                name="Household"
                required
                type="text"
                placeholder=""
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.id, e.target.value)
                }
                value={formData.Household.host_fname}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-24 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="">
              <label
                for="host_lname"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                นามสกุล
              </label>
              <input
                type="text"
                name="Household"
                id="host_lname"
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.id, e.target.value)
                }
                value={formData.Household.host_lname}
                required
              />
            </div>
            <div className="">
              <label
                for="host_national_id"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                หมายเลขบัตรประจำตัวประชาชน <b>เจ้าบ้าน</b>
              </label>
              <input
                type="number"
                name="Household"
                id="host_national_id"
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.id, e.target.value)
                }
                value={formData.Household.host_national_id}
                required
              />
            </div>
          </div>

          <div className="my-6 mx-10 mt-10">
            <h3>
              <b>ข้อมูล ผู้ให้ข้อมูล</b> (ต้องเป็นบุคคลที่อาศัยอยู่ในครัวเรือน
              หรือ ได้รับความยินยอมจากบุคคลในครัวเรือน ให้เป็นผู้ให้ข้อมูล)
            </h3>
          </div>

          <div className="mb-6 mx-10 grid gap-6  md:grid-cols-4 mt-5">
            <div className="relative  rounded-md shadow-sm">
              <label
                for="fname"
                name="Informant"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ชื่อ ผู้ให้ข้อมูล
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-7">
                <select
                  id="title"
                  name="Informant"
                  onChange={(e) =>
                    handleInputChange(
                      e.target.name,
                      e.target.id,
                      e.target.value
                    )
                  }
                  value={formData.Informant.title}
                  className="border border-transparent bg-transparent text-gray-500 text-sm focus:ring-0 focus:outline-none w-20 focus:border-gray-500 focus:rounded-md"
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
                required
                name="Informant"
                type="text"
                value={formData.Informant.fname}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.id, e.target.value)
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-24 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                name="Informant"
                id="lname"
                value={formData.Informant.lname}
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.id, e.target.value)
                }
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
                type="number"
                name="Informant"
                required
                id="national_id"
                value={formData.Informant.national_id}
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.id, e.target.value)
                }
              />
            </div>

            <div className="">
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                กรณีไม่มีบัตรให้ระบุว่า
              </label>
              <input
                id="national_id"
                name="Informant"
                type="checkbox"
                value={formData.Informant.national_id}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.id, "ไม่มีบัตร")
                }
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                //required
              />
              <label className="px-5">ไม่มีบัตร</label>
            </div>

            <div className="">
              <label
                for="phone"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                หมายเลขโทรศัพท์ (บ้าน/มือถือ)
              </label>
              <input
                type="number"
                name="Informant"
                id="phone"
                value={formData.Informant.phone}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.id, e.target.value)
                }
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ระบุหมายเลขโทรศัพท์"
                required
              />
            </div>

            <div className="">
              <label
                for="fam_total_member"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                จำนวนสมาชิคตามทะเบียนบ้าน(คน)
              </label>
              <input
                type="number"
                name="Informant"
                id="fam_total_member"
                value={formData.Informant.fam_total_member}
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ระบุจำนวนสมาชิค"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.id, e.target.value)
                }
                required
              />
            </div>

            <div className="">
              <label
                for="fam_total_live"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                อาศัยอยู่จริงในครัวเรือน(คน)
              </label>
              <input
                type="number"
                name="Informant"
                id="fam_total_live"
                value={formData.Informant.fam_total_live}
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ระบุจำนวนสมาชิค"
                required
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.id, e.target.value)
                }
              />
            </div>

            <div className="">
              <label
                for="live_but_has_no_name_in_fam"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                จำนวนสมาชิคที่อาศัยแต่ไม่มีชื่อในทะเบียนบ้าน(คน)
              </label>
              <input
                type="number"
                id="live_but_has_no_name_in_fam"
                name="Informant"
                value={formData.Informant.live_but_has_no_name_in_fam}
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ระบุจำนวนสมาชิค"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.id, e.target.value)
                }
                required
              />
            </div>

            <div className="">
              <label
                for="total_has_name_not_live"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                จำนวนสมาชิคที่ไม่ได้อาศัยแต่มีชื่อในทะเบียนบ้าน(คน)
              </label>
              <input
                type="number"
                name="Informant"
                id="total_has_name_not_live"
                value={formData.Informant.total_has_name_not_live}
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ระบุจำนวนสมาชิค"
                required
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.id, e.target.value)
                }
              />
            </div>
          </div>

          <div className="my-6 mx-10 ">
            <label
              for="first_name"
              class="block mb-2  font-medium text-gray-900 dark:text-white text-base"
            >
              ผู้ให้ข้อมูลได้รับทราบและเข้าใจวัตถุประสงค์ของโครงการอย่างครบถ้วน
              ชัดเจน และยินยอมให้ใช้ข้อมูลที่มีการจัดเก็บตามวัตถุประสงค์
              ของโครงการเท่านั้น
            </label>
          </div>

          <div className="mt-6 mx-10 mb-3">
            <h3>
              <b>สำหรับทีมสำรวจข้อมูล</b>
            </h3>
          </div>

          <div class="mx-10">
            {formData.TeamServey.map((teamData, index) => (
              <div className="grid gap-6 mb-6 mt-6 md:grid-cols-4" key={index}>
                <div className="relative  rounded-md shadow-sm col-span-1">
                  <label
                    for="visitors"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                  >
                    {index + 1}.ชื่อผู้สำรวจ
                  </label>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-7">
                    <select
                      id="title"
                      value={teamData.title}
                      onChange={(e) =>
                        handleTeamServeyChange(
                          index,
                          e.target.id,
                          e.target.value
                        )
                      }
                      // name="currency"
                      className="border border-transparent bg-transparent text-gray-500 text-sm focus:ring-0 focus:outline-none w-20 focus:border-gray-500 focus:rounded-md"
                    >
                      <option>นาย</option>
                      <option>นาง</option>
                      <option>นางสาว</option>
                    </select>
                  </div>
                  <input
                    id="fname"
                    required
                    value={teamData.fname}
                    onChange={(e) =>
                      handleTeamServeyChange(index, e.target.id, e.target.value)
                    }
                    type="text"
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-24 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    value={teamData.lname}
                    onChange={(e) =>
                      handleTeamServeyChange(index, e.target.id, e.target.value)
                    }
                    id="lname"
                    class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                  />
                </div>
                <div className="">
                  <label
                    for="agency"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    หน่วยงาน
                  </label>
                  <input
                    id="agency"
                    type="text"
                    value={teamData.agency}
                    onChange={(e) =>
                      handleTeamServeyChange(index, e.target.id, e.target.value)
                    }
                    class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="ชื่อหน่วยงาน"
                    required
                  />
                </div>

                <div className="">
                  <label
                    for="phone"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="number"
                    value={teamData.phone}
                    onChange={(e) =>
                      handleTeamServeyChange(index, e.target.id, e.target.value)
                    }
                    id="phone"
                    class=" bg-gray-50 border w-9/12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteTeamServey(index)}
                    className=" items-center py-2 px-4  ml-3  border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none"
                  >
                    <Icon
                      icon="material-symbols:delete-forever-outline-rounded"
                      className=""
                    />
                  </button>
                </div>
              </div>
            ))}
            <div className=" mb-6">
              <button
                type="button"
                onClick={() => handleAddTeamServey()}
                className="flex items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-400 hover:bg-emerald-600 focus:outline-none"
              >
                <Icon
                  icon="material-symbols:add-circle-outline-rounded"
                  className="mr-2"
                />
                เพิ่มสมาชิคทีมสำรวจ
              </button>
            </div>
          </div>

          <div className="mt-6 mx-10 ">
            <h4>
              <b>วันที่สำรวจ</b>
            </h4>
          </div>

          {/* components เก็บวันที่ */}
          {/* <ThaiDatePicker /> */}

          <div className="mt-6 mx-10 ">
            <h3>
              <b>สำหรับ ผู้บันทึกข้อมูล</b>
            </h3>
          </div>

          <div class="grid gap-6 mb-6 mt-3 md:grid-cols-4  mx-10">
            <div className="relative  rounded-md shadow-sm">
              <label
                for="visitors"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ชื่อผู้บันทึก
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-7">
                <select
                  id="recder_title"
                  name="DataRecorder"
                  onChange={(e) =>
                    handleRecderInput(
                      e.target.id,
                      e.target.value
                    )
                  }
                  value={formData.recder_title}
                  className="border border-transparent bg-transparent text-gray-500 text-sm focus:ring-0 focus:outline-none w-20 focus:border-gray-500 focus:rounded-md"
                >
                  <option>นาย</option>
                  <option>นาง</option>
                  <option>นางสาว</option>
                </select>
              </div>
              <input
                id="recder_fname"
                onChange={(e) =>
                  handleRecderInput( e.target.id, e.target.value)
                }
                name="DataRecorder"
                type="text"
                required
                placeholder=""
                value={formData.recder_fname}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-24 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                required
                id="recder_lname"
                name="DataRecorder"
                onChange={(e) =>
                  handleRecderInput( e.target.id, e.target.value)
                }
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                value={formData.recder_lname}
              />
            </div>

            <div className="">
              <label
                for="phone"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                เบอร์โทรศัพท์
              </label>
              <input
                type="number"
                name="DataRecorder"
                id="recder_phone"
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                onChange={(e) =>
                  handleRecderInput( e.target.id, e.target.value)
                }
                value={formData.recder_phone}
                required
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                วันที่บันทึกข้อมูล ป-ด-ว (2567-11-20)
              </label>
              <DatePicker
                locale="th"
                dateFormat="dd/MM/yyyy"
                selected={formData.time_rec ? new Date(formData.time_rec) : null}
                onChange={handleDateChange}
                className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholderText="เลือกวันที่"
              />
            </div>
          </div>

          <div className="my-6 mx-10 ">
            <label
              for="first_name"
              class="block mb-2  font-medium text-gray-900 dark:text-white text-base"
            >
              <b>หมายเหตุ</b>
            </label>
            <div className="text-sm">
              <p>
                1. ควรทำการสำรวจ ณ บ้านพักอาศัยของผู้ตอบ
                เพื่อจะได้สังเกตสภาพแวดล้อมของที่อาศัยได้
              </p>
              <p>
                2. ขอดูทะเบียนบ้าน เพื่อบันทึกเลขที่บ้าน ที่อยู่
                ชื่อสมาชิกและหมายเลขบัตรประชาชนของทุกคนในครัวเรือนได้ถูกต้อง
              </p>
              <p>
                3. หากพบผู้ไม่มีบัตร/ทะเบียนบ้าน
                ทั้งที่อาศัยอยู่คนเดียว/ครอบครัวให้เก็บข้อมูลเพิ่มเติม
                เพื่อนำเข้าสู่ระบบช่วยเหลือ
                กรณีที่เป้าหมายไม่มีหลักฐานแสดงตัวตนและครอบครัวว่าเป็นไทย
                แต่มีผู้รับรอง/ยืนยันว่าอาศัยอยู่ในพื้นที่ต่อเนื่องให้ทีมสำรวจ
                บันทึกเป็นข้อสังเกตไว้
              </p>
            </div>
          </div>

          <div className="flex justify-end mr-10">
            <button
              type="submit"
              class="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
    </div>
  );
};
