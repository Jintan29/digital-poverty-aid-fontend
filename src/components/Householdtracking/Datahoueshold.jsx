import React from "react";
import { Icon } from "@iconify/react";

const Householdtracking = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Household Performance</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Card 1 */}
                <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
                    <div className="text-yellow-500 text-4xl mr-4">
                        <Icon icon="mdi:account" /> {/* ใช้ Iconify */}
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">Cash Deposits</h2>
                        <p className="text-2xl font-bold text-gray-800">1.7M</p>
                        <p className="text-sm text-red-500">▼ 6.4% less earnings</p>
                    </div>
                </div>
                {/* Card 2 */}
                <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
                    <div className="text-red-500 text-4xl mr-4">
                        <Icon icon="mdi:account-multiple" /> {/* ไอคอนคนหลายคน */}
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">Invested Dividends</h2>
                        <p className="text-2xl font-bold text-gray-800">9M</p>
                        <p className="text-sm text-blue-500">▲ 14.1% Grow Rate</p>
                    </div>
                </div>
                {/* Card 3 */}
                <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
                    <div className="text-green-500 text-4xl mr-4">
                        <Icon icon="mdi:account-cash" /> {/* ไอคอนที่เกี่ยวกับเงินและโปรไฟล์ */}
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">Capital Gains</h2>
                        <p className="text-2xl font-bold text-gray-800">$563</p>
                        <p className="text-sm text-green-500">▲ Increased by 2.85%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Householdtracking;
