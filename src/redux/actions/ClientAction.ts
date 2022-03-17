import {createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../../api";
import {removeItem} from "../reducers/ClientSlice";

export const fetchClients = createAsyncThunk(
    'clients/get',
    async (_,{rejectWithValue}) => {
        try {
            return await API.getClients();
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const postClient = createAsyncThunk(
    'clients/post',
    async (action: {name: string, phone: string}, {rejectWithValue}) => {
        try {
            return await API.postClient(action);
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const deleteClient = createAsyncThunk(
    'clients/delete',
    async (action : {id: number}, {rejectWithValue, dispatch}) => {
        try {
            await API.deleteClient(action.id);
            dispatch(removeItem(action.id));
        } catch (e){
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const patchClient = createAsyncThunk(
    'client/patch',
    async (action: { _id: number, data: { name: string, phone: string } }, {rejectWithValue}) => {
        try{
            return await API.patchClient(action);
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

