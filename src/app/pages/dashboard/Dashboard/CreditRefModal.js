import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import Model from "../../../component/common/Modal";
import { Form, Formik } from "formik";
import { editCreditRefSchema } from "../../../utils/validationSchema";
import { editCreditRefData } from "../../../redux/services/DownLineUser";
import CommonInput from "../../../component/form/CommonInput";
import { Link } from "react-router-dom";
import Loader from "../../../component/common/Loader";
import { amountFormate } from "../../../utils/helper";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

const CreditRefModal = ({
  isVisible,
  onCloseMenu,
  activeId,
  onRefreshTable,
  activeCreditRef,
}) => {
  const { themeColor } = useSelector((state) => state?.persist);
  // const navigate = useNavigate();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const onSubmitEditCreditRef = async (value) => {
    const payload = {
      ...value,
      rate: value?.rate,
      userId: activeId,
    };

    setIsLoadingSubmit(true);
    const data = await editCreditRefData(payload);

    if (data) {
      onCloseMenu();
      onRefreshTable();
    }

    setIsLoadingSubmit(false);
  };

  // const onClickLogs = () => {
  //   navigate(`/credit-ref-logs/${activeId}`);
  // };

  return (
    <Model isVisible={isVisible} onCloseMenu={onCloseMenu} center>
      <div className="bg-[#eee] rounded w-[400px]">
        <div className="p-[15px] flex items-center justify-between w-full sm:min-w-[400px]">
          <div className="text-[16px] text-[#3b5160] font-black">
            Credit Reference Edit
          </div>
          <FaWindowClose
            onClick={onCloseMenu}
            size={20}
            className="cursor-pointer"
          />
        </div>
        <Formik
          validateOnBlur={false}
          enableReinitialize
          initialValues={{ rate: "", password: "" }}
          validationSchema={editCreditRefSchema}
          onSubmit={onSubmitEditCreditRef}
          validateOnMount
        >
          {({ values, errors, touched, handleSubmit }) => (
            <Form>
              <div className="border-b border-t border-[#ccc] px-[40px] pt-[15px]">
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <div className="col-span-3 text-[12px] text-[#1e1e1e] font-semibold">
                    Current
                  </div>
                  <div className="col-span-9 flex items-center justify-between">
                    <div className=" text-[16px] text-[#1e1e1e] font-black">
                      {amountFormate(activeCreditRef)}
                    </div>
                    <div className=" ">
                      <Link
                        to={`/credit-ref-logs/${activeId}`}
                        target="_blank"
                        className="common-button px-2 leading-[26px] py-[6px]"
                      >
                        Log
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <CommonInput
                    isRequired
                    placeholder="Enter"
                    label="New"
                    type="number"
                    name="rate"
                    id="rate"
                  />
                </div>
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <CommonInput
                    isRequired
                    placeholder="Enter"
                    label="Password"
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center p-[15px]">
                <button
                  style={{
                    background: themeColor?.headerBgColor,
                    color: themeColor?.headerTextColor,
                  }}
                  disabled={isLoadingSubmit}
                  onClick={handleSubmit}
                  className="rounded px-2 text-[13px] h-[25px] font-black w-[140px] flex items-center justify-center"
                >
                  {isLoadingSubmit && <Loader color="#feba11" size={10} />}
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Model>
  );
};

export default CreditRefModal;
