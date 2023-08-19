import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { Form, Formik } from "formik";
import Model from "../../../component/common/Modal";
import { addPlayerSchema } from "../../../utils/validationSchema";
import { registerUser } from "../../../redux/services/DownLineUser";
import CommonInput from "../../../component/form/CommonInput";
import { useSelector } from "react-redux";

const AddPlayerModal = ({ isVisible, onCloseMenu, onRefreshTable }) => {
  const { userData } = useSelector((state) => state?.persist);
  const onClickAddPlayer = async (values) => {
    const payload = {
      ...values,
      confirm_password: undefined,
      roles: "User",
    };
    const data = await registerUser(payload);

    if (data) {
      onCloseMenu();
      onRefreshTable();
    }
  };

  return (
    <Model isVisible={isVisible} onCloseMenu={onCloseMenu} center>
      <div className="bg-[#eee] rounded w-[400px]">
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
            exposure: 500000,
            commission: userData?.commission || 1,
            password: "",
            confirm_password: "",
            mobile: "",
          }}
          validationSchema={addPlayerSchema}
          onSubmit={onClickAddPlayer}
          validateOnMount
        >
          {({ values, errors, touched, handleSubmit }) => (
            <Form>
              <div className="border-b border-t border-[#ccc] px-[40px] pt-[15px]">
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <div className="col-span-3 text-[12px] text-[#1e1e1e] font-semibold">
                    Username
                  </div>
                  <div className="col-span-9 flex">
                    <CommonInput name="username" placeholder="Enter" />
                    <div className="text-[red] text-[18px] ml-2">*</div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
                  <div className="col-span-3 text-[12px] text-[#1e1e1e] font-semibold">
                    Phone
                  </div>
                  <div className="col-span-9 flex">
                    <CommonInput
                      name="mobile"
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
                    <CommonInput
                      name="exposure"
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
                    <CommonInput
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
                    <CommonInput
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
                    <CommonInput
                      name="confirm_password"
                      placeholder="Enter"
                      type="password"
                    />
                    <div className="text-[red] text-[18px] ml-2">*</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center p-[15px]">
                <button
                  onClick={handleSubmit}
                  className="bg-[#000000] text-[#feba11] rounded px-2 text-[13px] h-[25px] font-black w-[140px]"
                >
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
