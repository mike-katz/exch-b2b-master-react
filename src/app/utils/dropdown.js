export const ADMIN_USER_TYPE = [
  { value: "WhiteLabel", label: "White Label" },
  { value: "Super", label: "Super" },
  { value: "Master", label: "Master" },
  { value: "Agent", label: "Agent" },
];

export const WHITE_LABEL_USER_TYPE = [
  { value: "Super", label: "Super" },
  { value: "Master", label: "Master" },
  { value: "Agent", label: "Agent" },
];

export const SUPPER_USER_TYPE = [
  { value: "Master", label: "Master" },
  { value: "Agent", label: "Agent" },
];

export const MASTER_USER_TYPE = [{ value: "Agent", label: "Agent" }];

export const USER_STATUS = [
  { value: "", label: "ALL" },
  { value: "Active", label: "ACTIVE" },
  { value: "Suspend", label: "SUSPENDED" },
  { value: "Lock", label: "LOCKED" },
];

export const BET_STATUS = [
  { value: "", label: "ALL" },
  { value: "settle", label: "SETTLE" },
  { value: "unsettle", label: "UNSETTLE" },
  { value: "void", label: "VOID" },
];

export const MARKET_TYPE = [
  { value: "", label: "ALL" },
  { value: "Match Odds", label: "Match Odds" },
  { value: "Fancy", label: "Fancy" },
  { value: "Sports Book", label: "Sports Book" },
  { value: "Book Maker", label: "Book Maker" },
];
