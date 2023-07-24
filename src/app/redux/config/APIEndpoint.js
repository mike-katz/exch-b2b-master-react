export default class APIEndpoint {
  static url = process.env.API_URL;
  static getThemeColor = "dasd/dasd/asdasd";
  static getNavigation = "list/sportsList";
  static getSideNavigation = "list/sideMenuList";
  static login = "login";
  static register = "register/generateotp";
  static verifyOTP = "register/verifyotp";
  static getBankAccount = "api/userBank/getUserBank";
  static addBankAccount = "api/userBank/addUserBank";
  static deleteBankAccount = "api/userBank/deleteUserBank?id=";
  static findMinMax = "api/bank/findMinMax";
  static bankSearchRangeWise = "api/bank/bankSearchRangeWise?amount=";
  static getAllWithdraw = "api/withdraw/getAllWithdraw?";
  static withdrawAmount = "api/withdraw/addWithdraw";
  static getWithdrawRule = "api/rule/getWithdrawRule";
  static getDepositRule = "api/rule/getDepositRule";
  static getBalance = "getBalance";
  static changePassword = "changeauth/changepassword";
  static findUserGenerateOTP = "finduser/generateotp";
  static findUserVerifyOTP = "finduser/verifyotp";
  static forgotGenerateOTP = "register/forgotpassword";
  static forgotVerifyOTP = "register/verifyforgotpassword";
  static forgotChangePassword = "register/changeforgotpassword";
}
