import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import th from 'date-fns/locale/th'; // นำเข้า locale ภาษาไทย

// ลงทะเบียน locale ภาษาไทย
registerLocale('th', th);

const ThaiDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // ฟังก์ชันแปลงปีจาก ค.ศ. เป็น พ.ศ.
  const convertToBuddhistEra = (date) => {
    if (!date) return '';
    const yearInChristianEra = date.getFullYear();
    const yearInBuddhistEra = yearInChristianEra + 543;
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${yearInBuddhistEra}`;
    return formattedDate;
  };

  // ฟังก์ชันจัดการเวลาเริ่มต้นพร้อมแทรก ":" อัตโนมัติ
  const handleStartTimeChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // ลบทุกอย่างที่ไม่ใช่ตัวเลข
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}:${value.slice(2, 4)}`; // แทรก ":"
    }
    setStartTime(value);
  };

  // ฟังก์ชันจัดการเวลาสิ้นสุดพร้อมแทรก ":" อัตโนมัติ
  const handleEndTimeChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // ลบทุกอย่างที่ไม่ใช่ตัวเลข
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}:${value.slice(2, 4)}`; // แทรก ":"
    }
    setEndTime(value);
  };

  return (
    <>
      {/* ส่วนของ input date และ time */}
      <div className="flex items-start space-x-1 mb-6 mt-3 mx-10">

        <div className="w-40">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            เริ่มสำรวจ ณ วันที่
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            locale="th"
            dateFormat="dd/MM/yyyy"
            className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholderText="เลือกวันที่"
          />
          
        </div>

        {/* Input สำหรับเลือกเวลาเริ่มต้น */}
        <div className="w-32">
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
            เวลาเริ่มต้น
          </label>
          <input
            type="text"
            id="startTime"
            value={startTime}
            onChange={handleStartTimeChange}
            maxLength="5" // จำกัดความยาวไม่ให้เกิน 5 ตัว
            className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="00:00"
          />
        </div>

        {/* Input สำหรับเลือกเวลาสิ้นสุด */}
        <div className="w-32">
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
            เวลาสิ้นสุด
          </label>
          <input
            type="text"
            id="endTime"
            value={endTime}
            onChange={handleEndTimeChange}
            maxLength="5" // จำกัดความยาวไม่ให้เกิน 5 ตัว
            className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="00:00"
          />
        </div>
      </div>

      {/* แสดงวันที่เป็น พ.ศ. และเวลาเริ่มต้น เวลาสิ้นสุด */}
      <div className="mt-4 mx-10">
        <p className="text-sm font-medium text-gray-700">
          วันที่เลือก: {selectedDate ? convertToBuddhistEra(selectedDate) : 'ยังไม่ได้เลือกวันที่'} | เวลาเริ่มต้น: {startTime || 'ยังไม่ได้เลือกเวลาเริ่มต้น'} | เวลาสิ้นสุด: {endTime || 'ยังไม่ได้เลือกเวลาสิ้นสุด'}
        </p>
      </div>
    </>
  );
};

export default ThaiDatePicker;
