import React from "react";
import Popup from "reactjs-popup";

const Model = ({
  isVisible,
  title,
  onCloseMenu,
  children,
  height,
  width,
  minHeight,
  minWidth,
  center,
  bgColor,
}) => {
  return (
    <Popup
      maxWidth="100"
      maxHeight="100"
      open={isVisible}
      onClose={onCloseMenu}
      modal
      overlayStyle={{ backgroundColor: "rgba(0,0,0,.7)" }}
      className={`${center ? "mt-0 mb-0" : ""} bg-[#000000] m-0`}
    >
      {(close) => (
        <div
          className="modal rounded"
          style={{
            height,
            width,
            minHeight,
            minWidth,
            backgroundColor: bgColor ? bgColor : "",
          }}
        >
          {title && <div className="header">{title}</div>}
          <div className="content">{children}</div>
        </div>
      )}
    </Popup>
  );
};

export default Model;
