import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../config";

const ManageUserModal = ({ show, member, onClose, loadData }) => {
  // ตั้งค่า state เพื่อเก็บข้อมูลแบบฟอร์ม
  const [formData, setFormData] = useState({
    id: member.id || "",
    fname: member.fname || "",
    lname: member.lname || "",
    username: member.username || "",
    email: member.email || "",
    phone: member.phone || "",
    password: "",
    confirmPassword: "",
  });

  // อัพเดทข้อมูลฟอร์มเมื่อเปิด modal หรือเมื่อข้อมูล member เปลี่ยน
  useEffect(() => {
    if (show) {
      setFormData({
        //id: member.id,
        fname: member.fname || "",
        lname: member.lname || "",
        username: member.username || "",
        email: member.email || "",
        phone: member.phone || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [show, member]);

  const handleInputChange = (field, value) => {
    const updateData = { ...formData };
    updateData[field] = value;
    setFormData(updateData);
  };

  // ฟังก์ชันการตรวจสอบข้อมูลก่อนส่ง
  const validateInput = () => {
    // ตรวจสอบเบอร์โทรศัพท์
    if (
      !formData.phone ||
      (formData.phone !== "-" && !/^\d{10}$/.test(formData.phone))
    ) {
      Swal.fire({
        title: "เบอร์โทรศัพท์ไม่ถูกต้อง",
        text: 'กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก หรือกรอก "-" หากไม่มี',
        icon: "warning",
      });
      return false;
    }

    // ตรวจสอบอีเมล
    if (
      !formData.email ||
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)
    ) {
      Swal.fire({
        title: "กรอกข้อมูลไม่ถูกต้อง",
        text: "กรุณากรอกอีเมลให้ถูกต้อง",
        icon: "warning",
      });
      return false;
    }

    // ตรวจสอบรหัสผ่าน
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: "รหัสผ่านไม่ตรงกัน",
        text: "กรุณาตรวจสอบให้แน่ใจว่ารหัสผ่านทั้งสองช่องตรงกัน",
        icon: "warning",
      });
      return false;
    }

    return true;
  };

  // ฟังก์ชันที่ทำงานเมื่อส่งฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบข้อมูลก่อนที่จะส่ง
    if (!validateInput()) {
      return;
    }

    //กรอง confrime pass  ออก
    const { confirmPassword, ...dataToSend } = formData;
    
    // ถ้าผู้ใช้ไม่กรอกรหัสผ่านใหม่ ให้นำ password ออกจากข้อมูลที่ส่ง
    if (!dataToSend.password) {
      delete dataToSend.password;
    }

    try {
      const res = await Swal.fire({
        title: "แก้ไขข้อมูล",
        text: "ตรวจสอบข้อมูลถูกต้องแล้วใช่หรือไม่",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ยกเลิก",
      });
      if (res.isConfirmed) {
        const res = await axios.put(
          config.api_path + `/user/update/${member.id}`,
          dataToSend,
          config.headers()
        );

        if (res.data.message === "User updated successfully") {
          await Swal.fire({
            title: "บันทึกข้อมูล",
            text: "บันทึกข้อมูลสำเร็จ",
            icon: "success",
          });
        }

        loadData(); // โหลดข้อมูลใหม่หลังจากอัปเดต
        onClose(); // ปิด modal
      }
    } catch (error) {
      Swal.fire(
        "เกิดข้อผิดพลาด",
        error.response?.data?.message || error.message,
        "error"
      );
    }
  };

  return (
    <>
      <Modal
        title="แก้ไขข้อมูลผู้ใช้"
        show={show}
        icon="material-symbols:person-edit-rounded"
        onClose={onClose}
        size="xl"
      >
        <div className="grid gap-2 grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              ชื่อจริง
            </label>
            <input
              id="fname"
              name="fname"
              type="text"
              value={formData.fname}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              required
              className="border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              นามสกุล
            </label>
            <input
              id="lname"
              name="lname"
              type="text"
              value={formData.lname}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              required
              className="border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              required
              className="border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              E-mail
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              required
              className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div> */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              เบอร์โทรศัพท์
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              required
              className="border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div className="grid gap-1 grid-cols-1">
          <div>
            <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
              E-mail
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
              รหัสผ่าน
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              placeholder="ระบุรหัสผ่าน"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
              ยืนยันรหัสผ่าน
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              placeholder="ยืนยันรหัสผ่าน"
              required
              className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
            onClick={(e) => handleSubmit(e)}
          >
            แก้ไขข้อมูล
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ManageUserModal;
