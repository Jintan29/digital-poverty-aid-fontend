import React, { useEffect, useState } from "react";
import Modal from "../../Modal";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../../config";

const EditModal = ({ show, onClose, member,loadData }) => {

  // Use useEffect to update formData when member changes or modal opens
  useEffect(()=>{
    if (show) {
      setFormData({
        title: member.title || "",
        fname: member.fname || "",
        lname: member.lname || "",
        phone: member.phone || "",
        national_id: member.national_id || "",
        birthdate: member.birthdate || "",
        health: member.health || "",
        status_in_house: member.status_in_house || "",
        current_edu_level: member.current_edu_level || "",
        max_education: member.max_education || "",
        work_status: member.work_status || "",
      });
    }
  },[show,member])

  const [formData, setFormData] = useState({
    title: member.title || "",
    fname: member.fname || "",
    lname: member.lname || "",
    phone: member.phone || "",
    national_id: member.national_id || "",
    birthdate: member.birthdate || "",
    health: member.health || "",
    status_in_house: member.status_in_house || "",
    current_edu_level: member.current_edu_level || "",
    max_education: member.max_education || "",
    work_status: member.work_status || "",
  });

  const handleInputChange = (field, value) => {
    const updateData = { ...formData };
    updateData[field] = value;
    setFormData(updateData);
  };

  //VALIDATION
  const validateInput = ()=>{

    if (!formData.national_id || (formData.national_id !== '-'  && !/^\d{13}$/.test(formData.national_id))){
      Swal.fire({
        title:'กรอกข้อมูลไม่ครบ',
        text:`กรุณากรอกเลขบัตรประชาชน ให้ครบ 13 หลัก หรือกรอก '-' หากไม่มี `,
        icon:'warning'
      })
      return false
    }

    if(!formData.phone ||(formData.phone !== '-'  && !/^\d{10}$/.test(formData.phone))){
      Swal.fire({
        title:'เบอร์โทรศัพท์ไม่ถูกต้อง',
        text:`กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก หรือกรอก '-' หากไม่มี`,
        icon:'warning',
      })
      return false
    }

    //หากกรอกถูกหมด
    return true ;
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    //validate
    if(!validateInput()){
      return;
    }

    try{
      const res = await Swal.fire({
        title:'แก้ไขข้อมูล',
        text:'ตรวจสอบข้อมูลถูกต้องแล้วใช่หรือไม่',
        icon:'question',
        showCancelButton:true,
        showConfirmButton:true
      })

      if(res.isConfirmed){
        const res = await axios.put(config.api_path + `/member-household/update/${member.id}`,
          formData,
          config.headers()
        )
      
        if(res.data.message === 'success'){
          await Swal.fire({
            title:'บันทึกข้อมูล',
            text:'บันทึกข้อมูลสำเร็จ',
            icon:'success'
          })
        }
        onClose()
        loadData()
      }

    }catch(error){
      Swal.fire({
        title:'error',
        text: error.response?.data?.message || error.message
      })
    }
  }

  // const handleLog = () => {
  //   console.log(formData);
  // };

  return (
    <>
      <Modal
        title="เพิ่ม/แก้ไข ข้อมูลสมาชิกครัวเรือน"
        show={show}
        icon="material-symbols:person-edit-rounded"
        onClose={onClose}
        size="3xl"
      >
        <div className="grid gap-2 grid-cols-2">
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              ชื่อจริง
            </label>
            <div className="flex items-center gap-2 mb-5">
              <select
                id="title"
                name="title"
                value={formData.title}
                onChange={e=>handleInputChange(e.target.name,e.target.value)}
                className="border border-gray-300 bg-white text-gray-900 text-sm 
                   rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2
                   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                   dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>นาย</option>
                <option>นาง</option>
                <option>นางสาว</option>
                <option>เด็กชาย</option>
                <option>เด็กหญิง</option>
              </select>

              <input
                id="fname"
                name="fname"
                type="text"
                value={formData.fname}
                onChange={e=>handleInputChange(e.target.name,e.target.value)}
                required
                placeholder=""
                className="border border-gray-300 bg-gray-50 text-gray-900 text-sm 
                   rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 
                   w-full dark:bg-gray-700 dark:border-gray-600 
                   dark:placeholder-gray-400 dark:text-white 
                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              นามสกุล
            </label>
            <input
              id="lname"
              name="lname"
              type="text"
              value={formData.lname}
              onChange={e=>handleInputChange(e.target.name,e.target.value)}
              required
              placeholder=""
              className="border border-gray-300 bg-gray-50 text-gray-900 text-sm 
                   rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 
                   w-full dark:bg-gray-700 dark:border-gray-600 
                   dark:placeholder-gray-400 dark:text-white 
                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              เบอร์โทรศัพท์
            </label>
            <input
              name="phone"
              type="text"
              value={formData.phone}
              onChange={e=>handleInputChange(e.target.name,e.target.value)}
              required
              placeholder=""
              className="border border-gray-300 bg-gray-50 text-gray-900 text-sm 
                   rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 
                   w-full dark:bg-gray-700 dark:border-gray-600 
                   dark:placeholder-gray-400 dark:text-white 
                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="national_id"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              หมายเลขบัตรประจำตัวประชาชน
            </label>
            <input
              type="text"
              name="national_id"
              value={formData.national_id}
              onChange={e=>handleInputChange(e.target.name,e.target.value)}
              class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
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
              name="birthdate"
              pattern="\d{4}-\d{2}-\d{2}"
              placeholder="พ.ศ.-เดือน-วัน"
              value={formData.birthdate}
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "กรุณากรอกวันเกิดในรูปแบบ (ปี-เดือน-วัน) เช่น 2546-04-13"
                )
              }
              onInput={(e) => e.target.setCustomValidity("")} // เคลียร์ข้อความเมื่อผู้ใช้แก้ข้อมูล
              onChange={e=>handleInputChange(e.target.name,e.target.value)}
              class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              for="health"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              สุขภาพ
            </label>
            <select
              id="health"
              name="health"
              value={formData.health}
              onChange={e=>handleInputChange(e.target.name,e.target.value)}
              className="border border-gray-300  mb-5 bg-gray-50  rounded-lg w-full text-gray-900 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
            >
              <option>ปกติ</option>
              <option>ป่วยเรื้อรังไม่ติดเตียง(เช่น หัวใจ เบาหวาน)</option>
              <option>พึ่งพาตนเองได้</option>
              <option>ผู้ป่วยติดเตียง/พิการพึ่งพาตัวเองไม่ได้</option>
            </select>
          </div>

          <div>
            <label
              for="current_edu_level"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              กำลังศึกษาระดับ
            </label>
            <select
              id="current_edu_level"
              name="current_edu_level"
              value={formData.current_edu_level}
              onChange={e=>handleInputChange(e.target.name,e.target.value)}
              className="border border-gray-300  mb-5 bg-gray-50  rounded-lg w-full text-gray-900 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
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
              for="max_education"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              การศึกษาสูงสุด
            </label>
            <select
              id="max_education"
              name="max_education"
              value={formData.max_education}
              onChange={e=>handleInputChange(e.target.name,e.target.value)}
              className="border border-gray-300 mb-5 bg-gray-50  rounded-lg w-full text-gray-900 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
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

          <div>
            <label
              for="work_status "
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              สถานะการทำงาน
            </label>
            <select
              id="work_status"
              name="work_status"
              value={formData.work_status}
              onChange={e=>handleInputChange(e.target.name,e.target.value)}
              className="border border-gray-300  mb-5 bg-gray-50  rounded-lg w-full text-gray-900 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
            >
              <option>ไม่ทำงาน</option>
              <option>ว่างงาน</option>
              <option>ทำงาน</option>
            </select>
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
              value={formData.status_in_house}
              onChange={e=>handleInputChange(e.target.name,e.target.value)}
              className="border border-gray-300 mb-5 bg-gray-50  rounded-lg w-full text-gray-900 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
            >
              <option>มีชื่อและอาศัยอยู่</option>
              <option>มีชื่อแต่ไม่อาศัย</option>
              <option>ไม่มีชื่อแต่อาศัยอยู่</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={e=> handleSubmit(e)}
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            บันทึกข้อมูล
          </button>
        </div>
      </Modal>
    </>
  );
};

export default EditModal;
