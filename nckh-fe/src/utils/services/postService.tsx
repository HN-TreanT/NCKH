import createApiService from "../createApiServices";

const api = createApiService();

const thongke = (params: any) => {
  return api.makeAuthRequest({
    url: `/api/post/thongke/thongke2`,
    method: "GET",
    params: params,
  });
};
const thongketheothang = (params: any) => {
  return api.makeAuthRequest({
    url: `/api/post/thongke/thongketheothang`,
    method: "GET",
    params: params,
  });
};
const get = (params: any) => {
  return api.makeAuthRequest({
    url: `/api/post`,
    method: "GET",
    params: params,
  });
};

const detail = (id: any) => {
  return api.makeAuthRequest({
    url: `/api/post/${id}`,
    method: "GET",
  });
};

const create = (data: any) => {
  return api.makeAuthRequest({
    url: `/api/post`,
    method: "POST",
    data: data,
  });
};

const update = (id: any, data: any) => {
  return api.makeAuthRequest({
    url: `/api/post/${id}`,
    method: "PUT",
    data: data,
  });
};

const remove = (id: any) => {
  return api.makeAuthRequest({
    url: `/api/post/${id}`,
    method: "DELETE",
  });
};

export const postServices = {
  get,
  create,
  update,
  remove,
  detail,
  thongke,
  thongketheothang
};
