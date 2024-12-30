import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import config from "../../config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      //return console.log(email);
      const res = await axios.post(config.api_path + "/mail/forgot-password", {
        email: email,
      });

      if (res.status === 200) {
        Swal.fire({
          title: "ส่งอีเมลล์สำเร็จ",
          text: "กรุณาตรวจสอบอีเมลล์ของท่าน",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "ปิด",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "error",
        text: err.response?.data?.message || err,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="mx-10 my-10 ">
        <div className="flex flex-col items-center justify-center my-4 ">
          <h2 className="text-2xl  font-semibold mb-3">ลืมรหัสผ่าน</h2>
          <span>
            ระบบจะทำการส่งลิงค์ไปที่อีเมลล์ของคุณเพื่อทำการเปลี่ยนรหัสผ่าน
          </span>
        </div>

        <form className="max-w-sm mx-auto" onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-5">
            <label
              for="email"
              className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              กรอกอีเมลล์
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
              font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 
              ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading} // ปิดการใช้งานเมื่อกำลังโหลด
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                กำลังประมวลผล...
              </div>
            ) : (
              "ส่งลิงค์"
            )}
          </button>

        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
