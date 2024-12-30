import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import config from "../../../config";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";

const ManageUser = () => {
  
  const [users, setUsers] = useState([]); // []

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get(config.api_path + "/user/list",config.headers());
      setUsers(res.data.user);
    } catch (err) {
      Swal.fire({
        title: "error",
        icon: "error",
        text: err,
      });
    }
  };

  return (
    <>
      <div className="mx-3 my-5">
        <h2 className="text-2xl font-semibold">จัดการผู้ใช้งานระบบ</h2>
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
                บทบาท
              </th>
              <th scope="col" class="px-6 py-3">
                สถานะ
              </th>
              <th scope="col" class="px-6 py-3">
                แก้ไขข้อมูล
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.username}
                </th>
                <td class="px-6 py-4">{user.fname}</td>
                <td class="px-6 py-4">{user.lname}</td>
                <td class="px-6 py-4">{user.email}</td>
                <td class="px-6 py-4"><span className={user.role === 'superAdmin' ? 'bg-yellow-100 text-red-500 text-sm font-semibold me-2 px-2.5 py-0.5 rounded ' : 'bg-green-100 text-green-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded'}>{user.role}</span></td>
                <td class="px-6 py-4">{user.status}</td>
                <td class="px-6 py-4">
                  <div className="flex justify-start">
                    <button
                      type="button"
                      class="text-white w-15 h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      <Icon icon="material-symbols:edit-rounded" />
                    </button>

                    <button
                      type="button"
                      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      <Icon icon='material-symbols:delete-rounded' /> 
                    </button>
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUser;