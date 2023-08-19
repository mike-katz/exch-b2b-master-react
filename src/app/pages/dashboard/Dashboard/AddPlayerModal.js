import React, { useState } from "react";
import { Form, Formik } from "formik";
import { FaWindowClose } from "react-icons/fa";
import Model from "../../../component/common/Modal";
import {
  ADMIN_USER_TYPE,
  MASTER_USER_TYPE,
  SUPPER_USER_TYPE,
  WHITE_LABEL_USER_TYPE,
} from "../../../utils/dropdown";
import { addPlayerMasterSchema } from "../../../utils/validationSchema";
import { registerUser } from "../../../redux/services/DownLineUser";
import Loader from "../../../component/common/Loader";
import CommonInput from "../../../component/form/CommonInput";
import CommonSelect from "../../../component/form/CommonSelect";
import { useSelector } from "react-redux";

const AddPlayerModal = ({ isVisible, onCloseMenu, onRefreshTable }) => {
  const { userData } = useSelector((state) => state?.persist);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const onClickAddPlayer = async (values) => {
    const payload = {
      ...values,
      confirm_password: undefined,
    };

    setIsLoadingSubmit(true);
    const data = await registerUser(payload);

    if (data) {
      onCloseMenu();
      onRefreshTable();
    }

    setIsLoadingSubmit(false);
  };

  return (
    <Model isVisible={isVisible} onCloseMenu={onCloseMenu} center>
      <div className="bg-[#eee] rounded w-[400px]">
        <div className="p-[15px] flex items-center justify-between min-w-[200px]">
          <div className="text-[16px] text-[#3b5160] font-black">
            Add Player
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
            username: "",
            // exposure: "",
            commission: userData?.commission || 1,
            password: "",
            confirm_password: "",
            mobile: "",
            roles: "",
          }}
          validationSchema={addPlayerMasterSchema}
          onSubmit={onClickAddPlayer}
          validateOnMount
        >
          {({ values, errors, touched, setFieldValue, handleSubmit }) => (
            <Form>
              <div className="border-b border-t border-[#ccc] px-[40px] pt-[15px]">
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <CommonInput
                    isRequired
                    label="Username"
                    name="username"
                    placeholder="Enter"
                  />
                </div>
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <CommonSelect
                    isRequired
                    label="User Type"
                    data={
                      userData?.roles?.toString() === "Admin"
                        ? ADMIN_USER_TYPE
                        : userData?.roles?.toString() === "WhiteLabel"
                        ? WHITE_LABEL_USER_TYPE
                        : userData?.roles?.toString() === "Super"
                        ? SUPPER_USER_TYPE
                        : userData?.roles?.toString() === "Master"
                        ? MASTER_USER_TYPE
                        : userData?.roles?.toString() === "Agent"
                        ? []
                        : []
                    }
                    name="roles"
                    placeholder="Select user type"
                  />
                </div>
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <CommonInput
                    // isRequired
                    label="Phone"
                    name="mobile"
                    placeholder="Enter"
                    type="number"
                  />
                </div>
                {/* <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <CommonInput
                    isRequired
                    label="Exposer"
                    name="exposure"
                    placeholder="Enter"
                    type="number"
                  />
                </div> */}
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <CommonInput
                    isRequired
                    label="Commission"
                    name="commission"
                    placeholder="Enter"
                    type="number"
                  />
                </div>
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <CommonInput
                    isRequired
                    label="Password"
                    name="password"
                    placeholder="Enter"
                    type="password"
                  />
                </div>
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <CommonInput
                    isRequired
                    label="Confirm Password"
                    name="confirm_password"
                    placeholder="Enter"
                    type="password"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center p-[15px]">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-[#000000] text-[#feba11] rounded px-2 text-[13px] h-[25px] font-black w-[140px] flex items-center justify-center"
                >
                  {isLoadingSubmit && <Loader color="#feba11" size={10} />}
                  Create
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Model>
  );
};

export default AddPlayerModal;
