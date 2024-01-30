import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: '',
}

export const querySlice = createSlice({
    name: 'query',
    initialState,
    reducers: {
        reset: (state) => {
            state.value = ''
        }
    }

})