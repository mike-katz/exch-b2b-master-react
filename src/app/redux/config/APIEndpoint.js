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
  static exportCSVFile = "api/user/export";
  static bankingTransaction = "api/banking/transaction";
  static bankingTransactionHistory = "api/banking/transaction-history";
}
