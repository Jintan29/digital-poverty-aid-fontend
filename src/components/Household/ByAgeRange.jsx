import React, { useState } from "react";
import jsPDF from "jspdf"; //ไลบรารีสำหรับสร้างและดาวน์โหลดไฟล์ PDF
import html2canvas from "html2canvas"; //ไลบรารีสำหรับแปลง HTML เป็นภาพ (image) เพื่อใช้สร้าง PDF

const ByAgeRange = () => {
  const [selectedAgeRange, setSelectedAgeRange] = useState(""); // เก็บค่าช่วงอายุที่เลือก

  // รายการช่วงอายุ
  const ageRanges = ["15-25 ปี", "26-36 ปี", "36-46 ปี", "46 ปีขึ้นไป"];
  const members = [
    // 15-25
    {
      number: 1,
      name: "นายสุทธิภัทร ไกรกลิ่น",
      address: "1 หมู่ 1 ต.ท่าโพธิ์ อ.เมือง จ.พิษณุโลก",
      houseNumber: "123456789",
      phone: "094-123-5674",
      ageRange: "15-25 ปี",
    },
    {
      number: 2,
      name: "นายสุทธิภัทร ไกรกลิ่น",
      address: "1 หมู่ 1 ต.ท่าโพธิ์ อ.เมือง จ.พิษณุโลก",
      houseNumber: "123456789",
      phone: "094-123-5674",
      ageRange: "15-25 ปี",
    },
    {
      number: 3,
      name: "นางสาวสมจิตร ทองพรมราช",
      address: "1 หมู่ 1 ต.ท่าโพธิ์ อ.เมือง จ.พิษณุโลก",
      houseNumber: "123456789",
      phone: "094-123-5674",
      ageRange: "15-25 ปี",
    },
    //   26-36
    {
      number: 1,
      name: "นายสุทธิภัทร ไกรกลิ่น",
      address: "1 หมู่ 1 ต.ท่าโพธิ์ อ.เมือง จ.พิษณุโลก",
      houseNumber: "123456789",
      phone: "094-123-5674",
      ageRange: "26-36 ปี",
    },
    {
      number: 2,
      name: "นายพรสวรรค์ เสือราบ",
      address: "1 หมู่ 1 ต.ท่าโพธิ์ อ.เมือง จ.พิษณุโลก",
      houseNumber: "123456789",
      phone: "094-123-5674",
      ageRange: "26-36 ปี",
    },
    {
      number: 3,
      name: "นางสาวสมจิตร ทองพรมราช",
      address: "1 หมู่ 1 ต.ท่าโพธิ์ อ.เมือง จ.พิษณุโลก",
      houseNumber: "123456789",
      phone: "094-123-5674",
      ageRange: "26-36 ปี",
    },
    //   36-46
    {
      number: 1,
      name: "นายเจ ไกรกลิ่น",
      address: "1 หมู่ 1 ต.ท่าโพธิ์ อ.เมือง จ.พิษณุโลก",
      houseNumber: "123456789",
      phone: "094-123-5674",
      ageRange: "36-46 ปี",
    },
    {
      number: 2,
      name: "นายกาย พรสวรรค์",
      address: "1 หมู่ 1 ต.ท่าโพธิ์ อ.เมือง จ.พิษณุโลก",
      houseNumber: "123456789",
      phone: "094-123-5674",
      ageRange: "36-46 ปี",
    },
    //   46 ปีขึ้นไป
    {
      number: 1,
      name: "นายเจ ไกรกลิ่น",
      address: "1 หมู่ 1 ต.ท่าโพธิ์ อ.เมือง จ.พิษณุโลก",
      houseNumber: "123456789",
      phone: "094-123-5674",
      ageRange: "46 ปีขึ้นไป",
    },
    {
      number: 2,
      name: "นายเจ ไกรกลิ่น",
      address: "1 หมู่ 1 ต.ท่าโพธิ์ อ.เมือง จ.พิษณุโลก",
      houseNumber: "123456789",
      phone: "094-123-5674",
      ageRange: "46 ปีขึ้นไป",
    },
  ];
  // กรองข้อมูลสมาชิกที่มีช่วงอายุตรงกับช่วงอายุที่ผู้ใช้เลือก
  const filteredMembers = members.filter(
    (member) => member.ageRange === selectedAgeRange
  );

  //exportToPD
  const exportToPDF = () => {
    const content = document.getElementById("table-content"); // ดึงเฉพาะตาราง
    if (!content) return; // ตรวจสอบว่าได้ดึงข้อมูลมาแล้ว

    const title = "สมาชิกครัวเรือนยากจน-ตามช่วงอายุ";

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
      <div className="mx- my-5">
        <div className="flex flex-col justify-center font-bold text-xl">
          <div className="block text-center">
            <h1>ค้นหาสมาชิกครัวเรือนยากจน ตามช่วงอายุ</h1>
          </div>
        </div>

        {/* ปุ่ม PDF และ ตาราง */}

        <div className="flex flex-col items-center ">
          <div className="relative w-full max-w-screen-lg mb-2">
            {/* ปุ่ม PDF */}
            <button
              type="button"
              onClick={exportToPDF} // เรียกฟังก์ชัน exportToPDF เมื่อคลิกที่ปุ่ม
              className="absolute right-0 inline-flex items-center text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 mt-2"
            >
              {/* ไอคอน PDF */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
                className="mr-2"
              >
                <path
                  fill="currentColor"
                  d="M10 10.5h1q.425 0 .713-.288T12 9.5v-1q0-.425-.288-.712T11 7.5H9.5q-.2 0-.35.15T9 8v4q0 .2.15.35t.35.15t.35-.15T10 12zm0-1v-1h1v1zm5 3q.425 0 .713-.288T16 11.5v-3q0-.425-.288-.712T15 7.5h-1.5q-.2 0-.35.15T13 8v4q0 .2.15.35t.35.15zm-1-1v-3h1v3zm4-1h.5q.2 0 .35-.15T19 10t-.15-.35t-.35-.15H18v-1h.5q.2 0 .35-.15T19 8t-.15-.35t-.35-.15h-1q-.2 0-.35.15T17 8v4q0 .2.15.35t.35.15t.35-.15T18 12zM8 18q-.825 0-1.412-.587T6 16V4q0-.825.588-1.412T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm-4 4q-.825 0-1.412-.587T2 20V7q0-.425.288-.712T3 6t.713.288T4 7v13h13q.425 0 .713.288T18 21t-.288.713T17 22z"
                ></path>
              </svg>
              Download
            </button>
          </div>
        </div>
        {/* Dropdown และตารางข้อมูล */}
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
          <div className="relative w-full mb-4">
            {/* Dropdown */}
            <div className="flex justify-start"></div>
            <button
              id="dropdownDefaultButton"
              onClick={
                () =>
                  document.getElementById("dropdown").classList.toggle("hidden") // เปิด/ปิด dropdown
              }
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              {selectedAgeRange || "เลือกช่วงอายุ"} {/* แสดงช่วงอายุที่เลือก */}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {/* Dropdown menu */}
            <div
              id="dropdown"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute"
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {ageRanges.map((range) => (
                  <li key={range}>
                    <button
                      onClick={() => {
                        setSelectedAgeRange(range); // เก็บค่าช่วงอายุที่เลือก
                        document
                          .getElementById("dropdown")
                          .classList.add("hidden"); // ปิด dropdown
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {range}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ตารางข้อมูล */}
        <div className="flex justify-center items-center ">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table
              id="table-content"
              className="table-auto text-l text-center rtl:text-right text-gray-500 dark:text-gray-400 border-collapse"
            >
              <thead className="text-l uppercase bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200">
                <tr className="border-b border-gray-700 dark:border-gray-900">
                  <th
                    scope="col"
                    className="px-4 py-3 bg-gray-50 dark:bg-gray-800 width: 10%"
                  >
                    ลำดับที่
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-700 width: 30%"
                  >
                    ข้อมูลสมาชิกในครัวเรือน
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 dark:bg-gray-800 width: 20%"
                  >
                    ที่อยู่
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-700 width: 20%"
                  >
                    เลขที่บ้าน
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 dark:bg-gray-800 width: 20%"
                  >
                    เบอร์โทรศัพท์
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredMembers.map((member, index) => (
                  // แถวของตาราง
                  <tr
                    key={index}
                    className="border-b border-gray-500 dark:border-gray-900"
                  >
                    {/* ลำดับที่ */}
                    <td className="px-6 py-3 text-black bg-gray-50">
                      {member.number}
                    </td>
                    {/* ข้อมูลสมาชิก */}
                    <td className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap bg-gray-100 dark:text-white dark:bg-gray-900">
                      {member.name}
                    </td>
                    {/* ที่อยู่ */}
                    <td className="px-6 py-3 text-black bg-gray-50">
                      {member.address}
                    </td>
                    {/* เลขที่บ้าน */}
                    <td className="px-6 py-3 bg-gray-100 dark:bg-gray-900 text-black">
                      {member.houseNumber}
                    </td>
                    {/* เบอร์โทรศัพท์ */}
                    <td className="px-6 py-3 text-black bg-gray-50">
                      {member.phone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ByAgeRange;
