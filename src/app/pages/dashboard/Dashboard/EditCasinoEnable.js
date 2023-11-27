import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { Form, Formik } from "formik";
import Model from "../../../component/common/Modal";
import { editMobileSchema } from "../../../utils/validationSchema";
import Loader from "../../../component/common/Loader";
import { updateProfileData } from "../../../redux/services/DownLineUser";
import { Switch } from "@material-tailwind/react";
import CommonInput from "../../../component/form/CommonInput";
import { useSelector } from "react-redux";

const EditCasinoEnable = ({
  isVisible,
  onCloseMenu,
  activeId,
  onRefreshTable,
  activeMobileNumber,
  isCasino,
  isAviator,
  isIntCasino,
  isSportBook,
}) => {
  const { themeColor } = useSelector((state) => state?.persist);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const onSubmitEditMobileNumber = async (values) => {
    const payload = {
      myPassword: values?.password,
      mobile: values?.mobile?.toString(),
      userId: activeId,
      isCasino: values?.isCasino,
      isIntCasino: values?.isIntCasino,
      isSportBook: values?.isSportBook,
      isAviator: values?.isAviator,
    };

    setIsLoadingSubmit(true);
    const data = await updateProfileData(payload);
    if (data) {
      onCloseMenu();
      onRefreshTable();
    }
    setIsLoadingSubmit(false);
  };

  return (
    <Model isVisible={isVisible} onCloseMenu={onCloseMenu} center>
      <div className="bg-[#eee] rounded w-[400px]">
        <div className="p-[15px] flex items-center justify-between w-full sm:min-w-[400px]">
          <div className="text-[16px] text-[#3b5160] font-black">
            Change Mobile Number
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
          initialValues={{
            password: "",
            isCasino,
            isIntCasino,
            isSportBook,
            isAviator,
          }}
          validationSchema={editMobileSchema}
          onSubmit={onSubmitEditMobileNumber}
          validateOnMount
        >
          {({ values, errors, touched, handleSubmit, setFieldValue }) => (
            <Form>
              <div className="border-b border-t border-[#ccc] px-[40px] pt-[15px]">
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <div className="col-span-5 text-[12px] text-[#1e1e1e] font-semibold">
                    Is Enable Casino
                  </div>
                  <div className="col-span-7 text-[12px] text-[#1e1e1e] font-semibold">
                    <Switch
                      ripple={false}
                      color="#ecad17"
                      className="h-full w-full checked:bg-[#ecad17] peer-checked:border-[#ecad17] checked:border-[#ecad17]"
                      circleProps={{
                        className: "before:hidden border-none",
                      }}
                      value={values?.isCasino}
                      checked={values?.isCasino}
                      onChange={(e) => {
                        setFieldValue("isCasino", e?.target?.checked);
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <div className="col-span-5 text-[12px] text-[#1e1e1e] font-semibold">
                    Is Enable Int Casino
                  </div>
                  <div className="col-span-7 text-[12px] text-[#1e1e1e] font-semibold">
                    <Switch
                      ripple={false}
                      color="#ecad17"
                      className="h-full w-full checked:bg-[#ecad17] peer-checked:border-[#ecad17] checked:border-[#ecad17]"
                      circleProps={{
                        className: "before:hidden border-none",
                      }}
                      value={values?.isIntCasino}
                      checked={values?.isIntCasino}
                      onChange={(e) => {
                        setFieldValue("isIntCasino", e?.target?.checked);
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <div className="col-span-5 text-[12px] text-[#1e1e1e] font-semibold">
                    Is Enable Sport Book
                  </div>
                  <div className="col-span-7 text-[12px] text-[#1e1e1e] font-semibold">
                    <Switch
                      ripple={false}
                      color="#ecad17"
                      className="h-full w-full checked:bg-[#ecad17] peer-checked:border-[#ecad17] checked:border-[#ecad17]"
                      circleProps={{
                        className: "before:hidden border-none",
                      }}
                      value={values?.isSportBook}
                      checked={values?.isSportBook}
                      onChange={(e) => {
                        setFieldValue("isSportBook", e?.target?.checked);
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <div className="col-span-5 text-[12px] text-[#1e1e1e] font-semibold">
                    Is Enable Aviator
                  </div>
                  <div className="col-span-7 text-[12px] text-[#1e1e1e] font-semibold">
                    <Switch
                      ripple={false}
                      color="#ecad17"
                      className="h-full w-full checked:bg-[#ecad17] peer-checked:border-[#ecad17] checked:border-[#ecad17]"
                      circleProps={{
                        className: "before:hidden border-none",
                      }}
                      value={values?.isAviator}
                      checked={values?.isAviator}
                      onChange={(e) => {
                        setFieldValue("isAviator", e?.target?.checked);
                      }}
                    />
                  </div>
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

                  {/* <div className="text-[red] text-[18px] ml-2">*</div> */}
                </div>
              </div>
              <div className="flex items-center justify-center p-[15px]">
                <button
                  style={{
                    background: themeColor?.headerBgColor,
                    color: themeColor?.headerTextColor,
                  }}
                  onClick={handleSubmit}
                  className="rounded px-2 text-[13px] h-[25px] font-black w-[140px] flex items-center justify-center"
                >
                  {isLoadingSubmit && <Loader color="#feba11" size={10} />}{" "}
                  Change
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Model>
  );
};

export default EditCasinoEnable;
