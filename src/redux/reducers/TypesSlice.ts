import {IType} from "../types/IType";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type ITypesState = {
    types: Array<IType>,
    type: IType,
}

const sampleType:IType = {
    id: 0,
    name: '',
}

const initialState:ITypesState = {
    types: [],
    type: {
        id: 0,
        name: '',
    }
}

export const typesSlice = createSlice({
    name: 'types',
    initialState,
    reducers: {
        removeType(state, action: PayloadAction<number>){
            let clone: Array<IType> = JSON.parse(JSON.stringify(state.types));
            state.types = clone.filter((item:IType) => item.id !== action.payload);
        },
        setTypeValue(state, action: PayloadAction<{value: number, name: string}>){
            // @ts-ignore
            state.type[action.payload.name] = action.payload.value;
        },
        getType(state, action: PayloadAction<IType>){
            state.types.map((item:IType) => {
                if (item.id === action.payload.id) {
                    state.type = item;
                }
            })
        },
        clearType (state) {
            state.type = sampleType;
        }
    },
    extraReducers: {

    }
})

export default typesSlice.reducer;
export const {removeType, getType, setTypeValue, clearType} = typesSlice.actions;