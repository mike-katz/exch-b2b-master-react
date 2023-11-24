import { Field } from "formik";
import React from "react";

const CommonInput = (
  { placeholder, label, type, className, isRequired, name, labelColor },
  props
) => {
  return (
    <Field name={name}>
      {({ field, form, meta }) => (
        <>
          <div
            style={{ color: labelColor }}
            className="col-span-3 text-[12px] text-[#1e1e1e] font-semibold"
          >
            {label}
          </div>
          <div className="col-span-9">
            <div className="flex">
              <input
                {...props}
                {...field}
                autoComplete="off"
                style={{ boxShadow: "inset 0px 1px 0px rgba(0,0,0,.5)" }}
                className={`w-full rounded p-[5px] text-[12px] text-[#1e1e1e] font-black ${className}`}
                type={type || "text"}
                placeholder={placeholder}
              />
              {isRequired ? (
                <div className="text-[red] text-[18px] ml-2">*</div>
              ) : (
                <div className="text-[red] text-[18px] ml-4"></div>
              )}
            </div>
            {meta.touched && meta.error && (
              <div className="text-[12px] text-[red] mt-[1px]">
                {meta.error}
              </div>
            )}
          </div>
        </>
      )}
    </Field>
  );
};

export default CommonInput;
