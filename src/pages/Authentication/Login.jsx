import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import Swal from "sweetalert2";

//เก็บข้อมูลลง store
import { useDispatch, useSelector } from "react-redux";
import { login as loginRedux } from "../../store/userSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.user }));

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    const updateData = { ...formData };
    updateData[field] = value;
    setFormData(updateData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(config.api_path + "/auth/login", formData);
      if (res.data.data.user.role == "" || res.data.data.user.role == null) {
        Swal.fire({
          title: "รอ การอนุมัติจากผู้ดูแลระบบ",
          icon: "warning",
        });
      } else if (
        res.data.data.user.role === "admin" ||
        res.data.data.user.role === "superAdmin"
      ) {
        alert("ลงชื่อเข้าใช้สำเร็จ");
        dispatch(
          loginRedux({
            name: res.data.data.user.username,
            role: res.data.data.user.role,
            status: res.data.data.user.status,
            token: res.data.Token,
          })
        );
        localStorage.setItem('token',res.data.Token)
      }

    } catch (err) {
      Swal.fire({
        title: "error",
        text: err.response.data.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center ">
          <div className="pt-20 hidden w-full xl:block xl:w-1/2">
            <div className="text-center mx-auto ">
              <h2 className="text-xl font-semibold">
                ดิจิทัลแพลตฟอร์มสำหรับจัดการแก้ปัญหาครัวเรือนยากจน
              </h2>
              <img src="/Logo.png" className="mx-auto" />
            </div>
          </div>

          <div className="w-full px-10 border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2 mt-5">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                ลงทะเบียนเข้าสู่ระบบ
              </h2>

              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    บัญชีผู้ใช้ (Username)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      onInvalid={(e) =>
                        e.target.setCustomValidity("กรุณากรอกชื่อผู้ใช้")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      onChange={(e) =>
                        handleInputChange("username", e.target.value)
                      }
                      required
                      placeholder="กรอกชื่อผู้ใช้"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <Icon
                        icon="material-symbols:person-rounded"
                        width="34"
                        height="34"
                      />
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    รหัสผ่าน
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      onInvalid={(e) =>
                        e.target.setCustomValidity("กรุณากรอกรหัสผ่าน")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      required
                      placeholder="กรอกรหัสผ่าน"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <Icon
                        icon="material-symbols:water-lock-outline-rounded"
                        width="34"
                        height="34"
                      />
                    </span>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <button
                    type="submit"
                    class="text-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    เข้าสู่ระบบ
                  </button>

                  <div className="mt-3">
                    ยังไม่มีบัญชีผู้ใช้ ?
                    <Link to={"/register"} className="mx-3 text-sky-700">
                      ลงทะเบียน 
                    </Link>
                    <br />
                     หรือ 
                     <Link to={"/forgot-pass"} className="ml-3 text-sky-700">
                      ลืมรหัสผ่าน
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
