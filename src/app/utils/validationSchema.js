import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  user: Yup.string().required("Please enter username"),
  password: Yup.string().required("Please enter password"),
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

export const addPlayerSchema = Yup.object().shape({
  username: Yup.string().required("Please enter username"),
  exposure: Yup.number().required("Please enter exposer"),
  commission: Yup.number()
    .required("Please enter commission")
    .min(1, "Please enter min 1")
    .max(100, "Please enter max 100"),
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
  // exposure: Yup.number().required("Please enter exposer"),
  // commission: Yup.number()
  //   .required("Please enter commission")
  //   .min(1, "Please enter min 1")
  //   .max(100, "Please enter max 100"),
  password: Yup.string().required("Please enter new password"),
  roles: Yup.string().required("Please select user type"),
  origin: Yup.string().when("roles", {
    is: (value) => value === "WhiteLabel",
    then: (schema) =>
      schema
        .required("Please select selections")
        .min(1, "Please select selections"),
    otherwise: (schema) => schema,
  }),
  confirm_password: Yup.string()
    .required("Please enter confirm password")
    .oneOf(
      [Yup.ref("password"), null],
      "Yor new password and confirm password should be same"
    ),
});

export const editCreditRefSchema = Yup.object().shape({
  rate: Yup.string().required("Please enter credit ref"),
  password: Yup.string().required("Please enter password"),
});

export const editExposureSchema = Yup.object().shape({
  exposure: Yup.string().required("Please enter exposure"),
  password: Yup.string().required("Please enter password"),
});

export const editCommissionSchema = Yup.object().shape({
  commission: Yup.string().required("Please enter commission"),
  password: Yup.string().required("Please enter password"),
});

export const editMobileSchema = Yup.object().shape({
  password: Yup.string().required("Please enter password"),
});
