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
  { value: "void", label: "UNSETTLE" },
  { value: "unsettle", label: "VOID" },
];

export const MARKET_TYPE = [
  { value: "", label: "ALL" },
  { value: "match_odds", label: "Match Odds" },
  { value: "fancy", label: "Fancy" },
  { value: "sports_book", label: "Sports Book" },
  { value: "book_maker", label: "Book Maker" },
];
