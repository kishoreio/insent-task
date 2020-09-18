import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://insentrecruit.api.insent.ai/',
  headers: {
    Authorization: process.env.REACT_APP_AUTHORIZATION,
    userId: process.env.REACT_APP_USER_ID,
  },
});

export default axios;
