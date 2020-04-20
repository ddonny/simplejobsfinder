import axios from "axios";
import { JOBS_API } from "../constants";
import { postData } from "../utils/postData";
const url = `${JOBS_API}`;
const post = async (username, password) => {
  return await axios.post(
    url,
    postData({ userName: username, passWord: password })
  );
};

const get = async (url) => {
  return await axios(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Cache': 'false'
    }})
};

export default {
  post,
  get
};
