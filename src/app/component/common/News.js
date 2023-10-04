import React, { useEffect, useState } from "react";
import { collection, onSnapshot, or, query, where } from "@firebase/firestore";
import { FiMic } from "react-icons/fi";
import { fireStoreOthers } from "../../../firebaseSetup/firebaseOthers";

const News = () => {
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    getFirebaseData();
  }, []);

  const getFirebaseData = async () => {
    try {
      const citiesRef = collection(fireStoreOthers, "news");
      // const q = query(
      //   citiesRef,
      //   or(
      //     where("origin", "==", `http://localhost:3002/`),
      //     where("origin", "==", `http://localhost:3002`)
      //   )
      // );
      const q = query(
        citiesRef,
        or(
          where("origin", "==", `https://${window.location.hostname}`),
          where("origin", "==", `https://${window.location.hostname}/`)
        )
      );
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
