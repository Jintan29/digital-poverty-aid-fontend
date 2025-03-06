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
          <li>ระบบเพิ่มข้อมูลครัวเรือนรายใหม่ (Form)</li>
          <li>ระบบติดตามข้อมูล (รายครัวเรือน)</li>
          <li>ระบบติดตามข้อมูล (รายบุคคล)</li>
          <li>ระบบพยากรณ์รายได้ของครัวเรือน และ สมาชิกครัวเรือนด้วย Machine Learning</li>
          <li>วิเคราห์สถานะการหลุดพ้นความยากจนจากข้อมูลที่มี</li>
          <li>การจัดการข้อมูลผู้ใช้งานระบบ</li>
          <li>ระบบ Export Data (Excel / PDF)</li>
          <li>ระบบสารสนเทศภูมิศาสตร์ (GIS)</li>
          <li>ระบบติดตามครัวเรือนด้วย Line Official Account (Line OA)</li>
          <li>สถิติการเข้าใช้งานระบบต่างๆ (Loging)</li>
          <li>API (Application Programing Interface)</li>
        </ul>
      </div>
    </>
  );
};

export default HomepageAdmin;
