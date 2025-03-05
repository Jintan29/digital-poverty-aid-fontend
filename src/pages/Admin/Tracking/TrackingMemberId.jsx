import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import config from "../../../config";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
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
import HelpMemberInfo from "../../../components/TrackingMember/HelpMemberInfo";

//import Modal
import EditModal from "../../../components/TrackingMember/Modal/EditModal";
import IncomeModal from "../../../components/TrackingMember/Modal/IncomeModal";
import WelfareModal from "../../../components/TrackingMember/Modal/WelfareModal";
import CareerModal from "../../../components/TrackingMember/Modal/CareerModal";



const TrackingMemberId = () => {
  const [member, setMember] = useState({});
  const [memberFinancial, setMemberFinancial] = useState([]);
  const [prediction,setPrediction] = useState(null)
  const [charData, setChartData] = useState([]); //กราฟแรก
  const [helpData,setHelpData] = useState([])
  const { id } = useParams(); //id สมาชิกครัวเรือน

  const [socialWelfare, setSocialWelfare] = useState([]);
  const [hasWelfare, setHasWelfare] = useState(true); //เงื่อนไขเก็บไว้แสดงข้อมูลหากไม่มีสวัสดิการ
  const [donughtData, setDonughtData] = useState({});

  const [carrer, setCarrer] = useState([]);

  // Modal
  const [editModal, setEditModal] = useState(false);
  const [incomeModal, setIncomeModal] = useState(false);
  const [welfareModal, setWelfareModal] = useState(false);
  const [careerModal, setCareerModal] = useState(false);


  //สำหรับ load ข้อมูลเท่านั้น
  useEffect(() => {
    loadData();
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

      //เพิ่ม Bar สำหรับแสดง pridict
      const lastData = memberFinancial[memberFinancial.length - 1];
      
      if (lastData && prediction) {
        const lastDate = new Date(lastData.createdAt);
        // สร้างวันที่สำหรับปีถัดไป
        const nextYear = new Date(
          lastDate.getFullYear() + 1,
          lastDate.getMonth(),
          lastDate.getDate()
        );
    
        const predictionData = {
          month: formatDate(nextYear) + ' (คาดการณ์)',
          predictedIncome: prediction,
          expenses: null,
          inflation: null
        };
    
        setChartData([...financialData, predictionData]);
      } else {
        setChartData(financialData);
      }

    
  }, [ memberFinancial,prediction]);

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
      setHelpData(res.data.data.HelpMembers)
    } catch (err) {
      Swal.fire({
        title: "error",
        text: err.response?.data?.message || err.message,
        icon: "error",
      });
    }
  };

  //เช็คข้อมูล member หากมีค่าแล้วค่อยไป load financial
  useEffect(()=>{
    if(member && member.Household?.district){
      loadFinancial()
    }
  },[member])

  const loadFinancial = async () => {
    try {
      const res = await axios.get(
        config.api_path + `/member-financial/${id}/predict`,
        {
          params:{
            district:member.Household?.district
          },
          ...config.headers(),
        }
      );
      console.log(res);
      
      setMemberFinancial(res.data.results.financial);
      setPrediction(res.data.results.prediction)

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
              <Dropdown.Item >
                <Link
                className="flex justify-center"
                to={`/admin/helplog/${member.id}`}
                >
                  <Icon
                  width={20}
                  height={20}
                  className="mr-2"
                  icon="material-symbols:handshake-outline"
                />
                เพิ่มข้อมูลการช่วยเหลือ
                </Link>
                
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

        <h2 className="text-xl font-bold mt-10">
          ข้อมูลการได้รับความช่วยเหลือ
        </h2>
        <div className=" mt-10 py-10 flex justify-center rounded-lg shadow bg-white max-w-full">
          <HelpMemberInfo helpData={helpData} />
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

        {/* Modal */}
        
        <EditModal show={editModal} onClose={e=>setEditModal(false)} member={member} loadData={loadData} />
        <IncomeModal show={incomeModal} onClose={e=>setIncomeModal(false)} member={member} loadFinancial={loadFinancial} />
        <WelfareModal show={welfareModal} onClose={e=>setWelfareModal(false)} socialWelfare={socialWelfare} loadData = {loadData} />
        <CareerModal show={careerModal} onClose={e=>setCareerModal(false)} carrer={carrer} loadData={loadData} />

      </div>
    </>
  );
};

export default TrackingMemberId;
