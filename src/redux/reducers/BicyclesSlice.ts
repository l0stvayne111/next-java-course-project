import {IBicycles} from "../types/IBicycles";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {deleteBicycles, fetchBicycles, patchBicycles, postBicycles} from "../actions/BicyclesAction";
import {toast} from "react-toastify";
import {IType} from "../types/IType";


type IBicyclesState = {
    bicycles: Array<IBicycles>,
    bicycle: IBicycles,
}

const sampleBicycle: IBicycles = {
    id: 0,
    model: '',
    rental_price: '',
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
        rental_price: '',
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
        setBicyclesValue(state, action: PayloadAction<{value: string | IType, name: string}>){

            switch (action.payload.name) {
                case 'bicycle_type' : {
                    // @ts-ignore
                    state.bicycle.bicycle_type.id = action.payload.value.id;
                    // @ts-ignore
                    state.bicycle.bicycle_type.name = action.payload.value.name;
                    break;
                }
                default : {
                    // @ts-ignore
                    state.bicycle[action.payload.name] = action.payload.value;
                    break;
                }
            }
        },
        clearBicycles(state){
            state.bicycle = sampleBicycle;
        },
        getBicycles(state, action:PayloadAction<IBicycles>){
            state.bicycles.map((item:IBicycles) => {
                if (item.id === action.payload.id) {
                    state.bicycle = item;
                }
            })
        }
    },
    extraReducers: {
        [fetchBicycles.pending.type] : () => {

        },
        [fetchBicycles.fulfilled.type] : (state, action:PayloadAction<Array<IBicycles>>) => {
            state.bicycles = action.payload;
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

        [postBicycles.pending.type]: (e) => {

        },
        [postBicycles.fulfilled.type]: (state, action: PayloadAction<IBicycles>) => {
            state.bicycles.push(action.payload);
            state.bicycle = sampleBicycle;

            toast.success('Велосипед успешно создан', {
                position: "bottom-center"
            })
        },
        [postBicycles.rejected.type] : () => {

            toast.error('Ошибка создания велосипеда', {
                position: 'bottom-center'
            })
        },

        [patchBicycles.pending.type] : () => {

        },
        [patchBicycles.fulfilled.type] : (state, action: PayloadAction<IBicycles>) => {
            state.bicycles.map((item: IBicycles) => {
                if (item.id === action.payload.id) {
                    item.model = action.payload.model;
                    item.rental_price = action.payload.rental_price;
                    item.bicycle_type = action.payload.bicycle_type;
                }
            })
            state.bicycle = sampleBicycle;
            toast.info('Велосипед успешно обновлен', {
                position: "bottom-center"
            })
        },
        [patchBicycles.rejected.type] : () => {
            toast.error('Ошибка, велосипед не обновлен', {
                position: 'bottom-center'
            })
        },
    }
})

export default bicyclesSlice.reducer;
export const {removeBicycle, setBicyclesValue, clearBicycles, getBicycles} = bicyclesSlice.actions