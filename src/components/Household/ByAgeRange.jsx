"use client";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../config";
import { Link } from "react-router-dom";

const ByAgeRange = () => {
  const [selectedAgeRange, setSelectedAgeRange] = useState(""); // เก็บค่าช่วงอายุที่เลือก
  const [openMenuIndex, setOpenMenuIndex] = useState(null); //menu icon

  const [members, setMembers] = useState([]);
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(0);
  //Paginate
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 30;

  const ageRanges = [
    "ต่ำกว่า 15 ปี",
    "15-25 ปี",
    "26-36 ปี",
    "36-46 ปี",
    "46 ปีขึ้นไป",
  ];

  //PDF
  const exportToPDF = () => {
    const content = document.getElementById("table-content"); // ดึงเฉพาะตาราง
    if (!content) return; // ตรวจสอบว่าได้ดึงข้อมูลมาแล้ว

    const title = `สมาชิกครัวเรือนยากจนตามช่วงอายุ ${selectedAgeRange}`;

    html2canvas(content, {
      scale: 2, // เพิ่มความคมชัด
      useCORS: true, // รองรับการใช้งาน cross-origin
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // สร้าง PDF ขนาด A4
      const imgWidth = 190; // ความกว้างของรูป
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let position = 12; // จุดเริ่มต้น

      // เพิ่มหัวข้อก่อนตาราง
      pdf.setFont("Sarabun-Regular", "normal");
      pdf.setFontSize(14);
      pdf.text(
        title,
        pdf.internal.pageSize.width / 2,
        position,
        null,
        null,
        "center"
      ); // เพิ่มชื่อหัวข้อในเอกสาร PDF
      position += 5; // เพิ่มระยะห่างระหว่างหัวข้อและตาราง

      // เพิ่มรูปภาพของตาราง
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      pdf.save(`${title}.pdf`); // ใช้ชื่อหัวข้อเป็นชื่อไฟล์ PDF
    });
  };

  const handleAgeRange = (range) => {
    switch (range) {
      case "ต่ำกว่า 15 ปี":
        setMinAge(0);
        setMaxAge(14);
        break;

      case "15-25 ปี":
        setMinAge(15);
        setMaxAge(25);
        break;
      case "26-36 ปี":
        setMinAge(26);
        setMaxAge(36);
        break;
      case "36-46 ปี":
        setMinAge(36);
        setMaxAge(46);
        break;
      case "46 ปีขึ้นไป":
        setMinAge(46);
        setMaxAge(100);
        break;
      default:
        setMinAge(0);
        setMaxAge(0);
    }
    setCurrentPage(1);
  };

  const handleFetchMembers = async (minAge, maxAge, page) => {
    try {
      const response = await axios.get(
        config.api_path + `/member-household/findByAge/${minAge}/${maxAge}`,
        {
          params: {
            page,
            limit,
          },
          ...config.headers(),
        }
      );
      setMembers(response.data.results);
      setCurrentPage(response.data.currentPage); //Paginate
      setTotalPages(response.data.totalPages);
    } catch (err) {
      Swal.fire({
        title: "errors",
        icon: "error",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  const handleMenuToggle = (index) => {
    if (openMenuIndex === index) {
      // ถ้ากดที่แถวเดิม ให้ปิด menu
      setOpenMenuIndex(null);
    } else {
      setOpenMenuIndex(index);
    }
  };

  //call API when age change
  useEffect(() => {
    if (minAge >= 0 && maxAge > 0) {
      handleFetchMembers(minAge, maxAge, currentPage);
    }
  }, [minAge, maxAge, currentPage]);

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
    setCurrentPage(page);
  };

  // สร้างปุ่มเปลี่ยนหน้าตามจำนวน totalPages
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 border ${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          }`}
        >
          {i}
        </button>
      );
    }
    return <div className="flex justify-center mt-4">{pages}</div>;
  };

  return (
    <div className="p-4">
      <div className="mb-5 text-center">
        <h1 className="text-xl font-bold">
          ค้นหาสมาชิกครัวเรือนยากจน ตามช่วงอายุ
        </h1>
      </div>

      {/* Toolbar: Select & PDF Button */}
      <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
        <div className="flex items-center gap-2 w-full md:w-auto justify-center">
          <select
            value={selectedAgeRange}
            onChange={(e) => {
              setSelectedAgeRange(e.target.value);
              handleAgeRange(e.target.value);
            }}
            className="w-48 appearance-none rounded-md py-2 px-3 text-base border-2 text-black font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="">เลือกช่วงอายุ</option>
            {ageRanges.map((range) => (
              <option key={range} value={range} className="text-black">
                {range}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={exportToPDF}
            className="inline-flex items-center text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2.5"
          >
            <Icon
              icon="material-symbols:picture-as-pdf-rounded"
              width="1.5em"
              height="1.5em"
            />
            <span className="ml-2">Download</span>
          </button>
        </div>
      </div>


        <>
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table
              id="table-content"
              className="w-full text-l text-center text-gray-500 dark:text-gray-400 border-collapse"
            >
              <thead className="text-l  bg-gray-200  text-gray-900 ">
                <tr className="border-b border-gray-700 ">
                  <th scope="col" className="px-4 py-3 bg-gray-50  width: 20%">
                    ลำดับที่
                  </th>
                  <th scope="col" className="px-6 py-3 bg-gray-100  width: 30%">
                    ชื่อ-นามสกุล
                  </th>
                  <th scope="col" className="px-6 py-3 bg-gray-50  width: 20%">
                    ที่อยู่
                  </th>
                  <th scope="col" className="px-6 py-3 bg-gray-100  width: 20%">
                    อายุ
                  </th>

                  <th scope="col" className="px-6 py-3 bg-gray-50  width: 20%">
                    เบอร์โทรศัพท์
                  </th>
                  <th scope="col" className="px-6 py-3 bg-gray-50  width: 20%">
                    รหัสบ้าน
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50  width: 20%"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {members && members.length > 0 ? (
                  members.map((member, index) => (
                    // แถวของตาราง
                    <tr
                      key={index}
                      className="border-b border-gray-500 dark:border-gray-900"
                    >
                      <td className="px-6 py-3 text-black bg-gray-50">
                        {(currentPage - 1) * limit + index + 1}
                      </td>
                      <td className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap bg-gray-100 dark:text-white dark:bg-gray-900">
                        {member.title + " " + member.fname + " " + member.lname}
                      </td>
                      <td className="px-6 py-3 text-black bg-gray-50">
                        {member.Household.house_number +
                          "ต." +
                          member.Household.subdistrict +
                          " " +
                          "อ. " +
                          member.Household.district +
                          " " +
                          "จ. " +
                          member.Household.province +
                          " " +
                          member.Household.postcode}
                      </td>

                      <td className="px-6 py-3 bg-gray-100 dark:bg-gray-900 text-black">
                        {member.age} ปี
                      </td>
                      <td className="px-6 py-3 text-black bg-gray-50">
                        {member.phone}
                      </td>
                      <td className="px-6 py-3 text-black bg-gray-50">
                        {member.Household.house_code}
                      </td>

                      <td className="px-6 py-3 text-black relative bg-gray-50">
                        <div className="relative inline-block">
                          <button
                            onClick={() => handleMenuToggle(index)}
                            className="text-slate-700 hover:text-slate-900 focus:outline-none"
                          >
                            <Icon
                              icon="material-symbols:visibility-rounded"
                              width="1em"
                              height="1em"
                            />
                          </button>

                          {openMenuIndex === index && (
                            <div className="absolute right-0 mt-2 py-2 w-40 bg-white rounded-md shadow-xl z-20">
                              <Link
                                to={`/admin/track-member/${member.id}`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                ดูข้อมูลรายบุคคล
                              </Link>
                              <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                ดูข้อมูลครัวเรือน
                              </a>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-4 text-red-500 text-center">
                      ไม่พบข้อมูล
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {members.length > 0 ? <div className="">{renderPagination()}</div> : ""}
        </>
      
    </div>
  );
};

export default ByAgeRange;
