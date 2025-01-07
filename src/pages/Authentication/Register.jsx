import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../config";
import { useSelector } from "react-redux";

const Register = () => {
  const { user } = useSelector((state) => ({ ...state }));
  console.log(user);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confimePassword: "",
    title:'นาย',
    fname:'',
    lname:'',
    phone: "",
    status: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    const updateData = { ...formData };
    updateData[field] = value;
    setFormData(updateData);
  };

 
  const validation = () => {
    if (formData.password !== formData.confimePassword) {
      Swal.fire({
        icon: "warning",
        title: "รหัสผ่านไม่ตรงกัน",
        text: "กรุณากรอกรหัสผ่านกับยืนยันรหัสผ่านให้ตรงกัน",
      });
      return false;
    }
    if(formData.phone.length <10){
      Swal.fire({
        title:'เบอร์โทรไม่ถูกต้อง',
        text:'กรุนากรอกรให้ครบ 10 หลัก',
        icon:'warning'
      })

      return false
    }

    if(formData.status ===''){
      Swal.fire({
        title:'กรอกข้อมูลไม่ครบ',
        text:'กรุณาเลือกบทบาท',
        icon:'warning'
      })

      return false
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validation()) {
      return;
    }

    Swal.fire({
      title: "ยืนยันการสมัครสมาชิก",
      text: "โปรดตรวจสอบข้อมูลของท่านให้ถูกต้องการยืนยัน",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    })
      .then(async (res) => {
        if (res.isConfirmed) {
          try {
            const { confimePassword, ...payload } = formData; // แยกเอา confirm pass ออก

            const result = await axios.post(
              config.api_path + "/user/register",
              payload
            );
            if (result.data.message === "success") {
              Swal.fire({
                title: "สมัครสมาชิคสำเร็จ",
                icon: "success",
                text: "โปรดรอการยืนยันจากผู้ดูแลระบบ",
                confirmButtonText: "เสร็จสิ้น",
              });

              navigate("/login");
            }
          } catch (err) {
            Swal.fire({
              title: "error",
              text: err.response.data.message,
              icon: "error",
            });
          }
        }
      })
      .catch((err) => {
        throw err.response.data;
      });
  };
  const role = [
    "อสม",
    "อพม",
    "พอช",
    "ผู้ใหญ่บ้าน",
    "ทีมวิจัย",
    "ศึกษาธิการจังหวัด",
    "พมจ",
    "พช",
  ];

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-start  ">
          <div className="hidden w-full xl:block xl:w-1/2 mt-8">
            <div className="text-center mx-auto mt-5">
              <h2 className="text-xl font-semibold">
                ดิจิทัลแพลตฟอร์มสำหรับจัดการแก้ปัญหาครัวเรือนยากจน
              </h2>
              <img src="/Logo.png" className="mx-auto" />
            </div>
          </div>

          <div className="w-full px-10 border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2 mt-5">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                สมัครสมาชิค
              </h2>

              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    อีเมลล์
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                      onInvalid={(e) =>
                        e.target.setCustomValidity("กรุณากรอกข้อมูลให้ครบ")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      required
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="กรอกอีเมลล์"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <Icon
                        icon="material-symbols:mail-outline-rounded"
                        width="34"
                        height="34"
                      />
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    บัญชีผู้ใช้ (Username)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("กรุณากรอกข้อมูลให้ครบ")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      onChange={(e) =>
                        handleInputChange("username", e.target.value)
                      }
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
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("กรุณากรอกข้อมูลให้ครบ")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
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

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    ยืนยันรหัสผ่าน
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("กรุณากรอกข้อมูลให้ครบ")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      onChange={(e) =>
                        handleInputChange("confimePassword", e.target.value)
                      }
                      placeholder="กรอกรหัสผ่านอีกครั้ง"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <Icon
                        icon="material-symbols:shield-lock-outline-rounded"
                        width="34"
                        height="34"
                      />
                    </span>
                  </div>
                </div>

                <div className="relative rounded-md shadow-sm mb-6">
                  <label
                    className="mb-2.5 block font-medium text-black dark:text-white"
                  >
                    ชื่อจริง
                  </label>

                  {/* Select ตัวเลือก */}
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-7">
                    <select
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      className="border border-transparent bg-transparent text-gray-500 text-sm focus:ring-0 focus:outline-none w-20 py-3 focus:border-gray-500 focus:rounded-md"
                    >
                      <option>นาย</option>
                      <option>นาง</option>
                      <option>นางสาว</option>
                    </select>
                  </div>

                  {/* Input ช่องกรอก */}
                  <input
                    onChange={(e) =>
                      handleInputChange("fname", e.target.value)
                    }
                    required
                    onInvalid={(e) =>
                      e.target.setCustomValidity("กรุณากรอกข้อมูลให้ครบ")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    type="text"
                    placeholder="กรอกชื่อจริง"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-24 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />

                  <span className="absolute right-4 top-4 mt-6">
                    <Icon
                      icon="material-symbols:person-rounded"
                      width="34"
                      height="34"
                    />
                  </span>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    นามสกุล
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      onChange={(e) =>
                        handleInputChange("lname", e.target.value)
                      }
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("กรุณากรอกข้อมูลให้ครบ")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      placeholder="กรอกนามสกุล"
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
                    เบอร์โทรศัพท์
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("กรุณากรอกข้อมูลให้ครบ")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="กรอกเบอร์โทรศัพท์"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <Icon
                        icon="material-symbols:phonelink-ring-rounded"
                        width="34"
                        height="34"
                      />
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    เลือกบทบาทของคุณ
                  </label>
                  <div className="relative">
                    <select
                      id="countries"
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("กรุณากรอกข้อมูลให้ครบ")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
                      }
                      class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option selected>เลือกบทบาท</option>
                      {role.map((e, i) => (
                        <option key={i} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button
                    type="submit"
                    class="text-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    ลงทะเบียน
                  </button>

                  <div className="mt-3">
                    กรณีมีบัญีอยู่แล้ว
                    <Link to={"/login"} className="ml-3 text-sky-700">
                      เข้าสู่ระบบ
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

export default Register;
