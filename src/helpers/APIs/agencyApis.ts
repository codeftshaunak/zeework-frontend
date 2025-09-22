import { makeApiRequest } from "./common";

// ---------------------- Agency API ----------------------
export const createAgency = <T = any>(data: T) =>
  makeApiRequest<T, T>({ method: "POST", endpoint: "/agency/create", data });

export const createAgencyProject = <T = any>(data: T) =>
  makeApiRequest<T, T>({ method: "POST", endpoint: "/agency/project", data });

export const updateAgencyProject = <T = any>(data: T) =>
  makeApiRequest<T, T>({
    method: "PATCH",
    endpoint: "/agency/project-update",
    data,
  });

export const updateAgencyProfile = <T = any>(data: T) =>
  makeApiRequest<T, T>({ method: "PUT", endpoint: "/agency/update", data });

export const getAgency = <T = any>() =>
  makeApiRequest<T>({ method: "GET", endpoint: "/agency" });

export const sendAgencyInvitation = <T = any>(data: T) =>
  makeApiRequest<T, T>({ method: "POST", endpoint: "/agency/invite", data });

export const getAgencyById = <T = any>(id: string | number) =>
  makeApiRequest<T>({ method: "GET", endpoint: `/user?agency_id=${id}` });

export const getAgencyMembers = <T = any>(id: string | number) =>
  makeApiRequest<T>({
    method: "GET",
    endpoint: `/agency/invitation/status?agency_id=${id}`,
  });

export const uploadSingleImage = <T = any>(data: FormData) =>
  makeApiRequest<T, FormData>({
    method: "POST",
    endpoint: "/upload/single/image",
    data,
    customHeaders: { "Content-Type": "multipart/form-data" },
  });

export const deleteAgencyProject = <T = any>(id: string | number) =>
  makeApiRequest<T, { project_id: string | number }>({
    method: "DELETE",
    endpoint: "/delete/agency/project",
    data: { project_id: id },
  });

export const removedAgencyMember = <T = any>(data: T) =>
  makeApiRequest<T, T>({
    method: "PUT",
    endpoint: "/agency/member/remove",
    data,
  });

export const agencyReports = <T = any>() =>
  makeApiRequest<T>({ method: "GET", endpoint: "/report/agency" });

export const getAgencyActiveMembers = <T = any>() =>
  makeApiRequest<T>({ method: "GET", endpoint: "/agency/members" });

export const assignContractToFreelancer = <T = any>(data: T) =>
  makeApiRequest<T, T>({
    method: "POST",
    endpoint: "/agency/contract/assign",
    data,
  });

export const getAssociatedAgency = <T = any>() =>
  makeApiRequest<T>({
    method: "GET",
    endpoint: "/freelancer/agency/associated",
  });

export const endContractOfFreelancer = <T = any>(data: T) =>
  makeApiRequest<T, T>({
    method: "PATCH",
    endpoint: "/agency/contract/end",
    data,
  });
