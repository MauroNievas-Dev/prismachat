"use client";
import React from "react";

const Modal = ({ isOpen, title, children, onClose, currentTheme }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-20" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="rounded-lg p-4 w-80 max-w-full" style={{ backgroundColor: currentTheme.colors.chatBackground, color: currentTheme.colors.text }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-2xl leading-none">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
