import {createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../../api";
import {removeBicycle} from "../reducers/BicyclesSlice";

export const fetchBicycles = createAsyncThunk(
    'biycles/get',
    async (_, {rejectWithValue}) => {
        try {
            return await API.getBicycles();
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const deleteBicycles = createAsyncThunk(
    'biycles/delete',
    async (action : {id: number}, {rejectWithValue, dispatch}) => {
        try {
            await API.deleteBicycles(action.id);
            dispatch(removeBicycle(action.id))
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)