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
        "Equipment"
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
            })
        }),
        getJobSite: builder.query ({
            query: () => ({
                url: "/api/jobsites",
                credentials: "include"
            })
        }),
        getContract: builder.query ({
            query: () => ({
                url: "/api/contracts",
                credentials: "include"
            })
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
    useDeleteEquipmentMutation
} = WMSApi;