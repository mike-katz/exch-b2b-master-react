import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import {
  loginModalVisible,
  signupModalVisible,
} from "../../redux/actions/persistAction";
import { getChannelData } from "../../redux/services/MarketAnalytics";

const LiveStreaming = ({ eventId }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, themeColor } = useSelector((state) => state?.persist);
  const [isLoading, setIsLoading] = useState(true);
  const [channelId, setChannelId] = useState();
  const [noLiveStream, setNoLiveStream] = useState(false);

  const hours = 10;

  useEffect(() => {
    manageChannelId();
  }, []);

  const manageChannelId = async () => {
    const now = new Date().getTime();
    const data = localStorage.getItem("streamingId");
    if (data) {
      const eventData = JSON.parse(data);
      const currentEventData = eventData?.find(
        (item) => item?.eventId === eventId
      );
      if (currentEventData) {
        if (now - currentEventData?.time > hours * 60 * 60 * 1000) {
          const customizeEventData = [...eventData];
          customizeEventData?.filter((item) => item?.MatchID !== eventId);
          const channelData = await getChannelData(eventId);
          if (channelData?.Channel) {
            setChannelId(channelData?.Channel);
            customizeEventData.push({
              time: now,
              eventId: eventId,
              channelId: channelData?.Channel,
            });
            localStorage.setItem(
              "streamingId",
              JSON.stringify(customizeEventData)
            );
          } else {
            setNoLiveStream(true);
          }
        } else {
          const channelData = eventData.find(
            (item) => item?.eventId === eventId
          );
          setChannelId(channelData?.channelId);
        }
      } else {
        const channelData = await getChannelData(eventId);
        // const channelData = DATA;
        if (channelData?.Channel) {
          setChannelId(channelData?.Channel);
          const customizeEventData = [...eventData];
          customizeEventData.push({
            time: now,
            eventId: eventId,
            channelId: channelData?.Channel,
          });
          localStorage.setItem(
            "streamingId",
            JSON.stringify(customizeEventData)
          );
        } else {
          setNoLiveStream(true);
        }
      }
    } else {
      const channelData = await getChannelData(eventId);
      // const channelData = DATA;
      if (channelData?.Channel) {
        setChannelId(channelData?.Channel);
        const newRecord = [
          {
            time: now,
            eventId: eventId,
            channelId: channelData?.Channel,
          },
        ];
        localStorage.setItem("streamingId", JSON.stringify(newRecord));
      } else {
        setNoLiveStream(true);
      }
    }
  };

  const onVisibleSignup = () => {
    dispatch(signupModalVisible());
  };

  const onVisibleLogin = () => {
    dispatch(loginModalVisible());
  };

  return (
    <div className="aspect-video bg-[#FFFFFF] rounded-b">
      {isLoggedIn ? (
        noLiveStream ? (
          <div className="flex justify-center items-center h-full w-full">
            <img
              className="opacity-30 w-full h-full rounded-b"
              src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/horse-racing.webp"
            />
            <div className="absolute font-black text-[18px]">
              Live Streaming not Available
            </div>
          </div>
        ) : (
          <>
            {isLoading ? (
              <div className="flex justify-center items-center h-full w-full">
                <Loader size={25} color="#6D081D" />
              </div>
            ) : null}
            {/* {channelId && ( */}
            <iframe
              onLoad={() => {
                setIsLoading(false);
              }}
              className={`w-full h-full rounded-b ${isLoading ? "hidden" : ""}`}
              src={`https://ss247.life/api/7e0f63439c55a393c8d7eebaafe826093f235f3e/Nstreamapi.php?chid=${channelId}`}
            />
          </>
        )
      ) : (
        <div className="flex justify-center items-center h-full w-full">
          <img
            className="opacity-30 w-full h-full rounded-b"
            src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/horse-racing.webp"
          />
          <div className="absolute font-black text-[18px]">
            Please login for live streaming
            <br />
            <div className="flex items-center h-full justify-center mt-4">
              <div className="border-[#C10930] border w-fit p-[1px] md:rounded-full rounded bg-[#FFFFFF]">
                <button
                  style={{
                    backgroundColor: themeColor?.commonBgColor,
                    color: themeColor?.commonTextColor,
                  }}
                  onClick={onVisibleSignup}
                  className="md:rounded-full rounded py-1 px-3 font-bold text-[14px]"
                >
                  SIGNUP
                </button>
              </div>
              <div className="border-[#C10930] border w-fit p-[1px] md:rounded-full rounded md:ml-1 ml-2 bg-[#FFFFFF]">
                <button
                  style={{
                    backgroundColor: themeColor?.commonBgColor,
                    color: themeColor?.commonTextColor,
                  }}
                  onClick={onVisibleLogin}
                  className="md:rounded-full rounded py-1 px-3 font-bold text-[14px]"
                >
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* )} */}
    </div>
  );
};

export default LiveStreaming;
