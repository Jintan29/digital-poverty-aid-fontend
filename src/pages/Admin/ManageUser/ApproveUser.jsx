import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import config from "../../../config";
import { Icon } from "@iconify/react";

const ApproveUser = () => {
  const [users, setUsers] = useState([]);

  const roles = {
    Admin: {
      statuses: ["อสม", "อพม", "พอช", "ผู้ใหญ่บ้าน"],
      displayName: "Admin",
      color: "blue",
    },
    SuperAdmin: {
      statuses: ["ทีมวิจัย", "ศึกษาธิการจังหวัด", "พมจ", "พช"],
      displayName: "SuperAdmin",
      color: "green",
    },
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get(
        config.api_path + "/user/findNonAppove",
        config.headers()
      );
      setUsers(res.data.results);
      console.log(users);
    } catch (err) {
      Swal.fire({
        title: "error",
        icon: "error",
        text: err.response?.data?.message || err.message || "เกิดข้อผิดพลาด",
      });
    }
  };

  const approveUser = async (id) => {
    try {
      const res = await axios.get(
        `${config.api_path}/user/findOne/${id}`,
        config.headers()
      );
      const userData = res.data.user;

      // หาบทบาทของผู้ใช้
      let userRole = null; //{}

      for (const key in roles) {
        if (roles[key].statuses.includes(userData.status)) {
          userRole = roles[key]; //ได้ {Admin:{}} || {SuperAdmin:{}}
          break;
        }
      }

      if (!userRole) {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "ไม่พบบทบาทของผู้ใช้",
        });
        return;
      }

      // แสดง SweetAlert ยืนยันการอนุมัติ
      const { isConfirmed } = await Swal.fire({
        title: "อนุมัติการลงทะเบียน",
        html: `ยืนยันการอนุมัติให้สิทธิ์ <strong style="color: ${userRole.color};">${userRole.displayName}</strong> กับ ${userData.fname} ใช่หรือไม่`,
        icon: "question",
        showConfirmButton: true,
        confirmButtonText: "ยืนยัน",
        showCancelButton: true,
        cancelButtonText: "ยกเลิก",
      });

      if (isConfirmed) {
        const approveRes = await axios.put(
          `${config.api_path}/user/approve/${id}`,
          null,
          config.headers()
        );

        if (approveRes.data.message === "success") {
          Swal.fire({
            title: "อนุมัติเข้าใช้งาน",
            text: "ทำการอนุมัติสำเร็จ",
            icon: "success",
            showConfirmButton: false,
            timer: 2500,
          });
          loadData(); // รีโหลดข้อมูลหลังจากอนุมัติ
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: approveRes.data.message || "การอนุมัติไม่สำเร็จ",
          });
        }
      }
    } catch (err) {
      Swal.fire({
        title: "error",
        text: err.response?.data?.message || err.message || "เกิดข้อผิดพลาด",
        icon: "error",
      });
    }
  };

  const deleteUser = async (user) => {
    try {
      const res = await Swal.fire({
        title: "ลบผู้ใช้งานระบบ",
        html: `ต้องการลบผู้ใช้งาน <b>${user.fname}</b> ใช่หรือไม่`,
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      });

      if (res.isConfirmed) {
        const resDel = await axios.delete(
          config.api_path + `/user/delete/${user.id}`,
          config.headers()
        );
        if (resDel.data.message === "User deleted") {
          Swal.fire({
            title: "ลบผู้ใช้งานระบบเสร็จสิ้น",
            icon: "success",
            timer: 1500,
          });
          loadData();
        }
      }
      // await axios.delete(config.api_path + `/user/findOne/${id}`)
    } catch (err) {
      Swal.fire({
        title: "error",
        text: err.response?.data?.message || err,
        icon: "error",
      });
    }
  };

  return (
    <>
      {users.length > 0 ? (
        <>
          <div className="mx-3 my-3">
            <h2 className="text-2xl font-semibold">อนุมัติผู้ใช้งานใหม่</h2>
          </div>
          <div class="relative mt-9 overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    ชื่อผู้ใช้งาน
                  </th>
                  <th scope="col" class="px-6 py-3">
                    ชื่อจริง
                  </th>
                  <th scope="col" class="px-6 py-3">
                    นามสกุล
                  </th>
                  <th scope="col" class="px-6 py-3">
                    อีเมลล์
                  </th>
                  <th scope="col" class="px-6 py-3">
                    สถานะ
                  </th>
                  <th scope="col" class="px-6 py-3">
                    อนุมัติ
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td class="px-6 py-4">{user.username}</td>
                    <td class="px-6 py-4">{user.fname}</td>
                    <td class="px-6 py-4">{user.lname}</td>
                    <td class="px-6 py-4">{user.email}</td>
                    <td class="px-6 py-4">{user.status}</td>
                    <td class="px-6 py-4">
                      <div className="flex justify-start">
                        <button
                          type="button"
                          onClick={(e) => approveUser(user.id)}
                          class="text-white w-15 h-10 bg-emerald-500 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          <Icon
                            icon="material-symbols:check-rounded"
                            className="w-4 h-4 font-bold"
                          />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => deleteUser(user)}
                          class="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                          <Icon icon="material-symbols:close-rounded" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="mx-3 my-3">
            <p className="text-center text-gray-500">
              ขณะนี้ไม่มีผู้สมัครเข้าสู่ระบบ
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default ApproveUser;
