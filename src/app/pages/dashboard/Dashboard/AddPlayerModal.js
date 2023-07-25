import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { Form, Formik } from "formik";
import Model from "../../../component/common/Modal";
import AppCommonInput from "../../../component/form/AppCommonInput";
import { addPlayerMasterSchema } from "../../../utils/validationSchema";
import AppSelect from "../../../component/form/AppSelect";
import { ADMIN_USER_TYPE } from "../../../utils/dropdown";

const AddPlayerModal = ({ isVisible, onCloseMenu }) => {
  const onClickAddPlayer = () => {};
  return (
    <Model isVisible={isVisible} onCloseMenu={onCloseMenu} center>
      <div className="bg-[#eee] rounded">
        <div className="p-[15px] flex items-center justify-between min-w-[300px]">
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
            exposer: "",
            commission: "",
            password: "",
            confirm_password: "",
            phone: "",
            user_type: "",
          }}
          validationSchema={addPlayerMasterSchema}
          onSubmit={onClickAddPlayer}
          validateOnMount
        >
          {({ values, errors, touched, setFieldValue, handleSubmit }) => (
            <Form>
              <div className="border-b border-t border-[#ccc] px-[40px] pt-[15px]">
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <div className="col-span-3 text-[12px] text-[#1e1e1e] font-semibold">
                    Username
                  </div>
                  <div className="col-span-9 flex">
                    <AppCommonInput name="username" placeholder="Enter" />
                    <div className="text-[red] text-[18px] ml-2">*</div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <div className="col-span-3 text-[12px] text-[#1e1e1e] font-semibold">
                    User Type
                  </div>
                  <div className="col-span-9 flex">
                    <AppSelect
                      data={ADMIN_USER_TYPE}
                      name="user_type"
                      placeholder="Select"
                    />
                    <div className="text-[red] text-[18px] ml-2">*</div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <div className="col-span-3 text-[12px] text-[#1e1e1e] font-semibold">
                    Phone
                  </div>
                  <div className="col-span-9 flex">
                    <AppCommonInput
                      name="phone"
                      placeholder="Enter"
                      type="number"
                    />
                    <div className="ml-4"></div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <div className="col-span-3 text-[12px] text-[#1e1e1e] font-semibold">
                    Exposer
                  </div>
                  <div className="col-span-9 flex">
                    <AppCommonInput
                      name="exposer"
                      placeholder="Enter"
                      type="number"
                    />
                    <div className="text-[red] text-[18px] ml-2">*</div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <div className="col-span-3 text-[12px] text-[#1e1e1e] font-semibold">
                    Commission
                  </div>
                  <div className="col-span-9 flex">
                    <AppCommonInput
                      name="commission"
                      placeholder="Enter"
                      type="number"
                    />
                    <div className="text-[red] text-[18px] ml-2">*</div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <div className="col-span-3 text-[12px] text-[#1e1e1e] font-semibold">
                    Password
                  </div>
                  <div className="col-span-9 flex">
                    <AppCommonInput
                      name="password"
                      placeholder="Enter"
                      type="password"
                    />
                    <div className="text-[red] text-[18px] ml-2">*</div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <div className="col-span-3 text-[12px] text-[#1e1e1e] font-semibold">
                    Confirm Password
                  </div>
                  <div className="col-span-9 flex">
                    <AppCommonInput
                      name="confirm_password"
                      placeholder="Enter"
                      type="password"
                    />
                    <div className="text-[red] text-[18px] ml-2">*</div>
                  </div>
                </div>
              </div>
              <div
                onClick={handleSubmit}
                className="flex items-center justify-center p-[15px]"
              >
                <button className="bg-[#000000] text-[#feba11] rounded px-2 text-[13px] h-[25px] font-black w-[140px]">
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
