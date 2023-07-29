import axios from 'axios';
const baseUrl = '/api/login';

const attemptLogin = async (credentials) => {
  const res = await axios.post(baseUrl, credentials);
  return res.data;
};

export default { attemptLogin };