import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const WMSApi = createApi({
    reducerPath: 'WMSApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
    }),
    endpoints: builder => ({
        getToken: builder.query ({
            query: () => ({
                url: "/token",
                credentials: "include"
            }),
        }),
        getEquipmentType: builder.query ({
            query: () => ({
                url: "/api/types/",
                credentials: "include"
            })
        }),
        getEquipment: builder.query ({
            query: () => ({
                url: "/api/equipments/",
                credentials: "include"
            })
        }),
        getStorageSite: builder.query ({
            query: () => ({
                url: "/api/storagesites/",
                credentials: "include"
            })
        }),
        getJobSite: builder.query ({
            query: () => ({
                url: "/api/jobsites/",
                credentials: "include"
            })
        }),
        getContract: builder.query ({
            query: () => ({
                url: "/api/contracts/",
                credentials: "include"
            })
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
    useGetEquipmentQuery,
    useGetContractQuery,
    useGetEquipmentTypeQuery,
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
