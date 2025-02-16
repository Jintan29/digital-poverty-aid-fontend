import React, { useEffect, useState } from "react";
import liff from "@line/liff";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../config"
import { Link } from "react-router-dom";

const LineRegister = () => {
  const [userInfo, setUserInfo] = useState(null);

  const [formData, setFormData] = useState({
    userId: "",
    fname:'',
    lname:'',
    house_code: "",
  });

  const handleInputChange = (field, value) => {
    const updateData = { ...formData };
    updateData[field] = value;
    setFormData(updateData);
  };

  useEffect(()=>{
    if(userInfo){
      handleInputChange('userId',userInfo.userId)
    }
  },[userInfo])

  useEffect(() => {
    initLiff();
  }, []);

  const initLiff = async () => {
    try {
      await liff.init({ liffId: config.line_liff_id });

      // Check if the user is logged in
      if (liff.isLoggedIn()) {
        // Get user profile info after login
        const profile = await liff.getProfile();
        setUserInfo({
          displayName: profile.displayName,
          userId: profile.userId,
          pictureUrl: profile.pictureUrl,
        });
      } else {
        // Handle login state if not logged in
        liff.login();
      }
    } catch (error) {
      console.error("Error initializing LIFF:", error);
    }
  };


  const handleSubmit = async(e)=>{
    e.preventDefault()

    try{
      // กลับมาเปลี่ยน doamin ด้วย
      const resAPI = await axios.post(config.line_api_path+'api/line-oa/register',formData)
      if (resAPI.data.message === 'success') {
        Swal.fire({
            title: 'บันทึกข้อมูล',
            text: 'บันทึกข้อมูลสำเร็จ',
            icon: 'success',
            showConfirmButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                // ปิดหน้าจอ
                liff.closeWindow();
            }
        });
    }

    }catch(err){
      Swal.fire({
        title:'error',
        text:err.response?.data?.message || err.message,
        icon:'error'
      })
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {userInfo ? (
          <div className="text-center">
            <img
              src={userInfo.pictureUrl}
              alt="Profile"
              className="mx-auto rounded-full mb-4"
              style={{ width: "100px", height: "100px" }}
            />
            <div className="text-xl font-semibold mb-2">ลงทะเบียนเข้าใช้งานระบบ</div>
  
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
              <div>
                <label
                  htmlFor="house_code"
                  className="block text-sm text-start mt-3 font-medium text-gray-900 dark:text-white"
                >
                  กรอกรหัสบ้านให้ถูกต้อง (HC-XXXX)
                </label>
                <input
                  type="text"
                  name="house_code"
                  id="house_code"
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="HC-XXXX"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="house_code"
                  className="block text-sm text-start mt-3 font-medium text-gray-900 dark:text-white"
                >
                  ชื่อจริง (ไม่ต้องกรอกคำนำหน้าชื่อ)
                </label>
                <input
                  type="text"
                  name="fname"
                  id="house_code"
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="ชื่อจริง"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="house_code"
                  className="block text-sm text-start mt-3 font-medium text-gray-900 dark:text-white"
                >
                  นามสกุล
                </label>
                <input
                  type="text"
                  name="lname"
                  id="house_code"
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="นามสกุล"
                  required
                />
              </div>
  
              <div className="">
                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-2 my-2 rounded-lg hover:bg-blue-800 transition duration-300 focus:outline-none"
                >
                  บันทึกข้อมูล
                </button>
                <span> หรือ <Link to={'/line-login'} className="text-blue-500">เข้าสู่ระบบ</Link> </span>
              </div>
            </form>
          </div>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  );
};

export default LineRegister;
