import { Field } from "formik";
import React from "react";

const CommonSelect = (
  { placeholder, label, type, className, isRequired, name, labelColor, data },
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
              <select
                {...field}
                {...props}
                className={`w-full rounded p-[5px] text-[12px] text-[#1e1e1e] font-bold ${className}`}
              >
                <option disabled value="">
                  {placeholder}
                </option>
                {data &&
                  data.map((item, index) => (
                    <option key={index} value={item?.value}>
                      {item?.label}
                    </option>
                  ))}
              </select>
              {isRequired && (
                <div className="text-[red] text-[18px] ml-2">*</div>
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

export default CommonSelect;
