import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { Form, Formik } from "formik";
import Model from "../../../component/common/Modal";
import { changePasswordSchema } from "../../../utils/validationSchema";
import AppInput from "../../../component/form/AppInput";

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
      <div className="bg-[#eee] rounded">
        <div className="p-[15px] flex items-center justify-between min-w-[400px]">
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
              <AppInput
                error={errors?.new_password}
                type="password"
                labelText={"Old Password"}
                name="old_password"
                id="old_password"
                // className={`text-[${themeColor?.loginSignupBg}]`}
                label="Old Password:"
              />

              <AppInput
                error={errors?.new_password}
                type="password"
                labelText={"New Password"}
                name="new_password"
                id="new_password"
                // className={`text-[${themeColor?.loginSignupBg}]`}
                label="New Password:"
              />

              <AppInput
                error={errors?.confirm_password}
                type="password"
                labelText={"Confirm Password"}
                name="confirm_password"
                id="confirm_password"
                // className={`text-[${themeColor?.loginSignupBg}]`}
                label="Confirm Password:"
              />

              <button
                onClick={handleSubmit}
                className="bg-[#FFFFFF] text-[#000000] mt-4 w-full rounded-full h-[38px] text-[14px] font-semibold uppercase border border-[#C10930] flex items-center justify-center"
              >
                {/* {isLoadingNewPassword && (
                  <div className="mt-1">
                    <Loader color={"#6D081D"} size={15} className />
                  </div>
                )}{" "} */}
                Save
              </button>
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
