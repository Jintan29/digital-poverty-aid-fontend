import React, { useState } from 'react';

export const Southern = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({
    question2_2: [],
    question2_2_other: '',
    question2_3: []
  });

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleCheckboxChange = (e, questionKey) => {
    const { value, checked } = e.target;
    setFormData(prevFormData => {
      if (checked) {
        return { ...prevFormData, [questionKey]: [...prevFormData[questionKey], value] };
      } else {
        return { ...prevFormData, [questionKey]: prevFormData[questionKey].filter(item => item !== value) };
      }
    });
  };

  const handleInputChange = (e, questionKey) => {
    const { value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [questionKey]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`คุณเลือก: ${selectedOption}`);
  };

  return (
    <>
      <div className="Container">
        <h3 className="text-black text-lg font-bold px-5 py-5">
          ส่วนที่ 6 ความไม่สงบในพื้นที่ 3 ชายแดนภาคใต้
        </h3>
        <form onSubmit={handleSubmit}>
          <h2>2. ผลกระทบจากสถานการณ์ความไม่สงบในพื้นที่ (เฉพาะจังหวัดนราธิวาส ยะลา และปัตตานี)</h2>
        {/* คำถามส่วนที่2.1 */}
          <p>2.1. สถานการณ์ความไม่สงบในพื้นที่ มีผลกระทบต่อท่านมากเพียงใด</p>
          <div>
            <label>
              <input
                type="radio"
                value="มากที่สุด"
                checked={selectedOption === "มากที่สุด"}
                onChange={handleOptionChange}
              />
              มากที่สุด
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="มาก"
                checked={selectedOption === "มาก"}
                onChange={handleOptionChange}
              />
              มาก
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="ปานกลาง"
                checked={selectedOption === "ปานกลาง"}
                onChange={handleOptionChange}
              />
              ปานกลาง
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="น้อย"
                checked={selectedOption === "น้อย"}
                onChange={handleOptionChange}
              />
              น้อย
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="น้อยที่สุด"
                checked={selectedOption === "น้อยที่สุด"}
                onChange={handleOptionChange}
              />
              น้อยที่สุด
            </label>
          </div>
        </form>
      </div>

      {/* คำถามส่วนที่2.2 */}
      <form onSubmit={handleSubmit}>
        <h2>2.2. ปัญหาความไม่สงบในพื้นที่ มีผลกระทบต่อการดำรงชีวิตด้านใดมากที่สุด (ตอบได้มากกว่า 1 ข้อ)</h2>
        <div>
          <label>
            <input
              type="checkbox"
              value="การใช้ชีวิตประจำวัน"
              onChange={(e) => handleCheckboxChange(e, "question2_2")}
            />
            การใช้ชีวิตประจำวัน
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="การประกอบอาชีพ"
              onChange={(e) => handleCheckboxChange(e, "question2_2")}
            />
            การประกอบอาชีพ
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="การประกอบกิจกรรมทางศาสนา"
              onChange={(e) => handleCheckboxChange(e, "question2_2")}
            />
            การประกอบกิจกรรมทางศาสนา
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="การร่วมกิจกรรมกับชุมชน การพักผ่อนหย่อนใจ"
              onChange={(e) => handleCheckboxChange(e, "question2_2")}
            />
            การร่วมกิจกรรมกับชุมชน การพักผ่อนหย่อนใจ
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="กิจกรรมอื่นๆ"
              onChange={(e) => handleCheckboxChange(e, "question2_2")}
            />
            กิจกรรมอื่นๆ (ระบุ)
            <input
              type="text"
              value={formData.question2_2_other}
              onChange={(e) => handleInputChange(e, "question2_2_other")}
              placeholder="ระบุ"
            />
          </label>
        </div>

        {/* ส่วนคำถามที่2.3 */}
        <h2>2.3. ปัญหาความไม่สงบในพื้นที่ ส่งผลต่อการประกอบอาชีพอย่างไร (ตอบได้มากกว่า 1 ข้อ)</h2>
        <div>
          <label>
            <input
              type="checkbox"
              value="เกิดปัญหาด้านสุขภาพทั้งร่างกายและจิตใจ"
              onChange={(e) => handleCheckboxChange(e, "question2_3")}
            />
            เกิดปัญหาด้านสุขภาพทั้งร่างกายและจิตใจ
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="ขาดแรงงานในการผลิต แปรรูป และจำหน่ายสินค้า"
              onChange={(e) => handleCheckboxChange(e, "question2_3")}
            />
            ขาดแรงงานในการผลิต แปรรูป และจำหน่ายสินค้า
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="ขาดสถานที่ในการจำหน่ายสินค้า"
              onChange={(e) => handleCheckboxChange(e, "question2_3")}
            />
            ขาดสถานที่ในการจำหน่ายสินค้า
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="ขาดความรู้ในการพัฒนา ปรับปรุงการผลิต และการจำหน่าย"
              onChange={(e) => handleCheckboxChange(e, "question2_3")}
            />
            ขาดความรู้ในการพัฒนา ปรับปรุงการผลิต และการจำหน่าย
          </label>
          <div>
            <label>
                <input
                    type="checkbox"
                    value="ขาดเงินทุนในการประกอบการ"
                    onChange={(e) => handleCheckboxChange (e,"question2_3")}
                />
                ขาดเงินทุนในการประกอบการ
            </label>
          </div>
          <div>
            <label>
                <input
                    type="checkbox"
                    value="ขาดที่ดินสำหรับทำการผลิต"
                    onChange={(e) => handleCheckboxChange (e,"question2_3")}
                />
                ขาดที่ดินสำหรับทำการผลิต
            </label>
          </div>
          <div>
            <label>
                <input
                    type="checkbox"
                    value="ขาดแหล่งน้ำในการผลิต"
                    onChange={(e) => handleCheckboxChange (e,"question2_3")}
                />
                ขาดแหล่งน้ำในการผลิต
            </label>
          </div>
          <div>
            <label>
                <input
                    type="checkbox"
                    value="ขาดระบบคมนาคมเพื่อนำผลิตออกจากพื้นที่"
                    onChange={(e) => handleCheckboxChange (e,"question2_3")}
                />
                ขาดระบบคมนาคมเพื่อนำผลิตออกจากพื้นที่
            </label>
          </div>
          <div>
            <label>
                <input
                    type="checkbox"
                    value="ขาดระบบเทคโนโลยีสารสนเทศสมัยใหม่"
                    onChange={(e) => handleCheckboxChange (e,"question2_3")}
                />
                ขาดระบบเทคโนโลยีสารสนเทศสมัยใหม่
            </label>
          </div>
          <div>
          <label>
            <input
              type="checkbox"
              value="อื่นๆ"
              onChange={(e) => handleCheckboxChange(e, "question2_3")}
            />
            อื่นๆ (ระบุ)
            <input
              type="text"
              value={formData.question2_3_other}
              onChange={(e) => handleInputChange(e, "question2_3_other")}
              placeholder="ระบุ"
            />
          </label>
        </div>

        {/* ส่วนคำถามที่2.4 */}
        <h2>2.4. สิ่งที่ควรดำเนินการโดยเร่งด่วนเพื่อลดผลกระทบหรือความเดือดร้อนจากปัญหาความไม่สงบในพื้นที่</h2>
        <div>
            <label>
              <input
                type="radio"
                value="ปรับปรุงและพัฒนาระบบคมนาคมขนส่งในพื้นที่"
                checked={selectedOption === "ปรับปรุงและพัฒนาระบบคมนาคมขนส่งในพื้นที่"}
                onChange={handleOptionChange}
              />
              ปรับปรุงและพัฒนาระบบคมนาคมขนส่งในพื้นที่
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="เพิ่มการเข้าถึงปัจจัยพื้นฐานในการผลิต"
                checked={selectedOption === "เพิ่มการเข้าถึงปัจจัยพื้นฐานในการผลิต"}
                onChange={handleOptionChange}
              />
              เพิ่มการเข้าถึงปัจจัยพื้นฐานในการผลิต
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="ปรับปรุงและพัฒนาคุณภาพปัจจัยพื้นฐานในการผลิต"
                checked={selectedOption === "ปรับปรุงและพัฒนาคุณภาพปัจจัยพื้นฐานในการผลิต"}
                onChange={handleOptionChange}
              />
              ปรับปรุงและพัฒนาคุณภาพปัจจัยพื้นฐานในการผลิต
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="พัฒนาโครงข่ายการสื่อสารรองรับเทคโนโลยีสมัยใหม่"
                checked={selectedOption === "พัฒนาโครงข่ายการสื่อสารรองรับเทคโนโลยีสมัยใหม่"}
                onChange={handleOptionChange}
              />
              พัฒนาโครงข่ายการสื่อสารรองรับเทคโนโลยีสมัยใหม่
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="ส่งเสริมความรู้ในการประกอบอาชีพ และสร้างรายได้"
                checked={selectedOption === "ส่งเสริมความรู้ในการประกอบอาชีพ และสร้างรายได้"}
                onChange={handleOptionChange}
              />
              ส่งเสริมความรู้ในการประกอบอาชีพ และสร้างรายได้
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="ส่งเสริมการแปรูป และการตลาดสำหรับผลิตภัณฑ์ในพื้นที่"
                checked={selectedOption === "ส่งเสริมการแปรูป และการตลาดสำหรับผลิตภัณฑ์ในพื้นที่"}
                onChange={handleOptionChange}
              />
              ส่งเสริมการแปรูป และการตลาดสำหรับผลิตภัณฑ์ในพื้นที่
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="ส่งเสริมการมีส่วนร่วมในการแก้ไขปัญหา"
                checked={selectedOption === "ส่งเสริมการมีส่วนร่วมในการแก้ไขปัญหา"}
                onChange={handleOptionChange}
              />
              ส่งเสริมการมีส่วนร่วมในการแก้ไขปัญหา
            </label>
          </div>
          <div>
          <label>
            <input
              type="radio"
              value="อื่นๆ"
              checked={selectedOption === "อื่นๆ"}
              onChange={handleOptionChange}
            />
            อื่นๆ (ระบุ)
            {selectedOption === "อื่นๆ" && (
             <input
             type="text"
             value={formData.question2_4_other}
             onChange={(e) => handleInputChange(e, "question2_4_other")}
             placeholder="ระบุ"
           />
            )}
          </label>
        </div>
        </div>
      </form>
    </>
  );
};

export default Southern;
