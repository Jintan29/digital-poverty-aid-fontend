import React, { useState } from "react";
import jsPDF from "jspdf"; //ไลบรารีสำหรับสร้างและดาวน์โหลดไฟล์ PDF
import html2canvas from "html2canvas"; //ไลบรารีสำหรับแปลง HTML เป็นภาพ (image) เพื่อใช้สร้าง PDF

const RealName = () => {
  const [search, setSearch] = useState(""); // State สำหรับช่องค้นหา

  // ข้อมูลสมาชิกในครัวเรือน
  const members = [
    //1
    {
      number: 1,
      name: "นายสุทธิภัทร ไกรกลิ่น",
      address: "12 หมู่ 5 ต.ท่าโพธิ์ อ.เมือง จ.พิษณุโลก",
      houseNumber: "123456789",
      phone: "084-757-9994",
    },
    //2
    {
      number: 2,
      name: "นายพรสวรรค์ เสือราบ",
      address: "1 หมู่ 1 ต.ท่าโพธิ์ อ.เมือง จ.พิษณุโลก",
      houseNumber: "987654321",
      phone: "094-123-5674",
    },
    //3
    {
      number: 3,
      name: "นายสุทธิภัทร ไกรกลิ่น",
      address: "12 หมู่ 5 ต.ท่าโพธิ์ อ.เมือง จ.พิษณุโลก",
      houseNumber: "123456789",
      phone: "084-757-9994",
    },
    //4
    {
      number: 4,
      name: "นางสาวสมจิตร ทองพรมราช",
      address: "1 หมู่ 1 ต.ท่าโพธิ์ อ.เมือง จ.พิษณุโลก",
      houseNumber: "987654321",
      phone: "094-123-5674",
    },
    {
      number: 5,
      name: "นางสาวสมจิตร ทองพรมราช",
      address: "1 หมู่ 1 ต.ท่าโพธิ์ อ.เมือง จ.พิษณุโลก",
      houseNumber: "147852369",
      phone: "094-123-5674",
    },
  ];
  // ฟิลเตอร์สมาชิกที่ตรงกับคำค้นหา
  const filteredMembers = members.filter((member) =>
    member.name.includes(search)
  );
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
        <div className="flex flex-col  justify-center font-bold text-xl">
          <div className="block text-center">
            <h1>ค้นหาสมาชิคครัวเรือจากชื่อจริง </h1>
          </div>
        </div>

        {/* ปุ่ม PDF และ ตาราง */}
        <div className="flex flex-col items-center mt-5 ">
          <div className="relative w-full max-w-screen-lg">
            {/* ปุ่ม PDF */}
            <button
              type="button"
              onClick={exportToPDF} // เรียกฟังก์ชัน exportToPDF เมื่อคลิกที่ปุ่ม
              className="absolute right-0 inline-flex items-center text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
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

        {/* input text */}
        <div className="flex justify-center items-center mt-5">
          <div className="flex flex-col">
            {/* Input และปุ่ม */}
            <div className="flex mb-4">
              <input
                type="search"
                id="search"
                className="flex-grow p-2 text-xs text-gray-900 border border-gray-300 rounded-l-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-xs"
                placeholder="ค้นหาสมาชิก"
                value={search} // ผูกค่ากับ State
                onChange={(e) => setSearch(e.target.value)} // อัปเดต State
              />
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-sm text-xs px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                ค้นหา
              </button>
            </div>

            {/* <!-- ตารางข้อมูล --> */}
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
                        className="px-4 py-3 bg-gray-50 dark:bg-gray-800"
                      >
                        ลำดับที่
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 bg-gray-100 dark:bg-gray-700"
                      >
                        ข้อมูลสมาชิกในครัวเรือน
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                      >
                        ที่อยู่
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 bg-gray-100 dark:bg-gray-700"
                      >
                        เลขที่บ้าน
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
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
                        {/* ลำดับที่  */}
                        <td className="px-6 py-4 text-black bg-gray-50">
                          {member.number}
                        </td>
                        {/* ชื่อ  */}
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-100  dark:text-white dark:bg-gray-900"
                        >
                          {member.name}
                        </th>
                        {/* ที่อยู่ */}
                        <td className="px-6 py-4 text-black bg-gray-50">
                          {member.address}
                        </td>
                        {/* เลขที่บ้าน */}
                        <td className="px-6 py-4 bg-gray-100 dark:bg-gray-900 text-black">
                          {member.houseNumber}
                        </td>
                        {/* เบอร์โทรศัพท์ */}
                        <td className="px-6 py-4 text-black bg-gray-50">
                          {member.phone}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredMembers.length === 0 && (
                  <p className="text-center text-red-500 mt-3">ไม่พบข้อมูล</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RealName;
