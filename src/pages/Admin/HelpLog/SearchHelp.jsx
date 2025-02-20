import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";
import config from "../../../config";
import axios from "axios";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { Button, IconButton, Card, CardFooter } from "@material-tailwind/react";
import { Link } from "react-router-dom";
dayjs.extend(buddhistEra);
dayjs.locale("th");


const SearchHelp = () => {
  //form data
  const [formData, setFormData] = useState({
    district: null,
    subdistrict: null,
    year: null,
    national_id: null,
    house_code: null,
    fname: null,
  });
  //paginate
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const [members, setMembers] = useState([]);
  const [showTable, setShowTable] = useState(false); //แสดงตาราง

  // ตัวเลือก"ตำบล"ของอำเภอ
  const subdistrictOptions = {
    เมืองพิษณุโลก: [
      "ในเมือง",
      "วังน้ำคู้",
      "วัดจันทร์",
      "วัดพริก",
      "ท่าทอง",
      "ท่าโพธิ์",
      "สมอแข",
      "ดอนทอง",
      "บ้านป่า",
      "ปากโทก",
      "หัวรอ",
      "จอมทอง",
      "บ้านกร่าง",
      "บ้านคลอง",
      "พลายชุมพล",
      "มะขามสูง",
      "อรัญญิก",
      "บึงพระ",
      "ไผ่ขอดอน",
      "งิ้วงาม",
    ],
    นครไทย: [
      "นครไทย",
      "หนองกะท้าว",
      "บ้านแยง",
      "เนินเพิ่ม",
      "นาบัว",
      "นครชุม",
      "น้ำกุ่ม",
      "ยางโกลน",
      "บ่อโพธิ์",
      "บ้านพร้าว",
      "ห้วยเฮี้ย",
    ],
    เนินมะปราง: [
      "ชมพู",
      "บ้านมุง",
      "ไทรย้อย",
      "วังโพรง",
      "บ้านน้อยซุ้มขี้เหล็ก",
      "เนินมะปราง",
      "วังยาง",
    ],
    ชาติตระการ: [
      "ป่าแดง",
      "ชาติตระการ",
      "สวนเมี่ยง",
      "บ้านดง",
      "บ่อภาค",
      "ท่าสะแก",
    ],
    บางกระทุ่ม: [
      "บางกระทุ่ม",
      "บ้านไร่",
      "โคกสลุด",
      "สนามคลี",
      "ท่าตาล",
      "ไผ่ล้อม",
      "นครป่าหมาก",
      "เนินกุ่ม",
      "วัดตายม",
    ],
    บางระกำ: [
      "บางระกำ",
      "ปลักแรด",
      "พันเสา",
      "วังอิทก",
      "บึงกอก",
      "หนองกุลา",
      "ชุมแสงสงคราม",
      "นิคมพัฒนา",
      "บ่อทอง",
      "ท่านางงาม",
      "คุยม่วง",
    ],
    พรหมพิราม: [
      "พรหมพิราม",
      "ท่าช้าง",
      "วงฆ้อง",
      "มะตูม",
      "หอกลอง",
      "ศรีภิรมย์",
      "ตลุกเทียม",
      "วังวน",
      "หนองแขม",
      "มะต้อง",
      "ทับยายเชียง",
      "ดงประคำ",
    ],
    วังทอง: [
      "วังทอง",
      "พันชาลี",
      "แม่ระกา",
      "บ้านกลาง",
      "วังพิกุล",
      "แก่งโสภา",
      "ท่าหมื่นราม",
      "วังนกแอ่น",
      "หนองพระ",
      "ชัยนาม",
      "ดินทอง",
    ],
    วัดโบสถ์: ["วัดโบสถ์", "ท่างาม", "ท้อแท้", "บ้านยาง", "หินลาด", "คันโช้ง"],
  };

  // กำหนดข้อมูลสำหรับหัวตาราง
  const TABLE_HEAD = [
    "ปีที่สำรวจ",
    "ชื่อ-นามสกุล",
    "HC",
    "จำนวสมาชิก",
    "ที่อยู่",
    "บันทึกการช่วยเหลือ",
  ];

  //ข้อมูลปีย้อนหลัง 5 ปี
  const [arrYear, setArrYear] = useState(() => {
    let arr = [];
    const myDate = new Date();
    let currentYear = myDate.getFullYear();
    let yearBefore = currentYear - 5;

    for (let i = currentYear; i > yearBefore; i--) {
      arr.push(i);
    }
    return arr;
  });

  // อัปเดตค่าเมื่อมีการเปลี่ยนแปลง input
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // ถ้าเป็นค่าว่าง ให้เก็บเป็น null (หรือค่าว่างก็ได้ ขึ้นอยู่กับการใช้งาน)
    if (value === "") {
      newValue = null;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
      ...(name === "district" && { subdistrict: null }), // รีเซ็ตค่า Dropdown ตำบลเมื่อเปลี่ยนอำเภอ
    }));
  };

  //เปลี่ยนหน้า
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  //ดึงข้อมูลใหม่ตามการเปลี่ยน page
  useEffect(() => {
    loadData();
  }, [currentPage]);

  const loadData = async () => {
    try {
      const resApi = await axios.get(
        config.api_path + "/help-member/member/search",
        {
          params: {
            //search
            district: formData.district,
            subdistrict: formData.subdistrict,
            year: formData.year,
            national_id: formData.national_id,
            house_code: formData.house_code,
            fname: formData.fname,
            //paginate
            page: currentPage,
            limit,
          },
          ...config.headers(),
        }
      );
      console.log(resApi);

      setMembers(resApi.data.results);
      setTotalPages(resApi.data.totalPage);
    } catch (err) {
      Swal.fire({
        title: "error",
        text: err.response?.data?.message || err.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="justify-center mb-2">
      <div className="col-span-2 w-full p-10 mt-8 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-medium mb-2">อำเภอ</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl"
            >
              {/* Dropdown */}
              <option value="">-กรุณาเลือกอำเภอ-</option>
              <option>เมืองพิษณุโลก</option>
              <option>นครไทย</option>
              <option>เนินมะปราง</option>
              <option>ชาติตระการ</option>
              <option>บางกระทุ่ม</option>
              <option>บางระกำ</option>
              <option>พรหมพิราม</option>
              <option>วัดโบสถ์</option>
              <option>วังทอง</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">ตำบล</label>
            <select
              name="subdistrict"
              value={formData.subdistrict}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl"
            >
              <option>กรุณาเลือกตำบล</option>
              {formData.district &&
                subdistrictOptions[formData.district].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">ปีที่สำรวจ</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl"
            >
              <option value="">-กรุณาเลือกปีที่สำรวจ-</option>
              {arrYear.map((item) => (
                <option value={item}>{item + 543}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">
              รหัสบ้าน (HC)
            </label>
            <input
              type="text"
              name="house_code"
              value={formData.house_code}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl"
              placeholder="รหัสบ้าน (HC)"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">
              รหัสบัตรประชาชน
            </label>
            <input
              type="text"
              name="national_id"
              value={formData.national_id}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl"
              placeholder="รหัสบัตรประชาชน"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">ชื่อ</label>
            <input
              type="text"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl"
              placeholder="ไม่ต้องใส่คำหน้าชื่อ"
            />
          </div>
        </div>

        <div className="mt-4 ">
          <button
            onClick={() => {
              loadData();
              setShowTable(true);
            }}
            className="flex items-center px-4 py-2 border border-blue-500 text-blue-500 text-sm rounded-md hover:bg-blue-500 hover:text-white transition"
          >
            <Icon icon="heroicons-solid:search" className="mr-2" />
            แสดงรายชื่อ
          </button>
        </div>

        <div className="my-4 text-blue-500 ">
          **คำอธิบายเพิ่มเติม
        </div>
        <div className="flex items-start">
          <button className="p-2  rounded-full  flex text-green-500 " disabled>
            <Icon icon="heroicons-solid:search" className="mr-2 mt-1 text-sm" />
            ได้รับการช่วยเหลือแล้ว
          </button>

          <button className="p-2  rounded-full  ml-3 flex  text-red-500" disabled>
            <Icon icon="heroicons-solid:search" className="mr-2 mt-1 text-sm" />
            ยังไม่เคยได้รับการช่วยเหลือ
          </button>
        </div>
      </div>

      {/* แสดงตารางถ้า showTable เป็น true */}
      {showTable && (
        <Card className="w-full  overflow-y-scroll mt-8 flex justify-center items-center ">
          <table className="w-full min-w-max table-auto text-center">
            {/* ส่วนหัวของตาราง */}
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center"
                  >
                    <Typography
                      variant="base"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            {/* ข้อมูลในตาราง */}
            <tbody>
              {members.length > 0 ? (
                members.map((member) => (
                  <tr key={member.id} className="even:bg-blue-gray-50/50">
                    <td className="p-4 text-center">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {dayjs(member.createdAt).format("BBBB")}
                      </Typography>
                    </td>
                    <td className="p-4 text-center">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {member.title} {member.fname} {member.lname}
                      </Typography>
                    </td>
                    <td className="p-4 text-center">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {member.Household?.house_code}
                      </Typography>
                    </td>
                    <td className="p-4 text-center">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {member.memberCount}
                      </Typography>
                    </td>
                    <td className="p-4 text-center">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {member.Household?.house_number} ต.
                        {member.Household?.subdistrict} อ.
                        {member.Household?.district} จ.
                        {member.Household?.province}{" "}
                        {member.Household?.postcode}
                      </Typography>
                    </td>
                    <td className="p-4 text-center">
                    <Link
                    to={`/admin/helpLog/${member.id}`}
                    >
                      <button
                         className={`${
                          member.helpStatus==='ได้รับการช่วยเหลือแล้ว' 
                          ? 'text-green-500 hover:bg-green-300 bg-green-200 p-2 rounded-full'
                          :' text-red-500 hover:bg-red-300 bg-red-200 p-2 rounded-full'
                        }`}
                        // className="p-2 bg-gray-200 rounded-full hover:bg-gray-300" 
                      >
                        
                        <Icon icon="heroicons-solid:search" />
                      </button>
                    </Link>
                      
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    ไม่พบข้อมูล
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <IconButton
                  key={index + 1}
                  variant={currentPage === index + 1 ? "outlined" : "text"}
                  size="sm"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </IconButton>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outlined"
                className="ml-2"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ก่อนหน้า
              </Button>
              <Button
                variant="outlined"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                ถัดไป
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default SearchHelp;
