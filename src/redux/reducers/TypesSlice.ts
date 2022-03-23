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
    status: boolean
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
    status: false,
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
        [fetchBicyclesTypes.pending.type] : (state) => {
            state.status = true;
        },
        [fetchBicyclesTypes.fulfilled.type] : (state, action:PayloadAction<Array<IType>>) => {
            state.typesBicycles = action.payload;
            state.status = false;
        },
        [fetchBicyclesTypes.rejected.type] : (state) => {
            toast.error('Ошибка, типы не загружены', {
                position: 'bottom-center'
            })
            state.status = false;
        },

        [fetchRentsTypes.pending.type] : (state) => {
            state.status = true;
        },
        [fetchRentsTypes.fulfilled.type] : (state, action:PayloadAction<Array<IType>>) => {
            state.typesRents = action.payload;
            state.status = false;
        },
        [fetchRentsTypes.rejected.type] : (state) => {
            toast.error('Ошибка, типы не загружены', {
                position: 'bottom-center'
            })
            state.status = false;
        },



        [postBicyclesTypes.pending.type] : (state) => {state.status = true;},
        [postBicyclesTypes.fulfilled.type] : (state, action: PayloadAction<IType>) => {
            state.typesBicycles.push(action.payload);
            toast.success('Тип велосипеда успешно создан', {
                position: "bottom-center"
            })
            state.status = false;
        },
        [postBicyclesTypes.rejected.type] : (state) => {
            toast.error('Ошибка создания нового типа', {
                position: 'bottom-center'
            })
            state.status = false;
        },

        [patchBicyclesTypes.pending.type] : (state) => {state.status = true;},
        [patchBicyclesTypes.fulfilled.type] : (state, action: PayloadAction<IType>) => {
            state.typesBicycles.map((item:IType) => {
                if (item.id === action.payload.id) {
                    item.name = action.payload.name;
                }
            })
            state.status = false;
            toast.info('Тип успешно обновлен', {
                position: "bottom-center"
            })
        },
        [patchBicyclesTypes.rejected.type] : (state) => {
            toast.error('Ошибка, тип не обновлен', {
                position: 'bottom-center'
            })
            state.status = false;
        },
        [deleteBicyclesTypes.pending.type] : (state) => {state.status = true;},
        [deleteBicyclesTypes.fulfilled.type] : (state) => {
            toast.success('Тип успешно удален', {
                position: "bottom-center"
            })
            state.status = false;
        },
        [deleteBicyclesTypes.rejected.type] : (state) => {
            toast.error('Ошибка, тип не удален', {
                position: 'bottom-center'
            })
            state.status = false;

        },


        [postRentsTypes.pending.type] : (state) => {state.status = true;},
        [postRentsTypes.fulfilled.type] : (state, action: PayloadAction<IType>) => {
            state.typesRents.push(action.payload);
            toast.success('Тип велосипеда успешно создан', {
                position: "bottom-center"
            })
            state.status = false;
        },
        [postRentsTypes.rejected.type] : (state) => {
            toast.error('Ошибка создания нового типа', {
                position: 'bottom-center'
            })
            state.status = false;
        },

        [patchRentsTypes.pending.type] : (state) => {state.status = true;},
        [patchRentsTypes.fulfilled.type] : (state, action: PayloadAction<IType>) => {
            state.typesRents.map((item:IType) => {
                if (item.id === action.payload.id) {
                    item.name = action.payload.name;
                }
            })
            state.status = false;
            toast.info('Тип успешно обновлен', {
                position: "bottom-center"
            })
        },
        [patchRentsTypes.rejected.type] : (state) => {
            state.status = false;
            toast.error('Ошибка, тип не обновлен', {
                position: 'bottom-center'
            })
        },
        [deleteRentsTypes.pending.type] : (state) => {state.status = true;},
        [deleteRentsTypes.fulfilled.type] : (state) => {
            state.status = false;
            toast.success('Тип успешно удален', {
                position: "bottom-center"
            })
        },
        [deleteRentsTypes.rejected.type] : (state) => {
            state.status = false;
            toast.error('Ошибка, тип не удален', {
                position: 'bottom-center'
            })
        },

    }
})

export default typesSlice.reducer;
export const {removeType, getType, setTypeValue, clearType} = typesSlice.actions;