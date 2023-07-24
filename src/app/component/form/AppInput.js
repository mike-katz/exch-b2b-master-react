import { Field } from "formik";
import React from "react";
import { useSelector } from "react-redux";

const AppInput = (
  { placeholder, label, type, className, isRequired, name, labelColor },
  props
) => {
  const { themeColor } = useSelector((state) => state?.persist);

  return (
    <Field name={name}>
      {({ field, form, meta }) => (
        <>
          <div
            style={{ color: labelColor }}
            className="text-[12px] text-[#FFFFFF] uppercase mt-2 mb-1"
          >
            {label}
          </div>
          <input
            {...props}
            {...field}
            autoComplete="off"
            required={isRequired}
            className={`bg-[${themeColor?.loginSignupText}] text-[${themeColor?.loginSignupBg}] h-[36px] w-full text-[16px] px-3 ${className}`}
            type={type}
            placeholder={placeholder}
          />
          {meta.touched && meta.error && (
            <div className="text-[12px] text-[red] mt-[1px]">{meta.error}</div>
          )}
        </>
      )}
    </Field>
  );
};

export default AppInput;
