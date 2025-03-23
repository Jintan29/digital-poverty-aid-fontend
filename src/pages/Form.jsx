import axios from "axios";
import React, { useEffect, useState } from "react";
import { FristPage } from "../components/Form/FristPage";
import { HumanCapital } from "../components/Form/HumanCapital";
import PhysicalCapital from "../components/Form/PhysicalCapital";
import Financialcapital from "../components/Form/Financialcapital";
import Socialcapital from "../components/Form/Socialcapital";
import Naturalcapital from "../components/Form/Naturalcapital";
import Southern from "../components/Form/Southern";
import Suggestions from "../components/Form/Suggestions";
import Naturalcapital2 from "../components/Form/Naturalcapital2";
import Swal from "sweetalert2";
import config from "../config";

export const Form = () => {
  const [currentPage, setCurrentPage] = useState(1); //เปลี่ยนหน้า
  const [pdpaConsent, setPdpaConsent] = useState(false); // เก็บสถานะการยินยอมตาม PDPA

  //เก็บData
  const [mainFormData, setMainFormData] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // แสดง PDPA consent เมื่อโหลดหน้าแบบฟอร์ม
  useEffect(() => {
    // ตรวจสอบว่าเคยยินยอมแล้วหรือไม่ (อาจเก็บใน localStorage)
    const hasConsent = localStorage.getItem("pdpaConsent") === "true";

    if (!hasConsent) {
      showPdpaConsentAlert();
    } else {
      setPdpaConsent(true);
    }
  }, []);

    // ฟังก์ชันแสดงการแจ้งเตือน PDPA
    const showPdpaConsentAlert = async () => {
      const result = await Swal.fire({
        title: 'นโยบายความเป็นส่วนตัวและการเก็บข้อมูลส่วนบุคคล',
        html: `
          <div style="text-align: left; overflow-y: auto; max-height: 300px; padding: 10px;">
            <p>ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) ระบบข้อมูลครัวเรือนยากจนระดับพื้นที่ของหน่วยบริหารและจัดการทุนด้านการพัฒนาระดับพื้นที่ (บพท.) ขอแจ้งให้ท่านทราบว่า:</p>
            
            <p><strong>1. วัตถุประสงค์ในการเก็บรวบรวมข้อมูล:</strong> ข้อมูลที่ท่านให้จะถูกนำไปใช้เพื่อวัตถุประสงค์ในการศึกษาและพัฒนาระบบข้อมูลครัวเรือนยากจนระดับพื้นที่ และการวิเคราะห์เพื่อประโยชน์ในการพัฒนาและแก้ไขปัญหาความยากจนในระดับพื้นที่</p>
            
            <p><strong>2. ประเภทข้อมูลที่เก็บรวบรวม:</strong> ประกอบด้วยข้อมูลส่วนบุคคล เช่น ชื่อ-นามสกุล ที่อยู่ หมายเลขโทรศัพท์ ข้อมูลรายได้ ทรัพย์สิน หนี้สิน และข้อมูลอื่นๆ ที่เกี่ยวข้องกับสถานะทางเศรษฐกิจและสังคมของครัวเรือน</p>
            
            <p><strong>3. ระยะเวลาในการเก็บรักษาข้อมูล:</strong> ข้อมูลของท่านจะถูกเก็บรักษาไว้ตลอดระยะเวลาดำเนินโครงการและอาจเก็บต่อไปตามที่กฎหมายกำหนด</p>
            
            <p><strong>4. สิทธิของเจ้าของข้อมูล:</strong> ท่านมีสิทธิในการเข้าถึง แก้ไข ลบ จำกัดการประมวลผล คัดค้านการประมวลผล และขอถอนความยินยอมเมื่อใดก็ได้ โดยติดต่อมาที่ [sradss.digitalproverty@gmail.com]</p>
            
            <p><strong>5. การเปิดเผยข้อมูล:</strong> ข้อมูลของท่านอาจถูกเปิดเผยให้กับหน่วยงานที่เกี่ยวข้องเพื่อประโยชน์ในการพัฒนาและแก้ไขปัญหาความยากจน โดยจะดำเนินการเฉพาะที่จำเป็นและถูกต้องตามกฎหมายเท่านั้น</p>
          </div>
        `,
        width: '900px',
        customClass: {
          popup: 'pdpa-popup-custom', 
          content: 'pdpa-content-custom'
        },
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'ยินยอม',
        cancelButtonText: 'ไม่ยินยอม',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
  
      if (result.isConfirmed) {
        // ผู้ใช้ยินยอม
        setPdpaConsent(true);
        localStorage.setItem('pdpaConsent', 'true');
      } else {
        // ผู้ใช้ไม่ยินยอม แจ้งว่าไม่สามารถใช้ระบบได้
        await Swal.fire({
          title: 'ไม่สามารถดำเนินการต่อได้',
          text: 'เนื่องจากท่านไม่ยินยอมให้เก็บข้อมูลส่วนบุคคล ท่านจึงไม่สามารถใช้บริการระบบนี้ได้',
          icon: 'warning',
          confirmButtonText: 'เข้าใจแล้ว'
        });
        
        // อาจจะ redirect ไปหน้าหลักหรือหน้าอื่นที่ไม่ต้องการข้อมูลส่วนบุคคล
        window.location.href = '/form'; // หรือหน้าอื่นๆที่เหมาะสม
      }
    };

  //submit form
  const handleSubmitMain = async (data) => {
    setIsProcessing(true);
    try {
      const resConfirm = await Swal.fire({
        title: "บันทึกข้อมูล",
        text: "ทำการตรวสอบข้อมูลเสร็จเรียบร้อยแล้วใช่หรือไม่",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
      });

      if (resConfirm.isConfirmed) {
        const res = await axios.post(
          config.api_path + "/formInsertAll/create",
          data
        );
        if (res.data.message === "success") {
          await Swal.fire({
            title: "บันทึกข้อมูล",
            text: "บันทึกข้อมูลสำเร็จ",
            icon: "success",
            showConfirmButton: true,
          });
          window.location.reload(); // refresh web
        }
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text:
          e.response && e.response.data ? e.response.data.message : e.message,
        icon: "error",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // ตรวจสอบการยินยอม ถ้ายังไม่ยินยอมจะไม่แสดงแบบฟอร์ม
  if (!pdpaConsent) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-bold mb-4">กำลังตรวจสอบการยินยอมการเก็บข้อมูลส่วนบุคคล...</h2>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={showPdpaConsentAlert}
        >
          ตรวจสอบอีกครั้ง
        </button>
      </div>
    );
  }


  return (
    <>
      <div className="mx-5 ">
        <div className="flex flex-col  justify-center font-bold text-2xl">
          <div className="block text-center mt-5">
            <h1>แบบสอบถาม</h1>
          </div>
          <div className="block text-center">
            <h5>
              ระบบข้อมูลครัวเรือนยากจนระดับพื้นที่
              หน่วยบริหารและจัดการทุนด้านการพัฒนาระดับพื้นที่(บพท.)
              ข้อมูลพื้นฐานครัวเรือน
            </h5>
          </div>
        </div>

        <div className="">
          {currentPage === 1 && (
            <FristPage
              setCurrentPage={setCurrentPage}
              setMainFormData={setMainFormData}
              mainFormData={mainFormData}
            />
          )}
          {currentPage === 2 && (
            <HumanCapital
              setCurrentPage={setCurrentPage}
              setMainFormData={setMainFormData}
              mainFormData={mainFormData}
            />
          )}
          {currentPage === 3 && (
            <PhysicalCapital
              setCurrentPage={setCurrentPage}
              setMainFormData={setMainFormData}
              mainFormData={mainFormData}
            />
          )}
          {currentPage === 4 && (
            <Financialcapital
              setCurrentPage={setCurrentPage}
              setMainFormData={setMainFormData}
              mainFormData={mainFormData}
            />
          )}
          {currentPage === 5 && (
            <Naturalcapital
              setCurrentPage={setCurrentPage}
              setMainFormData={setMainFormData}
              mainFormData={mainFormData}
            />
          )}
          {currentPage === 6 && (
            <Naturalcapital2
              setCurrentPage={setCurrentPage}
              setMainFormData={setMainFormData}
              mainFormData={mainFormData}
            />
          )}
          {currentPage === 7 && (
            <Socialcapital
              setCurrentPage={setCurrentPage}
              setMainFormData={setMainFormData}
              mainFormData={mainFormData}
            />
          )}
          {currentPage === 8 && (
            <Southern
              setCurrentPage={setCurrentPage}
              setMainFormData={setMainFormData}
              mainFormData={mainFormData}
            />
          )}
          {currentPage === 9 && (
            <Suggestions
              setCurrentPage={setCurrentPage}
              setMainFormData={setMainFormData}
              mainFormData={mainFormData}
              handleSubmitMain={handleSubmitMain}
              isProcessing={isProcessing}
            />
          )}
        </div>
      </div>
    </>
  );
};
