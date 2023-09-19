export default class APIEndpoint {
  static url = process.env.API_URL;

  // AUTH
  static login = "api/auth/login";
  static register = "api/user/register";

  // DOWN LINE
  static getDownLineUser = "api/user/my-team";
  static getDownLineMaster = "api/user/downline";
  static getMyBalance = "api/user/my-balance";
  static getUserDetail = "api/user/detail";
  static getActivityLog = "api/activity";
  static editCreditRef = "api/user/add-creditlog";
  static creditRefList = "api/user/creditlogs";
  static updateStatus = "api/user/update-status";
  static editExposureLimit = "api/user/change-exposure";

  // BENKING
  static exportCSVFile = "api/user/export";
  static bankingTransaction = "api/banking/transaction";
  static bankingTransactionHistory = "api/banking/transaction-history";
  static getSportList = "api/beating/get-sports";
  static getBetHistory = "api/beating/history";
  static getBetList = "api/beating/list";
  static getMarketData = "api/market";
  static getUserParentList = "api/user/get-parentList";
  static updateProfile = "api/user/update-profile";
  static changePassword = "api/auth/change-password";
  static marketDetails = "api/market/detail";
  static getChannelData = "api/market/stream";
  static getBetHistoryData = "api/beating/matchBet";
  static getBetHistoryLPData = "api/beating/pl";
  static getBetLockData = "api/market/events";
  static betLockData = "api/beating/lock";

  // NEWS
  static news = "api/extra/news";
}
