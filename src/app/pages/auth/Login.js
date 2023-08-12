import React, { useState } from "react";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginSchema } from "../../utils/validationSchema";
import AppInput from "../../component/form/AppInput";
import Loader from "../../component/common/Loader";
import { loginStart } from "../../redux/actions/persistAction";
import { getIPAddress } from "../../redux/services/ipAddress";

const Login = () => {
  const dispatch = useDispatch();
  const { themeColor } = useSelector((state) => state?.persist);
  const [isLoading, setIsLoading] = useState(false);

  const onClickLogin = async (values) => {
    setIsLoading(true);

    const IPData = await getIPAddress();

    const payload = {
      username: values?.user?.toLowerCase(),
      password: values?.password,
      ip: JSON.stringify(IPData),
    };

    const callback = () => {
      setIsLoading(false);
    };

    const successCallback = () => {
      setIsLoading(false);
      // dispatch(loginModalHide());
    };

    dispatch(loginStart(payload, callback, successCallback));
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="bg-color-absolute"></div>
      <div
        style={{
          backgroundColor: themeColor?.loginSignupBg,
          boxShadow: "rgba(0, 80, 152, 0.2) 0px 2px 20px 10px",
        }}
        className="md:w-[540px] h-fit w-full rounded-lg z-[2]"
      >
        <div className="container h-full w-full">
          <div className="grid grid-cols-12 h-full w-full">
            <div className="col-span-12 md:col-span-6 flex flex-col items-center justify-center h-full w-full my-0">
              <div className="p-[30px] w-full">
                <div className="flex flex-col items-center">
                  <div
                    style={{ color: themeColor?.loginSignupText }}
                    className="text-[30px] font-bold text-center"
                  >
                    Agent login
                  </div>
                  <div
                    style={{ color: themeColor?.loginSignupText }}
                    className="border-t-2 w-[100px] mt-2 mb-4"
                  ></div>
                </div>
                <Formik
                  validateOnBlur={false}
                  enableReinitialize
                  initialValues={{ user: "", password: "" }}
                  validationSchema={loginSchema}
                  onSubmit={onClickLogin}
                  validateOnMount
                >
                  {({ values, errors, touched, handleSubmit }) => (
                    <Form>
                      <AppInput
                        placeholder=""
                        label="username"
                        type="text"
                        className={`text-center text-[${themeColor?.loginSignupBg}]`}
                        name="user"
                        id="user"
                      />
                      <AppInput
                        placeholder=""
                        label="password"
                        type="password"
                        className={`text-center text-[${themeColor?.loginSignupBg}]`}
                        name="password"
                        id="password"
                      />

                      <div>
                        <button
                          onClick={handleSubmit}
                          className="bg-[#FFFFFF] text-[#000000] mt-6 w-full rounded-full h-[38px] text-[14px] font-semibold uppercase border border-[#C10930] flex items-center justify-center"
                        >
                          {isLoading && (
                            <div className="mt-1">
                              <Loader color={"#6D081D"} size={15} className />
                            </div>
                          )}{" "}
                          Log In
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 h-full md:flex hidden relative justify-center items-center rounded-lg">
              <div className="blured"></div>
              <img
                src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/two-people-stadium-with-their-arms-raised_492154-11927.jpg"
                className="h-fit w-full rounded-r-lg"
              />
              <img
                src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/Logo/CBTF-logo.png"
                className="absolute z-[4] w-[200px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
