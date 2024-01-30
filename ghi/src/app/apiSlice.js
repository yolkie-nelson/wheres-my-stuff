import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const WMSApi = createApi({
    reducerPath: 'WMSApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
    }),
    endpoints: builder => ({
        getToken: builder.query ({
            query: () => ({
                url: "token",
                credentials: "include"
            })

        })

    })
})

export const {
    useGetTokenQuery
} = WMSApi;