import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { FiMic } from "react-icons/fi";
import { firestore } from "../../../firebaseSetup/firebase";

const News = () => {
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    getFirebaseData();
  }, []);

  const getFirebaseData = async () => {
    console.log(window.location.origin);

    try {
      const citiesRef = collection(firestore, "news");
      const q = query(citiesRef, where("origin", "==", window.location.origin));
      onSnapshot(q, (docsSnap) => {
        docsSnap.forEach((doc) => {
          setNewsData(doc.data());
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (newsData?.news) {
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
        <marquee className="text-[#69c2f9]">{newsData?.news}</marquee>
      </div>
    );
  }
};

export default News;
