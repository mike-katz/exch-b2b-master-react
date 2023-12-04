export default class APIEndpoint {
  static url = process.env.API_URL;

  // THEME
  static getThemeColor = "api/extra/theme";

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
  static getExposer = "api/user/exposure-list";

  // BENKING
  static exportCSVFile = "api/user/export";
  static bankingTransaction = "api/banking/transaction";
  static bankingTransactionHistory = "api/banking/transaction-history";
  static allProfileLog = "api/user/profile-log";
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
  static getBetHistoryDetailData = "api/beating/latestBet";
  static getBetHistoryLPData = "api/beating/pl";
  static getBetLockData = "api/market/events";
  static betLockData = "api/beating/lock";
  static getSt8Balance = "master/st8/balance";
  static withdrawSt8Balance = "master/st8/withdraw";
  static getUserPlByMarket = "api/beating/market-pl";

  // NEWS
  static news = "api/extra/news";

  // PL
  static getSportPl = "api/pl/userSportsProfitloss";
  static getMarketPl = "api/pl/userEventsProfitloss";
  static getEventPl = "api/pl/userMarketsProfitloss";
  static getBetListPl = "api/pl/getUserBetList";
  static getAviatorSport = "api/pl/aviator/total";
  static getAviatorPl = "api/pl/aviator";
  static getSt8CategoryTotalPL = "api/pl/st8/getCategoryTotalPL";
  static getSt8Categories = "api/pl/st8/getCategories";
  static getSt8GameList = "api/pl/st8/getGameList";
  static getAuraSportPl = "api/pl/userSportsProfitlossAura";
  static getAuraEventPl = "api/pl/userEventsProfitlossAura";
  static getAuraMarketPl = "api/pl/userMarketsProfitlossAura";
  static getAuraBetListPl = "api/pl/getUserBetListAura";

  // REPORT
  static getReportSportTotalPL = "api/report/sport/total-pl";
  static getReportCasinoTotalPL = "api/report/casino/total-pl";
  static apiReportIntCasinoTotalPL = "api/report/intCasino/total-pl";
  static getReportAviatorTotalPL = "api/report/aviator/total-pl";
  static getReportSportList = "api/report/sport/list";
  static getReportAviatorList = "api/report/aviator/list";
  static getReportIntCasinoList = "api/report/intCasino/list";
  static getReportUserList = "api/report/user/list";

  // ST8
  static gamesBalance = "st8/balance";
  static gamesTransfer = "st8/transfer";
}
