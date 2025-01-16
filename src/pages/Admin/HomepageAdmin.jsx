import React, { useState } from "react";
import Modal from "../../components/Modal";

const HomepageAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2,setShowModal2] = useState(false)
  // ตัวอย่างข้อมูลสมมุติ
  const [currentBillSale, setCurrentBillSale] = useState([
    { id: 101, createdAt: "2023-01-01" },
    { id: 102, createdAt: "2023-01-02" },
  ]);

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Homepage Admin</h1>
        
        {/* ปุ่มสำหรับเปิด Modal */}
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => setShowModal(true)}
        >
          แสดง Modal
        </button>

        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => setShowModal2(true)}
        >
          แสดง Modal2
        </button>
      </div>

      {/* เรียกใช้งาน Modal ที่สร้าง */}
      <Modal
        title="บิลขาย"           // กำหนดชื่อ title ที่จะแสดงใน Header
        show={showModal}         // show={true / false} เพื่อควบคุมการเปิด/ปิด
        onClose={() => setShowModal(false)} // ฟังก์ชันเรียกปิด modal
        size="4xl"
      >
        {/* ส่วน children (Body ของ Modal) ใส่ตารางหรืออะไรก็ได้ตามต้องการ */}
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 text-center">#</th>
              <th className="py-2 text-right">เลขบิล</th>
              <th className="py-2 text-left">วันที่</th>
            </tr>
          </thead>
          <tbody>
            {currentBillSale.length > 0 ? (
              currentBillSale.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 text-center">
                    <button
                      className="btn btn-info"
                      onClick={() => alert(`ดูรายละเอียด Bill Sale ID: ${item.id}`)}
                    >
                      แสดงรายการ
                    </button>
                  </td>
                  <td className="py-2 text-right">{item.id}</td>
                  <td className="py-2 text-left">{item.createdAt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-2 text-center">
                  ไม่มีข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Modal>

      <Modal
      title='Tester'
      show={showModal2}
      onClose={e=> setShowModal2(false)}
      >
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 text-center">#</th>
              <th className="py-2 text-right">ทดสอบบบบ</th>
              <th className="py-2 text-left">อิอิอิอิ</th>
            </tr>
          </thead>
          <tbody>
            {currentBillSale.length > 0 ? (
              currentBillSale.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 text-center">
                    <button
                      className="btn btn-info"
                      onClick={() => alert(`ดูรายละเอียด Bill Sale ID: ${item.id}`)}
                    >
                      แสดงรายการ
                    </button>
                  </td>
                  <td className="py-2 text-right">{item.id}</td>
                  <td className="py-2 text-left">{item.createdAt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-2 text-center">
                  ไม่มีข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </Modal>
    </>
  );
};

export default HomepageAdmin;
