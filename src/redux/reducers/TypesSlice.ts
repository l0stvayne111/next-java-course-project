import {IType} from "../types/IType";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    deleteBicyclesTypes, deleteRentsTypes,
    fetchBicyclesTypes,
    fetchRentsTypes,
    patchBicyclesTypes, patchRentsTypes,
    postBicyclesTypes, postRentsTypes
} from "../actions/TypesAction";
import {toast} from "react-toastify";

type ITypesState = {
    typesBicycles: Array<IType>,
    typesRents: Array<IType>,
    typeBicycles: IType,
    typeRent:IType,
}

const sampleType:IType = {
    id: 0,
    name: '',
}

const initialState:ITypesState = {
    typesBicycles: [],
    typesRents: [],
    typeBicycles: {
        id: 0,
        name: '',
    },
    typeRent : {
        id: 0,
        name: ''
    },

}

export const typesSlice = createSlice({
    name: 'types',
    initialState,
    reducers: {
        removeType(state, action: PayloadAction<{id: number, key: string}>){
            // @ts-ignore
            let clone: Array<IType> = JSON.parse(JSON.stringify(state[action.payload.key]));
            // @ts-ignore
            state[action.payload.key] = clone.filter((item:IType) => item.id !== action.payload.id);
        },
        setTypeValue(state, action: PayloadAction<{value: string, name: string, key: string}>){
            // @ts-ignore
            state[action.payload.key][action.payload.name] = action.payload.value;
        },
        getType(state, action: PayloadAction<{data: IType, keys: {arr: string, item: string}}>){
            // @ts-ignore
            state[action.payload.keys.arr].map((item:IType) => {
                if (item.id === action.payload.data.id) {
                    // @ts-ignore
                    state[action.payload.keys.item] = item;
                }
            })
        },
        clearType (state) {
            state.typeBicycles = sampleType;
            state.typeRent = sampleType;
        }
    },
    extraReducers: {
        [fetchBicyclesTypes.pending.type] : () => {

        },
        [fetchBicyclesTypes.fulfilled.type] : (state, action:PayloadAction<Array<IType>>) => {
            state.typesBicycles = action.payload;
        },
        [fetchBicyclesTypes.rejected.type] : () => {
            toast.error('Ошибка, типы не загружены', {
                position: 'bottom-center'
            })
        },

        [fetchRentsTypes.pending.type] : () => {

        },
        [fetchRentsTypes.fulfilled.type] : (state, action:PayloadAction<Array<IType>>) => {
            state.typesRents = action.payload;
        },
        [fetchRentsTypes.rejected.type] : () => {
            toast.error('Ошибка, типы не загружены', {
                position: 'bottom-center'
            })
        },



        [postBicyclesTypes.pending.type] : () => {},
        [postBicyclesTypes.fulfilled.type] : (state, action: PayloadAction<IType>) => {
            state.typesBicycles.push(action.payload);
            toast.success('Тип велосипеда успешно создан', {
                position: "bottom-center"
            })
        },
        [postBicyclesTypes.rejected.type] : () => {
            toast.error('Ошибка создания нового типа', {
                position: 'bottom-center'
            })
        },

        [patchBicyclesTypes.pending.type] : () => {},
        [patchBicyclesTypes.fulfilled.type] : (state, action: PayloadAction<IType>) => {
            state.typesBicycles.map((item:IType) => {
                if (item.id === action.payload.id) {
                    item.name = action.payload.name;
                }
            })
            toast.info('Тип успешно обновлен', {
                position: "bottom-center"
            })
        },
        [patchBicyclesTypes.rejected.type] : () => {
            toast.error('Ошибка, тип не обновлен', {
                position: 'bottom-center'
            })
        },
        [deleteBicyclesTypes.pending.type] : () => {},
        [deleteBicyclesTypes.fulfilled.type] : () => {
            toast.success('Тип успешно удален', {
                position: "bottom-center"
            })
        },
        [deleteBicyclesTypes.rejected.type] : () => {
            toast.error('Ошибка, тип не удален', {
                position: 'bottom-center'
            })
        },


        [postRentsTypes.pending.type] : () => {},
        [postRentsTypes.fulfilled.type] : (state, action: PayloadAction<IType>) => {
            state.typesRents.push(action.payload);
            toast.success('Тип велосипеда успешно создан', {
                position: "bottom-center"
            })
        },
        [postRentsTypes.rejected.type] : () => {
            toast.error('Ошибка создания нового типа', {
                position: 'bottom-center'
            })
        },

        [patchRentsTypes.pending.type] : () => {},
        [patchRentsTypes.fulfilled.type] : (state, action: PayloadAction<IType>) => {
            state.typesRents.map((item:IType) => {
                if (item.id === action.payload.id) {
                    item.name = action.payload.name;
                }
            })
            toast.info('Тип успешно обновлен', {
                position: "bottom-center"
            })
        },
        [patchRentsTypes.rejected.type] : () => {
            toast.error('Ошибка, тип не обновлен', {
                position: 'bottom-center'
            })
        },
        [deleteRentsTypes.pending.type] : () => {},
        [deleteRentsTypes.fulfilled.type] : () => {
            toast.success('Тип успешно удален', {
                position: "bottom-center"
            })
        },
        [deleteRentsTypes.rejected.type] : () => {
            toast.error('Ошибка, тип не удален', {
                position: 'bottom-center'
            })
        },

    }
})

export default typesSlice.reducer;
export const {removeType, getType, setTypeValue, clearType} = typesSlice.actions;