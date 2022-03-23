import {createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../../api";
import {removeRent} from "../reducers/RentSlice";

export const fetchRents = createAsyncThunk(
    'get/fetch',
    async (_, {rejectWithValue}) => {
        try {
            return await API.getRents();
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)


export const postRent = createAsyncThunk(
    'post/rent',
    async (action: {payload: any}, {rejectWithValue}) => {
        try {
            return await API.postRent({payload: action.payload});
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)
export const patchRent = createAsyncThunk(
    'patch/rent',
    async (action: {id: number, payload: any}, {rejectWithValue}) => {
        try {
            return await API.patchRent({_id: action.id, data:action.payload});
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)


export const deleteRent = createAsyncThunk(
    'delete/rent',
    async (id: number, {rejectWithValue, dispatch}) => {
        try {
            await API.deleteRent(id);
            dispatch(removeRent(id))
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

