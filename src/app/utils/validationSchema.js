import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  user: Yup.string().required("Please enter username"),
  password: Yup.string().required("Please enter password"),
});

export const findUserSchema = Yup.object().shape({
  mobile: Yup.string().required("Please enter mobile number"),
});

export const accountSchema = Yup.object().shape({
  account_type: Yup.string().required("Please select account type"),
  name: Yup.string().required("Please enter name"),
  account_number: Yup.number().required("Please enter account number"),
  ifsc_code: Yup.string().required("Please enter IFSC Code"),
});

export const signupSchema = Yup.object().shape({
  mobile: Yup.string().required("Please enter mobile number"),
  user: Yup.string().required("Please enter username"),
  pwd: Yup.string().required("Please enter password"),
  terms: Yup.bool().oneOf([true], "Please checked"),
  age: Yup.bool().oneOf([true], "Please checked"),
});

export const signupOTPSchema = Yup.object().shape({
  otp: Yup.number().required("Please enter otp"),
});

export const changePasswordSchema = Yup.object().shape({
  old_password: Yup.string().required("Please enter old password"),
  new_password: Yup.string().required("Please enter new password"),
  confirm_password: Yup.string()
    .required("Please enter confirm password")
    .oneOf(
      [Yup.ref("new_password"), null],
      "Yor new password and confirm password should be same"
    ),
});

export const forgotPasswordSchema = Yup.object().shape({
  new_password: Yup.string().required("Please enter new password"),
  confirm_password: Yup.string()
    .required("Please enter confirm password")
    .oneOf(
      [Yup.ref("new_password"), null],
      "Yor new password and confirm password should be same"
    ),
});

export const addPlayerSchema = Yup.object().shape({
  username: Yup.string().required("Please enter username"),
  exposure: Yup.number().required("Please enter exposer"),
  commision: Yup.number().required("Please enter commission"),
  password: Yup.string().required("Please enter new password"),
  confirm_password: Yup.string()
    .required("Please enter confirm password")
    .oneOf(
      [Yup.ref("password"), null],
      "Yor new password and confirm password should be same"
    ),
});

export const addPlayerMasterSchema = Yup.object().shape({
  username: Yup.string().required("Please enter username"),
  exposer: Yup.number().required("Please enter exposer"),
  commission: Yup.number().required("Please enter commission"),
  password: Yup.string().required("Please enter new password"),
  user_type: Yup.string().required("Please select user type"),
  confirm_password: Yup.string()
    .required("Please enter confirm password")
    .oneOf(
      [Yup.ref("password"), null],
      "Yor new password and confirm password should be same"
    ),
});
