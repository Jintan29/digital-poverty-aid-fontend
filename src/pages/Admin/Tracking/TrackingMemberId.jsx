import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import config from "../../../config";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import Modal from "../../../components/Modal";
import { Dropdown } from "flowbite-react";
//แปลง พศ (day js)
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.locale("th");
dayjs.extend(buddhistEra);
//chartJS
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

// Impoort components
import PersonalInfo from "../../../components/TrackingMember/PersonalInfo";
import HouseholdInfo from "../../../components/TrackingMember/HouseholdInfo";
import IncomeInflationChart from "../../../components/TrackingMember/IncomeInflationChart";
import WelfareDoughnutChart from "../../../components/TrackingMember/WelfareDoughnutChart";
import SkillsTimeline from "../../../components/TrackingMember/SkillsTimeline";

const TrackingMemberId = () => {
  const [member, setMember] = useState({});
  const [memberFinancial, setMemberFinancial] = useState([]);
  const [charData, setChartData] = useState([]); //กราฟแรก
  const { id } = useParams();

  const [socialWelfare, setSocialWelfare] = useState([]);
  const [hasWelfare, setHasWelfare] = useState(true); //เงื่อนไขเก็บไว้แสดงข้อมูลหากไม่มีสวัสดิการ
  const [donughtData, setDonughtData] = useState({});

  const [carrer, setCarrer] = useState([]);

  // Modal
  const [editModal, setEditModal] = useState(false);
  const [incomeModal, setIncomeModal] = useState(false);
  const [welfareModal, setWelfareModal] = useState(false);
  const [careerModal, setCareerModal] = useState(false);

  //สวัสดิการเดี๋ยวค่อยมาลบ
  const availableBenefits = [
    "ไม่ได้รับ",
    "เด็กแรกเกิด",
    "เบี้ยผู้สูงอายุ/คนชรา",
    "เบี้ยคนพิการ",
    "ประกันสังคม(มาตรา33)",
    "ประกันตนเอง(ม.40)",
    "บัตรสวัสดิการแห่งรัฐ",
    "การเยียวยาโควิดจากรัฐ",
    "ไม่ทราบ",
    "ทุนการศึกษา",
    "เบี้ยซ่อมแซมบ้าน",
    "อุปกรณ์ช่วยเหลือคนพิการ",
  ];

  const Career = [
    "พืชเกษตร",
    "ประมง",
    "ปศุสัตว์",
    "รับจ้างภาคการเกษตร",
    "รับจ้างทั่วไปนอกภาคการเกษตร(รายวัน)",
    "ลูกจ้างทั่วไป บ.เอกชน",
    "ลูกจ้างหน่วยงานภาครัฐ/รัฐวิสาหกิจ",
    "รับราชการ/พนักงาหน่วยงานภาครัฐ/รัฐวิสาหกิจ",
    "ธุรกิจส่วนตัว/งานบริการ",
  ];

  //สำหรับ load ข้อมูลเท่านั้น
  useEffect(() => {
    loadData();
    loadFinancial();
  }, []);

  //สำหรับรวม data หลัง call api (rechart)
  useEffect(() => {
      const financialData = memberFinancial.map((data, index) => ({
        // return [{},{},..]
        month: formatDate(data.createdAt),
        income: data.agv_income,
        expenses: data.avg_expenses,
        inflation: data.inflation,
      }));

      setChartData([ ...financialData]);

    
  }, [ memberFinancial]);

  // กำหนดสีพื้นหลังที่ใช้ในกราฟและ grid items
  const backgroundColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#E7E9ED",
    "#FF6384",
    "#36A2EB",
  ];

  //Donut + social welfare
  useEffect(() => {
    //หากไม่มีสวัสดิการ
    if (
      socialWelfare.length < 2 &&
      (socialWelfare.length === 0 ||
        socialWelfare.some((e) => e.welfare === "ไม่ได้รับ"))
    ) {
      setHasWelfare(false);
      return;
    }

    //หากมี แยก label , value เป็น {} เตรียมแสดงผล
    if (socialWelfare.length > 0) {
      const filteredWelfare = socialWelfare.filter(
        (item) => item.welfare !== "ไม่ได้รับ"
      ); //กรองออก

      const labels = filteredWelfare.map((data) => data.welfare);
      const dataValue = filteredWelfare.map((data) => data.amount);
      const frequency = filteredWelfare.map((data) => data.frequency);

      setDonughtData({
        labels: labels,
        datasets: [
          {
            label: "จำนวนเงินสวัสดิการ",
            data: dataValue,
            backgroundColor: backgroundColors.slice(0, labels.length),
            hoverBackgroundColor: backgroundColors.slice(0, labels.length),
            frequency: frequency,
          },
        ],
      });
      setHasWelfare(true);
    }
  }, [socialWelfare]);

  const loadData = async () => {
    try {
      const res = await axios.get(
        config.api_path + `/member-household/findOne/${id}`,
        config.headers()
      );
      setMember(res.data.data);
      setSocialWelfare(res.data.data.SocialWelfares);
      setCarrer(res.data.data.Careers);
    } catch (err) {
      Swal.fire({
        title: "error",
        text: err.response?.data?.message || err.message,
        icon: "error",
      });
    }
  };

  const loadFinancial = async () => {
    try {
      const res = await axios.get(
        config.api_path + `/member-household/findCapital/${id}`,
        config.headers()
      );
      setMemberFinancial(res.data.results);
    } catch (err) {
      Swal.fire({
        title: "errors",
        icon: "error",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  //แปลงวันจาก createdAt
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const option = { month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("th-TH", option).format(date);
  };

  return (
    <>
      <div className="mx-3 my-5">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold ">ระบบติดตามข้อมูลรายบุคคล</h2>

          <div className="">
            {/* renderTrigger = custom components */}
            <Dropdown
              label="เพิ่มข้อมูล"
              dismissOnClick={false}
              renderTrigger={() => (
                <button
                  type="button"
                  class="flex items-center focus:outline-none text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  <Icon
                    width={20}
                    height={20}
                    className="mr-2"
                    icon="material-symbols:assignment-add-rounded"
                  />
                  เพิ่มข้อมูล
                </button>
              )}
            >
              <Dropdown.Item onClick={() => setEditModal(true)}>
                <Icon
                  width={20}
                  height={20}
                  className="mr-2"
                  icon="material-symbols:person-edit-rounded"
                />
                แก้ไขข้อมูลส่วนบุคคล
              </Dropdown.Item>
              <Dropdown.Item onClick={(e) => setIncomeModal(true)}>
                <Icon
                  width={20}
                  height={20}
                  className="mr-2"
                  icon="material-symbols:monetization-on-rounded"
                />
                เพิ่มข้อมูลรายได้
              </Dropdown.Item>
              <Dropdown.Item onClick={(e) => setWelfareModal(true)}>
                <Icon
                  width={20}
                  height={20}
                  className="mr-2"
                  icon="material-symbols:family-restroom-rounded"
                />
                เพิ่มสวัสดิการ
              </Dropdown.Item>
              <Dropdown.Item onClick={(e) => setCareerModal(true)}>
                <Icon
                  width={20}
                  height={20}
                  className="mr-2"
                  icon="material-symbols:psychiatry-rounded"
                />
                เพิ่มทักษะอาชีพ
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {/* PersonalInfo */}
          <PersonalInfo member={member} carrer={carrer} />

          {/* HouseholdInfo */}
          <HouseholdInfo household={member.Household} />
        </div>

        {/* Chart Income */}
        <h2 className="text-xl font-bold mt-10">
          รายได้เปรียบเทียบอัตตราเงินเฟ้อ
        </h2>
        <div className=" mt-10 pt-10 flex justify-center rounded-lg shadow bg-white">
          <IncomeInflationChart charData={charData} />
        </div>

        {/* ---- Welfare & Skills ---- */}
        <h2 className="text-xl font-bold my-5">
          สวัสดิการที่ได้รับ และ ไทม์ไลน์ทักษะอาชีพ
        </h2>
        <div className="grid grid-cols-2 gap-4 ">
          <WelfareDoughnutChart
            socialWelfare={socialWelfare}
            donughtData={donughtData}
            hasWelfare={hasWelfare}
          />

          <SkillsTimeline carrer={carrer} />
        </div>

        <Modal
          title="เพิ่ม/แก้ไข ข้อมูลสมาชิกครัวเรือน"
          show={editModal}
          icon="material-symbols:person-edit-rounded"
          onClose={(e) => setEditModal(false)}
          size="3xl"
        >
          <div className="grid gap-2 grid-cols-2">
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                ชื่อจริง
              </label>
              <div className="flex items-center gap-2 mb-5">
                <select
                  id="title"
                  name="title"
                  className="border border-gray-300 bg-white text-gray-900 text-sm 
                   rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2
                   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                   dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>นาย</option>
                  <option>นาง</option>
                  <option>นางสาว</option>
                  <option>เด็กชาย</option>
                  <option>เด็กหญิง</option>
                </select>

                <input
                  id="fname"
                  name="fname"
                  type="text"
                  required
                  placeholder=""
                  className="border border-gray-300 bg-gray-50 text-gray-900 text-sm 
                   rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 
                   w-full dark:bg-gray-700 dark:border-gray-600 
                   dark:placeholder-gray-400 dark:text-white 
                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                นามสกุล
              </label>
              <input
                id="fname"
                name="fname"
                type="text"
                required
                placeholder=""
                className="border border-gray-300 bg-gray-50 text-gray-900 text-sm 
                   rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 
                   w-full dark:bg-gray-700 dark:border-gray-600 
                   dark:placeholder-gray-400 dark:text-white 
                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                เบอร์โทรศัพท์
              </label>
              <input
                name="fname"
                type="number"
                required
                placeholder=""
                className="border border-gray-300 bg-gray-50 text-gray-900 text-sm 
                   rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 
                   w-full dark:bg-gray-700 dark:border-gray-600 
                   dark:placeholder-gray-400 dark:text-white 
                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div>
              <label
                for="national_id"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                หมายเลขบัตรประจำตัวประชาชน
              </label>
              <input
                type="text"
                id="national_id"
                // value={member.national_id}
                // onChange={(e) =>
                //   handleInputChange(index, "national_id", e.target.value)
                // }
                class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>

            <div className="">
              <label
                for="birthdate"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                วันเกิด ตัวอย่าง (2546-04-13)
              </label>
              <input
                type="text"
                id="birthdate"
                pattern="\d{4}-\d{2}-\d{2}"
                placeholder="พ.ศ.-เดือน-วัน"
                // value={member.birthdate}
                // onInvalid={(e) =>
                //   e.target.setCustomValidity(
                //     "กรุณากรอกวันเกิดในรูปแบบ (ปี-เดือน-วัน) เช่น 2546-04-13"
                //   )
                // }
                // onInput={(e) => e.target.setCustomValidity("")} // เคลียร์ข้อความเมื่อผู้ใช้แก้ข้อมูล
                // onChange={(e) =>
                //   handleInputChange(index, "birthdate", e.target.value)
                // }
                class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                for="health"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                สุขภาพ
              </label>
              <select
                id="health"
                name="health"
                // value={member.health}
                // onChange={(e) =>
                //   handleInputChange(index, "health", e.target.value)
                // }
                className="border border-gray-300  mb-5 bg-gray-50  rounded-lg w-full text-gray-900 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
              >
                <option>ปกติ</option>
                <option>ป่วยเรื้อรังไม่ติดเตียง(เช่น หัวใจ เบาหวาน)</option>
                <option>พึ่งพาตนเองได้</option>
                <option>ผู้ป่วยติดเตียง/พิการพึ่งพาตัวเองไม่ได้</option>
              </select>
            </div>

            <div>
              <label
                for="current_edu_level"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                กำลังศึกษาระดับ
              </label>
              <select
                id="current_edu_level"
                name="current_edu_level"
                // value={member.current_edu_level}
                // onChange={(e) =>
                //   handleInputChange(
                //     index,
                //     "current_edu_level",
                //     e.target.value
                //   )
                // }
                className="border border-gray-300  mb-5 bg-gray-50  rounded-lg w-full text-gray-900 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
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
                for="max_education "
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                การศึกษาสูงสุด
              </label>
              <select
                id="max_education "
                name="max_education "
                // value={member.max_education}
                // onChange={(e) =>
                //   handleInputChange(index, "max_education", e.target.value)
                // }
                className="border border-gray-300 mb-5 bg-gray-50  rounded-lg w-full text-gray-900 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
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

            <div>
              <label
                for="work_status "
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                สถานะการทำงาน
              </label>
              <select
                id="work_status "
                name="work_status "
                // value={member.work_status}
                // onChange={(e) =>
                //   handleInputChange(index, "work_status", e.target.value)
                // }
                className="border border-gray-300  mb-5 bg-gray-50  rounded-lg w-full text-gray-900 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
              >
                <option>ไม่ทำงาน</option>
                <option>ว่างงาน</option>
                <option>ทำงาน</option>
              </select>
            </div>

            <div className="">
              <label
                for="status_in_house"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                สถานะตามทะเบียนบ้าน
              </label>
              <select
                id="status_in_house"
                name="status_in_house"
                // value={member.status_in_house}
                // onChange={(e) =>
                //   handleInputChange(index, "status_in_house", e.target.value)
                // }
                className="border border-gray-300 mb-5 bg-gray-50  rounded-lg w-full text-gray-900 text-sm focus:ring-0 focus:outline-none  focus:border-gray-500 focus:rounded-md"
              >
                <option>มีชื่อและอาศัยอยู่</option>
                <option>มีชื่อแต่ไม่อาศัย</option>
                <option>ไม่มีชื่อแต่อาศัยอยู่</option>
              </select>
            </div>
          </div>
        </Modal>

        <Modal
          title="เพิ่มข้อมูลรายได้"
          show={incomeModal}
          icon="material-symbols:monetization-on-rounded"
          onClose={(e) => setIncomeModal(false)}
          size="4xl"
        >
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
                      รายได้เฉลี่ย
                    </th>
                    <th scope="col" class="px-6 py-3">
                      รายจ่ายเฉลี่ย
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
                    <td
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      10,000
                    </td>
                    <td class="px-6 py-4 text-gray-900">7,000</td>
                    <td class="px-6 py-4 text-gray-900">1.1%</td>
                    <td class="px-6 py-4 text-gray-900">1/1/2568</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Input */}
            <div className="mt-2 bg-white p-6 pl-2 rounded-lg shadow-m ">
              <h3 className="text-base font-semibold mb-6 text-gray-800 e">
                บันทึกข้อมูลใหม่
              </h3>

              <form className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  {/* Income */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      รายได้เฉลี่ย
                    </label>

                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        ฿
                      </span>
                      <input
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 p-2.5"
                        placeholder="0.00"
                        // value={formData.averageExpense}
                        // onChange={(e) =>
                        //   setFormData({
                        //     ...formData,
                        //     averageExpense: e.target.value,
                        //   })
                        // }
                        required
                      />
                    </div>
                  </div>

                  {/* Expense Input */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      รายจ่ายเฉลี่ย
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        ฿
                      </span>
                      <input
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 p-2.5"
                        placeholder="0.00"
                        // value={formData.averageExpense}
                        // onChange={(e) =>
                        //   setFormData({
                        //     ...formData,
                        //     averageExpense: e.target.value,
                        //   })
                        // }
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
                        // value={formData.inflationRate}
                        // onChange={(e) =>
                        //   setFormData({
                        //     ...formData,
                        //     inflationRate: e.target.value,
                        //   })
                        // }
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
                    // onClick={() =>
                    //   setFormData({
                    //     averageIncome: "",
                    //     averageExpense: "",
                    //     inflationRate: "",
                    //   })
                    // }
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
        </Modal>

        <Modal
          title="เพิ่มสวัสดิการ"
          show={welfareModal}
          icon="material-symbols:family-restroom-rounded"
          onClose={(e) => setWelfareModal(false)}
          size="5xl"
        >
          <>
            <div className="p-2">
              <h2 className="text-lg font-semibold mb-4">
                ตัวอย่างสวัสดิการในระบบ
              </h2>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="grid  grid-cols-4 gap-x-4 gap-y-2">
                  {availableBenefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors py-1"
                    >
                      • {benefit}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-2 bg-white p-6 pl-2 rounded-lg shadow-m ">
                <h3 className="text-base font-semibold mb-6 text-gray-800 e">
                  เพิ่มสวัสดิการที่ได้รับ
                </h3>

                <form className="space-y-6">
                  <div className="grid grid-cols-3 gap-6 bg-slate-50 p-3 rounded-md">
                    {/* สวัสดิการ */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        สวัสดิการ
                      </label>

                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5"
                        placeholder="ระบุสวัสดิการที่ได้รับ"
                        // value={formData.averageExpense}
                        // onChange={(e) =>
                        //   setFormData({
                        //     ...formData,
                        //     averageExpense: e.target.value,
                        //   })
                        // }
                        required
                      />
                    </div>

                    {/* จำนวน */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        จำนวน(บาท)
                      </label>

                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                          ฿
                        </span>
                        <input
                          type="number"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 p-2.5"
                          placeholder="0.00"
                          // value={formData.averageExpense}
                          // onChange={(e) =>
                          //   setFormData({
                          //     ...formData,
                          //     averageExpense: e.target.value,
                          //   })
                          // }
                          required
                        />
                      </div>
                    </div>

                    {/* ความถี่ */}

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        ความถี่
                      </label>

                      <input
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5"
                        placeholder="0.00"
                        // value={formData.averageExpense}
                        // onChange={(e) =>
                        //   setFormData({
                        //     ...formData,
                        //     averageExpense: e.target.value,
                        //   })
                        // }
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-200"
                      // onClick={() =>
                      //   setFormData({
                      //     averageIncome: "",
                      //     averageExpense: "",
                      //     inflationRate: "",
                      //   })
                      // }
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

        <Modal
          title="เพิ่มทักษะอาชีพ"
          show={careerModal}
          icon="material-symbols:psychiatry-rounded"
          onClose={(e) => setCareerModal(false)}
          size="6xl"
        >
          <div className="p-2">
            <h2 className="text-lg font-semibold mb-4">
              โปรดเลือกทักษะอาชีพเพิ่มเติม
            </h2>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-2">
                {Career.map((data, index) => (
                  <div>
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                    />
                    <label
                      for="default-checkbox"
                      class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {data}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="text-base font-semibold my-4">
              อาชีพอื่นๆ
              <span className="pl-4 text-sm font-medium my-4">
                (กดเครื่องหมาย + เพื่อเพิ่มอาชีพ)
              </span>
            </h2>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-start gap-2">
                <div className="flex-grow">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    อาชีพ(1)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block flex-1 p-2.5"
                      placeholder="ระบุอาชีพ"
                      required
                    />
                    <button
                      //onClick={() => removeInputField(index)}
                      className="px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      <Icon
                        icon="material-symbols:delete-forever-rounded"
                        className=" mt-0.5 text-lg"
                      />
                    </button>

                    <button
                      //onClick={addInputField}
                      className="px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
                    >
                      <Icon
                        icon="material-symbols:add-2-rounded"
                        className=" mt-0.5 text-lg"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/**SUBMIT BTN */}
            <div className="flex justify-end gap-4 mt-7">
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
              >
                บันทึกข้อมูล
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default TrackingMemberId;
