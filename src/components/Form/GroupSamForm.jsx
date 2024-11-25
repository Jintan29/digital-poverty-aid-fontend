import React, { useState } from 'react';

function GroupSamForm() {
  // สถานะเริ่มต้นของฟอร์ม
  const [sams, setSams] = useState([{ id: Date.now(), name: '', time: 0 }]);
  const [isProcessing, setIsProcessing] = useState(false);

  // ฟังก์ชันเพิ่ม Sam ใหม่
  const addSam = () => {
    setSams([...sams, { id: Date.now(), name: '', time: 0 }]); //นำข้อมูลไปต่อท้าย
  };

  // ฟังก์ชันลบ Sam โดยอ้างอิงจาก index
  const delSam = (index) => {
    const updatedSams = sams.filter((_, i) => i !== index);
    setSams(updatedSams);
  };

  // ฟังก์ชันจัดการส่งข้อมูล
  const createSam = async () => {
    setIsProcessing(true);
    try {
      // ตรวจสอบข้อมูลก่อนส่ง
      for (const sam of sams) {
        if (!sam.name || sam.time <= 0) {
          alert('กรุณากรอกข้อมูลให้ครบถ้วน');
          setIsProcessing(false);
          return;
        }
      }

      // log ข้อมูลทั้งหมดที่กำลังจะส่ง
      console.log('ข้อมูลทั้งหมดที่ส่ง:', sams);

      
      // จำลองการเรียก API
      for (const sam of sams) {
        // ตรงนี้สามารถแทนด้วยโค้ดเรียก API จริง
        console.log('กำลังส่ง:', sam);
        // const response = await fetch('/v1/group-sams', {
        //   method: 'POST',
        //   body: JSON.stringify(sam),
        // });
      }

      // การดำเนินการหลังจากสำเร็จ (เช่น redirect หรือแสดงข้อความสำเร็จ)
      alert('ส่งข้อมูลสำเร็จ!');
      setIsProcessing(false);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการสร้าง Sam:', error);
      alert('เกิดข้อผิดพลาด');
      setIsProcessing(false);
    }
  };

  // ฟังก์ชันจัดการเปลี่ยนค่าข้อมูลใน input
  const handleInputChange = (index, field, value) => {
    const updatedSams = [...sams]; // clone ค่า เดิมมาเก็บไว้
    updatedSams[index][field] = value; //รับฟิลด์เข้ามาว่าทำเปลี่ยนแปลงที่ฟิลด์ไหน
    setSams(updatedSams);
  };

  return (
    <div>
      <table className="w-full text-left text-gray-900 dark:text-white">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3">ชื่อขั้นตอน</th>
            <th className="px-6 py-3">เวลา(นาที)</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {sams.map((sam, index) => (

            <tr key={sam.id} className="border-t">
              <td className="px-6 py-4">
                <h2>id is {sam.id}</h2>
                <input
                  type="text"
                  value={sam.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  placeholder="SAM"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg"
                  required
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="number"
                  value={sam.time}
                  onChange={(e) => handleInputChange(index, 'time', parseFloat(e.target.value))}
                  min="0"
                  step="0.01"
                  placeholder="เวลา"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg"
                  required
                />
              </td>
              <td className="px-6 py-4">
                <button type="button" onClick={() => delSam(index)}>ลบ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-4 mt-4">
        <button type="button" onClick={addSam} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          เพิ่มรายการ
        </button>

        <button type="button" onClick={createSam} className="bg-green-500 text-white px-4 py-2 rounded-lg" disabled={isProcessing}>
          {isProcessing ? 'กำลังส่ง...' : 'เสร็จสิ้น'}
        </button>
      </div>
    </div>
  );
}

export default GroupSamForm;
