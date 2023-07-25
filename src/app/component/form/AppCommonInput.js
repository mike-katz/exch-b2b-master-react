import { Field } from "formik";
import React from "react";

const AppCommonInput = (
  { placeholder, label, type, className, isRequired, name, labelColor },
  props
) => {
  return (
    <Field name={name}>
      {({ field, form, meta }) => (
        <div className="w-full">
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
            style={{ boxShadow: "inset 0px 1px 0px rgba(0,0,0,.5)" }}
            className={`w-full rounded p-[5px] text-[12px] text-[#1e1e1e] font-bold ${className}`}
            type={type}
            placeholder={placeholder}
          />
          {meta.touched && meta.error && (
            <div className="text-[12px] text-[red] mt-[1px]">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};

export default AppCommonInput;
