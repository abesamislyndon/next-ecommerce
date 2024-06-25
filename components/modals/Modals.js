// components/Modal.js
import React from "react";

const Modal = ({ show, onClose, onGuest, onRegister, onLogin }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
      <div className=" bg-white p-6 rounded-lg shadow-lg lg:w-[30%]">
        <div className="w-full">
          <button className="float-right pt-1 pb-1 pl-3 pr-3  bg-[#ff7979] text-white rounded" onClick={onClose}>x</button>
        </div>
        <div className="pt-20 pb-20 pl-1 pr-1">
          <div className="grid grid-cols-2 gap-5">
            <button
              className="block w-full p-2  mb-2 text-center bg-white text-dark border rounded-md"
              onClick={onClose}>
              Order as Guest
            </button>

            <button
              className="block w-full p-2 mb-2 text-center bg-white text-dark border border-black-100 rounded-md"
              onClick={onRegister}
            >
              Register
            </button>
          </div>

          <button
            className="block w-full py-3 mt-20 text-center bg-black text-white rounded-sm"
            onClick={onLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
