import React from "react";

const HomepageAdmin = () => {
  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-semibold">
        ดิจิทัลแพลตฟอร์มสำหรับการจัดการข้อมูล การแก้ปัญหาความยากจน ภายในจังหวัดพิษณุโลก
        </h2>
        <h2 className="text-xl font-normal">
        (Comprehensive data management and poverty reduction platform. )
        </h2>
        <ul class="text-xl space-y-1 text-gray-900 list-disc list-inside dark:text-gray-400 mt-4">
          <li>ระบบติดตามข้อมูล (รายครัวเรือน)</li>
          <li>ระบบติดตามข้อมูล (รายบุคคล)</li>
          <li>การติดตามเก็บข้อมูลต่อเนื่อง</li>
          <li>วิเคราห์สถานะการหลุดพ้นความยากจนจากข้อมูลที่มี</li>
          <li>การจัดการข้อมูลผู้ใช้งานระบบ</li>
          <li>ระบบ Export Data (Excel / PDF)</li>
          <li>API (Application Programing Interface)</li>
        </ul>
      </div>
    </>
  );
};

export default HomepageAdmin;
