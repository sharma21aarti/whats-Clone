import React, { useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

const Background = {
  width: "100%",
  height: "100%",
  left: "0",
  top: "0",
  position: "fixed",
  backgroundColor: "rgba(255,255,255,0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "1000",
};

const ModalWrapper = {
  boxShadow: "0 5px 16px rgba(0, 0, 0, 0.2)",

  color: "#000",

  position: "relative",
  zIndex: "10",
  borderRadius: "10px",
};

function Modal({ openModal, setModel, children }) {
  console.log("first");
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setModel(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && openModal) {
        setModel(false);
      }
    },
    [setModel, openModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return createPortal(
    <>
      {openModal ? (
        <div
          onClick={closeModal}
          ref={modalRef}
          className="hideScroll"
          style={Background}
        >
          <div openModal={openModal} style={ModalWrapper}>
            {children}
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById("modal")
  );
}

export default Modal;
