import React, { useState } from "react";
import { addNewsData } from "../../../../redux/services/News";
import Loader from "../../../../component/common/Loader";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";

const News = () => {
  const { token } = useSelector((state) => state?.persist);

  const [newsValue, setNewsValue] = useState("");
  const [originValue, setOriginValue] = useState("");

  const userData = jwtDecode(token);

  const role = userData?.roles?.toString();

  const [isLoading, setIsLoading] = useState(false);

  const onClickSubmitNews = async () => {
    setIsLoading(true);

    const payload = {
      news: newsValue,
      origin: role === "Admin" ? originValue : undefined,
    };

    addNewsData(payload);

    setIsLoading(false);
  };

  const onChangeNews = (e) => {
    setNewsValue(e?.target?.value);
  };

  const onChangeOrigin = (e) => {
    setOriginValue(e?.target?.value);
  };

  return (
    <div className="px-2 py-6">
      {role === "Admin" && (
        <input
          value={originValue}
          onChange={onChangeOrigin}
          placeholder="Enter origin here"
          rows="5"
          className="w-full rounded p-[5px] text-[#1e1e1e] border border-[#aaa] font-bold text-[14px] mb-2"
        />
      )}

      <textarea
        value={newsValue}
        onChange={onChangeNews}
        placeholder="Enter news here"
        rows="5"
        className="w-full rounded p-[5px] text-[#1e1e1e] border border-[#aaa] font-bold text-[14px]"
      />

      <button
        onClick={onClickSubmitNews}
        className="w-full bg-[#000000] text-[#feba11] rounded px-2 text-[11px] h-[28px] font-black mt-2"
      >
        {isLoading && <Loader color="#feba11" size={10} />}
        Submit
      </button>
    </div>
  );
};

export default News;
