import axiosInstance from "../config";
import { QueryParams } from "../../interfaces/global.interface";
import {
    Company, CompanyInformationPayload,
    CompanyResponseData,
    CreateCompanyRequestData,
    RemoveArticleFromCompanyRequestData
} from "../../interfaces/company.interface";
import { buildQueryParams } from "../../utils/queryBuilder";
export const createCompany = async (data: CreateCompanyRequestData) => {
    const res = await axiosInstance.post('/companies', data);
    return res.data;
}


export const getAllCompany = async (queryParamas:QueryParams):Promise<CompanyResponseData> => {
    const queryString = buildQueryParams(queryParamas);
    const res = await axiosInstance.get(`/companies?${queryString}`);
    return res.data;
}

export const getCompanyById = async (id:string):Promise<Company> => {
    const res = await axiosInstance.get(`/companies/${id}`);
    return res.data;
}

export const updateCompany = async (id:string, data:CreateCompanyRequestData) => {
    const res = await axiosInstance.put(`/companies/${id}`, data);
    return res.data;
}

export const deleteCompany = async (id:string) => {
    const res = await axiosInstance.delete(`/companies/${id}`);
    return res.data;
}

export const removeArticleFromCompany = async (data:RemoveArticleFromCompanyRequestData) =>{
    const res = await axiosInstance.put(`/companies/${data.companyId}/article/${data.articleId}`, {"amount":data.amount});
    return res.data;
}

export const changeCompanyInformation = async (payload:CompanyInformationPayload) => {
    const res = await axiosInstance.put(`/companies/${payload.id}`, {"devices":payload.devices, "companyDescriptions":payload.companyDescriptions});
    return res.data;
}