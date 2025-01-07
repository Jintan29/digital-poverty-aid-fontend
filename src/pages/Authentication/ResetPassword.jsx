import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import config from "../../config";

const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate()

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const validatePass = () => {
    if (password !== password2) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    handleCheckToken();
  }, []);

  const handleCheckToken = async () => {
    try {
      const res = await axios.get(
        config.api_path + `/mail/reset-password/${id}/${token}`
      );
      if (res.status === 200) {
        return;
      }
    } catch (err) {
      navigate('/login')
      Swal.fire({
        title: "errors",
        text: err.response?.data?.message || err,
        icon: "error",
      });
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!validatePass()) {
        Swal.fire({
          title: "รหัสผ่านไม่ตรงกัน",
          icon: "warning",
        });

        return;
      } else {
        const res = await axios.post(
          config.api_path + `/mail/reset-password/${id}/${token}`,
          { password: password }
        );

        if (res.status === 200) {
          Swal.fire({
            title: "เปลี่ยนรหัสผ่าน",
            text: "เปลี่ยนรหัสผ่านสำเร็จ",
            icon: "success",
          });
          navigate('/login')
        }
      }
    } catch (err) {
      Swal.fire({
        title: "errors",
        text: err.response?.data?.message || err,
      });
    }
  };
  return (
    <>
      <div className="mx-10 my-10 ">
        <div className="flex flex-col items-center justify-center my-4 ">
          <h2 className="text-2xl  font-semibold mb-3">เปลี่ยนรหัสผ่าน</h2>
          <span>กรอกข้อมูลรหัสผ่านและยืนยันรหัสผ่านให้ตรงกัน</span>
        </div>

        <form className="max-w-sm mx-auto" onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
              รหัสผ่าน
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
              ยืนยันรหัสผ่าน
            </label>
            <input
              type="password"
              onChange={(e) => setPassword2(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            เปลี่ยนรหัส
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
