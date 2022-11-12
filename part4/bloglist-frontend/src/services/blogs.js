import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (newBlog, token) => {
  const cfg = { headers: { Authorization: `bearer ${token}` } };
  const request = await axios.post(baseUrl, newBlog, cfg);
  return request;
};

export default { getAll, create };
