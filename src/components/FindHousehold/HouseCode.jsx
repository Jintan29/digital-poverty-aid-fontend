import React, { useCallback, useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Icon } from "@iconify/react";
import debounce from "lodash/debounce";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../config";
import { Link } from "react-router-dom";

const HouseCode = () => {
  const [members, setMembers] = useState([]);
  const [code, setCode] = useState("");
  const [openMenuIndex, setOpenMenuIndex] = useState(null); //menu icon

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  //หน่วงเวลา
  const debouncedSearch = useCallback(
    debounce(async (value) => {
      setCurrentPage(1); //reset page
      fetchData(1, value);
    }, 500),
    []
  );

  const fetchData = async (page, search) => {
    try {
      const response = await axios.get(
        config.api_path + `/member-household/search-by-houseCode`,
        {
          params: {
            page: page,
            limit,
            code: search,
          },
          ...config.headers(),
        }
      );
      setMembers(response.data.results);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      Swal.fire({
        title: "error",
        icon: "error",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  const handleInputChange = (value) => {
    setCode(value);
    debouncedSearch(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page, code);
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

  //exportToPDF
  const exportToPDF = () => {
    // ดึงข้อมูลของตารางจาก DOM โดยระบุ id เป็น "table-content"
    const content = document.getElementById("table-content");
    if (!content) return; // ตรวจสอบว่าข้อมูลตารางถูกดึงมาแล้ว หากไม่ได้ ให้หยุดการทำงานของฟังก์ชัน

    // กำหนดชื่อหัวข้อที่จะแสดงในไฟล์ PDF
    const title = "สมาชิกครัวเรือนจากเลขที่บ้าน";

    // ใช้ html2canvas เพื่อแปลง HTML เป็นภาพ
    html2canvas(content, {
      scale: 2, // กำหนดความละเอียดของภาพให้สูงขึ้น (ค่าเริ่มต้นคือ 1)
      useCORS: true, // อนุญาตให้ดึงข้อมูลที่มี cross-origin (เช่น รูปภาพจากเว็บไซต์อื่น)
    }).then((canvas) => {
      // แปลงภาพจาก canvas เป็นข้อมูล Base64 ในฟอร์แมต PNG
      const imgData = canvas.toDataURL("image/png");

      // สร้างเอกสาร PDF ด้วยขนาดกระดาษ A4
      const pdf = new jsPDF("p", "mm", "a4"); // "p" หมายถึง แนวตั้ง, "mm" คือหน่วยมิลลิเมตร, "a4" คือขนาดกระดาษ

      // กำหนดความกว้างของภาพใน PDF (190 มม.)
      const imgWidth = 190;

      // คำนวณความสูงของภาพโดยรักษาสัดส่วนเดิม
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // กำหนดตำแหน่งเริ่มต้นของเนื้อหาในแนวตั้ง (20 มม. จากขอบบน)
      let position = 20;

      // เพิ่มหัวข้อใน PDF
      pdf.setFont("Sarabun-Regular", "normal"); // ตั้งค่าฟอนต์ให้รองรับภาษาไทย
      pdf.setFontSize(14); // กำหนดขนาดตัวอักษรเป็น 16
      pdf.text(
        title,
        pdf.internal.pageSize.width / 2,
        position,
        null,
        null,
        "center"
      );
      // แสดงข้อความหัวข้อกลางกระดาษ โดยข้อความจะอยู่ตรงกลางแนวนอน และเริ่มที่ตำแหน่ง "position" ในแนวตั้ง
      position += 10; // เพิ่มตำแหน่งแนวตั้ง (เว้นระยะห่างระหว่างหัวข้อและตาราง)

      // เพิ่มภาพตารางใน PDF
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      // วางภาพที่ตำแหน่ง (10, position) โดยเว้นขอบซ้าย 10 มม. และใช้ความกว้าง imgWidth และความสูง imgHeight

      // บันทึกไฟล์ PDF โดยใช้ชื่อหัวข้อเป็นชื่อไฟล์
      pdf.save(`${title}.pdf`);
    });
  };

  return (
    <div>
      <div className="mx-5 my-5">
        <div className="flex flex-col  justify-center font-bold text-xl">
          <div className="block text-center">
            <h1>ค้นหาสมาชิกครัวเรือนจากรหัสบ้าน </h1>
          </div>
        </div>

        {/* ค้าหา/download  */}
        <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
          <div className="flex items-center gap-2 w-full md:w-auto justify-center">
            <div className="flex mb-4 w-80 md:w-96 mt-4">
              <input
                type="search"
                id="search"
                className="flex-grow py-3 px-3 text-xs text-gray-900 border border-gray-300 rounded-l-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                placeholder="ค้นหาสมาชิก"
                value={code}
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

        <div className="overflow-x-auto w-full shadow-md sm:rounded-lg">
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
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-700 width: 20% "
                >
                  รหัสบ้าน
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 bg-gray-50 dark:bg-gray-700 width: 30%"
                >
                  ข้อมูลสมาชิกครัวเรือน
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-800 width: 40%"
                >
                  ที่อยู่
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
                    <td className="px-6 py-4 text-black bg-gray-50">
                      {(currentPage - 1) * limit + index + 1}
                    </td>

                    <td className="px-6 py-4 font-semibold bg-gray-100 dark:bg-gray-900 text-black">
                      {member.Household.house_code}
                    </td>

                    <th
                      scope="row"
                      className="px-6 py-4 font-medium bg-gray-50 text-gray-900 whitespace-nowrap  dark:text-white dark:bg-gray-900"
                    >
                      {member.title + " " + member.fname + " " + member.lname}
                    </th>

                    <td className="px-6 py-4 text-black  bg-gray-100 ">
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
                            <Link
                              to={`/admin/track-household/${member.Household?.id}`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              ดูข้อมูลครัวเรือน
                            </Link>
                          </div>
                        )}
                      </div>
                    </td>

                  
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-red-500 text-center">
                    ไม่พบข้อมูล
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

export default HouseCode;
