import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { Form, Formik } from "formik";
import Model from "../../../component/common/Modal";
import { editCommissionSchema } from "../../../utils/validationSchema";
import CommonInput from "../../../component/form/CommonInput";
import Loader from "../../../component/common/Loader";
import { updateProfileData } from "../../../redux/services/DownLineUser";
import { useSelector } from "react-redux";

const EditCommissionModal = ({
  isVisible,
  onCloseMenu,
  activeId,
  onRefreshTable,
  activeCommission,
}) => {
  const { themeColor } = useSelector((state) => state?.persist);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const onSubmitEditCommission = async (values) => {
    const payload = {
      myPassword: values?.password,
      commission: values?.commission,
      userId: activeId,
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
            Change Commission Limit
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
          initialValues={{ commission: activeCommission, password: "" }}
          validationSchema={editCommissionSchema}
          onSubmit={onSubmitEditCommission}
          validateOnMount
        >
          {({ values, errors, touched, handleSubmit }) => (
            <Form>
              <div className="border-b border-t border-[#ccc] px-[40px] pt-[15px]">
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <CommonInput
                    isRequired
                    placeholder="Enter"
                    label="Commission"
                    type="number"
                    name="commission"
                    id="commission"
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

export default EditCommissionModal;
