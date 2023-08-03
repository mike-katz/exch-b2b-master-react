import axios from "axios";

axios.defaults.timeout = 1000 * 60;
axios.defaults.headers = {
  pragma: "no-cache",
  Accept: "application/json",
};

export default class IPRest {
  static async get(url) {
    return await axios
      .get(url)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error({ error });
        return error;
      });
  }
}
