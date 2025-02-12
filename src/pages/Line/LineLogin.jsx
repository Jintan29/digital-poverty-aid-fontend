import React, { useEffect, useState } from "react";
import liff from "@line/liff";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../config";

const LineLogin = () => {
  const [userInfo, setUserInfo] = useState(null);

  const [formData, setFormData] = useState({
    userId: "",
    house_code: "",
  });

  //assign userId
  useEffect(() => {
    if (userInfo) {
      handleInputChange("userId", userInfo.userId);
    }
  }, [userInfo]);

  const handleInputChange = (field, value) => {
    const updateData = { ...formData };
    updateData[field] = value;
    setFormData(updateData);
  };

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
      const resAPI = await axios.post(config.line_api_path+'api/line-oa/login',formData)
      if (resAPI.data.message === 'success') {
        Swal.fire({
            title: 'เข้าสู่ระบบ',
            text: 'เข้าสู่ระบบสำเร็จ',
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
            <div className="text-xl font-semibold mb-2">เข้าสู่ระบบ</div>

            <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
              <div>
                <label
                  htmlFor="house_code"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  กรอกรหัสบ้านให้ถูกต้อง (HC-XXXX)
                </label>
                <input
                  type="text"
                  name="house_code"
                  id="house_code"
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="HC-XXXX"
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
                <span>
                  {" "}
                  หรือ{" "}
                  <Link to={"/line"} className="text-blue-500">
                    ลงทะเบียนเข้าใช้งาน
                  </Link>
                </span>
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

export default LineLogin;
