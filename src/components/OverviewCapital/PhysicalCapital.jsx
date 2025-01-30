import React from "react";

const PhysicalCapital = () => {
  return (
    <div className="pt-4 pb-6">
      <h3 className="text-2xl font-bold mb-4">ตอนที่ 2 ทุนกายภาพ(ครัวเรือน)</h3>

      {/* Section */}
      <div className="col-span-3 w-full p-10 mt-8 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4">
          {/* 1 */}
          <div className="border-2 border-blue-600 p-2  bg-blue-100 rounded-xl">
            <p className="tracking-tight text-blue-500 md:text-md dark:text-blue-400">
              มีบ้านและที่ดินเป็นของตนเอง, อาศัยอยู่กับผู้อื่น,
              เช่าบ้าน/เช่าห้องอยู่
            </p>
            <hr className="border-blue-500 my-2" />
            <p className="text-3xl text-right text-blue-500 font-bold">100</p>
          </div>

          {/* 2 */}
          <div className="border-2 border-blue-600 p-2  bg-blue-100 rounded-xl">
            <p className="tracking-tight text-blue-500 md:text-md dark:text-blue-400">
              สภาพของบ้านที่อาศัย(สภาพทรุกโทรม หรือ วัสดุก่อสร้างบ้านไม่ถาวร)
            </p>
            <hr className="border-blue-500 my-2" />
            <p className="text-3xl text-right text-blue-500 font-bold">311</p>
          </div>

          {/* 3 */}
          <div className="border-2 border-blue-600 p-2  bg-blue-100 rounded-xl">
            <p className="tracking-tight text-blue-500 md:text-md dark:text-blue-400">
              ความเป็นระเบียนเรียบร้อย และถูกสุขลักษณะของบ้านพักอาศัย
              (ไม่มีการจัดเก็บสิ่งของเป็นระเบียบรกรุงรัง)
            </p>
            <hr className="border-blue-500 my-2" />
            <p className="text-3xl text-right text-blue-500 font-bold">1,328</p>
          </div>

          {/* 4 */}
          <div className="border-2 border-blue-600 p-2 bg-blue-100 rounded-xl">
            <p className="tracking-tight text-blue-500 md:text-md dark:text-blue-400">
              ครัวเรือนของท่านมีไฟฟ้าใช้หรือไม่ (ไม่มี (เช่น เทียน ตะเกียง))
            </p>
            <hr className="border-blue-500 my-2" />
            <p className="text-3xl text-right text-blue-500 font-bold">1,328</p>
          </div>

          {/* 5 */}
          <div className="border-2 border-blue-600 p-2 bg-blue-100 rounded-xl">
            <p className="tracking-tight text-blue-500 md:text-md dark:text-blue-400">
              ครัวเรือนของท่านมีไฟฟ้าใช้หรือไม่
              (ต่อพ่วงไฟฟ้าจากคนอื่น,ไม่มีมิเตอร์ไฟฟ้าของตนเอง)
            </p>
            <hr className="border-blue-500 my-2" />
            <p className="text-3xl text-right text-blue-500 font-bold">1,328</p>
          </div>

          {/* 6 */}
          <div className="border-2 border-blue-600 p-2 bg-blue-100 rounded-xl">
            <p className="tracking-tight text-blue-500 md:text-md dark:text-blue-400">
              ครัวเรือนของท่านมีอุปกรณ์สารสนเทศหรือไม่มี(โทรศัพท์บ้าน)(ไม่มีได้เลือก)
            </p>
            <hr className="border-blue-500 my-2" />
            <p className="text-3xl text-right text-blue-500 font-bold">82</p>
          </div>

          {/* 7 */}
          <div className="border-2 border-blue-600 p-2 bg-blue-100 rounded-xl">
            <p className="tracking-tight text-blue-500 md:text-md dark:text-blue-400">
              ครัวเรือนของท่านมีอุปกรณ์สารสนเทศหรือไม่มี(โทรศัพท์มือถือ)(ไม่มีได้เลือก)
            </p>
            <hr className="border-blue-500 my-2" />
            <p className="text-3xl text-right text-blue-500 font-bold">52</p>
          </div>

          {/* 8 */}
          <div className="border-2 border-blue-600 p-2 bg-blue-100 rounded-xl">
            <p className="tracking-tight text-blue-500 md:text-md dark:text-blue-400">
              ครัวเรือนของท่านมีพื้นที่ทำกินทางการเกษตรหรือไม่
              (ไม่มีที่ทำกินทางการเกษตร)
            </p>
            <hr className="border-blue-500 my-2" />
            <p className="text-3xl text-right text-blue-500 font-bold">82</p>
          </div>

          {/* 9 */}
          <div className="border-2 border-blue-600 p-2 bg-blue-100 rounded-xl">
            <p className="tracking-tight text-blue-500 md:text-sm dark:text-blue-400">
              ครัวเรือนของท่านมีพื้นที่ทำกินทางการเกษตรหรือไม่
              (มีพื้นที่ทำกินเป็นของตนเอง,เช่าที่ทำกิน,ไม่มีพื้นที่ทำกินเป็นของตนเองแต่อาศัยพื้นที่ของบุคคลอื่นทำ
              โดยไม่มีค่าเช่า)
            </p>
            <hr className="border-blue-500 my-2" />
            <p className="text-3xl text-right text-blue-500 font-bold">100</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalCapital;
