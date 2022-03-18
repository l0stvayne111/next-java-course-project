import {createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../../api";
import {removeType} from "../reducers/TypesSlice";

export const fetchBicyclesTypes = createAsyncThunk(
    'type/biycles/get',
    async (_,{rejectWithValue}) => {
        try{
            return await API.getBicyclesType();
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const deleteBicyclesTypes = createAsyncThunk(
    'type/biycles/delete',
    async (action: {id: number}, {rejectWithValue, dispatch}) => {
        try {
            await API.deleteBicyclesType(action.id)
            dispatch(removeType(action.id))
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const postBicyclesTypes = createAsyncThunk(
    'type/biycles/post',
    async (acton: {name:string}, {rejectWithValue}) => {
        try{
            return await API.postBicyclesType(acton)
        }catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const patchBicyclesTypes = createAsyncThunk(
    'type/biycles/patch',
    async (action: { _id: number, data: { name: string } }, {rejectWithValue}) => {
        try {
            return await API.patchBicyclesType(action);
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const fetchRentsTypes = createAsyncThunk(
    'type/rents/get',
    async (_,{rejectWithValue}) => {
        try{
            return await API.getRentsType();
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const deleteRentsTypes = createAsyncThunk(
    'type/rents/delete',
    async (action: {id: number}, {rejectWithValue, dispatch}) => {
        try {
            await API.deleteRentsType(action.id);
            dispatch(removeType(action.id))
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const postRentsTypes = createAsyncThunk(
    'type/rents/post',
    async (acton: {name:string}, {rejectWithValue}) => {
        try{
            return await API.postRentsType(acton)
        }catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const patchRentsTypes = createAsyncThunk(
    'type/rents/patch',
    async (action: { _id: number, data: { name: string } }, {rejectWithValue}) => {
        try {
            return await API.patchRentsType(action);
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)