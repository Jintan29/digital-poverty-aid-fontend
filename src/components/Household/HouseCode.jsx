import React, { useState } from "react";
import jsPDF from "jspdf"; //ไลบรารีสำหรับสร้างและดาวน์โหลดไฟล์ PDF
import html2canvas from "html2canvas"; //ไลบรารีสำหรับแปลง HTML เป็นภาพ (image) เพื่อใช้สร้าง PDF
import { Icon } from "@iconify/react"; //ไลบราลี icon

const HouseCode = () => {
  const [search, setSearch] = useState("");

  // ข้อมูลสมาชิกในครัวเรือน
  const members = [
    {
      number: 1,
      name: "นายสุทธิภัทร ไกรกลิ่น",
      address: "12 หมู่ 5 ต.ท่าโพธิ์ อ.เมือง จ.พิษณุโลก",
      houseNumber: "123456789",
      phone: "084-757-9994",
    },
    {
      number: 2,
      name: "นายพรสวรรค์ เสือราบ",
      address: "1 หมู่ 1 ต.ท่าโพธิ์ อ.เมือง จ.พิษณุโลก",
      houseNumber: "987654321",
      phone: "094-123-5674",
    },
    {
      number: 3,
      name: "นางสาวสมจิตร ทองพรมราช",
      address: "3 หมู่ 10 ต.ท่าโพธิ์ อ.เมือง จ.พิษณุโลก",
      houseNumber: "456789123",
      phone: "081-999-8888",
    },
  ];
  // กรองข้อมูลตามเลขที่บ้าน
  const filteredMembers = members.filter((member) =>
    member.houseNumber.includes(search)
  );
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
            <h1>ค้นหาสมาชิกครัวเรือนจากเลขที่บ้าน </h1>
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
              <Icon
                icon="material-symbols:picture-as-pdf-rounded"
                width="1.5em"
                height="1.5em"
              />
              Download
            </button>
          </div>
        </div>

        {/* input text */}
        <div className="flex justify-center items-center mt-5 ">
          <div classname="flex flex-col ">
            {/* ช่องค้นหา */}
            <div className="flex mb-4">
              <input
                type="search"
                id="search"
                value={search} // ผูกค่ากับ State
                onChange={(e) => setSearch(e.target.value)} // อัปเดต State
                className="flex-grow p-2 text-xs text-gray-900 border border-gray-300 rounded-l-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 max-w-xs"
                placeholder="ค้นหาเลขที่บ้าน"
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

export default HouseCode;
