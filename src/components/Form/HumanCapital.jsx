import React from "react";

export const HumanCapital = () => {
  return (
    <div>
      <div className="mb-6 mx-10 mt-0 bg-blue-200 rounded-md">
        <div className="Container">
          <h3 className="text-black text-lg font-bold px-5 py-5">
            ข้อมูลสมาชิคครัวเรือนคนที่
          </h3>
        </div>

        {/* Input */}
        <div className="grid gap-6 mb-6 mt-6 md:grid-cols-4  mx-10">
          <div className="relative  rounded-md shadow-sm">
            <label
              for="visitors"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ชื่อ
            </label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-7">
              <label htmlFor="currency" className="sr-only">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                className="border border-transparent mb-5 bg-transparent text-gray-500 text-sm focus:ring-0 focus:outline-none w-20 focus:border-gray-500 focus:rounded-md"
              >
                <option>นาย</option>
                <option>นาง</option>
                <option>นางสาว</option>
                <option>เด็กชาย</option>
                <option>เด็กหญิง</option>
              </select>
            </div>
            <input
              id="price"
              name="text"
              type="text"
              placeholder=""
              className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-24 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              นามสกุล
            </label>
            <input
              type="text"
              id="first_name"
              class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              อายุ(ปี)
            </label>
            <input
              type="text"
              id="first_name"
              class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              อายุ(เดือน)
            </label>
            <input
              type="text"
              id="first_name"
              class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              เพศ
            </label>
            <select
              id="currency"
              name="currency"
              className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
            >
              <option>ชาย</option>
              <option>หญิง</option>
            </select>
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              วันเกิด(1/12/2546)
            </label>
            <input
              type="text"
              id="first_name"
              class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              หมายเลขบัตรประจำตัวประชาชน
            </label>
            <input
              type="text"
              id="first_name"
              class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              สถานะตามทะเบียนบ้าน
            </label>
            <select
              id="currency"
              name="currency"
              className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
            >
              <option>มีชื่อและอาศัยอยู่</option>
              <option>มีชื่อแต่ไม่อาศัย</option>
              <option>ไม่มีชื่อแต่อาศัยอยู่</option>
            </select>
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              สุขภาพ
            </label>
            <select
              id="currency"
              name="currency"
              className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
            >
              <option>ปกติ</option>
              <option>ป่วยเรื้อรังไม่ติดเตียง(เช่น หัวใจ เบาหวาน)</option>
              <option>พึ่งพาตนเองได้</option>
              <option>ผู้ป่วยติดเตียง/พิการพึ่งพาตัวเองไม่ได้</option>
            </select>
          </div>
        </div>

        <div className="Container">
          <h3 className="text-black text-sm font-bold px-5 pb-5">
            สวัสดิการที่ได้รับในปัจจุบัน
          </h3>
        </div>

        {/* Input */}
        <div className="grid gap-6 mb-6 mt-0 md:grid-cols-3  mx-10">
          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ระบุสวัสดิการ(1)
            </label>
            <select
              id="currency"
              name="currency"
              className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
            >
              <option>ไม่ได้รับ</option>
              <option>เด็กแรกเกิด</option>
              <option>เบี้ยสูงอายุ/คนชรา</option>
              <option>เบี้ยคนพิการ</option>
              <option>ประกันสังคม(นายจ้าง/ม.33)</option>
              <option>ประกันตนเอง(ม.40)</option>
              <option>บัตรสวัสดิการแห่งรัฐ</option>
              <option>การเยียวยาโควิดจากรัฐ</option>
              <option>ไม่ทราบ</option>
              <option>
                อื่นๆ เช่น ทุนการศึกษา เบี้ยซ่อมแซมบ้าน อุปกรณ์ช่วยเหลือคนพิการ
              </option>
            </select>
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              จำนวน(บาท)
            </label>
            <input
              type="text"
              id="first_name"
              class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ความถี่
            </label>
            <select
              id="currency"
              name="currency"
              className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
            >
              <option>ทุกเดือน</option>
              <option>ครั้งเดียว</option>
            </select>
          </div>
        </div>

        {/* Input2 */}
        <div className="grid gap-6 mb-6 mt-0 md:grid-cols-3  mx-10">
          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ระบุสวัสดิการ(2)
            </label>
            <select
              id="currency"
              name="currency"
              className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
            >
              <option>ไม่ได้รับ</option>
              <option>เด็กแรกเกิด</option>
              <option>เบี้ยสูงอายุ/คนชรา</option>
              <option>เบี้ยคนพิการ</option>
              <option>ประกันสังคม(นายจ้าง/ม.33)</option>
              <option>ประกันตนเอง(ม.40)</option>
              <option>บัตรสวัสดิการแห่งรัฐ</option>
              <option>การเยียวยาโควิดจากรัฐ</option>
              <option>ไม่ทราบ</option>
              <option>
                อื่นๆ เช่น ทุนการศึกษา เบี้ยซ่อมแซมบ้าน อุปกรณ์ช่วยเหลือคนพิการ
              </option>
            </select>
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              จำนวน(บาท)
            </label>
            <input
              type="text"
              id="first_name"
              class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ความถี่
            </label>
            <select
              id="currency"
              name="currency"
              className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
            >
              <option>ทุกเดือน</option>
              <option>ครั้งเดียว</option>
            </select>
          </div>
        </div>

        {/* Input3*/}
        <div className="grid gap-6 mb-6 mt-0 md:grid-cols-3  mx-10">
          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ระบุสวัสดิการ(3)
            </label>
            <select
              id="currency"
              name="currency"
              className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
            >
              <option>ไม่ได้รับ</option>
              <option>เด็กแรกเกิด</option>
              <option>เบี้ยสูงอายุ/คนชรา</option>
              <option>เบี้ยคนพิการ</option>
              <option>ประกันสังคม(นายจ้าง/ม.33)</option>
              <option>ประกันตนเอง(ม.40)</option>
              <option>บัตรสวัสดิการแห่งรัฐ</option>
              <option>การเยียวยาโควิดจากรัฐ</option>
              <option>ไม่ทราบ</option>
              <option>
                อื่นๆ เช่น ทุนการศึกษา เบี้ยซ่อมแซมบ้าน อุปกรณ์ช่วยเหลือคนพิการ
              </option>
            </select>
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              จำนวน(บาท)
            </label>
            <input
              type="text"
              id="first_name"
              class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ความถี่
            </label>
            <select
              id="currency"
              name="currency"
              className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
            >
              <option>ทุกเดือน</option>
              <option>ครั้งเดียว</option>
            </select>
          </div>
        </div>

        {/* Part3 */}
        <div className="grid gap-6 mb-6 mt-6 md:grid-cols-4  mx-10">
          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              พูดภาษาไทย
            </label>
            <select
              id="currency"
              name="currency"
              className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
            >
              <option>ได้</option>
              <option>ไม่ได้</option>
            </select>
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              อ่านภาษาไทย
            </label>
            <select
              id="currency"
              name="currency"
              className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
            >
              <option>ได้</option>
              <option>ไม่ได้</option>
            </select>
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              เขียนภาษาไทย
            </label>
            <select
              id="currency"
              name="currency"
              className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
            >
              <option>ได้</option>
              <option>ไม่ได้</option>
            </select>
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              การศึกษาสูงสุด
            </label>
            <select
              id="currency"
              name="currency"
              className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
            >
              <option>ไม่ได้เรียน</option>
              <option>ต่ำกว่าประถม</option>
              <option>ประถมศึกษา</option>
              <option>ม.ต้น หรือเทียบเท่า</option>
              <option>ม.ปลาย หรือเทียบเท่า</option>
              <option>ปวช./ประกาศนียบัตร</option>
              <option>ปวส./อนุปริญญา</option>
              <option>ป.ตรี หรือเทียบเท่า</option>
              <option>สูงกว่าปริญญาตรี</option>
              <option>เรียนสายศาสนา</option>
            </select>
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              สถานภาพการศึกษา
            </label>
            <select
              id="currency"
              name="currency"
              className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
            >
              <option>ไปเรียนสม่ำเสมอ</option>
              <option>หยุดเรียนเป็นระยะ</option>
              <option>ออกกลางคัน(Dropout)</option>
            </select>
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              กำลังศึกษาระดับ
            </label>
            <select
              id="currency"
              name="currency"
              className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
            >
              <option>ต่ำกว่าประถม</option>
              <option>ประถมศึกษา</option>
              <option>ม.ต้น หรือเทียบเท่า</option>
              <option>ม.ปลาย หรือเทียบเท่า</option>
              <option>ปวช./ประกาศนียบัตร</option>
              <option>ปวส./อนุปริญญา</option>
              <option>ป.ตรี หรือเทียบเท่า</option>
              <option>สูงกว่าปริญญาตรี</option>
              <option>เรียนสายศาสนา</option>
            </select>
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              สาเหตุ(กรณีหยุดเรียน/ออกกลางคัน)
            </label>
            <input
              type="text"
              id="first_name"
              class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              สถานะการทำงาน
            </label>
            <select
              id="currency"
              name="currency"
              className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
            >
              <option>ไม่ทำงาน</option>
              <option>ว่างงาน</option>
              <option>ทำงาน</option>
            </select>
          </div>

          <div className="">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              อาชีพ
            </label>
            <select
              id="currency"
              name="currency"
              className="border border-transparent mb-5 bg-gray-50  rounded-lg w-full text-gray-500 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
            >
              <option>พืชเกษตร</option>
              <option>ประมง</option>
              <option>ปศุสัตว์</option>
              <option>รับจ้างภาคการเกษตร</option>
              <option>รับจ้างทั่วไปนอกภาคการเกษตร(รายวัน)</option>
              <option>ลูกจ้างทั่วไป บ.เอกชน โรงงาน โรงแรม ห้างร้าน</option>
              <option>ลูกจ้างหน่วยงานภาครัฐ/รัฐวิสาหกิจ</option>
              <option>รับราชการ/พนักงาหน่วยงานภาครัฐ/รัฐวิสาหกิจ</option>
              <option>ธุรกิจส่วนตัว/งานบริการ (เช่น ร้านขายของชำร้านซ่อมมอเตอร์ไซค์ ค้าขาย/หาบแร่/แผงลอยร้านเสริมสวย รับจ้างซักรีด ขับสามล้อ มอเตอร์ไซรับจ้างเป็นต้น)</option>
              <option>อื่นๆ(ระบุข้อถัดไป)</option>

            </select>
          </div>

        </div>


      </div>
    </div>
  );
};
