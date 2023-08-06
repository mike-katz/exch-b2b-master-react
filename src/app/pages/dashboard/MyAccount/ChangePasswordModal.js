import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { Form, Formik } from "formik";
import Model from "../../../component/common/Modal";
import { changePasswordSchema } from "../../../utils/validationSchema";
import CommonInput from "../../../component/form/CommonInput";

const ChangePasswordModal = ({ isVisible, onCloseMenu }) => {
  const onSubmitNewPassword = async (values) => {
    // const payload = {
    //   old_pwd: values?.old_password,
    //   pwd: values?.new_password,
    // };
    // setIsLoadingNewPassword(true);
    // const data = await forgotChangePasswordData(payload);
    // if (data) {
    //   setIsVisibleForgotVerifyOTP(false);
    //   setIsVisibleForgotNewPassword(false);
    //   setIsVisibleForgotPassword(false);
    // }
    // setIsLoadingNewPassword(false);
  };

  return (
    <Model isVisible={isVisible} onCloseMenu={onCloseMenu} center>
      <div className="bg-[#eee] rounded w-[400px]">
        <div className="p-[15px] flex items-center justify-between w-full sm:min-w-[200px]">
          <div className="text-[16px] text-[#3b5160] font-black">
            Change Password
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
            old_password: "",
            new_password: "",
            confirm_password: "",
          }}
          validationSchema={changePasswordSchema}
          onSubmit={onSubmitNewPassword}
        >
          {({ values, errors, touched, handleSubmit }) => (
            <Form>
              <div className="border-b border-t border-[#ccc] px-[40px] pt-[15px]">
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <CommonInput
                    isRequired
                    error={errors?.new_password}
                    type="password"
                    label={"Password"}
                    name="old_password"
                    id="old_password"
                    placeholder="Enter"
                  />
                </div>
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <CommonInput
                    isRequired
                    error={errors?.new_password}
                    type="password"
                    label="New Password"
                    name="new_password"
                    id="new_password"
                    placeholder="Enter"
                  />
                </div>
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <CommonInput
                    isRequired
                    error={errors?.new_password}
                    type="password"
                    label="Confirm Password"
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="Enter"
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex items-center justify-center p-[15px]">
          <button className="bg-[#000000] text-[#feba11] rounded px-2 text-[13px] h-[25px] font-black w-[140px]">
            Submit
          </button>
        </div>
      </div>
    </Model>
  );
};

export default ChangePasswordModal;
