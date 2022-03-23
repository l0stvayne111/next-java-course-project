import {IRent} from "../types/IRent";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {deleteRent, fetchRents, patchRent, postRent} from "../actions/RentAction";
import {toast} from "react-toastify";
import {IStaff} from "../types/IStaff";
import {IBicycles} from "../types/IBicycles";
import {IClient} from "../types/IClient";
import {IType} from "../types/IType";


type IRentState = {
    rents: Array<IRent>,
    rent: IRent,

}

const sampleRent: IRent = {
    id: 0,
    employ: {
        id: 0,
        name: '',
        phone: ''
    },
    client: {
        id: 0,
        name: '',
        phone: '',
    },
    bicycle: {
        id: 0,
        rental_price: '',
        bicycle_type: {
            id: 0,
            name: '',
        },
        model: ''
    },
    rent_type: {
        id: 0,
        name: '',
    },
    price: 0,
    start_of_rental: '',
    end_of_rental: '',
    house: 0,
    model: '',
    rental_price: 0,
    bicycle_type: {
        id: 0,
        name: '',
    }

}

const initialState: IRentState = {
    rents: [],
    rent: {
        id: 0,
        employ: {
            id: 0,
            name: '',
            phone: ''
        },
        client: {
            id: 0,
            name: '',
            phone: '',
        },
        bicycle: {
            id: 0,
            rental_price: '',
            bicycle_type: {
                id: 0,
                name: '',
            },
            model: ''
        },
        rent_type: {
            id: 0,
            name: '',
        },
        price: 0,
        start_of_rental: '',
        end_of_rental: '',
        house: 0,
        model: '',
        rental_price: 0,
        bicycle_type: {
            id: 0,
            name: '',
        }

    }
}

export const rentSlice = createSlice({
    name: 'rent',
    initialState,
    reducers: {
        removeRent(state, action: PayloadAction<number>) {
            let clone: Array<IRent> = JSON.parse(JSON.stringify(state.rents));
            state.rents = clone.filter((item: IRent) => item.id !== action.payload);
        },
        setRentValue(state, action: PayloadAction<{ value: string | IStaff | IBicycles | IClient | IType, key: string }>) {

            switch (action.payload.key) {
                case 'bicycle_type' : {

                    break;
                }
                default : {
                    // @ts-ignore
                    state.rent[action.payload.key] = action.payload.value;
                    break;
                }
            }


        },
        clearRent(state) {
            state.rent = sampleRent;
        },
        getRent(state, action: PayloadAction<IRent>) {
            state.rents.map((item: IRent) => {
                if (item.id === action.payload.id) {
                    state.rent = item;
                }
            })
        }
    },
    extraReducers: {
        [fetchRents.pending.type]: () => {
        },
        [fetchRents.fulfilled.type]: (state, action: PayloadAction<Array<IRent>>) => {
            state.rents = action.payload;
        },
        [fetchRents.rejected.type]: () => {
            toast.error('Ошибка, список аренд не загружен', {
                position: 'bottom-center'
            })
        },

        [postRent.pending.type] : () => {
            toast.info('Создается новая аренда', {position: 'bottom-center'})
        },
        [postRent.fulfilled.type] : (state, action:PayloadAction<IRent>) => {
            state.rents.push(action.payload);
            toast.success('Аренда успешно создана', {position: 'bottom-center'})
        },
        [postRent.rejected.type] : () => {
            toast.error('Ошибка, аренда не создана', {position: 'bottom-center'})
        },

        [deleteRent.pending.type]: () => {

        },
        [deleteRent.fulfilled.type]: () => {
            toast.success('Аренда успешно удалена', {
                position: "bottom-center"
            })
        },
        [deleteRent.rejected.type]: () => {
            toast.error('Ошибка, аренда не удалена', {
                position: 'bottom-center'
            })
        },

        [patchRent.pending.type]: () => {

        },
        [patchRent.fulfilled.type]: (state, action:PayloadAction<IRent>) => {
            state.rents.map((item:IRent) => {
                if (item.id === action.payload.id) {
                    item.rent_type = action.payload.rent_type;
                    item.client = action.payload.client;
                    item.employ = action.payload.employ;
                    item.bicycle = action.payload.bicycle;
                    item.price = action.payload.price;
                    item.start_of_rental = action.payload.start_of_rental;
                    item.end_of_rental = action.payload.end_of_rental;
                }
            })
            toast.info('Аренда успешно обновлена', {
                position: "bottom-center"
            })
        },
        [patchRent.rejected.type]: () => {
            toast.error('Ошибка, аренда не обновлена', {
                position: 'bottom-center'
            })
        },

    }
})

export default rentSlice.reducer;
export const {removeRent, setRentValue, clearRent, getRent} = rentSlice.actions;