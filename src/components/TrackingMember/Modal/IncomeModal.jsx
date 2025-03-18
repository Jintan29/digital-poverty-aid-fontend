import React, { useEffect, useState } from "react";
import Modal from "../../Modal";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../../config";
import { useParams } from "react-router-dom";
import dayjs from 'dayjs'


const IncomeModal = ({ show, onClose, member, loadFinancial }) => {
  const { id } = useParams(); //member id

  const [formData, setFormData] = useState({
    agv_income: null,
    avg_expenses: null,
    inflation: null,
    member_house_id: id,
  });

  const [lastFinancial, setLastFinancial] = useState({});

  useEffect(() => {
    loadLastFinancial();
  }, []);

  //ดึงข้อมูลการเงินล่าสุด
  const loadLastFinancial = async () => {
    try {
      const res = await axios.get(
        config.api_path + `/member-financial/LastFinancial/${id}`,
        config.headers()
      );
      if (res.data.message === "success") {
        setLastFinancial(res.data.result);
      }
    } catch (err) {
      Swal.fire({
        title: "error",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  const handleInputChange = (field, value) => {
    const updateData = { ...formData };
    updateData[field] = value;
    setFormData(updateData);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await Swal.fire({
        title: "เพิ่มข้อมูลรายได้",
        text: "ตรวจสอบถูกต้องแล้วใช่หรือไม่",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
      });

      if (res.isConfirmed) {
        const res = await axios.post(
          config.api_path + `/member-financial/create`,
          formData,
          config.headers()
        );

        if (res.data.message === "success") {
          Swal.fire({
            title: "บันทึกข้อมูล",
            text: "บันทึกข้อมูลเสร็จสิ้น",
            icon: "success",
            timer: 1500,
          });
          onClose();
          loadLastFinancial();
          loadFinancial();
          setFormData({
            agv_income: "",
            avg_expenses: "",
            inflation: "",
            member_house_id: member.id,
          })
        }
      }
    } catch (err) {
      Swal.fire({
        title: "error",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  return (
    <Modal
      title="เพิ่มข้อมูลรายได้"
      show={show}
      icon="material-symbols:monetization-on-rounded"
      onClose={onClose}
      size="4xl"
    >
      <>
        <div>
          <h2 className="my-1 mb-5 font-semibold text-lg">
            ข้อมูลรายการย้อนหลังล่าสุด{" "}
          </h2>
          {/* Table */}
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-base text-gray-700 uppercase bg-blue-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    รายได้เฉลี่ย/เดือน
                  </th>
                  <th scope="col" class="px-6 py-3">
                    รายจ่ายเฉลี่ย/เดือน
                  </th>
                  <th scope="col" class="px-6 py-3">
                    อัตราเงินเฟ้อ
                  </th>
                  <th scope="col" class="px-6 py-3">
                    วันที่บันทึก
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                  {lastFinancial && (
                    <>
                      <td
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {parseInt(lastFinancial.agv_income).toLocaleString('th-TH')}  บาท/เดือน
                      </td>
                      <td class="px-6 py-4 text-gray-900">
                        {parseInt(lastFinancial?.avg_expenses).toLocaleString('th-TH')} บาท/เดือน
                      </td>
                      <td class="px-6 py-4 text-gray-900">
                        {lastFinancial?.inflation} %
                      </td>
                      <td class="px-6 py-4 text-gray-900">
                        {dayjs(lastFinancial?.createdAt).format('DD/MM/YYYY')}
                      </td>
                    </>
                  )}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Input */}
          <div className="mt-2 bg-white p-6 pl-2 rounded-lg shadow-m ">
            <h3 className="text-base font-semibold mb-6 text-gray-800 e">
              บันทึกข้อมูลใหม่
            </h3>

            <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
              <div className="grid grid-cols-3 gap-6">
                {/* Income */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    รายได้เฉลี่ย/เดือน
                  </label>

                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      ฿
                    </span>
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 p-2.5"
                      placeholder="0.00"
                      name="agv_income"
                      value={formData.agv_income}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                {/* Expense Input */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    รายจ่ายเฉลี่ย/เดือน
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      ฿
                    </span>
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 p-2.5"
                      placeholder="0.00"
                      name="avg_expenses"
                      value={formData.avg_expenses}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                {/* Inflation Rate Input */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    อัตราเงินเฟ้อ
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 p-2.5"
                      placeholder="0.00"
                      name="inflation"
                      value={formData.inflation}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      required
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                      %
                    </span>
                  </div>
                </div>
              </div>
              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-200"
                  onClick={() =>
                    setFormData({
                      agv_income: "",
                      avg_expenses: "",
                      inflation: "",
                      member_house_id: member.id,
                    })
                  }
                >
                  ล้างข้อมูล
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default IncomeModal;
