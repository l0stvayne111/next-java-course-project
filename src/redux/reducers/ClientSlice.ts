import {IClient} from "../types/IClient";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {deleteClient, fetchClients, patchClient, postClient} from "../actions/ClientAction";

type IClientState = {
    clients: Array<IClient>,
    client: IClient,
    status: 'PENDING' | 'FULFILLED' | 'REJECTED',
}

const sampleClient: IClient = {
    id: 0,
    name: '',
    phone: ''
}

const initialState: IClientState = {
    clients: [],
    client: {
        id: 0,
        name: '',
        phone: ''
    },
    status: "REJECTED",
}


export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        removeItem(state, action: PayloadAction<number>) {
            let clone: Array<IClient> = JSON.parse(JSON.stringify(state.clients));
            state.clients = clone.filter((item: IClient) => item.id !== action.payload);
        },
        setClientValue(state, action: PayloadAction<{ value: string, name: string }>) {
            // @ts-ignore
            state.client[action.payload.name] = action.payload.value;
        },

        getItem(state, action: PayloadAction<IClient>) {
            state.clients.map((item: IClient) => {
                if (item.id === action.payload.id) {
                    state.client = item;
                }
            })
        },
        clearClient (state) {
            state.client = sampleClient;
        }

    },
    extraReducers: {
        [fetchClients.pending.type]: (state) => {

        },
        [fetchClients.fulfilled.type]: (state, action: PayloadAction<Array<IClient>>) => {
            state.clients = action.payload;
        },
        [fetchClients.rejected.type]: () => {
            toast.error('Ошибка загрузки клиентов', {
                position: 'bottom-center'
            })
        },


        [postClient.pending.type]: (state) => {
            state.status = 'PENDING';
        },
        [postClient.fulfilled.type]: (state, action: PayloadAction<IClient>) => {
            state.clients.push(action.payload);
            state.client = sampleClient;
            state.status = 'FULFILLED';
            toast.success('Клиент успешно создан', {
                position: "bottom-center"
            })
        },
        [postClient.rejected.type] : (state) => {
            state.status = 'REJECTED';
            toast.error('Ошибка создания клиента', {
                position: 'bottom-center'
            })
        },

        [deleteClient.pending.type] : () => {

        },
        [deleteClient.fulfilled.type] : () => {
            toast.success('Клиент успешно удален', {
                position: "bottom-center"
            })
        },
        [deleteClient.rejected.type] : () => {
            toast.error('Ошибка, клиент не удален', {
                position: 'bottom-center'
            })
        },


        [patchClient.pending.type] : () => {

        },
        [patchClient.fulfilled.type] : (state, action: PayloadAction<IClient>) => {
            state.clients.map((item: IClient) => {
                if (item.id === action.payload.id) {
                    item.name = action.payload.name;
                    item.phone = action.payload.phone;
                }
            })
            state.client = sampleClient;
            toast.info('Клиент успешно обновлен', {
                position: "bottom-center"
            })
        },
        [patchClient.rejected.type] : () => {
            toast.error('Ошибка, клиент не обновлен', {
                position: 'bottom-center'
            })
        },



    }
})

export default clientSlice.reducer;
export const {removeItem, setClientValue, getItem, clearClient} = clientSlice.actions;