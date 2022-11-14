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

const update = async (id, updatedObj) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObj);
  return response;
};

const remove = async (id, token) => {
  const cfg = { headers: { Authorization: `bearer ${token}` } };
  const response = await axios.delete(`${baseUrl}/${id}`, cfg);
  return response.data;
};

export default { getAll, create, update, remove };
