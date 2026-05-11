import axios from "axios";

const BASE_URL = "http://localhost:4000/api/category";

export const getCategories = async () => {
  const res = await axios.get(`${BASE_URL}/getAll`);
  return res.data;
};

export const createCategory = async (data: any) => {
  const res = await axios.post(`${BASE_URL}/create`, data);
  return res.data;
};

export const deleteCategory = async (id: string) => {
  const res = await axios.delete(`${BASE_URL}/delete/${id}`);
  return res.data;
};