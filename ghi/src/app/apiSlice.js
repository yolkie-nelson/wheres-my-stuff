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
            })
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

    })
})

export const {
    useGetTokenQuery
} = WMSApi;