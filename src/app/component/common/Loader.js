import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = ({ size, color, className }) => {
  return (
    <div>
      <ClipLoader
        color={color ? color : "#FFFFFF"}
        size={size ? size : 12}
        className={`mr-1 ${className}`}
      />
    </div>
  );
};

export default Loader;
