import React from "react";
import { Modal as FlowbiteModal } from "flowbite-react";

const Modal = ({ title, show, onClose, children, size = "md" }) => {
    return (
      <FlowbiteModal
        show={show}         // แสดงหรือซ่อน modal
        onClose={onClose}   // ฟังก์ชันเรียกปิด modal
        dismissible={true}  // ทำให้กด backdrop หรือปุ่ม close แล้วปิดได้
        size={size}
      >
        <FlowbiteModal.Header>
          {title}
        </FlowbiteModal.Header>
        <FlowbiteModal.Body>
          {children}
        </FlowbiteModal.Body>
        <FlowbiteModal.Footer>
          {/* ถ้าต้องการปุ่มเพิ่ม เช่น save หรือ close ก็ใส่ในนี้ได้ */}
          <button
            className="btn btn-primary"
            onClick={onClose}
          >
            ปิด
          </button>
        </FlowbiteModal.Footer>
      </FlowbiteModal>
    );
  };

export default Modal