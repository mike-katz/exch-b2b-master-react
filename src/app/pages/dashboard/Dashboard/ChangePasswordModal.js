import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { Form, Formik } from "formik";
import Model from "../../../component/common/Modal";
import { changePasswordSchema } from "../../../utils/validationSchema";
import CommonInput from "../../../component/form/CommonInput";
import { updateProfileData } from "../../../redux/services/DownLineUser";
import Loader from "../../../component/common/Loader";

const ChangePasswordModal = ({ isVisible, onCloseMenu, userId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitNewPassword = async (values) => {
    const payload = {
      userId: userId,
      password: values?.old_password,
      myPassword: values?.new_password,
    };

    setIsLoading(true);
    const data = await updateProfileData(payload);
    if (data) {
      onCloseMenu();
    }
    setIsLoading(false);
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
              {console.log({ values, errors })}
              <div className="border-b border-t border-[#ccc] px-[40px] pt-[15px]">
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
              </div>
              <div className="flex items-center justify-center p-[15px]">
                <button
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="bg-[#000000] text-[#feba11] rounded px-2 text-[13px] h-[25px] font-black w-[140px] flex items-center justify-center"
                >
                  {isLoading && <Loader color="#feba11" size={10} />}
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

export default ChangePasswordModal;
