import React from "react";
import { FiMic } from "react-icons/fi";

const News = () => {
  return (
    <div className="h-[30px] flex justify-between items-center bg-[#293a43] border border-[#FFFFFF] px-2 rounded mt-1">
      <div className="marquee-box flex items-center">
        <FiMic color="#FFFFFF" className="" size={20} />
        <h4>News</h4>
      </div>
      {/* <div className="flex items-center text-[12px] text-[#FFFFFF] font-extrabold pr-2 border-r ">
        <FiMic color="#FFFFFF" className="mr-2" />
        News
      </div> */}
      <marquee className="text-[#69c2f9]">
        ABCDEFG HIJKLMN OPQRSTU VWXYZ ABCDEFG HIJKLMN OPQRSTU VWXYZ ABCDEFG
        HIJKLMN OPQRSTU VWXYZ ABCDEFG HIJKLMN OPQRSTU VWXYZ ABCDEFG HIJKLMN
        OPQRSTU VWXYZ
      </marquee>
    </div>
  );
};

export default News;
