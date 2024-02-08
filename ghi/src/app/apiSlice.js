import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { data } from 'autoprefixer';
// import { info } from 'console';

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
                url: "/api/accounts",
                body: data,
                method: "post"
            }),
            invalidatesTags: ["Token"]
        }),
        login: builder.mutation ({
            query: (info) => {
                const formData = new FormData();
                formData.append('username', info.username)
                formData.append('password', info.password)

                return {
                    url: '/token',
                    method: 'post',
                    body: formData,
                    credentials: "include"
                }
            },
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
            query: equipmentTypeId => ({
                url: `/api/types/${equipmentTypeId}`,
                credentials: "include"
            }),
            providesTags: ["EquipmentType"]
        }),
        updateEquipmentType: builder.mutation ({
            query: (equipmentTypeId, data) => ({
                url: `/api/types/${equipmentTypeId}`,
                credentials: "include",
                body: data,
                method: "put"
            }),
            invalidatesTags: ["EquipmentType"]
        }),
        deleteEquipmentType: builder.mutation ({
            query: equipmentTypeId => ({
                url: `/api/types/${equipmentTypeId}`,
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
            query: serial_number => ({
                url: `/api/equipment/${serial_number}`,
                credentials: "include"
            }),
            providesTags: ["Equipment"]
        }),
        updateEquipment: builder.mutation ({
            query: (serial_number, data) => ({
                url: `/api/equipment/${serial_number}`,
                credentials: "include",
                body: data,
                method: "put"
            }),
            invalidatesTags: ["Equipment"]
        }),
        deleteEquipment: builder.mutation ({
            query: serial_number => ({
                url: `/api/equipment/${serial_number}`,
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
        createStorageSite: builder.mutation({
            query: data => ({
                url: 'api/storagesites',
                credentials: "include",
                body: data,
                method: 'post'
            }),
            invalidatesTags: ['Storagesite']
        }),
        getOneStorageSite: builder.query({
            query:storageSiteId => ({
                url: `api/storagesites/${storageSiteId}`,
                credentials: "include",
                method: 'get'
            }),
            providesTags: ['Storagesite']
        }),
        updateStorageSite: builder.mutation({
            query:(storageSiteId, data) => ({
                url: `api/storagesites/${storageSiteId}`,
                credentials: "include",
                body: data,
                method: 'put',
            }),
            invalidatesTags: ['Storagesite']
        }),
        deleteStorageSite: builder.mutation({
            query: storageSiteId => ({
                url: `api/storagesites/${storageSiteId}`,
                credentials: "include",
                method: 'delete'
            }),
            invalidatesTags: ['Storagesite']
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
                url: `api/storagesites/${storage_site_id}`,
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
            query: jobSiteId => ({
                url: `api/jobsites/${jobSiteId}`,
                method: 'get',
                credentials: "include"
            }),
            providesTags: ['Jobsites']
        }),
        updateJobsite: builder.mutation({
            query:(jobSiteId, data) => ({
                url: `api/jobsites/${jobSiteId}`,
                body: data,
                method: 'put',
                credentials: "include"
            }),
            invalidatesTags: ['Jobsites']
        }),
        deleteJobsite: builder.mutation({
            query: jobSiteId => ({
                url: `api/jobsites/${jobSiteId}`,
                method: 'delete',
                credentials: "include"
            }),
            invalidatesTags: ['Jobsites']
        }),
        getContract: builder.query ({
            query: () => ({
                url: "/api/contracts",
                credentials: "include"
            }),
            providesTags: ["Contract"]
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
            query:contractId => ({
                url: `api/contracts/${contractId}`,
                method: 'get',
                credentials: "include"
            }),
            invalidatesTags: ['Contract']
        }),
        updateContract: builder.mutation({
            query:(contractId, data) => ({
                url: `api/contracts/${contractId}`,
                body: data,
                method: 'put',
                credentials: "include"
            }),
            invalidatesTags: ['Contract']
        }),
        deleteContract: builder.mutation({
            query: contractId => ({
                url: `api/contracts/${contractId}`,
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
    useGetStorageSiteQuery,
    useCreateStoragesiteMutation,
    useGetOneStoragesiteQuery,
    useUpdateStoragesiteMutation,
    useDeleteStoragesiteMutation,
    useGetJobSiteQuery,
    useCreateJobsiteMutation,
    useGetOneJobsiteQuery,
    useUpdateJobsiteMutation,
    useDeleteJobsiteMutation,
    useGetContractQuery,
    useCreateContractMutation,
    useGetOneContractQuery,
    useUpdateContractMutation,
    useDeleteContractMutation
} = WMSApi;
