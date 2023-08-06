import React from "react";
import NumberFormat from "react-number-format";

const AmountFormate = ({ amount }) => {
  return (
    <NumberFormat
      value={amount}
      // className="foo"
      displayType={"text"}
      thousandSeparator={true}
      prefix={"IR "}
      renderText={(value, props) => <div {...props}>{value}</div>}
    />
  );
};
export default AmountFormate;
