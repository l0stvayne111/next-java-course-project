import {IBicycles} from "../types/IBicycles";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {deleteBicycles, fetchBicycles, patchBicycles, postBicycles} from "../actions/BicyclesAction";
import {toast} from "react-toastify";
import {IType} from "../types/IType";


type IBicyclesState = {
    bicycles: Array<IBicycles>,
    bicycle: IBicycles,
    status: boolean,
}

const sampleBicycle: IBicycles = {
    id: 0,
    model: '',
    rental_price: '',
    bicycle_type: {
        id: 0,
        name: '',
    },
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
    },
    status: false,
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
        [fetchBicycles.pending.type] : (state) => {
            state.status = true;
        },
        [fetchBicycles.fulfilled.type] : (state, action:PayloadAction<Array<IBicycles>>) => {
            state.bicycles = action.payload;
            state.status = false;
        },
        [fetchBicycles.rejected.type] : (state) => {
            toast.error('Ошибка загрузки велосипедов', {
                position: 'bottom-center'
            })
            state.status = false;
        },


        [deleteBicycles.pending.type] : (state) => {
            state.status = true;
        },
        [deleteBicycles.fulfilled.type] : (state) => {
            toast.success('Велосипед успешно удален', {
                position: "bottom-center"
            })
            state.status = false;
        },
        [deleteBicycles.rejected.type] : (state) => {
            toast.error('Ошибка, Велосипед не удален', {
                position: 'bottom-center'
            })
            state.status = false;
        },

        [postBicycles.pending.type]: (state) => {
            state.status = true;
        },
        [postBicycles.fulfilled.type]: (state, action: PayloadAction<IBicycles>) => {
            state.bicycles.push(action.payload);
            state.bicycle = sampleBicycle;

            toast.success('Велосипед успешно создан', {
                position: "bottom-center"
            })
            state.status = false;
        },
        [postBicycles.rejected.type] : (state) => {

            toast.error('Ошибка создания велосипеда', {
                position: 'bottom-center'
            })
            state.status = false;
        },

        [patchBicycles.pending.type] : (state) => {
            state.status = true;
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
            state.status = false;
        },
        [patchBicycles.rejected.type] : (state) => {
            toast.error('Ошибка, велосипед не обновлен', {
                position: 'bottom-center'
            })
            state.status = false;
        },
    }
})

export default bicyclesSlice.reducer;
export const {removeBicycle, setBicyclesValue, clearBicycles, getBicycles} = bicyclesSlice.actions