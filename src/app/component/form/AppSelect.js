import { Field } from "formik";
import React from "react";

const AppSelect = (
  { placeholder, label, type, className, isRequired, name, labelColor, data },
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
          <select
            {...field}
            {...props}
            className={`w-full rounded p-[5px] text-[12px] text-[#1e1e1e] font-bold ${className}`}
          >
            <option disabled value="">
              Select User Type
            </option>
            {data &&
              data.map((item, index) => (
                <option key={index} value={item?.value}>
                  {item?.label}
                </option>
              ))}
          </select>

          {meta.touched && meta.error && (
            <div className="text-[12px] text-[red] mt-[1px]">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};

export default AppSelect;
