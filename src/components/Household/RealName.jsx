import React, { useCallback, useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas"; //ไลบรารีสำหรับแปลง HTML เป็นภาพ (image) เพื่อใช้สร้าง PDF
import { Icon } from "@iconify/react";
import debounce from "lodash/debounce";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../config";
import { Link } from "react-router-dom";



const RealName = () => {
  const [members, setMembers] = useState([]);

  const [openMenuIndex, setOpenMenuIndex] = useState(null); //menu icon
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fname, setFname] = useState(""); //query str
  const limit = 20;

  const fetchData = async (page, searchTerm) => {
    try {
      const response = await axios.get(
        config.api_path + `/member-household/search-by-name`,
        {
          params: {
            page: page,
            limit,
            fname: searchTerm,
          },
          ...config.headers(),
        }
      );
      setMembers(response.data.results);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      Swal.fire({
        title: "error",
        icon: "error",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  //หน่วงเวลาหลังพิมพ์เสร็จ
  const debouncedSearch = useCallback(
    debounce(async (value) => {
      setCurrentPage(1); // Reset page หากค้นใหม่
      fetchData(1, value);
    }, 500), //500 ms
    []
  );

  const handleInputChange = (value) => {
    setFname(value);
    debouncedSearch(value);
  };

  //เปลี่ยนหน้า
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page, fname);
  };

  //ปุ่ม Paginate
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

  //Menu toggle
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

  //exportToPD
  const exportToPDF = () => {
    const content = document.getElementById("table-content"); // ดึงเฉพาะตาราง
    if (!content) return; // ตรวจสอบว่าได้ดึงข้อมูลมาแล้ว

    const title = "สมาชิคครัวเรือจากชื่อจริง";

    html2canvas(content, {
      scale: 2, // เพิ่มความคมชัด
      useCORS: true, // รองรับการใช้งาน cross-origin
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // สร้าง PDF ขนาด A4
      const imgWidth = 190; // ความกว้างของรูป
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let position = 15; // จุดเริ่มต้น

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
      position += 10; // เพิ่มระยะห่างระหว่างหัวข้อและตาราง

      // เพิ่มรูปภาพของตาราง
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      pdf.save(`${title}.pdf`); // ใช้ชื่อหัวข้อเป็นชื่อไฟล์ PDF
    });
  };

  return (
    <div>
      <div className="mx-5 my-5">
        {/* ค้าหา/download */}
        <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
          <div className="flex items-center gap-2 w-full md:w-auto justify-center">
            <div className="flex mb-4 w-80 md:w-96 mt-4">
              <input
                type="search"
                id="search"
                className="flex-grow py-3 px-3 text-xs text-gray-900 border border-gray-300 rounded-l-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                placeholder="ค้นหาสมาชิก"
                value={fname}
                onChange={(e) => handleInputChange(e.target.value)}
              />
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-sm text-xs px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                ค้นหา
              </button>
            </div>

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

        {/* <!-- ตารางข้อมูล --> */}

        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table
            id="table-content"
            className=" w-full text-l text-center text-gray-500 dark:text-gray-400 border-collapse"
          >
            <thead className="text-l uppercase bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200">
              <tr className="border-b border-gray-700 dark:border-gray-900">
                <th
                  scope="col"
                  className="px-4 py-3 bg-gray-50 dark:bg-gray-800 width: 5%"
                >
                  ลำดับที่
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 bg-gray-100 dark:bg-gray-700 width: 30%"
                >
                  ข้อมูลสมาชิกครัวเรือน
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-800 width: 40%"
                >
                  ที่อยู่
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-700 width: 20% "
                >
                  รหัสบ้าน
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-800 width: 20% "
                >
                  เบอร์โทรศัพท์
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
                    {/* ลำดับที่  */}
                    <td className="px-6 py-4 text-black bg-gray-50">
                      {(currentPage - 1) * limit + index + 1}
                    </td>
                    {/* ชื่อ  */}
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-100  dark:text-white dark:bg-gray-900"
                    >
                      {member.title + " " + member.fname + " " + member.lname}
                    </th>
                    {/* ที่อยู่ */}
                    <td className="px-6 py-4 text-black bg-gray-50">
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
                    {/* เลขที่บ้าน */}
                    <td className="px-6 py-4 bg-gray-100 dark:bg-gray-900 text-black">
                      {member.Household.house_code}
                    </td>
                    {/* เบอร์โทรศัพท์ */}
                    <td className="px-6 py-4 text-black bg-gray-50">
                      {member.phone}
                    </td>

                    <td className="px-6 py-3 text-black relative bg-gray-50">
                      <div className="relative inline-block">
                        <button
                          onClick={() => handleMenuToggle(index)}
                          className="text-slate-700 hover:text-slate-900 focus:outline-none"
                        >
                          <Icon
                            icon="material-symbols:search-rounded"
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
                  <td colSpan="5" className="py-4 text-red-500 text-center">
                    ไม่พบข้อมูลสมาชิก กรุณากรอกชื่อให้ถูกต้อง
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {members.length > 0 ? <div className="">{renderPagination()}</div> : ""}
      </div>
    </div>
  );
};
export default RealName;
