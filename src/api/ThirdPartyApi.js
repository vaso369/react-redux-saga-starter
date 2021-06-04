// @flow
import axios from "axios";

/**
 * All  THIRD PARTY API End-points
 */
class ThirdPartyApi {


    url: string;

  constructor(url: string) {
    this.url = url;
  }

  getDataFromApi = () => {
    return axios.get(this.url);
  };
}

export default ThirdPartyApi;
