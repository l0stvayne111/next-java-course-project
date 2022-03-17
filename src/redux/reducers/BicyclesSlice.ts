import {IBicycles} from "../types/IBicycles";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {deleteBicycles, fetchBicycles} from "../actions/BicyclesAction";
import {toast} from "react-toastify";


type IBicyclesState = {
    bicycles: Array<IBicycles>,
    bicycle: IBicycles,
}

const sampleBicycle: IBicycles = {
    id: 0,
    model: '',
    rental_price: 0,
    bicycle_type: {
        id: 0,
        name: '',
    }
}

const initialState: IBicyclesState = {
    bicycles: [],
    bicycle: {
        id: 0,
        model: '',
        rental_price: 0,
        bicycle_type: {
            id: 0,
            name: '',
        }
    }
}

export const bicyclesSlice = createSlice({
    name: 'bicycles',
    initialState,
    reducers: {
        removeBicycle(state, action: PayloadAction<number>){
            let clone: Array<IBicycles> = JSON.parse(JSON.stringify(state.bicycles));
            state.bicycles = clone.filter((item:IBicycles) => item.id !== action.payload);
        },
    },
    extraReducers: {
        [fetchBicycles.pending.type] : () => {

        },
        [fetchBicycles.fulfilled.type] : (state, action:PayloadAction<Array<IBicycles>>) => {
            state.bicycles = action.payload;
            toast.success('Велосипеды получены', {
                position: "bottom-center"
            })
        },
        [fetchBicycles.rejected.type] : () => {
            toast.error('Ошибка загрузки велосипедов', {
                position: 'bottom-center'
            })
        },


        [deleteBicycles.pending.type] : () => {

        },
        [deleteBicycles.fulfilled.type] : () => {
            toast.success('Велосипед успешно удален', {
                position: "bottom-center"
            })
        },
        [deleteBicycles.rejected.type] : () => {
            toast.error('Ошибка, Велосипед не удален', {
                position: 'bottom-center'
            })
        },
    }
})

export default bicyclesSlice.reducer;
export const {removeBicycle} = bicyclesSlice.actions