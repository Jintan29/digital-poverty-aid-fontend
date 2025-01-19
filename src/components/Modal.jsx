import React from "react";
import { Modal as FlowbiteModal } from "flowbite-react";
import { Icon } from "@iconify/react";

const Modal = ({ title, show, onClose, children, size = "md", icon }) => {
  return (
    <FlowbiteModal
      show={show} // แสดงหรือซ่อน modal
      onClose={onClose} // ฟังก์ชันเรียกปิด modal
      dismissible={true} // ทำให้กด backdrop หรือปุ่ม close แล้วปิดได้
      size={size}
    >
      <FlowbiteModal.Header className="bg-gray-600 [&>h3]:!text-white">
        <div className="flex items-center">
        {icon &&
        <Icon
        icon={icon}
        width={25}
        height={25}
        className="mr-4"
      />
        }
        {title}
        </div>
        
      </FlowbiteModal.Header>
      <FlowbiteModal.Body>{children}</FlowbiteModal.Body>
      {/* <FlowbiteModal.Footer className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          บันทึก
        </button>
      </FlowbiteModal.Footer> */}
    </FlowbiteModal>
  );
};

export default Modal;
