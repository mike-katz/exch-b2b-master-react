import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { Form, Formik } from "formik";
import Model from "../../../component/common/Modal";
import { editExposureSchema } from "../../../utils/validationSchema";
import CommonInput from "../../../component/form/CommonInput";
import Loader from "../../../component/common/Loader";
import { editExposureLimitData } from "../../../redux/services/DownLineUser";
import { amountFormate } from "../../../utils/helper";

const EditExposureLimitModal = ({
  isVisible,
  onCloseMenu,
  activeId,
  onRefreshTable,
  activeExposureLimit,
}) => {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const onSubmitEditExposure = async (value) => {
    const payload = {
      ...value,
      userId: activeId,
    };

    setIsLoadingSubmit(true);
    const data = await editExposureLimitData(payload);

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
            Change Exposure Limit
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
          initialValues={{ exposure: "", password: "" }}
          validationSchema={editExposureSchema}
          onSubmit={onSubmitEditExposure}
          validateOnMount
        >
          {({ values, errors, touched, handleSubmit }) => (
            <Form>
              <div className="border-b border-t border-[#ccc] px-[40px] pt-[15px]">
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <div className="col-span-3 text-[12px] text-[#1e1e1e] font-semibold">
                    Exposure Limit
                  </div>
                  <div className="col-span-9 flex items-center justify-between">
                    <div className="text-[16px] text-[#1e1e1e] font-black">
                      {amountFormate(activeExposureLimit)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <CommonInput
                    isRequired
                    placeholder="Enter"
                    label="Exposure"
                    type="number"
                    name="exposure"
                    id="exposure"
                  />

                  {/* <div className="text-[red] text-[18px] ml-2">*</div> */}
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
                  onClick={handleSubmit}
                  className="bg-[#000000] text-[#feba11] rounded px-2 text-[13px] h-[25px] font-black w-[140px] flex items-center justify-center"
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

export default EditExposureLimitModal;
