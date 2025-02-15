import React from "react";

const HumanCapital = ({ humanCapital }) => {
  return (
    <div className="pt-4 pb-6">
      <h3 className="text-2xl font-bold -mt-2 mb-2">ตอนที่ 1 ทุนมนุษย์</h3>

      {/* Patient Section */}
      <div className="col-span-2 w-full p-10 mt-8 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="mb-2 w-1/2">
          <h2 className="text-xl font-bold p-2 w-full">
            ผู้ป่วยติดเตียง/ผู้พิการพึ่งตัวเองไม่ได้ (ราย)
          </h2>
          <div className="border-2 border-red-400 p-2 bg-red-50 rounded-xl">
            <p className="tracking-tight text-red-500 md:text-lg dark:text-red-400">
              ไม่ได้รับสวัสดิการ
            </p>
            <hr className="border-red-500 my-2" />
            <p className="text-3xl text-right text-red-500 font-bold">{humanCapital.bedBound}</p>
          </div>
        </div>

        {/* Education Section */}
        <h2 className="text-xl font-bold mb-2 p-2">การศึกษาสูงสุด (ราย)</h2>
        <div className="grid grid-cols-5 gap-2">
          {/* ไม่ได้เรียน */}
          <div className="border-2 border-red-400 p-2 bg-red-50 rounded-xl">
            <p className="tracking-tight text-red-500 md:text-lg dark:text-red-400">ไม่ได้เรียน</p>
            <hr className="border-red-500 my-2" />
            <p className="text-red-500 text-right text-4xl font-bold">{humanCapital.Education?.NoSchool}</p>
          </div>

          {/* ต่ำกว่าประถม */}
          <div className="border-2 border-yellow-400 p-2 bg-yellow-100 rounded-xl">
            <p className="tracking-tight text-yellow-500 md:text-lg dark:text-yellow-400">ต่ำกว่าประถม</p>
            <hr className="border-yellow-500 my-2" />
            <p className="text-yellow-500 text-right text-4xl font-bold">{humanCapital.Education?.LowPrimary}</p>
          </div>

          {/* การศึกษาสูงสุด */}
          <div className="border-2 border-blue-400 p-2 bg-blue-100 rounded-xl">
            <p className="tracking-tight text-blue-500 md:text-lg dark:text-blue-400">ประถมศึกษา</p>
            <hr className="border-blue-500 my-2" />
            <p className="text-blue-500 text-right text-4xl font-bold">{humanCapital.Education?.Primary}</p>
          </div>

          {/* กำลังศึกษาระดับ (ไม่ได้เรียน) */}
          <div className="border-2 border-gray-400 p-2 bg-gray-100 rounded-xl">
            <p className="tracking-tight text-gray-500 md:text-lg dark:text-gray-400">
              กำลังศึกษาระดับ (ไม่ได้เรียน)
            </p>
            <hr className="border-gray-500 my-2" />
            <p className="text-gray-500 text-right text-4xl font-bold">{humanCapital.Education?.CurrentEduNoStdy}</p>
          </div>

          {/* สถานภาพ (ออกกลางคัน) */}
          <div className="border-2 border-yellow-400 p-2 bg-yellow-100 rounded-xl">
            <p className="tracking-tight text-yellow-500 md:text-sm dark:text-yellow-400">
              สถานภาพการศึกษา(เช่น ออกกลางคัน)
            </p>
            <hr className="border-yellow-500 my-2" />
            <p className="text-yellow-500 text-right text-4xl font-bold">{humanCapital.Education?.DropOut}</p>
          </div>
        </div>

        {/* WorkStatus Section */}
        <h2 className="text-xl font-bold mb-2 p-2">สถานภาพการทำงาน (ราย)</h2>
        <div className="grid grid-cols-4 gap-2">
          {/* ตกงานจาก Covid-19 */}
          <div className="border-2 border-green-400 p-2 bg-green-50 rounded-xl">
            <p className="tracking-tight text-green-500 md:text-lg dark:text-green-400">
              ไม่ทำงาน
            </p>
            <hr className="border-green-500 my-2" />
            <p className="text-green-500 text-right text-4xl font-bold">{humanCapital.WorkStatus?.NotEmployed}</p>
          </div>

          {/* ตกงาน กลับจากต่างประเทศ */}
          <div className="border-2 border-green-400 p-2 bg-green-50 rounded-xl">
            <p className="tracking-tight text-green-500 md:text-lg dark:text-green-400">
              ว่างงาน
            </p>
            <hr className="border-green-500 my-2" />
            <p className="text-green-500 text-right text-4xl font-bold">{humanCapital.WorkStatus?.UnEmployed}</p>
          </div>

          {/* ว่างงาน ไม่ระบุ */}
          <div className="border-2 border-green-400 p-2 bg-green-50 rounded-xl">
            <p className="tracking-tight text-green-500 md:text-lg dark:text-green-400">ทำงาน</p>
            <hr className="border-green-500 my-2" />
            <p className="text-green-500 text-right text-4xl font-bold">{humanCapital.WorkStatus?.Employed}</p>
          </div>

          {/* ทักษะอาชีพ */}
          <div className="border-2 border-green-400 p-2 bg-green-50 rounded-xl">
            <p className="tracking-tight text-green-500 md:text-md dark:text-green-400">
              ทักษะอาชีพที่สามารถสร้างรายได้ (เพิ่มเติม)
            </p>
            <hr className="border-green-500 my-2" />
            <p className="text-green-500 text-right text-4xl font-bold">{humanCapital.WorkStatus?.NoSkill}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanCapital;