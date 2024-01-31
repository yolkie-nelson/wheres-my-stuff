import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { data } from 'autoprefixer';

export const WMSApi = createApi({
    reducerPath: 'WMSApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
    }),
    tagTypes: [
        "Token",
        "EquipmentType",
        "Equipment",
        "Storagesite",
        "Contract",
        "Jobsites"
    ],
    endpoints: builder => ({
        getToken: builder.query ({
            query: () => ({
                url: "/token",
                credentials: "include"
            }),
            providesTags: ["Token"]
        }),
        createAccount: builder.mutation ({
            query: data => ({
                url: "/api/accounts/",
                body: data,
                method: "post"
            }),
            invalidatesTags: ["Token"]
        }),
        login: builder.mutation ({
            query: () => ({
                url: "/token",
                body: data,
                method: "post"
            }),
            invalidatesTags: ["Token"]
        }),
        logout: builder.mutation ({
            query: () => ({
                url: "/token",
                credentials: "include",
                method: "delete"
            }),
            invalidatesTags: ["Token"]
        }),
        getEquipmentType: builder.query ({
            query: () => ({
                url: "/api/types",
                credentials: "include"
            }),
            providesTags: ["EquipmentType"]
        }),
        createEquipmentType: builder.mutation ({
            query: data => ({
                url: "/api/types",
                credentials: "include",
                body: data,
                method: "post"
            }),
            invalidatesTags: ["EquipmentType"]
        }),
        getOneEquipmentType: builder.query ({
            query: id => ({
                url: `/api/types/${id}`,
                credentials: "include"
            }),
            invalidatesTags: ["EquipmentType"]
        }),
        updateEquipmentType: builder.mutation ({
            query: (id, data) => ({
                url: `/api/types/${id}`,
                credentials: "include",
                body: data,
                method: "put"
            }),
            invalidatesTags: ["EquipmentType"]
        }),
        deleteEquipmentType: builder.mutation ({
            query: id => ({
                url: `/api/types/${id}`,
                credentials: "include"
            }),
            invalidatesTags: ["EquipmentType"]
        }),
        getEquipment: builder.query ({
            query: () => ({
                url: "/api/equipment",
                credentials: "include"
            }),
            providesTags: ["Equipment"]
        }),
        createEquipment: builder.mutation ({
            query: data => ({
                url: "/api/equipment",
                credentials: "include",
                body: data,
                method: "post"
            }),
            invalidatesTags: ["Equipment"]
        }),
        getOneEquipment: builder.query ({
            query: id => ({
                url: `/api/equipment/${id}`,
                credentials: "include"
            }),
            invalidatesTags: ["Equipment"]
        }),
        updateEquipment: builder.mutation ({
            query: (id, data) => ({
                url: `/api/equipment/${id}`,
                credentials: "include",
                body: data,
                method: "put"
            }),
            invalidatesTags: ["Equipment"]
        }),
        deleteEquipment: builder.mutation ({
            query: id => ({
                url: `/api/equipment/${id}`,
                credentials: "include"
            }),
            invalidatesTags: ["Equipment"]
        }),
        getStorageSite: builder.query ({
            query: () => ({
                url: "/api/storagesites",
                credentials: "include"
            }),
            providesTags: ["Storagesite"]
        }),
        getJobSite: builder.query ({
            query: () => ({
                url: "/api/jobsites",
                credentials: "include"
            }),
            providesTags: ["Jobsites"]
        }),
        getContract: builder.query ({
            query: () => ({
                url: "/api/contracts",
                credentials: "include"
            }),
            providesTags: ["Contract"]
        }),
        createStoragesite: builder.mutation({
            query: data => ({
                url: 'api/storages',
                body: data,
                method: 'post',
                credentials: "include"
            }),
            invalidatesTags: ['Storagesite']
        }),
        getOneStoragesite: builder.query({
            query:storage_site_id => ({
                url: `api/storages/${storage_site_id}`,
                method: 'get',
                credentials: "include"
            }),
            invalidatesTags: ['Storagesite']
        }),
        updateStoragesite: builder.mutation({
            query:(storage_site_id, data) => ({
                url: `api/storages/${storage_site_id}`,
                body: data,
                method: 'put',
                credentials: "include"
            }),
            invalidatesTags: ['Storagesite']
        }),
        deleteStoragesite: builder.mutation({
            query: storage_site_id => ({
                url: `api/storages/${storage_site_id}`,
                method: 'delete',
                credentials: "include"
            }),
            invalidatesTags: ['Storagesite']
        }),
        createJobsite: builder.mutation({
            query: data => ({
                url: 'api/jobsites',
                body: data,
                method: 'post',
                credentials: "include"
            }),
            invalidatesTags: ['Jobsites']
        }),
        getOneJobsite: builder.query({
            query:id => ({
                url: `api/jobsites/${id}`,
                method: 'get',
                credentials: "include"
            }),
            invalidatesTags: ['Jobsites']
        }),
        updateJobsite: builder.mutation({
            query:(id, data) => ({
                url: `api/jobsites/${id}`,
                body: data,
                method: 'put',
                credentials: "include"
            }),
            invalidatesTags: ['Jobsites']
        }),
        deleteJobsite: builder.mutation({
            query: id => ({
                url: `api/jobsites/${id}`,
                method: 'delete',
                credentials: "include"
            }),
            invalidatesTags: ['Jobsites']
        }),
        createContract: builder.mutation({
            query: data => ({
                url: 'api/contracts',
                body: data,
                method: 'post',
                credentials: "include"
            }),
            invalidatesTags: ['Contract']
        }),
        getOneContract: builder.query({
            query:id => ({
                url: `api/contracts/${id}`,
                method: 'get',
                credentials: "include"
            }),
            invalidatesTags: ['Contract']
        }),
        updateContract: builder.mutation({
            query:(id, data) => ({
                url: `api/contracts/${id}`,
                body: data,
                method: 'put',
                credentials: "include"
            }),
            invalidatesTags: ['Contract']
        }),
        deleteJContract: builder.mutation({
            query: id => ({
                url: `api/contracts/${id}`,
                method: 'delete',
                credentials: "include"
            }),
            invalidatesTags: ['Contract']
        }),

    })
})

export const {
    useGetTokenQuery,
    useCreateAccountMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetEquipmentTypeQuery,
    useCreateEquipmentTypeMutation,
    useGetOneEquipmentTypeQuery,
    useUpdateEquipmentTypeMutation,
    useDeleteEquipmentTypeMutation,
    useGetEquipmentQuery,
    useCreateEquipmentMutation,
    useGetOneEquipmentQuery,
    useUpdateEquipmentMutation,
    useDeleteEquipmentMutation,
    useGetContractQuery,
    useGetJobSiteQuery,
    useGetStorageSiteQuery,
    useCreateStoragesiteMutation,
    useGetOneStoragesiteQuery,
    useUpdateStoragesiteMutation,
    useDeleteStoragesiteMutation,
    useCreateJobsiteMutation,
    useGetOneJobsiteQuery,
    useUpdateJobsiteMutation,
    useDeleteJobsiteMutation,
    useCreateContractMutation,
    useGetOneContractQuery,
    useUpdateContractMutation,
    useDeleteJContractMutation
} = WMSApi;
