import React from "react";
//จัดการวันที่
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import th from "date-fns/locale/th"; // นำเข้า locale ภาษาไทย
import ThaiDatePicker from "./ThaiDatePicker";

// ลงทะเบียน locale ภาษาไทย
registerLocale("th", th);

export const FristPage = () => {
  return (
    <div>
      <div>
        <form>
          <div class="mb-6 mx-10 mt-10">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              รหัสบ้าน
            </label>
            <input
              type="text"
              id="house_Id"
              class="bg-gray-50 border my-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="HC-XXXXXXX"
              required
            />
            <label
              for="green_book"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              หมายเลขครัวเรือนเกษตรกร(สมุดเขียว)
            </label>

            {/* CheckBox1 */}
            <div class="flex items-center h-5 ">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
              <label className="px-5">ไม่มี</label>
            </div>
            {/* CheckBox2 */}
            <div class="flex items-center h-5 mt-4">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
              <label className="px-5">มี หมายเลข</label>
              <input
                type="text"
                id="house_Id"
                class="bg-gray-50 border my-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="หมายเลขครัวเรือนเกษตร"
                required
              />
            </div>
          </div>

          <div class="grid gap-6 mb-6 mt-6 md:grid-cols-4  mx-10">
            <div className="">
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ชื่อหมู่บ้าน
              </label>
              <input
                type="text"
                id="first_name"
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label
                for="last_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                บ้านเลขที่
              </label>
              <input
                type="text"
                id="last_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doe"
                required
              />
            </div>
            <div>
              <label
                for="company"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ซอย
              </label>
              <input
                type="text"
                id="company"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Flowbite"
                required
              />
            </div>
            <div>
              <label
                for="phone"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ถนน
              </label>
              <input
                type="tel"
                id="phone"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="123-45-678"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required
              />
            </div>
            <div>
              <label
                for="website"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ตำบล
              </label>
              <input
                type="url"
                id="website"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="flowbite.com"
                required
              />
            </div>
            <div>
              <label
                for="visitors"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                อำเภอ
              </label>
              <input
                type="number"
                id="visitors"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                for="visitors"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                จังหวัด
              </label>
              <input
                type="number"
                id="visitors"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                for="visitors"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                รหัสไปรษณีย์
              </label>
              <input
                type="number"
                id="visitors"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
          </div>

          <div className="my-6 mx-10">
            <h3>
              <b>ข้อมูล เจ้าบ้าน</b>
            </h3>
          </div>

          <div className="mb-6 mx-10 grid gap-6  md:grid-cols-3">
            <div className="relative  rounded-md shadow-sm">
              <label
                for="visitors"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ชื่อ เจ้าบ้าน ตามทะเบียนบ้าน
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-7">
                <label htmlFor="currency" className="sr-only">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="border border-transparent bg-transparent text-gray-500 text-sm focus:ring-0 focus:outline-none w-20 focus:border-gray-500 focus:rounded-md"
                >
                  <option>นาย</option>
                  <option>นาง</option>
                  <option>นางสาว</option>
                </select>
              </div>
              <input
                id="price"
                name="text"
                type="text"
                placeholder=""
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-24 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div className="">
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                หมายเลขบัตรประจำตัวประชาชน <b>เจ้าบ้าน</b>
              </label>
              <input
                type="text"
                id="first_name"
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
          </div>

          <div className="my-6 mx-10 mt-10">
            <h3>
              <b>ข้อมูล ผู้ให้ข้อมูล</b> (ต้องเป็นบุคคลที่อาศัยอยู่ในครัวเรือน
              หรือ ได้รับความยินยอมจากบุคคลในครัวเรือน ให้เป็นผู้ให้ข้อมูล)
            </h3>
          </div>

          <div className="mb-6 mx-10 grid gap-6  md:grid-cols-4 mt-5">
            <div className="relative  rounded-md shadow-sm">
              <label
                for="visitors"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ชื่อ ผู้ให้ข้อมูล
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-7">
                <label htmlFor="currency" className="sr-only">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="border border-transparent bg-transparent text-gray-500 text-sm focus:ring-0 focus:outline-none w-20 focus:border-gray-500 focus:rounded-md"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-24 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>

            <div className="">
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                กรณีไม่มีบัตรให้ระบุว่า
              </label>
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
              <label className="px-5">ไม่มีบัตร</label>
            </div>

            <div className="">
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                หมายเลขโทรศัพท์ (บ้าน/มือถือ)
              </label>
              <input
                type="text"
                id="first_name"
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ระบุหมายเลขโทรศัพท์"
                required
              />
            </div>

            <div className="">
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                จำนวนสมาชิคตามทะเบียนบ้าน(คน)
              </label>
              <input
                type="text"
                id="first_name"
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ระบุจำนวนสมาชิค"
                required
              />
            </div>

            <div className="">
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                อาศัยอยู่จริงในครัวเรือน(คน)
              </label>
              <input
                type="text"
                id="first_name"
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ระบุจำนวนสมาชิค"
                required
              />
            </div>

            <div className="">
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                จำนวนสมาชิคที่อาศัยแต่ไม่มีชื่อในทะเบียนบ้าน(คน)
              </label>
              <input
                type="text"
                id="first_name"
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ระบุจำนวนสมาชิค"
                required
              />
            </div>

            <div className="">
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                จำนวนสมาชิคที่ไม่ได้อาศัยแต่มีชื่อในทะเบียนบ้าน(คน)
              </label>
              <input
                type="text"
                id="first_name"
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ระบุจำนวนสมาชิค"
                required
              />
            </div>
          </div>

          <div className="my-6 mx-10 ">
            <label
              for="first_name"
              class="block mb-2  font-medium text-gray-900 dark:text-white text-base"
            >
              ผู้ให้ข้อมูลได้รับทราบและเข้าใจวัตถุประสงค์ของโครงการอย่างครบถ้วน
              ชัดเจน และยินยอมให้ใช้ข้อมูลที่มีการจัดเก็บตามวัตถุประสงค์
              ของโครงการเท่านั้น
            </label>
          </div>

          <div className="mt-6 mx-10 mb-3">
            <h3>
              <b>สำหรับทีมสำรวจข้อมูล</b>
            </h3>
          </div>

          <div class="grid gap-6 mb-6 mt-6 md:grid-cols-3  mx-10">
            <div className="relative  rounded-md shadow-sm">
              <label
                for="visitors"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                1.ชื่อผู้สำรวจ
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-7">
                <label htmlFor="currency" className="sr-only">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="border border-transparent bg-transparent text-gray-500 text-sm focus:ring-0 focus:outline-none w-20 focus:border-gray-500 focus:rounded-md"
                >
                  <option>นาย</option>
                  <option>นาง</option>
                  <option>นางสาว</option>
                </select>
              </div>
              <input
                id="price"
                name="text"
                type="text"
                placeholder=""
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-24 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>

            <div className="">
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                เบอร์โทรศัพท์
              </label>
              <input
                type="text"
                id="first_name"
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>

            <div className="relative  rounded-md shadow-sm">
              <label
                for="visitors"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                2.ชื่อผู้สำรวจ
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-7">
                <label htmlFor="currency" className="sr-only">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="border border-transparent bg-transparent text-gray-500 text-sm focus:ring-0 focus:outline-none w-20 focus:border-gray-500 focus:rounded-md"
                >
                  <option>นาย</option>
                  <option>นาง</option>
                  <option>นางสาว</option>
                </select>
              </div>
              <input
                id="price"
                name="text"
                type="text"
                placeholder=""
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-24 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>

            <div className="">
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                เบอร์โทรศัพท์
              </label>
              <input
                type="text"
                id="first_name"
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
          </div>

          <div className="mt-6 mx-10 ">
            <h4>
              <b>วันที่สำรวจ</b>
            </h4>
          </div>

          {/* components เก็บวันที่ */}
          <ThaiDatePicker />

          <div className="mt-6 mx-10 ">
            <h3>
              <b>สำหรับ ผู้บันทึกข้อมูล</b>
            </h3>
          </div>

          <div class="grid gap-6 mb-6 mt-3 md:grid-cols-4  mx-10">
            <div className="relative  rounded-md shadow-sm">
              <label
                for="visitors"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ชื่อผู้บันทึก
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-7">
                <label htmlFor="currency" className="sr-only">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="border border-transparent bg-transparent text-gray-500 text-sm focus:ring-0 focus:outline-none w-20 focus:border-gray-500 focus:rounded-md"
                >
                  <option>นาย</option>
                  <option>นาง</option>
                  <option>นางสาว</option>
                </select>
              </div>
              <input
                id="price"
                name="text"
                type="text"
                placeholder=""
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-24 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>

            <div className="">
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                เบอร์โทรศัพท์
              </label>
              <input
                type="text"
                id="first_name"
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                วันที่บันทึกข้อมูล
              </label>
              <DatePicker
                locale="th"
                dateFormat="dd/MM/yyyy"
                className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholderText="เลือกวันที่"
              />
            </div>
          </div>

          <div className="my-6 mx-10 ">
            <label
              for="first_name"
              class="block mb-2  font-medium text-gray-900 dark:text-white text-base"
            >
              <b>หมายเหตุ</b>
            </label>
            <div className="text-sm">
            <p>
              1. ควรทำการสำรวจ ณ บ้านพักอาศัยของผู้ตอบ
              เพื่อจะได้สังเกตสภาพแวดล้อมของที่อาศัยได้
            </p>
            <p>
              2. ขอดูทะเบียนบ้าน เพื่อบันทึกเลขที่บ้าน ที่อยู่
              ชื่อสมาชิกและหมายเลขบัตรประชาชนของทุกคนในครัวเรือนได้ถูกต้อง
            </p>
            <p>
              3. หากพบผู้ไม่มีบัตร/ทะเบียนบ้าน
              ทั้งที่อาศัยอยู่คนเดียว/ครอบครัวให้เก็บข้อมูลเพิ่มเติม
              เพื่อนำเข้าสู่ระบบช่วยเหลือ
              กรณีที่เป้าหมายไม่มีหลักฐานแสดงตัวตนและครอบครัวว่าเป็นไทย
              แต่มีผู้รับรอง/ยืนยันว่าอาศัยอยู่ในพื้นที่ต่อเนื่องให้ทีมสำรวจ
              บันทึกเป็นข้อสังเกตไว้
            </p>
            </div>
            
          </div>

          <div class="flex items-start mb-6">
            {/* <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div> */}
            {/* <label
              for="remember"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              I agree with the{" "}
              <a
                href="#"
                class="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
              .
            </label> */}
          </div>
          {/* <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button> */}
        </form>
      </div>
    </div>
  );
};
