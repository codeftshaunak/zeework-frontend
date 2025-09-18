import { makeApiRequest } from "./common";

export const createAgency = async (data) =>
  makeApiRequest("post", "/agency/create", data);

export const createAgencyProject = async (data) =>
  makeApiRequest("post", "/agency/project", data);

export const updateAgencyProject = async (data) =>
  makeApiRequest("patch", "/agency/project-update", data);

export const updateAgencyProfile = async (data) =>
  makeApiRequest("put", "/agency/update", data);

export const getAgency = async () => makeApiRequest("get", "/agency");

export const sendAgencyInvitation = async (data) =>
  makeApiRequest("post", "/agency/invite", data);

export const getAgencyById = async (id) =>
  makeApiRequest("get", `/user?agency_id=${id}`);

export const getAgencyMembers = async (id) =>
  makeApiRequest("get", `/agency/invitation/status?agency_id=${id}`);

export const uploadSingleImage = async (data) =>
  makeApiRequest(
    "post",
    "/upload/single/image",
    data,
    {},
    "multipart/form-data"
  );

export const deleteAgencyProject = async (id) =>
  makeApiRequest("delete", `/delete/agency/project`, { project_id: id });

export const removedAgencyMember = async (data) =>
  makeApiRequest("put", "/agency/member/remove", data);

export const agencyReports = async () =>
  makeApiRequest("get", "/report/agency");

export const getAgencyActiveMembers = async () =>
  makeApiRequest("get", "/agency/members");

export const assignContractToFreelancer = async (data) =>
  makeApiRequest("post", "/agency/contract/assign", data);

export const getAssociatedAgency = async () =>
  makeApiRequest("get", "/freelancer/agency/associated");

export const endContractOfFreelancer = async (data) =>
  makeApiRequest("patch", "/agency/contract/end", data);
