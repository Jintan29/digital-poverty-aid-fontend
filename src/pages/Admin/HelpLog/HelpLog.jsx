import { useState } from "react";
import HelphomePage from "../../../components/HelpLog/HelphomePage";
import ShowHelp from "../../../components/HelpLog/ShowHelp";
import IndividualRecordModal from "../../../components/HelpLog/IndividualRecord/IndividualRecordModal";


const HelpLog = () => {
  const [selectedHelp, setSelectedHelp] = useState(null); // เก็บข้อมูลที่เลือก
  const [showIndividualRecord, setShowIndividualRecord] = useState(false); // ควบคุมการแสดง IndividualRecord

  // ฟังก์ชันสำหรับเปลี่ยนหน้าไป IndividualRecord
  const handleAddHelp = () => {
    setShowIndividualRecord(true);
  };

  // ฟังก์ชันสำหรับกลับไปที่หน้าตาราง
  const handleGoBack = () => {
    setShowIndividualRecord(false);
  };

  return (
    <div className="p-4">
      {/* แสดงหัวข้อเฉพาะเมื่อยังไม่ได้เลือกการช่วยเหลือ */}
      {!selectedHelp && <h1 className="text-2xl font-bold -mt-2 mb-2">บันทึกการช่วยเหลือ</h1>}

      {/* แสดง IndividualRecordModal ถ้ากดเพิ่มการช่วยเหลือ */}
      {showIndividualRecord ? (
        <IndividualRecordModal goBack={handleGoBack} />
      ) : selectedHelp ? (
        <ShowHelp data={selectedHelp} goBack={() => setSelectedHelp(null)} />
      ) : (
        <HelphomePage setSelectedHelp={setSelectedHelp} onAddHelp={handleAddHelp} />
      )}
    </div>
  );
};

export default HelpLog;
