import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const update = (updatedPerson) => {
  return axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson);
};

const deletePerson = (personToDelete) => {
  return axios.delete(`${baseUrl}/${personToDelete}`);
};

export default {
  getAll,
  create,
  update,
  deletePerson,
};
