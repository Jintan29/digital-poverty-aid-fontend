import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";
import config from "../../../config";
import axios from "axios";
import { Button, IconButton, Card, CardFooter } from "@material-tailwind/react";
import { Link } from "react-router-dom";


const SearchMember = () => {
  const [formData, setFormData] = useState({
    district: null,
    subdistrict: null,
    national_id: null,
    fname: null,
  });

  //paginate
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const [members, setMembers] = useState([]);
  const [showTable, setShowTable] = useState(false); //แสดงตาราง
  const [openMenuIndex, setOpenMenuIndex] = useState(null); //menu icon

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
    "ชื่อ-นามสกุล",
    "ที่อยู่",
    "อายุ",
    "เบอร์โทร",
    "รหัสบ้าน",
    " ",
  ];

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

  const validate = () => {
    const { district, subdistrict, national_id, fname } = formData;

    if (district || subdistrict || national_id || fname) {
      return true;
    } else {
      Swal.fire({
        icon: "warning",
        title: "เลือกกรอกข้อมูลไม่ถูกต้อง",
        text: "เลือกกรอกข้อมูลเพื่อค้นหาอย่างน้อย 1 ข้อมูล",
      });
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //ต้องเลือกกรอกข้อมูลอย่างน้อย 1 ช่อง
    if (!validate()) {
      return;
    }
    loadData();
    setShowTable(true);
  };

  //เปิดปิดเมนู
  const handleMenuToggle = (index) => {
    if (openMenuIndex === index) {
      // ถ้ากดที่แถวเดิม ให้ปิด menu
      setOpenMenuIndex(null);
    } else {
      setOpenMenuIndex(index);
    }
  };

  // ติดตามการกดนอก menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
        config.api_path + "/member-household/searchMemberForTrcking",
        {
          params: {
            //search
            district: formData.district,
            subdistrict: formData.subdistrict,
            national_id: formData.national_id,
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
      setTotalPages(resApi.data.totalPages);
    } catch (err) {
      Swal.fire({
        title: "error",
        text: err.response?.data?.message || err.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-semibold">ระบบติดตามรายบุคคล</h2>

        <ul class="text-base space-y-1 text-gray-900 list-disc list-inside dark:text-gray-400 mt-4">
          <li>กรอกข้อมูลเพื่อค้นหาสมาชิกครัวเรือน</li>
        </ul>
      </div>

      {/* SeachCard */}
      <div className="col-span-2 w-full p-10 mt-4 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4">
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
        </div>

        <div className="mt-4 ">
          <button
            onClick={(e) => handleSubmit(e)}
            className="flex items-center px-4 py-2 border border-blue-500 text-blue-500 text-sm rounded-md hover:bg-blue-500 hover:text-white transition"
          >
            <Icon icon="heroicons-solid:search" className="mr-2" />
            ค้นหา
          </button>
        </div>

        <div className="my-4 text-blue-500 ">**คำอธิบายเพิ่มเติม</div>
        <div className="flex items-start text-red-500">
          เลือกกรอกข้อมูลอย่างน้อย 1 ช่อง{" "}
        </div>
      </div>

      {/* Table */}
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
                members.map((member, index) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
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
                        {member.Household?.house_number} ต.
                        {member.Household?.subdistrict} อ.
                        {member.Household?.district} จ.
                        {member.Household?.province}{" "}
                        {member.Household?.postcode}
                      </Typography>
                    </td>

                    <td className="p-4 text-center">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {member.calculatedAge} ปี
                      </Typography>
                    </td>

                    <td className="p-4 text-center">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {member.phone}
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
                      <button
                        onClick={() => handleMenuToggle(index)}
                        className={`text-slate-500 hover:bg-slate-300 bg-slate-200 p-2 rounded-full`}
                      >
                        <Icon icon="heroicons-solid:search" />
                      </button>

                      {openMenuIndex === index && (
                        <div className="absolute right-0 mt-2 py-2 w-40 bg-white rounded-md shadow-xl z-20">
                          <Link
                            to={`/admin/track-member/${member.id}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            ดูข้อมูลรายบุคคล
                          </Link>
                          <Link
                            to={`/admin/track-household/${member.Household?.id}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            ดูข้อมูลครัวเรือน
                          </Link>
                        </div>
                      )}
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
    </>
  );
};

export default SearchMember;
