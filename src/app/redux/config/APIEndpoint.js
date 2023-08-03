export default class APIEndpoint {
  static url = process.env.API_URL;
  static login = "api/auth/login";
  static register = "api/user/register";
  static getDownLineUser = "api/user/my-team";
  static getMyBalance = "api/user/my-balance";
}
