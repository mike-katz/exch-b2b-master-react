import { toast } from "react-toastify";

export const showToastMessage = (text, responseCode, options) => {
  const type = responseCode === 200 ? "success" : "error";

  const toastAlert = toast?.[type || "success"];

  toastAlert(text, {
    ...options,
  });
};

export const amountFormate = (amount = "") => {
  const value = amount?.toString();
  if (value) {
    const sanitizedValue = value.replace(/,/g, "");

    const formattedValue = Number(sanitizedValue)?.toFixed(2)?.toLocaleString();

    return formattedValue;
  } else {
    return value;
  }
};

export const roleStatus = (role = "") => {
  switch (role) {
    case "Admin":
      return (
        <div className="bg-[#d77319] uppercase text-[#FFFFFF] text-[10px] rounded px-1 mr-2">
          AD
        </div>
      );

    case "WhiteLabel":
      return (
        <div className="bg-[#d65d5d] uppercase text-[#FFFFFF] text-[10px] rounded px-1 mr-2">
          WL
        </div>
      );
    case "SuperSuper":
      return (
        <div className="bg-[#d12cff] uppercase text-[#FFFFFF] text-[10px] rounded px-1 mr-2">
          SS
        </div>
      );
    case "Super":
      return (
        <div className="bg-[#b5b562] uppercase text-[#FFFFFF] text-[10px] rounded px-1 mr-2">
          SUP
        </div>
      );
    case "Master":
      return (
        <div className="bg-[#85b352] uppercase text-[#FFFFFF] text-[10px] rounded px-1 mr-2">
          MA
        </div>
      );

    case "Agent":
      return (
        <div className="bg-[#000000] uppercase text-[#FFFFFF] text-[10px] rounded px-1 mr-2">
          AG
        </div>
      );
    case "User":
      return (
        <div className="bg-[#568bc8] uppercase text-[#FFFFFF] text-[10px] rounded px-1 mr-2">
          US
        </div>
      );

    default:
      return (
        <span className="bg-[red] uppercase text-[#FFFFFF] text-[10px] rounded px-1 mr-2">
          -NA-
        </span>
      );
  }
};

export const roleStatusWithoutColor = (role = "") => {
  switch (role) {
    case "Admin":
      return "AD";
    case "WhiteLabel":
      return "WL";
    case "SuperSuper":
      return "SS";
    case "Super":
      return "SUP";
    case "Master":
      return "MA";
    case "Agent":
      return "AG";
    case "User":
      return "US";
    default:
      return <span className="text-[red]">-NA-</span>;
  }
};

export const formatCash = (num) => {
  const n = Number(num);
  if (n < 1e3) return n?.toFixed(2);
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};

export const formatCashRound = (num) => {
  const n = Number(num);
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};

export const numberOppositeConvert = (number) => {
  return number >= 0 ? -number : Math.abs(number);
};
