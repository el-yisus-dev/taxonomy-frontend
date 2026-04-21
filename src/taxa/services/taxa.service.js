import { api } from "../../services/api";

export const getTaxons = async (params = {}) => {
  const response = await api.get("/taxons", {
    params: {
      page: params.page || 1,
      limit: params.limit || 10,
      ...params
    }
  });

  return response.data;
};

export const getObservations = async (params = {}) => {
  const response = await api.get("/observations", {
    params: {
      page: params.page || 1,
      limit: params.limit || 10,
      ...params
    }
  });

  return response.data;
};