import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../config";

function AddApiToken() {

    const [apiUrl, setApiUrl] = useState("");
    const validateInput = () => {
        if (!apiUrl.trim()) {
            Swal.fire("เกิดข้อผิดพลาด", "กรุณากรอก API URL", "error");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateInput()) {
            return;
        }

        try {
            const res = await Swal.fire({
                title: "เพิ่มข้อมูล",
                text: "ตรวจสอบข้อมูลถูกต้องแล้วใช่หรือไม่",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "ใช่",
                cancelButtonText: "ยกเลิก",
            });

            if (res.isConfirmed) {
                // Send the API request with the entered apiUrl
                const response = await axios.post(
                    `${config.api_path}/district/fetch-data`,
                    { apiUrl }, // <-- Include apiUrl in the request payload
                    config.headers()
                );

                if (response.data.message === "Data saved successfully from API") {
                    await Swal.fire({
                        title: "บันทึกข้อมูล",
                        text: "บันทึกข้อมูลสำเร็จ",
                        icon: "success",
                    });
                }
            }
        } catch (error) {
            console.error("Error response:", error.response?.data);
            Swal.fire("เกิดข้อผิดพลาด", error.response?.data?.message || error.message, "error");
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-white -mt-14">
            <div className="relative w-[700px] h-[400px] bg-gray-100 rounded-2xl shadow-lg p-6">
                {/* Circular Button on Top-Right */}
                <div className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full shadow-md"></div>
                {/* Title */}
                <h1
                    className="text-center text-4xl font-semibold text-black mb-4"
                    style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
                >
                    Enter Url
                </h1>
                <hr className="w-[400px] border-t-[1px] border-gray-200 mx-auto my-4" />

                <p
                    className="text-center text-lg mb-8 text-[#AEABAB] -mt-2"
                    style={{
                        textShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)", // เพิ่ม text shadow
                    }}
                >
                    "https://example.com"
                </p>

                {/* Input Field */}
                <div className="flex justify-center mb-8 mt-4">
                    <input
                        type="text"
                        placeholder="Enter"
                        value={apiUrl}
                        onChange={(e) => setApiUrl(e.target.value)}
                        className="w-[500px] h-[75px] text-lg text-gray-700 px-4 bg-[#B4C1D2] border border-[#B4C1D2] rounded-2xl placeholder:text-[#FFFFFF] placeholder:text-2xl shadow-md"
                    />
                </div>

                {/* Go Button */}
                <div className="absolute bottom-6 right-6">
                    <button className="bg-blue-500 text-white text-xl font-bold w-[100px] h-[50px] rounded-xl shadow-md hover:bg-blue-600 transition"
                        onClick={handleSubmit}
                    >
                        Go
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddApiToken;
