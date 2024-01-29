import React, { useState, forwardRef, useImperativeHandle } from "react";

const Toast = ({ timeout = 1500 }, ref) => {
  const [type, setType] = useState("success");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  useImperativeHandle(ref, () => ({
    showToast(type, message) {
      setType(type);
      setMessage(message);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, timeout);
    },
  }));

  return (
    <div className={`react-toast-container ${show ? "show" : ""} ${type}`}>
      {message}
    </div>
  );
};

export default forwardRef(Toast);
