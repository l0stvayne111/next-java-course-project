import {createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../../api";
import {removeStaff} from "../reducers/StaffSlice";

export const fetchStaff = createAsyncThunk(
    'staff/get',
    async (_, {rejectWithValue}) => {
        try {
            return await API.getStaff();
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const postStaff = createAsyncThunk(
    'staff/post',
    async (action: {name: string, phone: string}, {rejectWithValue}) => {
        try {
            return await API.postStaff(action);
        } catch (e){
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const deleteStaff = createAsyncThunk(
    'staff/delete',
    async (action : {id: number}, {rejectWithValue, dispatch}) => {
        try {
            await API.deleteStaff(action.id);
            dispatch(removeStaff(action.id));
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const patchStaff = createAsyncThunk(
    'staff/patch',
    async (action: { _id: number, data: { name: string, phone: string } }, {rejectWithValue}) => {
        try {
            return  await API.patchStaff(action);
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)